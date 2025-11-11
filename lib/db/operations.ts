// Database Operations
// CRUD operationer och queries för SEO-agenten

import { supabase } from './supabase';
import type { Database } from './types';

type PageRow = Database['public']['Tables']['pages']['Row'];
type PageInsert = Database['public']['Tables']['pages']['Insert'];
type PageUpdate = Database['public']['Tables']['pages']['Update'];
type RunRow = Database['public']['Tables']['runs']['Row'];
type RunInsert = Database['public']['Tables']['runs']['Insert'];
type AuditInsert = Database['public']['Tables']['audits']['Insert'];
type AuditRow = Database['public']['Tables']['audits']['Row'];
type SuggestionInsert = Database['public']['Tables']['suggestions']['Insert'];
type SuggestionRow = Database['public']['Tables']['suggestions']['Row'];
type GSCDailyInsert = Database['public']['Tables']['gsc_daily']['Insert'];

// ============================================================================
// RUNS
// ============================================================================

/**
 * Skapar en ny run
 */
export async function createRun(): Promise<number> {
  const { data, error } = await supabase
    .from('runs')
    .insert({
      started_at: new Date().toISOString(),
      status: 'running',
    })
    .select('run_id')
    .single();

  if (error) throw new Error(`Failed to create run: ${error.message}`);
  return data.run_id;
}

/**
 * Uppdaterar en run med resultat
 */
export async function updateRun(
  runId: number,
  update: {
    finished_at?: string;
    pages_checked?: number;
    avg_score?: number;
    status?: string;
    error_message?: string;
  }
): Promise<void> {
  const { error } = await supabase
    .from('runs')
    .update(update)
    .eq('run_id', runId);

  if (error) throw new Error(`Failed to update run: ${error.message}`);
}

/**
 * Hämtar senaste runs
 */
export async function getRecentRuns(limit = 10): Promise<RunRow[]> {
  const { data, error } = await supabase
    .from('runs')
    .select('*')
    .order('started_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch runs: ${error.message}`);
  return data || [];
}

// ============================================================================
// PAGES
// ============================================================================

/**
 * Upsertar en page (insert eller update om URL finns)
 */
export async function upsertPage(page: PageInsert): Promise<void> {
  const { error } = await supabase
    .from('pages')
    .upsert(page, { onConflict: 'url' });

  if (error) throw new Error(`Failed to upsert page: ${error.message}`);
}

/**
 * Uppdaterar senaste mätvärden för en page
 */
export async function updatePageMetrics(
  url: string,
  metrics: {
    senaste_score: number;
    senaste_lcp?: number;
    senaste_cls?: number;
    senaste_inp?: number;
    last_seen_at?: string;
  }
): Promise<void> {
  const { error } = await supabase
    .from('pages')
    .update({
      ...metrics,
      last_seen_at: metrics.last_seen_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('url', url);

  if (error) throw new Error(`Failed to update page metrics: ${error.message}`);
}

/**
 * Hämtar alla pages
 */
export async function getAllPages(): Promise<PageRow[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw new Error(`Failed to fetch pages: ${error.message}`);
  return data || [];
}

/**
 * Hämtar pages med dålig score (under threshold)
 */
export async function getPagesWithLowScore(threshold = 50): Promise<PageRow[]> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .lt('senaste_score', threshold)
    .order('senaste_score', { ascending: true });

  if (error) throw new Error(`Failed to fetch low score pages: ${error.message}`);
  return data || [];
}

// ============================================================================
// AUDITS
// ============================================================================

/**
 * Skapar en ny audit
 */
export async function createAudit(audit: AuditInsert): Promise<number> {
  const { data, error } = await supabase
    .from('audits')
    .insert(audit)
    .select('audit_id')
    .single();

  if (error) {
    // Kolla för duplicate (idempotens)
    if (error.code === '23505') {
      throw new Error(`Audit already exists for URL in this run`);
    }
    throw new Error(`Failed to create audit: ${error.message}`);
  }

  return data.audit_id;
}

/**
 * Hämtar audits för en specifik run
 */
export async function getAuditsByRun(runId: number): Promise<AuditRow[]> {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('run_id', runId)
    .order('score', { ascending: true });

  if (error) throw new Error(`Failed to fetch audits: ${error.message}`);
  return data || [];
}

/**
 * Hämtar audits för en specifik URL
 */
export async function getAuditsByUrl(url: string, limit = 10): Promise<AuditRow[]> {
  const { data, error } = await supabase
    .from('audits')
    .select('*')
    .eq('url', url)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(`Failed to fetch audits for URL: ${error.message}`);
  return data || [];
}

/**
 * Hämtar senaste audit för varje URL (från materialiserad vy)
 */
export async function getLatestAudits(): Promise<any[]> {
  const { data, error } = await supabase
    .from('latest_audits')
    .select('*')
    .order('score', { ascending: true });

  if (error) throw new Error(`Failed to fetch latest audits: ${error.message}`);
  return data || [];
}

/**
 * Hämtar sämsta sidor senaste veckan (från materialiserad vy)
 */
export async function getWorstPagesWeek(): Promise<any[]> {
  const { data, error } = await supabase
    .from('worst_pages_week')
    .select('*')
    .limit(20);

  if (error) throw new Error(`Failed to fetch worst pages: ${error.message}`);
  return data || [];
}

// ============================================================================
// SUGGESTIONS
// ============================================================================

/**
 * Skapar ett nytt förslag
 */
export async function createSuggestion(suggestion: SuggestionInsert): Promise<number> {
  const { data, error } = await supabase
    .from('suggestions')
    .insert(suggestion)
    .select('suggestion_id')
    .single();

  if (error) throw new Error(`Failed to create suggestion: ${error.message}`);
  return data.suggestion_id;
}

/**
 * Uppdaterar status på ett förslag
 */
export async function updateSuggestionStatus(
  suggestionId: number,
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed'
): Promise<void> {
  const { error } = await supabase
    .from('suggestions')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('suggestion_id', suggestionId);

  if (error) throw new Error(`Failed to update suggestion: ${error.message}`);
}

/**
 * Hämtar suggestions filtrerade på status och impact
 */
export async function getSuggestions(filters?: {
  status?: string;
  impact?: string;
  url?: string;
}): Promise<SuggestionRow[]> {
  let query = supabase
    .from('suggestions')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.impact) {
    query = query.eq('impact', filters.impact);
  }

  if (filters?.url) {
    query = query.eq('url', filters.url);
  }

  const { data, error } = await query;

  if (error) throw new Error(`Failed to fetch suggestions: ${error.message}`);
  return data || [];
}

/**
 * Hämtar topp 5 förslag per impact
 */
export async function getTopSuggestions(): Promise<{
  high: SuggestionRow[];
  medium: SuggestionRow[];
  low: SuggestionRow[];
}> {
  const [high, medium, low] = await Promise.all([
    getSuggestions({ impact: 'high', status: 'pending' }),
    getSuggestions({ impact: 'medium', status: 'pending' }),
    getSuggestions({ impact: 'low', status: 'pending' }),
  ]);

  return {
    high: high.slice(0, 5),
    medium: medium.slice(0, 5),
    low: low.slice(0, 5),
  };
}

// ============================================================================
// GSC DAILY
// ============================================================================

/**
 * Upsertar GSC daily data
 */
export async function upsertGSCDaily(data: GSCDailyInsert): Promise<void> {
  const { error } = await supabase
    .from('gsc_daily')
    .upsert(data, { onConflict: 'url,date' });

  if (error) throw new Error(`Failed to upsert GSC data: ${error.message}`);
}

/**
 * Batch insert GSC daily data
 */
export async function batchInsertGSCDaily(data: GSCDailyInsert[]): Promise<void> {
  const { error } = await supabase
    .from('gsc_daily')
    .upsert(data, { onConflict: 'url,date' });

  if (error) throw new Error(`Failed to batch insert GSC data: ${error.message}`);
}

/**
 * Hämtar GSC data för en URL
 */
export async function getGSCDataByUrl(url: string, days = 30): Promise<any[]> {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('gsc_daily')
    .select('*')
    .eq('url', url)
    .gte('date', startDate.toISOString().split('T')[0])
    .order('date', { ascending: false });

  if (error) throw new Error(`Failed to fetch GSC data: ${error.message}`);
  return data || [];
}

// ============================================================================
// UTILITIES
// ============================================================================

/**
 * Refreshar materialiserade vyer
 */
export async function refreshMaterializedViews(): Promise<void> {
  const { error } = await supabase.rpc('refresh_materialized_views');

  if (error) throw new Error(`Failed to refresh views: ${error.message}`);
}

/**
 * Kör retention cleanup
 */
export async function runRetentionCleanup(): Promise<any> {
  const { data, error } = await supabase.rpc('run_retention_cleanup');

  if (error) throw new Error(`Failed to run retention cleanup: ${error.message}`);
  return data;
}
