import { NextRequest, NextResponse } from 'next/server';
import { getFetchSERPClient } from '@/lib/fetchserp/client';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const keyword = searchParams.get('keyword');
    const userDomain = searchParams.get('domain');

    if (!keyword) {
      return NextResponse.json({ error: 'Keyword parameter is required' }, { status: 400 });
    }

    const client = getFetchSERPClient();
    // Get SERP results to analyze competitors
    const serpData = await client.getSERP({ q: keyword });

    // Extract competitor domains and rankings
    const competitors = serpData?.organic_results?.map((result: any, index: number) => ({
      position: index + 1,
      domain: result.domain || new URL(result.link).hostname,
      title: result.title,
      url: result.link,
      snippet: result.snippet,
    })) || [];

    // If user provided their domain, check if they rank
    let userRanking = null;
    if (userDomain) {
      const userResult = competitors.find((c: any) => c.domain.includes(userDomain));
      if (userResult) {
        userRanking = userResult.position;
      }
    }

    return NextResponse.json({
      keyword,
      userDomain,
      userRanking,
      competitors,
      totalResults: serpData?.search_information?.total_results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to analyze competitors' },
      { status: error.response?.status || 500 }
    );
  }
}
