// Content Analysis API
// GET: Hämta innehållsanalys för en sida

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/db/supabase';

// ============================================================================
// GET - Hämta innehållsanalys
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const runId = searchParams.get('run_id');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter är required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    let query = supabase
      .from('content_analysis')
      .select('*')
      .eq('url', url);

    if (runId) {
      query = query.eq('run_id', runId);
    }

    // Hämta senaste analysen
    query = query.order('created_at', { ascending: false }).limit(1);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching content analysis:', error);
      return NextResponse.json(
        { error: 'Failed to fetch content analysis' },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'No content analysis found for this URL' },
        { status: 404 }
      );
    }

    const analysis = data[0];

    return NextResponse.json({
      url,
      analysis,
      insights: {
        contentQuality: getContentQualityLevel(analysis.content_score),
        readabilityLevel: getReadabilityLevel(analysis.readability_score),
        wordCount: analysis.word_count,
        needsImprovement: analysis.improvement_areas?.length || 0
      }
    });
  } catch (error) {
    console.error('Error in GET /api/content-analysis:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getContentQualityLevel(score: number | null): string {
  if (!score) return 'Unknown';
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 60) return 'Fair';
  if (score >= 40) return 'Poor';
  return 'Very Poor';
}

function getReadabilityLevel(score: number | null): string {
  if (!score) return 'Unknown';
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}
