import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, prompt } = body;

    if (!url || !prompt) {
      return NextResponse.json({ error: 'URL and prompt are required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    const data = await client.analyzeWithAI({ url, prompt });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to analyze with AI' },
      { status: error.response?.status || 500 }
    );
  }
}
