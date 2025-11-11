// API Route: Veckovis retention och sammanfattning
// Körs automatiskt en gång per vecka via Vercel Cron

import { NextRequest, NextResponse } from 'next/server';
import { runRetentionCleanup } from '@/lib/db';

export const runtime = 'nodejs';
export const maxDuration = 60; // 1 minut

/**
 * GET /api/cron/weekly
 * Kör retention cleanup och skapar veckosammanfattningar
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

    console.log('[Cron] Starting weekly retention cleanup...');

    // Kör retention cleanup
    const result = await runRetentionCleanup();

    console.log('[Cron] Weekly cleanup completed successfully');
    console.log(`[Cron] Audits deleted: ${result.audits_deleted}`);
    console.log(`[Cron] GSC records deleted: ${result.gsc_deleted}`);

    return NextResponse.json({
      success: true,
      message: 'Weekly retention cleanup completed',
      ...result,
    });

  } catch (error) {
    console.error('[Cron] Weekly cleanup error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
