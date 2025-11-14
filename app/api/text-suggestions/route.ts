// Text Suggestions API
// GET: Hämta textförslag för en sida
// POST: Generera nya textförslag
// PATCH: Uppdatera/redigera förslag
// DELETE: Ta bort förslag

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/db/supabase';
import { generateAllSuggestions, analyzePageContent } from '@/lib/seo/content-optimizer';
import { fetchUrl } from '@/lib/mcp/fetch-url';

// ============================================================================
// GET - Hämta textförslag för en sida
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const status = searchParams.get('status'); // pending, edited, applied, dismissed
    const sectionType = searchParams.get('section_type');

    if (!url) {
      return NextResponse.json(
        { error: 'URL parameter är required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Bygg query
    let query = supabase
      .from('text_suggestions')
      .select('*')
      .eq('url', url);

    if (status) {
      query = query.eq('status', status);
    }

    if (sectionType) {
      query = query.eq('section_type', sectionType);
    }

    // Sortera: high impact först, sedan score impact
    query = query.order('impact', { ascending: false })
      .order('seo_score_impact', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching text suggestions:', error);
      return NextResponse.json(
        { error: 'Failed to fetch suggestions' },
        { status: 500 }
      );
    }

    // Gruppera per sektion
    const groupedBySection: Record<string, any[]> = {};
    data?.forEach(suggestion => {
      if (!groupedBySection[suggestion.section_type]) {
        groupedBySection[suggestion.section_type] = [];
      }
      groupedBySection[suggestion.section_type].push(suggestion);
    });

    return NextResponse.json({
      url,
      total: data?.length || 0,
      suggestions: data,
      grouped: groupedBySection
    });
  } catch (error) {
    console.error('Error in GET /api/text-suggestions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Generera nya textförslag för en sida
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, keywords, runId, forceRegenerate } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL är required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Kolla om det redan finns förslag
    if (!forceRegenerate) {
      const { data: existing } = await supabase
        .from('text_suggestions')
        .select('id')
        .eq('url', url)
        .eq('status', 'pending')
        .limit(1);

      if (existing && existing.length > 0) {
        return NextResponse.json({
          message: 'Suggestions already exist for this URL',
          existingCount: existing.length
        });
      }
    }

    // Hämta HTML från sidan
    console.log(`Fetching HTML for ${url}...`);
    const html = await fetchUrl(url);

    // Generera förslag
    console.log('Generating text suggestions...');
    const suggestions = await generateAllSuggestions(html, url, keywords || []);

    // Analysera innehåll
    console.log('Analyzing content...');
    const contentAnalysis = await analyzePageContent(html, url);

    // Spara förslag i databasen
    const suggestionsToInsert = suggestions.map(s => ({
      url,
      section_type: s.section_type,
      section_identifier: s.section_identifier,
      original_text: s.original_text,
      suggested_text: s.suggested_text,
      keywords: s.keywords,
      keyword_density: s.keyword_density,
      reason: s.reason,
      impact: s.impact,
      seo_score_impact: s.seo_score_impact,
      readability_score: s.readability_score,
      run_id: runId || null,
      status: 'pending'
    }));

    if (suggestionsToInsert.length > 0) {
      const { error: insertError } = await supabase
        .from('text_suggestions')
        .insert(suggestionsToInsert);

      if (insertError) {
        console.error('Error inserting suggestions:', insertError);
        return NextResponse.json(
          { error: 'Failed to save suggestions' },
          { status: 500 }
        );
      }
    }

    // Spara content analysis
    const { error: analysisError } = await supabase
      .from('content_analysis')
      .insert({
        url,
        run_id: runId || null,
        ...contentAnalysis
      });

    if (analysisError) {
      console.error('Error inserting content analysis:', analysisError);
    }

    return NextResponse.json({
      message: 'Text suggestions generated successfully',
      suggestionsCount: suggestions.length,
      contentScore: contentAnalysis.content_score,
      readabilityScore: contentAnalysis.readability_score,
      suggestions: suggestionsToInsert
    });
  } catch (error) {
    console.error('Error in POST /api/text-suggestions:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH - Uppdatera ett förslag (redigera eller ändra status)
// ============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, editedText, status } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Suggestion ID är required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const updates: any = {
      updated_at: new Date().toISOString()
    };

    if (editedText !== undefined) {
      updates.edited_text = editedText;
      updates.status = 'edited';
    }

    if (status) {
      updates.status = status;
      if (status === 'applied') {
        updates.applied_at = new Date().toISOString();
      }
    }

    const { data, error } = await supabase
      .from('text_suggestions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating suggestion:', error);
      return NextResponse.json(
        { error: 'Failed to update suggestion' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Suggestion updated successfully',
      suggestion: data
    });
  } catch (error) {
    console.error('Error in PATCH /api/text-suggestions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE - Ta bort förslag
// ============================================================================

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const url = searchParams.get('url');

    if (!id && !url) {
      return NextResponse.json(
        { error: 'Either ID or URL är required' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    let query = supabase.from('text_suggestions').delete();

    if (id) {
      query = query.eq('id', id);
    } else if (url) {
      query = query.eq('url', url);
    }

    const { error } = await query;

    if (error) {
      console.error('Error deleting suggestions:', error);
      return NextResponse.json(
        { error: 'Failed to delete suggestions' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Suggestions deleted successfully'
    });
  } catch (error) {
    console.error('Error in DELETE /api/text-suggestions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
