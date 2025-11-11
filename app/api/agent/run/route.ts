// API Route: Kör SEO-agenten manuellt
// POST /api/agent/run

import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent';

export const runtime = 'nodejs';
export const maxDuration = 300; // 5 minuter för Vercel Pro

/**
 * POST /api/agent/run
 * Kör SEO-agenten manuellt
 *
 * Body:
 * {
 *   siteUrl: string,
 *   sitemapUrl?: string,
 *   maxPages?: number
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Validera miljövariabler
    if (!process.env.PSI_API_KEY) {
      return NextResponse.json(
        { error: 'PSI_API_KEY not configured' },
        { status: 500 }
      );
    }

    // Parsa request body
    const body = await request.json();
    const { siteUrl, sitemapUrl, maxPages } = body;

    if (!siteUrl) {
      return NextResponse.json(
        { error: 'siteUrl is required' },
        { status: 400 }
      );
    }

    // Validera URL format
    try {
      new URL(siteUrl);
    } catch {
      return NextResponse.json(
        { error: 'Invalid siteUrl format' },
        { status: 400 }
      );
    }

    // Kör agenten
    console.log(`[API] Starting agent run for ${siteUrl}`);

    const result = await runAgent({
      siteUrl,
      sitemapUrl,
      psiApiKey: process.env.PSI_API_KEY,
      gscAccessToken: process.env.GSC_ACCESS_TOKEN,
      gscSiteUrl: process.env.GSC_SITE_URL,
      maxPagesToCheck: maxPages || 20,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });

  } catch (error) {
    console.error('[API] Agent run error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
