// Pages API
// GET: Hämta alla övervakade sidor
// PUT: Lägg till/uppdatera sida
// DELETE: Ta bort sida

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

// ============================================================================
// GET - Hämta alla övervakade sidor
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error, count } = await supabase
      .from('pages')
      .select('*', { count: 'exact' })
      .order('updated_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Error fetching pages:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pages' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pages: data,
      total: count,
      limit,
      offset
    });
  } catch (error) {
    console.error('Error in GET /api/pages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PUT - Lägg till eller uppdatera sida
// ============================================================================

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'url är required' },
        { status: 400 }
      );
    }

    // Validera URL-format
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Ogiltig URL-format' },
        { status: 400 }
      );
    }

    // Kolla om sidan redan finns
    const { data: existing, error: fetchError } = await supabase
      .from('pages')
      .select('*')
      .eq('url', url)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error checking existing page:', fetchError);
      return NextResponse.json(
        { error: 'Failed to check existing page' },
        { status: 500 }
      );
    }

    let result;
    if (existing) {
      // Uppdatera befintlig sida (bara updated_at)
      const { data, error } = await supabase
        .from('pages')
        .update({ updated_at: new Date().toISOString() })
        .eq('url', url)
        .select()
        .single();

      if (error) {
        console.error('Error updating page:', error);
        return NextResponse.json(
          { error: 'Failed to update page' },
          { status: 500 }
        );
      }
      result = data;
    } else {
      // Skapa ny sida
      const { data, error } = await supabase
        .from('pages')
        .insert([{ url }])
        .select()
        .single();

      if (error) {
        console.error('Error inserting page:', error);
        return NextResponse.json(
          { error: 'Failed to add page' },
          { status: 500 }
        );
      }
      result = data;
    }

    return NextResponse.json({
      success: true,
      page: result,
      message: existing ? 'Sida redan finns' : 'Sida tillagd'
    });

  } catch (error) {
    console.error('Error in PUT /api/pages:', error);
    return NextResponse.json(
      { error: 'Failed to save page: ' + (error as Error).message },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE - Ta bort sida
// ============================================================================

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
      return NextResponse.json(
        { error: 'url parameter är required' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('pages')
      .delete()
      .eq('url', url);

    if (error) {
      console.error('Error deleting page:', error);
      return NextResponse.json(
        { error: 'Failed to delete page' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sida borttagen'
    });

  } catch (error) {
    console.error('Error in DELETE /api/pages:', error);
    return NextResponse.json(
      { error: 'Failed to delete page: ' + (error as Error).message },
      { status: 500 }
    );
  }
}
