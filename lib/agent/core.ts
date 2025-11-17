// SEO Agent Core
// Huvudlogik för automatisk SEO-agent med prioritering och historik
// Uppdaterad med OpenAI-integration för AI-driven analys

import { fetchUrl } from '../mcp/fetch-url';
import { readSitemap, discoverSitemap } from '../mcp/read-sitemap';
import { psiAudit } from '../mcp/psi-audit';
import { gscTopQueries, gscPageData } from '../mcp/gsc-top-queries';
import { analyzeOnPage, generateOnPageSuggestions } from '../seo/on-page-analysis';
import { calculateSEOScore, calculatePriority, shouldFlagPage } from '../seo/scoring';
import { analyzePageWithAI } from '../ai/openai-client';
import { getPageAnalytics } from '../analytics/google-analytics';
import {
  createRun,
  updateRun,
  upsertPage,
  updatePageMetrics,
  getAllPages,
  createAudit,
  getAuditsByUrl,
  createSuggestion,
  refreshMaterializedViews,
} from '../db/operations';

export interface AgentConfig {
  siteUrl: string;
  sitemapUrl?: string; // Om tom, försök auto-discover
  psiApiKey: string;
  gscAccessToken?: string; // Optional
  gscSiteUrl?: string; // Verified site URL i GSC
  gaPropertyId?: string; // Google Analytics property ID
  maxPagesToCheck?: number; // Default 20
  priorityThreshold?: number; // Bara köra sidor över denna prio
  useAI?: boolean; // Om AI-analys ska användas (default: true)
  openaiApiKey?: string; // OpenAI API-nyckel
}

export interface AgentRunResult {
  runId: number;
  pagesChecked: number;
  avgScore: number;
  errors: string[];
  flaggedPages: string[];
  duration: number; // i sekunder
}

export interface PageToCheck {
  url: string;
  priority: number;
  lastScore: number | null;
  daysSinceLastCheck: number;
}

/**
 * Huvudfunktion för att köra SEO-agenten
 * @param config - Agent konfiguration
 * @returns Run resultat
 */
export async function runAgent(config: AgentConfig): Promise<AgentRunResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const flaggedPages: string[] = [];

  console.log('[Agent] Starting SEO agent run...');

  // Skapa ny run i databasen
  const runId = await createRun();
  console.log(`[Agent] Created run ID: ${runId}`);

  try {
    // Steg 1: Hämta sitemap
    console.log('[Agent] Fetching sitemap...');
    const sitemapResult = config.sitemapUrl
      ? await readSitemap(config.sitemapUrl)
      : await discoverSitemap(config.siteUrl);

    let urlsToProcess: string[] = [];

    if (!sitemapResult.success || sitemapResult.totalUrls === 0) {
      // Sitemap hittades inte - använd bara siteUrl
      console.warn(`[Agent] ⚠️ Sitemap not found: ${sitemapResult.error}`);
      console.log('[Agent] Falling back to checking only the site URL');
      urlsToProcess = [config.siteUrl];
    } else {
      console.log(`[Agent] Found ${sitemapResult.totalUrls} URLs in sitemap`);
      urlsToProcess = sitemapResult.urls.map(u => u.loc);
    }

    // Steg 2: Upsertera alla pages från sitemap eller bara siteUrl
    for (const url of urlsToProcess) {
      try {
        await upsertPage({
          url: url,
          last_seen_at: new Date().toISOString(),
        });
      } catch (error) {
        console.error(`Error upserting page ${url}:`, error);
      }
    }

    // Steg 3: Beräkna prioritering för alla pages
    console.log('[Agent] Calculating page priorities...');
    const allPages = await getAllPages();
    const pagesToCheck = await selectPagesToCheck(
      allPages,
      config.maxPagesToCheck || 20,
      config.priorityThreshold
    );

    console.log(`[Agent] Selected ${pagesToCheck.length} pages to check`);

    // Steg 4: Kör audit för varje vald sida
    let totalScore = 0;
    let successCount = 0;

    for (const page of pagesToCheck) {
      console.log(`[Agent] Checking ${page.url}...`);

      try {
        const result = await checkPage(page.url, config);

        if (result.success) {
          // Spara audit
          await createAudit({
            run_id: runId,
            url: page.url,
            score: result.score,
            lcp: result.vitals?.lcp || null,
            cls: result.vitals?.cls || null,
            inp: result.vitals?.inp || null,
            issues: result.issues as any,
          });

          // Uppdatera page metrics
          await updatePageMetrics(page.url, {
            senaste_score: result.score,
            senaste_lcp: result.vitals?.lcp,
            senaste_cls: result.vitals?.cls,
            senaste_inp: result.vitals?.inp,
            last_seen_at: new Date().toISOString(),
          });

          // Spara förslag
          for (const suggestion of result.suggestions) {
            await createSuggestion({
              url: page.url,
              action: suggestion.action,
              impact: suggestion.impact,
              status: 'pending',
            });
          }

          totalScore += result.score;
          successCount++;

          // Flagga sida om nödvändigt
          const scoreDiff = page.lastScore ? result.score - page.lastScore : null;
          if (shouldFlagPage(result.score, result.vitals, scoreDiff)) {
            flaggedPages.push(page.url);
            console.log(`[Agent] ⚠️  Flagged ${page.url} (score: ${result.score})`);
          }
        } else {
          errors.push(`${page.url}: ${result.error}`);
        }

        // Rate limiting: vänta 2 sekunder mellan checks
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${page.url}: ${errorMsg}`);
        console.error(`[Agent] Error checking ${page.url}:`, error);
      }
    }

    // Steg 5: Uppdatera run med resultat
    const avgScore = successCount > 0 ? totalScore / successCount : 0;

    await updateRun(runId, {
      finished_at: new Date().toISOString(),
      pages_checked: successCount,
      avg_score: avgScore,
      status: 'completed',
    });

    // Steg 6: Refresh materialiserade vyer
    console.log('[Agent] Refreshing materialized views...');
    await refreshMaterializedViews();

    const duration = (Date.now() - startTime) / 1000;

    console.log('[Agent] ✅ Run completed successfully');
    console.log(`[Agent] Checked ${successCount} pages in ${duration.toFixed(1)}s`);
    console.log(`[Agent] Average score: ${avgScore.toFixed(1)}`);

    return {
      runId,
      pagesChecked: successCount,
      avgScore,
      errors,
      flaggedPages,
      duration,
    };

  } catch (error) {
    // Markera run som failed
    await updateRun(runId, {
      finished_at: new Date().toISOString(),
      status: 'failed',
      error_message: error instanceof Error ? error.message : 'Unknown error',
    });

    throw error;
  }
}

/**
 * Väljer sidor att checka baserat på prioritering
 */
async function selectPagesToCheck(
  allPages: any[],
  maxPages: number,
  priorityThreshold?: number
): Promise<PageToCheck[]> {
  const pagesToCheck: PageToCheck[] = [];

  for (const page of allPages) {
    // Hämta tidigare audits för att beräkna trend
    const previousAudits = await getAuditsByUrl(page.url, 2);
    const lastScore = previousAudits.length > 0 ? previousAudits[0].score : null;
    const prevScore = previousAudits.length > 1 ? previousAudits[1].score : null;

    // Beräkna dagar sedan senaste check
    const daysSinceLastCheck = page.last_seen_at
      ? (Date.now() - new Date(page.last_seen_at).getTime()) / (1000 * 60 * 60 * 24)
      : 999;

    // Beräkna prioritet
    const priority = calculatePriority(
      page.senaste_score || 50,
      prevScore,
      {
        lcp: page.senaste_lcp || 0,
        cls: page.senaste_cls || 0,
        inp: page.senaste_inp || 0,
      },
      daysSinceLastCheck
    );

    // Filtrera på threshold om satt
    if (priorityThreshold && priority < priorityThreshold) {
      continue;
    }

    pagesToCheck.push({
      url: page.url,
      priority,
      lastScore,
      daysSinceLastCheck,
    });
  }

  // Sortera efter prioritet och ta top N
  pagesToCheck.sort((a, b) => b.priority - a.priority);

  return pagesToCheck.slice(0, maxPages);
}

/**
 * Kör full check på en enskild sida
 */
async function checkPage(
  url: string,
  config: AgentConfig
): Promise<{
  success: boolean;
  score: number;
  vitals?: any;
  issues: any;
  suggestions: Array<{ action: string; impact: 'low' | 'medium' | 'high' }>;
  error?: string;
}> {
  try {
    // Hämta HTML
    const fetchResult = await fetchUrl({ url });

    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: fetchResult.error || 'Failed to fetch HTML',
      };
    }

    // On-page analys
    const onPageResult = analyzeOnPage(fetchResult.html, url);

    // PSI audit
    const psiResult = await psiAudit(url, config.psiApiKey, 'mobile');

    if (!psiResult.success) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: psiResult.error || 'PSI audit failed',
      };
    }

    // GSC data (optional)
    let gscMetrics;
    if (config.gscAccessToken && config.gscSiteUrl) {
      try {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split('T')[0];

        const gscData = await gscPageData(
          config.gscSiteUrl,
          url,
          config.gscAccessToken,
          startDate,
          endDate
        );

        if (gscData && gscData.impressions > 10) {
          gscMetrics = {
            ctr: gscData.ctr,
            position: gscData.position,
            impressions: gscData.impressions,
          };
        }
      } catch (error) {
        console.error('GSC error (non-fatal):', error);
      }
    }

    // Beräkna total score
    const scoreBreakdown = calculateSEOScore(
      onPageResult,
      psiResult.vitals,
      gscMetrics
    );

    // Generera förslag
    const onPageSuggestions = generateOnPageSuggestions(onPageResult, url);
    const psiSuggestions = psiResult.issues.map(issue => ({
      action: issue.title + ': ' + issue.description,
      impact: issue.impact || 'medium',
    }));

    const allSuggestions = [...onPageSuggestions, ...psiSuggestions];

    return {
      success: true,
      score: scoreBreakdown.total,
      vitals: psiResult.vitals,
      issues: {
        onPage: onPageResult.issues,
        psi: psiResult.issues,
        scoreBreakdown,
      },
      suggestions: allSuggestions,
    };

  } catch (error) {
    return {
      success: false,
      score: 0,
      issues: {},
      suggestions: [],
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
