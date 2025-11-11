import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const domain = searchParams.get('domain');

    if (!domain) {
      return NextResponse.json({ error: 'Domain parameter is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    const data = await client.getDomainInfo({ domain });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch domain info' },
      { status: error.response?.status || 500 }
    );
  }
}
