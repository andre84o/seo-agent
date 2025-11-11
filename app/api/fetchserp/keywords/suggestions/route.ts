import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword parameter is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();

    const params = {
      keyword,
      country: searchParams.get('country') || undefined,
      language: searchParams.get('language') || undefined,
    };

    const data = await client.getKeywordsSuggestions(params);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch keyword suggestions' },
      { status: error.response?.status || 500 }
    );
  }
}
