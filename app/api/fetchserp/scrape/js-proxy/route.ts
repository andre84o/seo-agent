import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, js_code, headers } = body;

    if (!url || !js_code) {
      return NextResponse.json({ error: 'URL and js_code are required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    const data = await client.scrapeJSWithProxy({ url, js_code, headers });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to scrape URL with JS proxy' },
      { status: error.response?.status || 500 }
    );
  }
}
