// fetch_url - MCP verktyg för att hämta HTML från en URL
// Används för on-page SEO analys

import axios, { AxiosError } from 'axios';

export interface FetchUrlOptions {
  url: string;
  timeout?: number; // i millisekunder
  userAgent?: string;
}

export interface FetchUrlResult {
  success: boolean;
  url: string;
  html?: string;
  statusCode?: number;
  error?: string;
  redirectUrl?: string;
  contentType?: string;
}

/**
 * Hämtar HTML innehåll från en URL
 * @param options - URL och optionella inställningar
 * @returns Resultat med HTML eller felmeddelande
 */
export async function fetchUrl(options: FetchUrlOptions): Promise<FetchUrlResult> {
  const {
    url,
    timeout = 30000,
    userAgent = 'SEO-Agent/1.0 (+https://yoursite.com/bot)',
  } = options;

  try {
    // Validera URL format
    const urlObj = new URL(url);
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return {
        success: false,
        url,
        error: 'Only HTTP and HTTPS protocols are supported',
      };
    }

    // Gör HTTP request
    const response = await axios.get(url, {
      timeout,
      headers: {
        'User-Agent': userAgent,
        'Accept': 'text/html,application/xhtml+xml',
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500, // Acceptera alla statuskoder under 500
    });

    // Kontrollera om det är HTML
    const contentType = response.headers['content-type'] || '';
    const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml');

    if (!isHtml) {
      return {
        success: false,
        url,
        statusCode: response.status,
        contentType,
        error: `Content-Type is not HTML: ${contentType}`,
      };
    }

    // Success!
    return {
      success: true,
      url,
      html: response.data,
      statusCode: response.status,
      contentType,
      redirectUrl: response.request?.res?.responseUrl || url,
    };

  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ECONNABORTED') {
        return {
          success: false,
          url,
          error: `Request timeout after ${timeout}ms`,
        };
      }

      if (axiosError.response) {
        return {
          success: false,
          url,
          statusCode: axiosError.response.status,
          error: `HTTP ${axiosError.response.status}: ${axiosError.response.statusText}`,
        };
      }

      if (axiosError.request) {
        return {
          success: false,
          url,
          error: 'No response received from server',
        };
      }
    }

    return {
      success: false,
      url,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Batch fetch flera URLs med rate limiting
 * @param urls - Array av URLs att hämta
 * @param concurrency - Max antal samtidiga requests
 * @returns Array av resultat
 */
export async function fetchUrlBatch(
  urls: string[],
  concurrency = 3
): Promise<FetchUrlResult[]> {
  const results: FetchUrlResult[] = [];

  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map(url => fetchUrl({ url }))
    );
    results.push(...batchResults);

    // Liten delay mellan batches för att inte överbelasta
    if (i + concurrency < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}
