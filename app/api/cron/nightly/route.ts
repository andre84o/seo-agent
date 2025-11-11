// API Route: Nattlig cron-körning av SEO-agent
// Körs automatiskt en gång per natt via Vercel Cron

import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minuter för Vercel Pro

/**
 * GET /api/cron/nightly
 * Kör SEO-agenten automatiskt varje natt
 *
 * Vercel Cron anropar denna endpoint enligt schema i vercel.json
 */
export async function GET(request: NextRequest) {
  try {
    // Validera att det är en legitim cron-request
    const authHeader = request.headers.get('authorization');

    // I produktion bör du validera CRON_SECRET
    if (process.env.NODE_ENV === 'production') {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    // Validera miljövariabler
    if (!process.env.SITE_URL) {
      return NextResponse.json(
        { error: 'SITE_URL not configured' },
        { status: 500 }
      );
    }

    if (!process.env.PSI_API_KEY) {
      return NextResponse.json(
        { error: 'PSI_API_KEY not configured' },
        { status: 500 }
      );
    }

    console.log('[Cron] Starting nightly agent run...');

    // Kör agenten
    const result = await runAgent({
      siteUrl: process.env.SITE_URL,
      sitemapUrl: process.env.SITEMAP_URL,
      psiApiKey: process.env.PSI_API_KEY,
      gscAccessToken: process.env.GSC_ACCESS_TOKEN,
      gscSiteUrl: process.env.GSC_SITE_URL,
      maxPagesToCheck: parseInt(process.env.MAX_PAGES_PER_RUN || '20'),
    });

    console.log('[Cron] Nightly run completed successfully');
    console.log(`[Cron] Run ID: ${result.runId}`);
    console.log(`[Cron] Pages checked: ${result.pagesChecked}`);
    console.log(`[Cron] Average score: ${result.avgScore.toFixed(1)}`);

    return NextResponse.json({
      success: true,
      message: 'Nightly agent run completed',
      ...result,
    });

  } catch (error) {
    console.error('[Cron] Nightly run error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
