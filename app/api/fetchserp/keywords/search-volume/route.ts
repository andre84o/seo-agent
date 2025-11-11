import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keywords, country, language } = body;

    if (!keywords || !Array.isArray(keywords) || keywords.length === 0) {
      return NextResponse.json(
        { error: 'Keywords array is required and must not be empty' },
        { status: 400 }
      );
    }

    const client = getFetchSERPClient();
    const data = await client.getKeywordsSearchVolume({ keywords, country, language });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to fetch keyword search volume' },
      { status: error.response?.status || 500 }
    );
  }
}
