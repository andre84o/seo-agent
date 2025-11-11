// psi_audit - MCP verktyg för PageSpeed Insights API
// Hämtar Lighthouse score och Core Web Vitals

import axios from 'axios';

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint (sekunder)
  cls: number; // Cumulative Layout Shift
  inp: number; // Interaction to Next Paint (millisekunder)
  fcp?: number; // First Contentful Paint (sekunder)
  ttfb?: number; // Time to First Byte (millisekunder)
}

export interface LighthouseMetrics {
  performance: number; // 0-100
  accessibility?: number;
  bestPractices?: number;
  seo?: number;
}

export interface PSIIssue {
  title: string;
  description: string;
  score?: number;
  displayValue?: string;
  impact?: 'low' | 'medium' | 'high';
}

export interface PSIAuditResult {
  success: boolean;
  url: string;
  vitals?: CoreWebVitals;
  lighthouse?: LighthouseMetrics;
  issues: PSIIssue[];
  rawData?: any; // Full PSI response
  error?: string;
  requestId?: string;
}

/**
 * Kör PageSpeed Insights audit på en URL
 * @param url - URL att analysera
 * @param apiKey - Google PageSpeed Insights API key
 * @param strategy - 'mobile' eller 'desktop'
 * @returns PSI audit resultat
 */
export async function psiAudit(
  url: string,
  apiKey: string,
  strategy: 'mobile' | 'desktop' = 'mobile'
): Promise<PSIAuditResult> {
  try {
    // Bygg API URL
    const apiUrl = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    apiUrl.searchParams.set('url', url);
    apiUrl.searchParams.set('key', apiKey);
    apiUrl.searchParams.set('strategy', strategy);
    apiUrl.searchParams.set('category', 'performance');
    apiUrl.searchParams.set('category', 'accessibility');
    apiUrl.searchParams.set('category', 'best-practices');
    apiUrl.searchParams.set('category', 'seo');

    // Gör request med längre timeout (PSI kan ta tid)
    const response = await axios.get(apiUrl.toString(), {
      timeout: 60000, // 60 sekunder
    });

    const data = response.data;

    // Extrahera Core Web Vitals
    const vitals = extractCoreWebVitals(data);

    // Extrahera Lighthouse scores
    const lighthouse = extractLighthouseScores(data);

    // Extrahera viktiga issues
    const issues = extractIssues(data);

    return {
      success: true,
      url,
      vitals,
      lighthouse,
      issues,
      rawData: data,
      requestId: data.id,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          url,
          issues: [],
          error: `PSI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`,
        };
      }

      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          url,
          issues: [],
          error: 'PSI API timeout after 60 seconds',
        };
      }
    }

    return {
      success: false,
      url,
      issues: [],
      error: error instanceof Error ? error.message : 'Unknown PSI error',
    };
  }
}

/**
 * Extraherar Core Web Vitals från PSI response
 */
function extractCoreWebVitals(data: any): CoreWebVitals | undefined {
  try {
    const metrics = data.loadingExperience?.metrics;
    const labData = data.lighthouseResult?.audits;

    if (!metrics && !labData) return undefined;

    // Field data (real user data) prioriteras
    const lcp = metrics?.LARGEST_CONTENTFUL_PAINT_MS?.percentile
      ? metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1000
      : labData?.['largest-contentful-paint']?.numericValue
      ? labData['largest-contentful-paint'].numericValue / 1000
      : 0;

    const cls = metrics?.CUMULATIVE_LAYOUT_SHIFT_SCORE?.percentile
      ? metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100
      : labData?.['cumulative-layout-shift']?.numericValue || 0;

    const inp = metrics?.INTERACTION_TO_NEXT_PAINT?.percentile
      ? metrics.INTERACTION_TO_NEXT_PAINT.percentile
      : labData?.['interaction-to-next-paint']?.numericValue || 0;

    const fcp = labData?.['first-contentful-paint']?.numericValue
      ? labData['first-contentful-paint'].numericValue / 1000
      : undefined;

    const ttfb = labData?.['server-response-time']?.numericValue || undefined;

    return {
      lcp: parseFloat(lcp.toFixed(2)),
      cls: parseFloat(cls.toFixed(4)),
      inp: parseFloat(inp.toFixed(2)),
      fcp: fcp ? parseFloat(fcp.toFixed(2)) : undefined,
      ttfb: ttfb ? parseFloat(ttfb.toFixed(2)) : undefined,
    };
  } catch (error) {
    console.error('Error extracting Core Web Vitals:', error);
    return undefined;
  }
}

/**
 * Extraherar Lighthouse scores från PSI response
 */
function extractLighthouseScores(data: any): LighthouseMetrics | undefined {
  try {
    const categories = data.lighthouseResult?.categories;
    if (!categories) return undefined;

    return {
      performance: Math.round((categories.performance?.score || 0) * 100),
      accessibility: categories.accessibility
        ? Math.round(categories.accessibility.score * 100)
        : undefined,
      bestPractices: categories['best-practices']
        ? Math.round(categories['best-practices'].score * 100)
        : undefined,
      seo: categories.seo ? Math.round(categories.seo.score * 100) : undefined,
    };
  } catch (error) {
    console.error('Error extracting Lighthouse scores:', error);
    return undefined;
  }
}

/**
 * Extraherar viktiga issues från Lighthouse audits
 */
function extractIssues(data: any): PSIIssue[] {
  const issues: PSIIssue[] = [];

  try {
    const audits = data.lighthouseResult?.audits;
    if (!audits) return issues;

    // Viktiga audits att kolla
    const importantAudits = [
      'largest-contentful-paint',
      'cumulative-layout-shift',
      'interaction-to-next-paint',
      'first-contentful-paint',
      'speed-index',
      'total-blocking-time',
      'server-response-time',
      'render-blocking-resources',
      'unminified-css',
      'unminified-javascript',
      'unused-css-rules',
      'unused-javascript',
      'modern-image-formats',
      'uses-optimized-images',
      'uses-text-compression',
      'uses-responsive-images',
    ];

    for (const auditKey of importantAudits) {
      const audit = audits[auditKey];
      if (!audit) continue;

      // Bara rapportera om score är låg (under 0.9)
      if (audit.score !== null && audit.score < 0.9) {
        issues.push({
          title: audit.title || auditKey,
          description: audit.description || '',
          score: audit.score,
          displayValue: audit.displayValue,
          impact: determineImpact(audit.score),
        });
      }
    }

    return issues;
  } catch (error) {
    console.error('Error extracting issues:', error);
    return issues;
  }
}

/**
 * Bestämmer impact level baserat på score
 */
function determineImpact(score: number): 'low' | 'medium' | 'high' {
  if (score >= 0.5) return 'low';
  if (score >= 0.3) return 'medium';
  return 'high';
}

/**
 * Batch PSI audit med rate limiting och retry
 */
export async function psiAuditBatch(
  urls: string[],
  apiKey: string,
  strategy: 'mobile' | 'desktop' = 'mobile',
  delayMs = 2000 // Delay mellan requests för att respektera rate limits
): Promise<PSIAuditResult[]> {
  const results: PSIAuditResult[] = [];

  for (const url of urls) {
    try {
      const result = await psiAudit(url, apiKey, strategy);
      results.push(result);

      // Delay mellan requests
      if (urls.indexOf(url) < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      // Exponential backoff vid fel
      if (!result.success && result.error?.includes('429')) {
        console.log('Rate limit hit, waiting 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }

    } catch (error) {
      results.push({
        success: false,
        url,
        issues: [],
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  return results;
}
