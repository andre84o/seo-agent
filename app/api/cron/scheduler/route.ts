// API Route: Samlad schemaläggare för cron
// Kör agenten dagligen och retention cleanup en gång i veckan

import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent';
import { runRetentionCleanup } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 min

/**
 * GET /api/cron/scheduler
 * En enda endpoint som: 
 * - Varje dag kör SEO-agenten
 * - Varje söndag kör retention cleanup
 */
export async function GET(request: NextRequest) {
  try {
    // Validera cron-secret i prod
    const authHeader = request.headers.get('authorization');
    if (process.env.NODE_ENV === 'production') {
      if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const now = new Date();
    const day = now.getUTCDay(); // 0 = Sunday

    // Kör agent dagligen
    if (!process.env.SITE_URL) {
      return NextResponse.json({ error: 'SITE_URL not configured' }, { status: 500 });
    }
    if (!process.env.PSI_API_KEY) {
      return NextResponse.json({ error: 'PSI_API_KEY not configured' }, { status: 500 });
    }

    const agentResult = await runAgent({
      siteUrl: process.env.SITE_URL,
      sitemapUrl: process.env.SITEMAP_URL,
      psiApiKey: process.env.PSI_API_KEY,
      gscAccessToken: process.env.GSC_ACCESS_TOKEN,
      gscSiteUrl: process.env.GSC_SITE_URL,
      maxPagesToCheck: parseInt(process.env.MAX_PAGES_PER_RUN || '20'),
    });

    let weeklyResult: any = null;
    if (day === 0) {
      // Söndag: kör retention cleanup
      weeklyResult = await runRetentionCleanup();
    }

    return NextResponse.json({
      success: true,
      message: 'Scheduler run completed',
      agent: agentResult,
      weekly: weeklyResult,
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
