import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();

    const params = {
      q: query,
      engine: (searchParams.get('engine') as any) || 'google',
      gl: searchParams.get('gl') || undefined,
      hl: searchParams.get('hl') || undefined,
      num: searchParams.get('num') ? parseInt(searchParams.get('num')!) : undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : undefined,
    };

    const data = await client.getSERPAIMode(params);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch SERP AI Mode' },
      { status: error.response?.status || 500 }
    );
  }
}
