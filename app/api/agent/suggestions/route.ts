// API Route: Hantera suggestions
// GET /api/agent/suggestions - Hämta suggestions
// PATCH /api/agent/suggestions - Uppdatera suggestion status

import { NextRequest, NextResponse } from 'next/server';
import { getSuggestions, updateSuggestionStatus } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * GET /api/agent/suggestions?status=pending&impact=high&url=...
 * Hämtar suggestions med filter
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters = {
      status: searchParams.get('status') || undefined,
      impact: searchParams.get('impact') || undefined,
      url: searchParams.get('url') || undefined,
    };

    // Ta bort undefined values
    Object.keys(filters).forEach(
      key => filters[key as keyof typeof filters] === undefined && delete filters[key as keyof typeof filters]
    );

    const suggestions = await getSuggestions(filters);

    return NextResponse.json({
      success: true,
      data: suggestions,
    });

  } catch (error) {
    console.error('[API] Suggestions fetch error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/agent/suggestions
 * Uppdaterar suggestion status
 *
 * Body:
 * {
 *   suggestionId: number,
 *   status: 'pending' | 'in_progress' | 'completed' | 'dismissed'
 * }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { suggestionId, status } = body;

    if (!suggestionId || !status) {
      return NextResponse.json(
        { error: 'suggestionId and status are required' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'in_progress', 'completed', 'dismissed'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      );
    }

    await updateSuggestionStatus(suggestionId, status);

    return NextResponse.json({
      success: true,
      message: 'Suggestion updated',
    });

  } catch (error) {
    console.error('[API] Suggestion update error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
