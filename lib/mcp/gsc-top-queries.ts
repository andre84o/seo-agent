// gsc_top_queries - MCP verktyg för Google Search Console API
// Hämtar top queries och performance data

import axios from 'axios';

export interface GSCQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GSCPageData {
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
  topQueries?: GSCQuery[];
}

export interface GSCTopQueriesResult {
  success: boolean;
  siteUrl: string;
  data: GSCPageData[];
  totalRows: number;
  startDate: string;
  endDate: string;
  error?: string;
}

/**
 * Hämtar top queries från Google Search Console
 * @param siteUrl - Verified site URL i GSC (e.g. 'https://example.com')
 * @param accessToken - OAuth2 access token
 * @param startDate - Start datum (YYYY-MM-DD)
 * @param endDate - Slut datum (YYYY-MM-DD)
 * @param rowLimit - Max antal rader att hämta
 * @returns GSC query data
 */
export async function gscTopQueries(
  siteUrl: string,
  accessToken: string,
  startDate: string,
  endDate: string,
  rowLimit = 1000
): Promise<GSCTopQueriesResult> {
  try {
    // Bygg API request
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;

    const requestBody = {
      startDate,
      endDate,
      dimensions: ['page', 'query'],
      rowLimit,
      startRow: 0,
    };

    // Gör request
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    // Processera resultat
    const rows = response.data.rows || [];
    const pageMap = new Map<string, GSCPageData>();

    for (const row of rows) {
      const [page, query] = row.keys;
      const { clicks, impressions, ctr, position } = row;

      if (!pageMap.has(page)) {
        pageMap.set(page, {
          page,
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
          topQueries: [],
        });
      }

      const pageData = pageMap.get(page)!;
      pageData.clicks += clicks;
      pageData.impressions += impressions;

      pageData.topQueries!.push({
        query,
        clicks,
        impressions,
        ctr,
        position,
      });
    }

    // Beräkna aggregerade värden och sortera queries
    const data: GSCPageData[] = Array.from(pageMap.values()).map(pageData => {
      // Sortera queries efter clicks
      pageData.topQueries!.sort((a, b) => b.clicks - a.clicks);

      // Beräkna genomsnittlig CTR och position
      const totalQueries = pageData.topQueries!.length;
      pageData.ctr = pageData.clicks / pageData.impressions;
      pageData.position =
        pageData.topQueries!.reduce((sum, q) => sum + q.position, 0) / totalQueries;

      return pageData;
    });

    // Sortera sidor efter clicks
    data.sort((a, b) => b.clicks - a.clicks);

    return {
      success: true,
      siteUrl,
      data,
      totalRows: data.length,
      startDate,
      endDate,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          siteUrl,
          data: [],
          totalRows: 0,
          startDate,
          endDate,
          error: `GSC API error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`,
        };
      }
    }

    return {
      success: false,
      siteUrl,
      data: [],
      totalRows: 0,
      startDate,
      endDate,
      error: error instanceof Error ? error.message : 'Unknown GSC error',
    };
  }
}

/**
 * Hittar sidor med låg CTR nära topp 10
 * @param gscData - GSC data från gscTopQueries
 * @param minPosition - Min position för att inkluderas (default 15)
 * @param maxPosition - Max position för att inkluderas (default 1)
 * @param ctrThreshold - CTR under detta värde flaggas (default 0.05 = 5%)
 * @returns Filtrerade sidor med låg CTR
 */
export function findLowCtrPages(
  gscData: GSCPageData[],
  minPosition = 1,
  maxPosition = 15,
  ctrThreshold = 0.05
): GSCPageData[] {
  return gscData.filter(
    page =>
      page.position >= minPosition &&
      page.position <= maxPosition &&
      page.ctr < ctrThreshold &&
      page.impressions > 10 // Minst 10 impressions för att vara relevant
  );
}

/**
 * OAuth2 token refresh
 * @param refreshToken - Refresh token från OAuth2 flow
 * @param clientId - Google OAuth2 client ID
 * @param clientSecret - Google OAuth2 client secret
 * @returns Ny access token
 */
export async function refreshGSCToken(
  refreshToken: string,
  clientId: string,
  clientSecret: string
): Promise<string> {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    });

    return response.data.access_token;
  } catch (error) {
    throw new Error(
      `Failed to refresh GSC token: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
}

/**
 * Hämtar GSC data för en specifik sida/URL
 * @param siteUrl - Verified site URL i GSC
 * @param pageUrl - Specifik page URL att hämta data för
 * @param accessToken - OAuth2 access token
 * @param startDate - Start datum
 * @param endDate - Slut datum
 * @returns GSC data för sidan
 */
export async function gscPageData(
  siteUrl: string,
  pageUrl: string,
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<GSCPageData | null> {
  try {
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;

    const requestBody = {
      startDate,
      endDate,
      dimensions: ['query'],
      dimensionFilterGroups: [
        {
          filters: [
            {
              dimension: 'page',
              expression: pageUrl,
              operator: 'equals',
            },
          ],
        },
      ],
      rowLimit: 100,
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const rows = response.data.rows || [];

    if (rows.length === 0) {
      return null;
    }

    const topQueries: GSCQuery[] = rows.map((row: any) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position,
    }));

    // Beräkna totaler
    const totalClicks = topQueries.reduce((sum, q) => sum + q.clicks, 0);
    const totalImpressions = topQueries.reduce((sum, q) => sum + q.impressions, 0);
    const avgPosition =
      topQueries.reduce((sum, q) => sum + q.position, 0) / topQueries.length;

    return {
      page: pageUrl,
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalClicks / totalImpressions,
      position: avgPosition,
      topQueries,
    };

  } catch (error) {
    console.error('Error fetching GSC page data:', error);
    return null;
  }
}
