// read_sitemap - MCP verktyg för att läsa och parsa sitemap.xml
// Stödjer både vanliga sitemaps och sitemap index

import { XMLParser } from 'fast-xml-parser';
import { fetchUrl } from './fetch-url';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

export interface ReadSitemapResult {
  success: boolean;
  urls: SitemapUrl[];
  totalUrls: number;
  error?: string;
  isSitemapIndex?: boolean;
  childSitemaps?: string[];
}

/**
 * Läser och parsar en sitemap.xml eller sitemap index
 * @param sitemapUrl - URL till sitemap.xml
 * @returns Parsed sitemap med alla URLs
 */
export async function readSitemap(sitemapUrl: string): Promise<ReadSitemapResult> {
  try {
    // Hämta sitemap innehåll
    const fetchResult = await fetchUrl({ url: sitemapUrl });

    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        urls: [],
        totalUrls: 0,
        error: fetchResult.error || 'Failed to fetch sitemap',
      };
    }

    // Parsa XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const parsed = parser.parse(fetchResult.html);

    // Kolla om det är en sitemap index
    if (parsed.sitemapindex) {
      return await parseSitemapIndex(parsed.sitemapindex, sitemapUrl);
    }

    // Vanlig sitemap
    if (parsed.urlset) {
      return parseSitemapUrlset(parsed.urlset);
    }

    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: 'Invalid sitemap format: missing urlset or sitemapindex',
    };

  } catch (error) {
    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: error instanceof Error ? error.message : 'Unknown error parsing sitemap',
    };
  }
}

/**
 * Parsar en vanlig sitemap urlset
 */
function parseSitemapUrlset(urlset: any): ReadSitemapResult {
  const urls: SitemapUrl[] = [];

  // Normalisera till array (kan vara single object)
  const urlEntries = Array.isArray(urlset.url) ? urlset.url : [urlset.url];

  for (const entry of urlEntries) {
    if (!entry || !entry.loc) continue;

    urls.push({
      loc: entry.loc,
      lastmod: entry.lastmod,
      changefreq: entry.changefreq,
      priority: entry.priority ? parseFloat(entry.priority) : undefined,
    });
  }

  return {
    success: true,
    urls,
    totalUrls: urls.length,
    isSitemapIndex: false,
  };
}

/**
 * Parsar en sitemap index och hämtar alla child sitemaps
 */
async function parseSitemapIndex(
  sitemapindex: any,
  baseUrl: string
): Promise<ReadSitemapResult> {
  const childSitemaps: string[] = [];
  const allUrls: SitemapUrl[] = [];

  // Normalisera till array
  const sitemapEntries = Array.isArray(sitemapindex.sitemap)
    ? sitemapindex.sitemap
    : [sitemapindex.sitemap];

  // Samla alla child sitemap URLs
  for (const entry of sitemapEntries) {
    if (entry && entry.loc) {
      childSitemaps.push(entry.loc);
    }
  }

  // Hämta och parsa varje child sitemap (max 10 för att inte överbelasta)
  const sitemapsToFetch = childSitemaps.slice(0, 10);

  for (const childUrl of sitemapsToFetch) {
    try {
      const result = await readSitemap(childUrl);
      if (result.success) {
        allUrls.push(...result.urls);
      }
      // Liten delay mellan requests
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching child sitemap ${childUrl}:`, error);
    }
  }

  return {
    success: true,
    urls: allUrls,
    totalUrls: allUrls.length,
    isSitemapIndex: true,
    childSitemaps,
  };
}

/**
 * Läser robots.txt och hittar sitemap URLs
 * @param domain - Domain URL (e.g. https://example.com)
 * @returns Array av sitemap URLs från robots.txt
 */
export async function findSitemapsInRobotsTxt(domain: string): Promise<string[]> {
  try {
    const robotsUrl = new URL('/robots.txt', domain).toString();
    const fetchResult = await fetchUrl({ url: robotsUrl });

    if (!fetchResult.success || !fetchResult.html) {
      return [];
    }

    const sitemaps: string[] = [];
    const lines = fetchResult.html.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith('sitemap:')) {
        const sitemapUrl = trimmed.substring(8).trim();
        if (sitemapUrl) {
          sitemaps.push(sitemapUrl);
        }
      }
    }

    return sitemaps;

  } catch (error) {
    console.error('Error reading robots.txt:', error);
    return [];
  }
}

/**
 * Auto-discover sitemap för en domain
 * Försöker hitta sitemap via robots.txt eller vanliga platser
 */
export async function discoverSitemap(domain: string): Promise<ReadSitemapResult> {
  // Försök hitta via robots.txt först
  const robotsSitemaps = await findSitemapsInRobotsTxt(domain);

  if (robotsSitemaps.length > 0) {
    return await readSitemap(robotsSitemaps[0]);
  }

  // Försök vanliga platser
  const commonPaths = [
    '/sitemap.xml',
    '/sitemap_index.xml',
    '/sitemap-index.xml',
    '/sitemap1.xml',
  ];

  for (const path of commonPaths) {
    try {
      const sitemapUrl = new URL(path, domain).toString();
      const result = await readSitemap(sitemapUrl);

      if (result.success && result.totalUrls > 0) {
        return result;
      }
    } catch (error) {
      continue;
    }
  }

  return {
    success: false,
    urls: [],
    totalUrls: 0,
    error: 'Could not discover sitemap for domain',
  };
}
