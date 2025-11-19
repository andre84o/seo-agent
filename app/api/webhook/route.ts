// API Route: Webhook Management
// Skicka textförslag till extern endpoint

import { NextRequest, NextResponse } from 'next/server';
import {
  sendPendingSuggestionsWebhook,
  sendApprovedSuggestionsWebhook,
  sendTextSuggestionWebhook,
  testWebhook,
} from '@/lib/webhook';

/**
 * POST /api/webhook
 * Skickar suggestions via webhook
 *
 * Body:
 * - action: 'test' | 'send_pending' | 'send_approved' | 'send_single'
 * - url?: string (för send_pending/send_approved)
 * - suggestionId?: number (för send_single)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, url, suggestionId } = body;

    // Validera att WEBHOOK_URL är konfigurerad
    if (!process.env.WEBHOOK_URL) {
      return NextResponse.json(
        {
          success: false,
          error: 'WEBHOOK_URL not configured. Add it to your environment variables.'
        },
        { status: 400 }
      );
    }

    switch (action) {
      case 'test': {
        console.log('[Webhook API] Testing webhook connection...');
        const result = await testWebhook();

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? 'Webhook test successful'
            : `Webhook test failed: ${result.error}`,
          error: result.error,
        });
      }

      case 'send_pending': {
        if (!url) {
          return NextResponse.json(
            { success: false, error: 'URL is required for send_pending action' },
            { status: 400 }
          );
        }

        console.log(`[Webhook API] Sending pending suggestions for ${url}...`);
        const result = await sendPendingSuggestionsWebhook(url);

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? `Sent ${result.count} pending suggestions`
            : `Failed to send: ${result.error}`,
          count: result.count,
          error: result.error,
        });
      }

      case 'send_approved': {
        if (!url) {
          return NextResponse.json(
            { success: false, error: 'URL is required for send_approved action' },
            { status: 400 }
          );
        }

        console.log(`[Webhook API] Sending approved suggestions for ${url}...`);
        const result = await sendApprovedSuggestionsWebhook(url);

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? `Sent ${result.count} approved suggestions (marked as applied)`
            : `Failed to send: ${result.error}`,
          count: result.count,
          error: result.error,
        });
      }

      case 'send_single': {
        if (!suggestionId) {
          return NextResponse.json(
            { success: false, error: 'suggestionId is required for send_single action' },
            { status: 400 }
          );
        }

        console.log(`[Webhook API] Sending suggestion ${suggestionId}...`);
        const result = await sendTextSuggestionWebhook(suggestionId);

        return NextResponse.json({
          success: result.success,
          message: result.success
            ? `Sent suggestion ${suggestionId}`
            : `Failed to send: ${result.error}`,
          error: result.error,
        });
      }

      default:
        return NextResponse.json(
          {
            success: false,
            error: `Unknown action: ${action}. Valid actions: test, send_pending, send_approved, send_single`
          },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('[Webhook API] Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhook
 * Returnerar webhook-konfigurationsstatus
 */
export async function GET() {
  const webhookUrl = process.env.WEBHOOK_URL;
  const hasSecret = !!process.env.WEBHOOK_SECRET;

  return NextResponse.json({
    configured: !!webhookUrl,
    url: webhookUrl ? webhookUrl.replace(/\/\/[^@]+@/, '//***@') : null, // Maskera ev. credentials i URL
    hasSecret,
    endpoints: {
      test: 'POST /api/webhook { action: "test" }',
      sendPending: 'POST /api/webhook { action: "send_pending", url: "https://..." }',
      sendApproved: 'POST /api/webhook { action: "send_approved", url: "https://..." }',
      sendSingle: 'POST /api/webhook { action: "send_single", suggestionId: 123 }',
    },
  });
}
