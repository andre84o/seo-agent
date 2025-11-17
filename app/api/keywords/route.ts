// Keywords API
// GET: Hämta nyckelordsanalys för en sida
// POST: Generera nyckelordsanalys
// PUT: Lägg till/uppdatera keyword manuellt
// DELETE: Ta bort keyword

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';
import { analyzeKeywords, extractKeywords, calculateKeywordDensity } from '@/lib/seo/content-optimizer';
import { fetchUrl } from '@/lib/mcp/fetch-url';
import * as cheerio from 'cheerio';

// ============================================================================
// GET - Hämta nyckelordsanalys
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const runId = searchParams.get('run_id');

    let query = supabase
      .from('keywords')
      .select('*');

    // Om url är angiven och inte 'all', filtrera på URL
    if (url && url !== 'all') {
      query = query.eq('url', url);
    }

    if (runId) {
      query = query.eq('run_id', runId);
    }

    query = query.order('relevance_score', { ascending: false });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching keywords:', error);
      return NextResponse.json(
        { error: 'Failed to fetch keywords' },
        { status: 500 }
      );
    }

    // Gruppera per status
    const groupedByStatus: Record<string, any[]> = {
      suggested: [],
      optimized: [],
      over_used: [],
      under_used: []
    };

    data?.forEach((keyword: any) => {
      groupedByStatus[keyword.status].push(keyword);
    });

    return NextResponse.json({
      url,
      total: data?.length || 0,
      keywords: data,
      grouped: groupedByStatus,
      summary: {
        suggested: groupedByStatus.suggested.length,
        optimized: groupedByStatus.optimized.length,
        over_used: groupedByStatus.over_used.length,
        under_used: groupedByStatus.under_used.length
      }
    });
  } catch (error) {
    console.error('Error in GET /api/keywords:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Generera nyckelordsanalys
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, targetKeywords, runId } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL är required' },
        { status: 400 }
      );
    }

    // Hämta HTML
    console.log(`Fetching HTML for ${url}...`);
    const fetchResult = await fetchUrl({ url });
    
    if (!fetchResult.success || !fetchResult.html) {
      return NextResponse.json(
        { error: fetchResult.error || 'Failed to fetch HTML' },
        { status: 500 }
      );
    }
    
    const $ = cheerio.load(fetchResult.html);

    // Ta bort script och style
    $('script, style, noscript').remove();
    const bodyText = $('body').text();

    // Extrahera keywords om inga target keywords ges
    let keywords = targetKeywords || [];
    if (keywords.length === 0) {
      const extracted = extractKeywords(bodyText, 10);
      keywords = Object.keys(extracted);
    }

    // Analysera keywords
    console.log('Analyzing keywords...');
    const analysis = analyzeKeywords(bodyText, keywords);

    // Spara i databasen
    const keywordsToInsert = analysis.map(k => ({
      url,
      keyword: k.keyword,
      current_count: k.current_count,
      suggested_count: k.suggested_count,
      density: k.density,
      target_density: k.target_density,
      relevance_score: k.relevance_score,
      status: k.status,
      run_id: runId || null
    }));

    if (keywordsToInsert.length > 0) {
      // Ta bort gamla keywords för denna URL och run
      await supabase
        .from('keywords')
        .delete()
        .eq('url', url)
        .eq('run_id', runId || null);

      // Lägg till nya
      const { error: insertError } = await supabase
        .from('keywords')
        .insert(keywordsToInsert);

      if (insertError) {
        console.error('Error inserting keywords:', insertError);
        return NextResponse.json(
          { error: 'Failed to save keywords' },
          { status: 500 }
        );
      }
    }

    // Räkna status
    const statusCounts = {
      suggested: analysis.filter(k => k.status === 'suggested').length,
      optimized: analysis.filter(k => k.status === 'optimized').length,
      over_used: analysis.filter(k => k.status === 'over_used').length,
      under_used: analysis.filter(k => k.status === 'under_used').length
    };

    return NextResponse.json({
      message: 'Keyword analysis completed',
      total: analysis.length,
      summary: statusCounts,
      keywords: keywordsToInsert
    });
  } catch (error) {
    console.error('Error in POST /api/keywords:', error);
    return NextResponse.json(
      { error: 'Failed to analyze keywords: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// ============================================================================
// PUT - Lägg till eller uppdatera keyword manuellt
// ============================================================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      keyword,
      url,
      target_density,
      search_volume,
      difficulty,
      relevance_score
    } = body;

    if (!keyword || !url) {
      return NextResponse.json(
        { error: 'keyword och url är required' },
        { status: 400 }
      );
    }

    // Kolla om keyword redan finns för denna URL
    const { data: existing, error: fetchError } = await supabase
      .from('keywords')
      .select('*')
      .eq('url', url)
      .eq('keyword', keyword)
      .is('run_id', null) // Bara manuella keywords (utan run_id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error checking existing keyword:', fetchError);
      return NextResponse.json(
        { error: 'Failed to check existing keyword' },
        { status: 500 }
      );
    }

    const keywordData = {
      keyword,
      url,
      current_count: 0,
      suggested_count: null,
      density: 0,
      target_density: target_density || null,
      search_volume: search_volume || null,
      difficulty: difficulty || null,
      relevance_score: relevance_score || null,
      status: 'suggested',
      run_id: null // Manuella keywords har inte run_id
    };

    let result;
    if (existing) {
      // Uppdatera befintlig keyword
      const { data, error } = await supabase
        .from('keywords')
        .update(keywordData)
        .eq('id', existing.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating keyword:', error);
        return NextResponse.json(
          { error: 'Failed to update keyword' },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Skapa ny keyword
      const { data, error } = await supabase
        .from('keywords')
        .insert([keywordData])
        .select()
        .single();

      if (error) {
        console.error('Error inserting keyword:', error);
        return NextResponse.json(
          { error: 'Failed to add keyword' },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({
      success: true,
      keyword: result,
      message: existing ? 'Keyword uppdaterad' : 'Keyword tillagd'
    });

  } catch (error) {
    console.error('Error in PUT /api/keywords:', error);
    return NextResponse.json(
      { error: 'Failed to save keyword: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE - Ta bort keyword
// ============================================================================

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'id parameter är required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('keywords')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting keyword:', error);
      return NextResponse.json(
        { error: 'Failed to delete keyword' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Keyword borttagen'
    });

  } catch (error) {
    console.error('Error in DELETE /api/keywords:', error);
    return NextResponse.json(
      { error: 'Failed to delete keyword: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
