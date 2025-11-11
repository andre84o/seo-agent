// API Route: Exportera data som CSV
// GET /api/agent/export?type=audits|suggestions

import { NextRequest, NextResponse } from 'next/server';
import { getLatestAudits, getSuggestions } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * GET /api/agent/export?type=audits|suggestions
 * Exporterar data som CSV
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'audits';

    let csv = '';

    if (type === 'audits') {
      const audits = await getLatestAudits();

      // CSV header
      csv = 'URL,Score,LCP,CLS,INP,Created At\n';

      // CSV rows
      for (const audit of audits) {
        const row = [
          audit.url,
          audit.score,
          audit.lcp?.toFixed(2) || 'N/A',
          audit.cls?.toFixed(4) || 'N/A',
          audit.inp?.toFixed(2) || 'N/A',
          new Date(audit.created_at).toISOString(),
        ];

        csv += row.map(field => `"${field}"`).join(',') + '\n';
      }

    } else if (type === 'suggestions') {
      const suggestions = await getSuggestions();

      // CSV header
      csv = 'URL,Action,Impact,Status,Created At\n';

      // CSV rows
      for (const suggestion of suggestions) {
        const row = [
          suggestion.url,
          suggestion.action,
          suggestion.impact,
          suggestion.status,
          new Date(suggestion.created_at).toISOString(),
        ];

        csv += row.map(field => `"${field}"`).join(',') + '\n';
      }

    } else {
      return NextResponse.json(
        { error: 'Invalid type parameter' },
        { status: 400 }
      );
    }

    // Returnera CSV med rätt headers
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="seo-agent-${type}-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

  } catch (error) {
    console.error('[API] Export error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
