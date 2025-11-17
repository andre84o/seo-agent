// API Route: Pending AI Suggestions
// GET /api/tasks/pending-suggestions

import { NextResponse } from 'next/server';
import { getPendingAISuggestions } from '@/lib/db/operations';

export const runtime = 'nodejs';

/**
 * GET /api/tasks/pending-suggestions
 * Hämtar AI-suggestions som inte blivit tasks än
 */
export async function GET() {
  try {
    const suggestions = await getPendingAISuggestions();

    return NextResponse.json({
      success: true,
      suggestions,
    });

  } catch (error) {
    console.error('[API Pending Suggestions] error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
