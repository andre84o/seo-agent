// API Route: AI SEO Analys för specifik sida
// POST /api/seo/analyze-page

import { NextRequest, NextResponse } from 'next/server';
import { analyzePageWithAI } from '@/lib/ai/openai-client';
import { gscPageData } from '@/lib/mcp/gsc-top-queries';
import { getPageAnalytics } from '@/lib/analytics/google-analytics';
import { fetchUrl } from '@/lib/mcp/fetch-url';
import { psiAudit } from '@/lib/mcp/psi-audit';
import { analyzeOnPage } from '@/lib/seo/on-page-analysis';
import { getSetting } from '@/lib/db/settings';
import { 
  getPageByUrl, 
  createAIAnalysis, 
  createSuggestion,
  createTask 
} from '@/lib/db/operations';
import * as cheerio from 'cheerio';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minut för AI-analys

/**
 * POST /api/seo/analyze-page
 * Kör AI-driven SEO-analys på en specifik sida
 * 
 * Body:
 * {
 *   url: string,
 *   createTasks?: boolean, // Auto-skapa tasks från AI-suggestions
 *   language?: string
 * }
 */
export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Hämta API-nycklar från settings/env
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const psiApiKey = await getSetting('psi_api_key', 'PSI_API_KEY', true);
    const gscAccessToken = await getSetting('gsc_access_token', 'GSC_ACCESS_TOKEN', true);
    const gscSiteUrl = await getSetting('gsc_site_url', 'GSC_SITE_URL');
    const gaPropertyId = await getSetting('ga_property_id', 'GA_PROPERTY_ID');

    // Validera OpenAI API-nyckel
    if (!openaiApiKey) {
      return NextResponse.json(
        { 
          error: 'OpenAI API-nyckel saknas. Lägg till OPENAI_API_KEY i .env.local.',
          success: false 
        },
        { status: 400 }
      );
    }

    // Parsa request body
    const body = await request.json();
    const { url, createTasks = false, language = 'svenska' } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL saknas', success: false },
        { status: 400 }
      );
    }

    // Validera URL
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Ogiltig URL format', success: false },
        { status: 400 }
      );
    }

    console.log(`[AI SEO] Starting analysis for ${url}`);

    // Hämta page från DB
    const page = await getPageByUrl(url);
    if (!page) {
      return NextResponse.json(
        { error: 'Sida inte hittad i databasen. Kör agent först.', success: false },
        { status: 404 }
      );
    }

    // Samla in data från olika källor
    const dataGatheringPromises = [];

    // 1. Hämta HTML och analysera on-page
    console.log('[AI SEO] Fetching page HTML...');
    const htmlPromise = fetchUrl({ url }).then(async (fetchResult) => {
      if (!fetchResult.success || !fetchResult.html) {
        throw new Error('Kunde inte hämta sidans HTML');
      }
      
      const $ = cheerio.load(fetchResult.html);
      const onPageAnalysis = analyzeOnPage(fetchResult.html, url);
      
      return {
        html: fetchResult.html,
        onPage: onPageAnalysis,
        title: $('title').text() || undefined,
        metaDescription: $('meta[name="description"]').attr('content') || undefined,
        h1: $('h1').first().text() || undefined,
        contentLength: $('body').text().length,
      };
    });
    dataGatheringPromises.push(htmlPromise);

    // 2. GSC data (om tillgängligt)
    let gscPromise: Promise<any> = Promise.resolve(null);
    if (gscAccessToken && gscSiteUrl) {
      console.log('[AI SEO] Fetching GSC data...');
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      
      gscPromise = gscPageData(gscSiteUrl, url, gscAccessToken, startDate, endDate)
        .catch(err => {
          console.warn('[AI SEO] GSC data error (non-fatal):', err);
          return null;
        });
      dataGatheringPromises.push(gscPromise);
    }

    // 3. PageSpeed Insights (om tillgängligt)
    let psiPromise: Promise<any> = Promise.resolve(null);
    if (psiApiKey) {
      console.log('[AI SEO] Running PSI audit...');
      psiPromise = psiAudit(url, psiApiKey, 'mobile')
        .catch(err => {
          console.warn('[AI SEO] PSI audit error (non-fatal):', err);
          return null;
        });
      dataGatheringPromises.push(psiPromise);
    }

    // 4. Google Analytics (om tillgängligt)
    let analyticsPromise: Promise<any> = Promise.resolve(null);
    if (gaPropertyId) {
      console.log('[AI SEO] Fetching Analytics data...');
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0];
      
      const pagePath = new URL(url).pathname;
      analyticsPromise = getPageAnalytics(gaPropertyId, pagePath, startDate, endDate)
        .catch(err => {
          console.warn('[AI SEO] Analytics error (non-fatal):', err);
          return null;
        });
      dataGatheringPromises.push(analyticsPromise);
    }

    // Vänta på all data
    const [htmlData, gscData, psiData, analyticsData] = await Promise.all([
      htmlPromise,
      gscPromise,
      psiPromise,
      analyticsPromise,
    ]);

    console.log('[AI SEO] Data gathered, running AI analysis...');

    // Kör AI-analys
    const aiAnalysis = await analyzePageWithAI({
      url,
      currentTitle: htmlData.title,
      currentMetaDescription: htmlData.metaDescription,
      currentH1: htmlData.h1,
      contentLength: htmlData.contentLength,
      gscData: gscData || undefined,
      psiScore: psiData?.score,
      psiMetrics: psiData?.vitals,
      language,
    });

    console.log('[AI SEO] AI analysis complete');

    // Spara analys i databasen
    const analysisId = await createAIAnalysis({
      page_id: page.id,
      analysis_type: 'full_seo',
      ai_summary: aiAnalysis.summary,
      ai_score: aiAnalysis.score,
      suggestions_count: aiAnalysis.suggestions.length,
      used_gsc_data: !!gscData,
      used_analytics_data: !!analyticsData,
      used_psi_data: !!psiData,
      title_suggestions: aiAnalysis.titleSuggestions,
      meta_suggestions: aiAnalysis.metaDescriptionSuggestions,
      faq_suggestions: aiAnalysis.faqSuggestions,
      content_outline: aiAnalysis.contentOutline,
      keywords: aiAnalysis.keywords,
      full_response: aiAnalysis,
      model_used: 'gpt-4o',
      analysis_duration_ms: Date.now() - startTime,
    });

    // Skapa suggestions i databasen
    const createdSuggestions = [];
    for (const suggestion of aiAnalysis.suggestions) {
      const suggestionId = await createSuggestion({
        url,
        action: `${suggestion.type}: ${suggestion.suggestion}`,
        impact: suggestion.priority, // map priority to impact
        status: 'pending',
      });
      
      createdSuggestions.push({
        id: suggestionId,
        ...suggestion,
      });
    }

    // Auto-skapa tasks om requested
    const createdTasks = [];
    if (createTasks) {
      console.log('[AI SEO] Creating tasks from AI suggestions...');
      
      for (const suggestion of createdSuggestions) {
        const taskId = await createTask({
          page_id: page.id,
          suggestion_id: suggestion.id,
          title: suggestion.suggestion.slice(0, 500),
          description: suggestion.reasoning,
          task_type: suggestion.type,
          priority: suggestion.priority,
          status: 'todo',
          ai_generated: true,
          expected_impact: suggestion.expectedImpact,
          effort_estimate: suggestion.priority === 'high' ? 'medium' : 'small',
        });
        
        createdTasks.push({ id: taskId });
      }
    }

    const duration = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      analysisId,
      duration,
      analysis: aiAnalysis,
      dataUsed: {
        gsc: !!gscData,
        analytics: !!analyticsData,
        psi: !!psiData,
      },
      suggestions: createdSuggestions,
      tasks: createdTasks,
    });

  } catch (error) {
    console.error('[AI SEO] Analysis error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
