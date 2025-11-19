// Webhook Service
// Skickar textförslag till extern endpoint för automatisk uppdatering

import axios from 'axios';
import { supabase } from '../db/supabase';

export interface WebhookPayload {
  event: 'text_suggestion_created' | 'text_suggestion_approved' | 'batch_suggestions';
  timestamp: string;
  data: WebhookSuggestion | WebhookSuggestion[];
}

export interface WebhookSuggestion {
  id: number;
  url: string;
  section_type: 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
  section_identifier: string | null;
  original_text: string | null;
  suggested_text: string;
  edited_text: string | null;
  reason: string;
  impact: 'low' | 'medium' | 'high';
  keywords: string[] | null;
  seo_score_impact: number | null;
  char_count: number | null;
  word_count: number | null;
}

export interface WebhookConfig {
  url: string;
  secret?: string;
  retries?: number;
  timeout?: number;
}

/**
 * Skickar webhook till konfigurerad endpoint
 */
export async function sendWebhook(
  payload: WebhookPayload,
  config?: Partial<WebhookConfig>
): Promise<{ success: boolean; statusCode?: number; error?: string }> {
  const webhookUrl = config?.url || process.env.WEBHOOK_URL;
  const webhookSecret = config?.secret || process.env.WEBHOOK_SECRET;
  const retries = config?.retries ?? 3;
  const timeout = config?.timeout ?? 10000;

  if (!webhookUrl) {
    return { success: false, error: 'WEBHOOK_URL not configured' };
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'User-Agent': 'SEO-Agent/1.0',
  };

  // Lägg till autentisering om secret finns
  if (webhookSecret) {
    headers['X-Webhook-Secret'] = webhookSecret;
    headers['Authorization'] = `Bearer ${webhookSecret}`;
  }

  // Försök skicka med retries
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(webhookUrl, payload, {
        headers,
        timeout,
      });

      console.log(`[Webhook] Sent successfully to ${webhookUrl} (attempt ${attempt})`);

      return {
        success: true,
        statusCode: response.status,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      if (attempt === retries) {
        console.error(`[Webhook] Failed after ${retries} attempts:`, errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      }

      // Vänta innan retry (exponential backoff)
      const delay = Math.pow(2, attempt) * 1000;
      console.warn(`[Webhook] Attempt ${attempt} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  return { success: false, error: 'Max retries exceeded' };
}

/**
 * Skickar en enskild text suggestion via webhook
 */
export async function sendTextSuggestionWebhook(
  suggestionId: number,
  event: 'text_suggestion_created' | 'text_suggestion_approved' = 'text_suggestion_created'
): Promise<{ success: boolean; error?: string }> {
  // Hämta suggestion från databasen
  const { data, error } = await supabase
    .from('text_suggestions')
    .select('*')
    .eq('id', suggestionId)
    .single();

  if (error || !data) {
    return { success: false, error: error?.message || 'Suggestion not found' };
  }

  const webhookSuggestion: WebhookSuggestion = {
    id: data.id,
    url: data.url,
    section_type: data.section_type,
    section_identifier: data.section_identifier,
    original_text: data.original_text,
    suggested_text: data.suggested_text,
    edited_text: data.edited_text,
    reason: data.reason,
    impact: data.impact,
    keywords: data.keywords as string[] | null,
    seo_score_impact: data.seo_score_impact,
    char_count: data.char_count,
    word_count: data.word_count,
  };

  const payload: WebhookPayload = {
    event,
    timestamp: new Date().toISOString(),
    data: webhookSuggestion,
  };

  return sendWebhook(payload);
}

/**
 * Skickar alla pending suggestions för en URL via webhook
 */
export async function sendPendingSuggestionsWebhook(
  url: string
): Promise<{ success: boolean; count: number; error?: string }> {
  // Hämta alla pending suggestions för URL:en
  const { data, error } = await supabase
    .from('text_suggestions')
    .select('*')
    .eq('url', url)
    .eq('status', 'pending')
    .order('impact', { ascending: false });

  if (error) {
    return { success: false, count: 0, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: true, count: 0, error: 'No pending suggestions found' };
  }

  const webhookSuggestions: WebhookSuggestion[] = data.map(item => ({
    id: item.id,
    url: item.url,
    section_type: item.section_type,
    section_identifier: item.section_identifier,
    original_text: item.original_text,
    suggested_text: item.suggested_text,
    edited_text: item.edited_text,
    reason: item.reason,
    impact: item.impact,
    keywords: item.keywords as string[] | null,
    seo_score_impact: item.seo_score_impact,
    char_count: item.char_count,
    word_count: item.word_count,
  }));

  const payload: WebhookPayload = {
    event: 'batch_suggestions',
    timestamp: new Date().toISOString(),
    data: webhookSuggestions,
  };

  const result = await sendWebhook(payload);

  return {
    success: result.success,
    count: webhookSuggestions.length,
    error: result.error,
  };
}

/**
 * Skickar alla approved suggestions för en URL via webhook
 * (för fall där användaren vill godkänna i dashboard först)
 */
export async function sendApprovedSuggestionsWebhook(
  url: string
): Promise<{ success: boolean; count: number; error?: string }> {
  // Hämta alla suggestions med status 'edited' (godkända men inte applicerade)
  const { data, error } = await supabase
    .from('text_suggestions')
    .select('*')
    .eq('url', url)
    .eq('status', 'edited')
    .order('impact', { ascending: false });

  if (error) {
    return { success: false, count: 0, error: error.message };
  }

  if (!data || data.length === 0) {
    return { success: true, count: 0, error: 'No approved suggestions found' };
  }

  const webhookSuggestions: WebhookSuggestion[] = data.map(item => ({
    id: item.id,
    url: item.url,
    section_type: item.section_type,
    section_identifier: item.section_identifier,
    original_text: item.original_text,
    suggested_text: item.edited_text || item.suggested_text, // Använd editerad text om den finns
    edited_text: item.edited_text,
    reason: item.reason,
    impact: item.impact,
    keywords: item.keywords as string[] | null,
    seo_score_impact: item.seo_score_impact,
    char_count: item.char_count,
    word_count: item.word_count,
  }));

  const payload: WebhookPayload = {
    event: 'batch_suggestions',
    timestamp: new Date().toISOString(),
    data: webhookSuggestions,
  };

  const result = await sendWebhook(payload);

  // Om framgångsrikt, uppdatera status till 'applied'
  if (result.success) {
    const ids = data.map(item => item.id);
    await supabase
      .from('text_suggestions')
      .update({
        status: 'applied',
        applied_at: new Date().toISOString(),
      })
      .in('id', ids);
  }

  return {
    success: result.success,
    count: webhookSuggestions.length,
    error: result.error,
  };
}

/**
 * Test webhook connection
 */
export async function testWebhook(): Promise<{ success: boolean; error?: string }> {
  const payload: WebhookPayload = {
    event: 'text_suggestion_created',
    timestamp: new Date().toISOString(),
    data: {
      id: 0,
      url: 'https://example.com/test',
      section_type: 'title',
      section_identifier: null,
      original_text: 'Test Title',
      suggested_text: 'Improved Test Title - SEO Optimized',
      edited_text: null,
      reason: 'This is a test webhook to verify connection',
      impact: 'low',
      keywords: ['test', 'webhook'],
      seo_score_impact: 5,
      char_count: 35,
      word_count: 5,
    },
  };

  return sendWebhook(payload, { retries: 1 });
}
