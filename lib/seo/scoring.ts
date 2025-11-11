// SEO Scoring System
// Kombinerar on-page, Core Web Vitals och GSC data för total score

import type { OnPageResult } from './on-page-analysis';
import type { CoreWebVitals } from '../mcp/psi-audit';

export interface ScoringWeights {
  onPage: number; // 0-1, default 0.4
  vitals: number; // 0-1, default 0.5
  gsc: number; // 0-1, default 0.1
}

export interface GSCMetrics {
  ctr: number;
  position: number;
  impressions: number;
}

export interface ScoreBreakdown {
  total: number; // 0-100
  onPageScore: number;
  vitalsScore: number;
  gscScore: number;
  issues: Array<{
    category: 'on-page' | 'vitals' | 'gsc';
    severity: 'low' | 'medium' | 'high';
    message: string;
  }>;
}

const DEFAULT_WEIGHTS: ScoringWeights = {
  onPage: 0.4,
  vitals: 0.5,
  gsc: 0.1,
};

/**
 * Beräknar total SEO score
 * @param onPageResult - On-page analys resultat
 * @param vitals - Core Web Vitals från PSI
 * @param gscMetrics - Google Search Console metrics (optional)
 * @param weights - Viktning av olika faktorer
 * @returns Score breakdown
 */
export function calculateSEOScore(
  onPageResult: OnPageResult,
  vitals?: CoreWebVitals,
  gscMetrics?: GSCMetrics,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): ScoreBreakdown {
  const issues: ScoreBreakdown['issues'] = [];

  // On-page score (redan beräknad)
  const onPageScore = onPageResult.score;

  // Lägg till on-page issues
  for (const issue of onPageResult.issues) {
    issues.push({
      category: 'on-page',
      severity: issue.severity,
      message: issue.message,
    });
  }

  // Core Web Vitals score
  let vitalsScore = 100;

  if (vitals) {
    // LCP scoring
    if (vitals.lcp > 4.0) {
      vitalsScore -= 30;
      issues.push({
        category: 'vitals',
        severity: 'high',
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`,
      });
    } else if (vitals.lcp > 2.5) {
      vitalsScore -= 15;
      issues.push({
        category: 'vitals',
        severity: 'medium',
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`,
      });
    }

    // CLS scoring
    if (vitals.cls > 0.25) {
      vitalsScore -= 30;
      issues.push({
        category: 'vitals',
        severity: 'high',
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`,
      });
    } else if (vitals.cls > 0.1) {
      vitalsScore -= 15;
      issues.push({
        category: 'vitals',
        severity: 'medium',
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`,
      });
    }

    // INP scoring
    if (vitals.inp > 500) {
      vitalsScore -= 20;
      issues.push({
        category: 'vitals',
        severity: 'high',
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`,
      });
    } else if (vitals.inp > 200) {
      vitalsScore -= 10;
      issues.push({
        category: 'vitals',
        severity: 'medium',
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`,
      });
    }

    vitalsScore = Math.max(0, vitalsScore);
  } else {
    // Om vi inte har vitals data, använd neutral score
    vitalsScore = 50;
  }

  // GSC score (baserat på CTR och position)
  let gscScore = 100;

  if (gscMetrics && gscMetrics.impressions > 10) {
    // CTR scoring
    const expectedCtr = calculateExpectedCtr(gscMetrics.position);
    const ctrRatio = gscMetrics.ctr / expectedCtr;

    if (ctrRatio < 0.5) {
      gscScore -= 40;
      issues.push({
        category: 'gsc',
        severity: 'high',
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (expected ~${(
          expectedCtr * 100
        ).toFixed(2)}% for position ${gscMetrics.position.toFixed(1)})`,
      });
    } else if (ctrRatio < 0.8) {
      gscScore -= 20;
      issues.push({
        category: 'gsc',
        severity: 'medium',
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (below expected for position ${gscMetrics.position.toFixed(1)})`,
      });
    }

    // Position scoring (incentivize improvement to top 3)
    if (gscMetrics.position > 10) {
      gscScore -= 30;
    } else if (gscMetrics.position > 5) {
      gscScore -= 15;
    } else if (gscMetrics.position > 3) {
      gscScore -= 5;
    }

    gscScore = Math.max(0, gscScore);
  } else {
    // Om vi inte har GSC data, använd neutral score
    gscScore = 50;
  }

  // Beräkna weighted total score
  const total = Math.round(
    onPageScore * weights.onPage +
      vitalsScore * weights.vitals +
      gscScore * weights.gsc
  );

  return {
    total,
    onPageScore,
    vitalsScore,
    gscScore,
    issues,
  };
}

/**
 * Beräknar förväntad CTR baserat på position
 * Data från branschstudier (approximation)
 */
function calculateExpectedCtr(position: number): number {
  if (position <= 1) return 0.3;
  if (position <= 2) return 0.15;
  if (position <= 3) return 0.1;
  if (position <= 5) return 0.06;
  if (position <= 10) return 0.03;
  return 0.01;
}

/**
 * Bestämmer prioritet baserat på score och trend
 * @param currentScore - Nuvarande score
 * @param previousScore - Tidigare score (optional)
 * @param vitals - Core Web Vitals
 * @param daysSinceLastCheck - Dagar sedan senaste check
 * @returns Priority weight (högre = mer urgent)
 */
export function calculatePriority(
  currentScore: number,
  previousScore: number | null,
  vitals: CoreWebVitals | undefined,
  daysSinceLastCheck: number
): number {
  let priority = 0;

  // Bas prioritet från score (lägre score = högre prio)
  priority += (100 - currentScore) * 0.5;

  // Trend prioritet (försämring ger högre prio)
  if (previousScore !== null) {
    const scoreDiff = currentScore - previousScore;
    if (scoreDiff < -10) {
      priority += 30; // Stor försämring
    } else if (scoreDiff < 0) {
      priority += 15; // Mindre försämring
    } else if (scoreDiff > 10) {
      priority -= 10; // Förbättring, minska prio
    }
  }

  // Vitals prioritet (dåliga vitals ger högre prio)
  if (vitals) {
    if (vitals.lcp > 4.0) priority += 20;
    if (vitals.cls > 0.25) priority += 20;
    if (vitals.inp > 500) priority += 15;
  }

  // Tid sedan senaste check (äldre checks ger högre prio)
  if (daysSinceLastCheck > 7) {
    priority += 10;
  } else if (daysSinceLastCheck > 14) {
    priority += 20;
  }

  return Math.max(0, priority);
}

/**
 * Flaggar sidor som behöver omedelbar uppmärksamhet
 * @param score - Total score
 * @param vitals - Core Web Vitals
 * @param scoreDiff - Förändring i score sedan förra
 * @returns True om sidan ska flaggas
 */
export function shouldFlagPage(
  score: number,
  vitals: CoreWebVitals | undefined,
  scoreDiff: number | null
): boolean {
  // Flagga om score faller mer än 10 poäng
  if (scoreDiff !== null && scoreDiff < -10) {
    return true;
  }

  // Flagga om LCP över 2.5s
  if (vitals && vitals.lcp > 2.5) {
    return true;
  }

  // Flagga om CLS över 0.1
  if (vitals && vitals.cls > 0.1) {
    return true;
  }

  // Flagga om INP över 200ms
  if (vitals && vitals.inp > 200) {
    return true;
  }

  // Flagga om total score under 40
  if (score < 40) {
    return true;
  }

  return false;
}
