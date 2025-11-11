// On-Page SEO Analysis
// Analyserar HTML för SEO-faktorer: title, meta, h1, canonical, images

import * as cheerio from 'cheerio';

export interface OnPageIssue {
  type: 'title' | 'meta-description' | 'h1' | 'canonical' | 'images' | 'other';
  severity: 'low' | 'medium' | 'high';
  message: string;
  current?: string;
  recommendation?: string;
}

export interface OnPageResult {
  title?: string;
  titleLength: number;
  metaDescription?: string;
  metaDescriptionLength: number;
  h1Tags: string[];
  h1Count: number;
  canonical?: string;
  totalImages: number;
  imagesWithAlt: number;
  imagesWithoutAlt: number;
  altCoverage: number; // procent
  issues: OnPageIssue[];
  score: number; // 0-100
}

/**
 * Analyserar HTML för on-page SEO faktorer
 * @param html - HTML innehåll att analysera
 * @param url - URL för canonical check
 * @returns On-page analys resultat
 */
export function analyzeOnPage(html: string, url: string): OnPageResult {
  const $ = cheerio.load(html);
  const issues: OnPageIssue[] = [];

  // Analysera Title
  const title = $('title').first().text().trim();
  const titleLength = title.length;

  if (!title) {
    issues.push({
      type: 'title',
      severity: 'high',
      message: 'Missing title tag',
      recommendation: 'Add a descriptive title tag (50-60 characters)',
    });
  } else if (titleLength < 30) {
    issues.push({
      type: 'title',
      severity: 'medium',
      message: 'Title too short',
      current: `${titleLength} characters`,
      recommendation: 'Title should be 50-60 characters for optimal display',
    });
  } else if (titleLength > 70) {
    issues.push({
      type: 'title',
      severity: 'medium',
      message: 'Title too long',
      current: `${titleLength} characters`,
      recommendation: 'Title should be 50-60 characters to avoid truncation',
    });
  }

  // Analysera Meta Description
  const metaDescription = $('meta[name="description"]').attr('content')?.trim() || '';
  const metaDescriptionLength = metaDescription.length;

  if (!metaDescription) {
    issues.push({
      type: 'meta-description',
      severity: 'high',
      message: 'Missing meta description',
      recommendation: 'Add a compelling meta description (140-160 characters)',
    });
  } else if (metaDescriptionLength < 120) {
    issues.push({
      type: 'meta-description',
      severity: 'medium',
      message: 'Meta description too short',
      current: `${metaDescriptionLength} characters`,
      recommendation: 'Meta description should be 140-160 characters',
    });
  } else if (metaDescriptionLength > 170) {
    issues.push({
      type: 'meta-description',
      severity: 'low',
      message: 'Meta description too long',
      current: `${metaDescriptionLength} characters`,
      recommendation: 'Meta description should be 140-160 characters to avoid truncation',
    });
  }

  // Analysera H1
  const h1Tags: string[] = [];
  $('h1').each((_, el) => {
    const text = $(el).text().trim();
    if (text) h1Tags.push(text);
  });

  const h1Count = h1Tags.length;

  if (h1Count === 0) {
    issues.push({
      type: 'h1',
      severity: 'high',
      message: 'Missing H1 tag',
      recommendation: 'Add exactly one H1 tag that matches page intent',
    });
  } else if (h1Count > 1) {
    issues.push({
      type: 'h1',
      severity: 'medium',
      message: 'Multiple H1 tags found',
      current: `${h1Count} H1 tags`,
      recommendation: 'Use only one H1 tag per page',
    });
  }

  // Analysera Canonical
  const canonical = $('link[rel="canonical"]').attr('href')?.trim();

  if (!canonical) {
    issues.push({
      type: 'canonical',
      severity: 'medium',
      message: 'Missing canonical tag',
      recommendation: 'Add a canonical tag to prevent duplicate content issues',
    });
  }

  // Analysera Images och Alt text
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;

  $('img').each((_, el) => {
    totalImages++;
    const alt = $(el).attr('alt');

    if (alt !== undefined && alt.trim() !== '') {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  });

  const altCoverage = totalImages > 0 ? (imagesWithAlt / totalImages) * 100 : 100;

  if (altCoverage < 80 && totalImages > 0) {
    issues.push({
      type: 'images',
      severity: altCoverage < 50 ? 'high' : 'medium',
      message: 'Low alt text coverage',
      current: `${altCoverage.toFixed(0)}% coverage (${imagesWithAlt}/${totalImages} images)`,
      recommendation: 'Add descriptive alt text to at least 80% of images',
    });
  }

  // Beräkna score
  const score = calculateOnPageScore({
    titleLength,
    metaDescriptionLength,
    h1Count,
    hasCanonical: !!canonical,
    altCoverage,
  });

  return {
    title,
    titleLength,
    metaDescription,
    metaDescriptionLength,
    h1Tags,
    h1Count,
    canonical,
    totalImages,
    imagesWithAlt,
    imagesWithoutAlt,
    altCoverage: parseFloat(altCoverage.toFixed(2)),
    issues,
    score,
  };
}

/**
 * Beräknar on-page score (0-100)
 */
function calculateOnPageScore(params: {
  titleLength: number;
  metaDescriptionLength: number;
  h1Count: number;
  hasCanonical: boolean;
  altCoverage: number;
}): number {
  let score = 100;

  // Title scoring (25 poäng)
  if (params.titleLength === 0) {
    score -= 25;
  } else if (params.titleLength < 30 || params.titleLength > 70) {
    score -= 10;
  } else if (params.titleLength >= 50 && params.titleLength <= 60) {
    // Perfect length
    score += 0;
  } else {
    score -= 5;
  }

  // Meta description scoring (20 poäng)
  if (params.metaDescriptionLength === 0) {
    score -= 20;
  } else if (
    params.metaDescriptionLength < 120 ||
    params.metaDescriptionLength > 170
  ) {
    score -= 10;
  } else if (
    params.metaDescriptionLength >= 140 &&
    params.metaDescriptionLength <= 160
  ) {
    // Perfect length
    score += 0;
  } else {
    score -= 5;
  }

  // H1 scoring (20 poäng)
  if (params.h1Count === 0) {
    score -= 20;
  } else if (params.h1Count === 1) {
    // Perfect
    score += 0;
  } else {
    score -= 10;
  }

  // Canonical scoring (15 poäng)
  if (!params.hasCanonical) {
    score -= 15;
  }

  // Alt coverage scoring (20 poäng)
  if (params.altCoverage < 50) {
    score -= 20;
  } else if (params.altCoverage < 80) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Genererar actionable förslag från on-page issues
 */
export function generateOnPageSuggestions(
  result: OnPageResult,
  url: string
): Array<{
  action: string;
  impact: 'low' | 'medium' | 'high';
}> {
  const suggestions: Array<{
    action: string;
    impact: 'low' | 'medium' | 'high';
  }> = [];

  for (const issue of result.issues) {
    suggestions.push({
      action: `${issue.message}${
        issue.recommendation ? `: ${issue.recommendation}` : ''
      }`,
      impact: issue.severity,
    });
  }

  return suggestions;
}
