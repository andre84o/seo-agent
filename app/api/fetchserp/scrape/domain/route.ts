import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { domain, max_pages } = body;

    if (!domain) {
      return NextResponse.json({ error: 'Domain is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    const data = await client.scrapeDomain({ domain, max_pages });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to scrape domain' },
      { status: error.response?.status || 500 }
    );
  }
}
