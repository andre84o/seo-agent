import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, keywords } = body;

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    const data = await client.analyzeSEO({ url, keywords });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to analyze SEO' },
      { status: error.response?.status || 500 }
    );
  }
}
