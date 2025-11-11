import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();

    const params = {
      query,
      engine: searchParams.get('engine') || undefined,
    };

    const data = await client.getDomainEmails(params);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch domain emails' },
      { status: error.response?.status || 500 }
    );
  }
}
