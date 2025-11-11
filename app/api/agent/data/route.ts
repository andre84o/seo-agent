// API Route: Hämta data för dashboard
// GET /api/agent/data

import { NextRequest, NextResponse } from 'next/server';
import {
  getLatestAudits,
  getWorstPagesWeek,
  getTopSuggestions,
  getRecentRuns,
  getAllPages,
} from '@/lib/db';

export const runtime = 'nodejs';

/**
 * GET /api/agent/data?type=latest|worst|suggestions|runs|pages
 * Hämtar data för dashboard
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'latest';

    switch (type) {
      case 'latest': {
        const audits = await getLatestAudits();
        return NextResponse.json({ success: true, data: audits });
      }

      case 'worst': {
        const worst = await getWorstPagesWeek();
        return NextResponse.json({ success: true, data: worst });
      }

      case 'suggestions': {
        const suggestions = await getTopSuggestions();
        return NextResponse.json({ success: true, data: suggestions });
      }

      case 'runs': {
        const limit = parseInt(searchParams.get('limit') || '10');
        const runs = await getRecentRuns(limit);
        return NextResponse.json({ success: true, data: runs });
      }

      case 'pages': {
        const pages = await getAllPages();
        return NextResponse.json({ success: true, data: pages });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('[API] Data fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
