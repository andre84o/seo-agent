import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get('domain');
    const keyword = searchParams.get('keyword');

    if (!domain || !keyword) {
      return NextResponse.json(
        { error: 'Domain and keyword parameters are required' },
        { status: 400 }
      );
    }

    const client = getFetchSERPClient();

    const params = {
      domain,
      keyword,
      engine: searchParams.get('engine') || undefined,
      gl: searchParams.get('gl') || undefined,
    };

    const data = await client.getDomainRanking(params);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch domain ranking' },
      { status: error.response?.status || 500 }
    );
  }
}
