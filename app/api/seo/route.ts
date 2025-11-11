import { NextRequest, NextResponse } from 'next/server';

const FETCHSERP_API_URL = 'https://www.fetchserp.com/api/v1';
const API_TOKEN = process.env.FETCHSERP_API_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, location = 'se', language = 'sv', device = 'desktop' } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    if (!API_TOKEN) {
      return NextResponse.json(
        { error: 'API token is not configured' },
        { status: 500 }
      );
    }

    // Call FetchSERP API with GET request and URL parameters
    const searchParams = new URLSearchParams({
      query: query,
      country: location,
      search_engine: 'google',
      pages_number: '1',
    });

    const response = await fetch(`${FETCHSERP_API_URL}/serp?${searchParams}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${API_TOKEN}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('FetchSERP API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to fetch SEO data', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('SEO API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
