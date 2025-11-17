// API Route: Kör SEO-agenten manuellt
// POST /api/agent/run

import { NextRequest, NextResponse } from 'next/server';
import { runAgent } from '@/lib/agent';
import { getSetting } from '@/lib/db/settings';

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
    // Hämta inställningar (API-nycklar från .env.local, övriga från DB med fallback till .env)
    const psiApiKey = await getSetting('psi_api_key', 'PSI_API_KEY', true); // Prioritera .env.local
    const defaultSiteUrl = await getSetting('site_url', 'SITE_URL');
    const defaultSitemapUrl = await getSetting('sitemap_url', 'SITEMAP_URL');
    const gscAccessToken = await getSetting('gsc_access_token', 'GSC_ACCESS_TOKEN', true); // Prioritera .env.local
    const gscSiteUrl = await getSetting('gsc_site_url', 'GSC_SITE_URL');
    const maxPagesFromSettings = await getSetting('max_pages_per_run', 'MAX_PAGES_PER_RUN');

    // Validera PSI API-nyckel
    if (!psiApiKey) {
      return NextResponse.json(
        {
          error: 'PSI API-nyckel saknas. Lägg till PSI_API_KEY i .env.local.',
          success: false
        },
        { status: 400 }
      );
    }

    // Parsa request body
    const body = await request.json();
    const { siteUrl, sitemapUrl, maxPages } = body;

    // Använd site URL från request eller default från settings
    const finalSiteUrl = siteUrl || defaultSiteUrl;

    if (!finalSiteUrl) {
      return NextResponse.json(
        {
          error: 'Site URL saknas. Ange URL eller konfigurera i Settings.',
          success: false
        },
        { status: 400 }
      );
    }

    // Validera URL format
    try {
      new URL(finalSiteUrl);
    } catch {
      return NextResponse.json(
        { error: 'Ogiltig Site URL format', success: false },
        { status: 400 }
      );
    }

    // Kör agenten
    console.log(`[API] Starting agent run for ${finalSiteUrl}`);
    console.log(`[API] Using settings from database`);

    const result = await runAgent({
      siteUrl: finalSiteUrl,
      sitemapUrl: sitemapUrl || defaultSitemapUrl || undefined,
      psiApiKey,
      gscAccessToken: gscAccessToken || undefined,
      gscSiteUrl: gscSiteUrl || undefined,
      maxPagesToCheck: maxPages || parseInt(maxPagesFromSettings || '20'),
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
