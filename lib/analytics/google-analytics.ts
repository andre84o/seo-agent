// Google Analytics API Integration
// Hämtar trafikdata och användarstatistik

import { google } from 'googleapis';

export interface AnalyticsData {
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
  conversions?: number;
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export interface AnalyticsPageData {
  pagePath: string;
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
}

/**
 * Hämtar Analytics data för en specifik sida
 */
export async function getPageAnalytics(
  propertyId: string,
  pagePath: string,
  startDate: string,
  endDate: string,
  credentials?: unknown
): Promise<AnalyticsData | null> {
  try {
    // Google Analytics Data API v1 (GA4)
    const analyticsData = google.analyticsdata('v1beta');

    // Autentisering
    const auth = credentials
      ? new google.auth.GoogleAuth({
          credentials: credentials as never,
          scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        })
      : new google.auth.GoogleAuth({
          scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });

    const authClient = await auth.getClient();

    // Hämta data
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
        dimensionFilter: {
          filter: {
            fieldName: 'pagePath',
            stringFilter: {
              matchType: 'EXACT',
              value: pagePath,
            },
          },
        },
      },
      auth: authClient as never,
    });

    const rows = response.data.rows;
    if (!rows || rows.length === 0) {
      return null;
    }

    const row = rows[0];
    const metricValues = row.metricValues || [];

    return {
      pageviews: parseInt(metricValues[0]?.value || '0'),
      uniquePageviews: parseInt(metricValues[1]?.value || '0'),
      avgTimeOnPage: parseFloat(metricValues[2]?.value || '0'),
      bounceRate: parseFloat(metricValues[3]?.value || '0'),
      exitRate: 0, // GA4 beräknar inte exitRate på samma sätt
      dateRange: { startDate, endDate },
    };
  } catch (error) {
    console.error('[Analytics] Error fetching page data:', error);
    return null;
  }
}

/**
 * Hämtar top pages från Analytics
 */
export async function getTopPages(
  propertyId: string,
  startDate: string,
  endDate: string,
  limit = 50,
  credentials?: unknown
): Promise<AnalyticsPageData[]> {
  try {
    const analyticsData = google.analyticsdata('v1beta');

    const auth = credentials
      ? new google.auth.GoogleAuth({
          credentials: credentials as never,
          scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        })
      : new google.auth.GoogleAuth({
          scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
        });

    const authClient = await auth.getClient();

    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'averageSessionDuration' },
          { name: 'bounceRate' },
        ],
        orderBys: [
          {
            metric: {
              metricName: 'screenPageViews',
            },
            desc: true,
          },
        ],
        limit: limit.toString(),
      },
      auth: authClient as never,
    });

    const rows = response.data.rows || [];

    return rows.map((row: any) => {
      const dimensionValues = row.dimensionValues || [];
      const metricValues = row.metricValues || [];

      return {
        pagePath: dimensionValues[0]?.value || '',
        pageviews: parseInt(metricValues[0]?.value || '0'),
        uniquePageviews: parseInt(metricValues[1]?.value || '0'),
        avgTimeOnPage: parseFloat(metricValues[2]?.value || '0'),
        bounceRate: parseFloat(metricValues[3]?.value || '0'),
      };
    });
  } catch (error) {
    console.error('[Analytics] Error fetching top pages:', error);
    return [];
  }
}

/**
 * Kombinerar GSC + Analytics data för en komplett bild
 */
export interface CombinedPageData {
  url: string;
  // GSC data
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries: Array<{ query: string; clicks: number }>;
  // Analytics data
  pageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  // Beräknat
  searchVsDirectRatio: number; // clicks / pageviews
  engagementScore: number; // baserat på time + bounce
}

export function combineGSCAndAnalytics(
  gscData: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries?: Array<{ query: string; clicks: number }>;
  },
  analyticsData: AnalyticsData | null
): Partial<CombinedPageData> {
  const combined: Partial<CombinedPageData> = {
    clicks: gscData.clicks,
    impressions: gscData.impressions,
    ctr: gscData.ctr,
    position: gscData.position,
    topQueries: gscData.topQueries?.slice(0, 5) || [],
  };

  if (analyticsData) {
    combined.pageviews = analyticsData.pageviews;
    combined.avgTimeOnPage = analyticsData.avgTimeOnPage;
    combined.bounceRate = analyticsData.bounceRate;

    // Beräkna metrics
    combined.searchVsDirectRatio =
      analyticsData.pageviews > 0 ? gscData.clicks / analyticsData.pageviews : 0;

    // Engagement score: hög tid + låg bounce = bra
    const timeScore = Math.min(analyticsData.avgTimeOnPage / 180, 1); // Max 3 min
    const bounceScore = 1 - analyticsData.bounceRate / 100;
    combined.engagementScore = (timeScore + bounceScore) / 2;
  }

  return combined;
}
