import * as _supabase_supabase_js from '@supabase/supabase-js';

type Json = string | number | boolean | null | {
    [key: string]: Json | undefined;
} | Json[];
interface Database {
    public: {
        Tables: {
            pages: {
                Row: {
                    id: number;
                    url: string;
                    senaste_score: number | null;
                    senaste_lcp: number | null;
                    senaste_cls: number | null;
                    senaste_inp: number | null;
                    last_seen_at: string | null;
                    updated_at: string;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    url: string;
                    senaste_score?: number | null;
                    senaste_lcp?: number | null;
                    senaste_cls?: number | null;
                    senaste_inp?: number | null;
                    last_seen_at?: string | null;
                    updated_at?: string;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    url?: string;
                    senaste_score?: number | null;
                    senaste_lcp?: number | null;
                    senaste_cls?: number | null;
                    senaste_inp?: number | null;
                    last_seen_at?: string | null;
                    updated_at?: string;
                    created_at?: string;
                };
            };
            runs: {
                Row: {
                    run_id: number;
                    started_at: string;
                    finished_at: string | null;
                    pages_checked: number;
                    avg_score: number | null;
                    status: string;
                    error_message: string | null;
                };
                Insert: {
                    run_id?: number;
                    started_at?: string;
                    finished_at?: string | null;
                    pages_checked?: number;
                    avg_score?: number | null;
                    status?: string;
                    error_message?: string | null;
                };
                Update: {
                    run_id?: number;
                    started_at?: string;
                    finished_at?: string | null;
                    pages_checked?: number;
                    avg_score?: number | null;
                    status?: string;
                    error_message?: string | null;
                };
            };
            audits: {
                Row: {
                    audit_id: number;
                    run_id: number;
                    url: string;
                    score: number;
                    lcp: number | null;
                    cls: number | null;
                    inp: number | null;
                    issues: Json | null;
                    created_at: string;
                };
                Insert: {
                    audit_id?: number;
                    run_id: number;
                    url: string;
                    score: number;
                    lcp?: number | null;
                    cls?: number | null;
                    inp?: number | null;
                    issues?: Json | null;
                    created_at?: string;
                };
                Update: {
                    audit_id?: number;
                    run_id?: number;
                    url?: string;
                    score?: number;
                    lcp?: number | null;
                    cls?: number | null;
                    inp?: number | null;
                    issues?: Json | null;
                    created_at?: string;
                };
            };
            suggestions: {
                Row: {
                    suggestion_id: number;
                    url: string;
                    action: string;
                    impact: 'low' | 'medium' | 'high';
                    status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    suggestion_id?: number;
                    url: string;
                    action: string;
                    impact: 'low' | 'medium' | 'high';
                    status?: 'pending' | 'in_progress' | 'completed' | 'dismissed';
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    suggestion_id?: number;
                    url?: string;
                    action?: string;
                    impact?: 'low' | 'medium' | 'high';
                    status?: 'pending' | 'in_progress' | 'completed' | 'dismissed';
                    created_at?: string;
                    updated_at?: string;
                };
            };
            gsc_daily: {
                Row: {
                    id: number;
                    url: string;
                    date: string;
                    clicks: number;
                    impressions: number;
                    ctr: number | null;
                    position: number | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    url: string;
                    date: string;
                    clicks?: number;
                    impressions?: number;
                    ctr?: number | null;
                    position?: number | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    url?: string;
                    date?: string;
                    clicks?: number;
                    impressions?: number;
                    ctr?: number | null;
                    position?: number | null;
                    created_at?: string;
                };
            };
            weekly_summaries: {
                Row: {
                    id: number;
                    week_start: string;
                    week_end: string;
                    total_pages_checked: number | null;
                    avg_score: number | null;
                    avg_lcp: number | null;
                    avg_cls: number | null;
                    avg_inp: number | null;
                    top_issues: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    week_start: string;
                    week_end: string;
                    total_pages_checked?: number | null;
                    avg_score?: number | null;
                    avg_lcp?: number | null;
                    avg_cls?: number | null;
                    avg_inp?: number | null;
                    top_issues?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    week_start?: string;
                    week_end?: string;
                    total_pages_checked?: number | null;
                    avg_score?: number | null;
                    avg_lcp?: number | null;
                    avg_cls?: number | null;
                    avg_inp?: number | null;
                    top_issues?: Json | null;
                    created_at?: string;
                };
            };
            text_suggestions: {
                Row: {
                    id: number;
                    url: string;
                    section_type: 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
                    section_identifier: string | null;
                    original_text: string | null;
                    suggested_text: string;
                    edited_text: string | null;
                    keywords: Json | null;
                    keyword_density: Json | null;
                    reason: string;
                    impact: 'low' | 'medium' | 'high';
                    status: 'pending' | 'edited' | 'applied' | 'dismissed';
                    seo_score_impact: number | null;
                    char_count: number | null;
                    word_count: number | null;
                    readability_score: number | null;
                    run_id: number | null;
                    created_at: string;
                    updated_at: string;
                    applied_at: string | null;
                };
                Insert: {
                    id?: number;
                    url: string;
                    section_type: 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
                    section_identifier?: string | null;
                    original_text?: string | null;
                    suggested_text: string;
                    edited_text?: string | null;
                    keywords?: Json | null;
                    keyword_density?: Json | null;
                    reason: string;
                    impact: 'low' | 'medium' | 'high';
                    status?: 'pending' | 'edited' | 'applied' | 'dismissed';
                    seo_score_impact?: number | null;
                    char_count?: number | null;
                    word_count?: number | null;
                    readability_score?: number | null;
                    run_id?: number | null;
                    created_at?: string;
                    updated_at?: string;
                    applied_at?: string | null;
                };
                Update: {
                    id?: number;
                    url?: string;
                    section_type?: 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
                    section_identifier?: string | null;
                    original_text?: string | null;
                    suggested_text?: string;
                    edited_text?: string | null;
                    keywords?: Json | null;
                    keyword_density?: Json | null;
                    reason?: string;
                    impact?: 'low' | 'medium' | 'high';
                    status?: 'pending' | 'edited' | 'applied' | 'dismissed';
                    seo_score_impact?: number | null;
                    char_count?: number | null;
                    word_count?: number | null;
                    readability_score?: number | null;
                    run_id?: number | null;
                    created_at?: string;
                    updated_at?: string;
                    applied_at?: string | null;
                };
            };
            keywords: {
                Row: {
                    id: number;
                    keyword: string;
                    url: string;
                    current_count: number;
                    suggested_count: number | null;
                    density: number | null;
                    target_density: number | null;
                    search_volume: number | null;
                    difficulty: number | null;
                    relevance_score: number | null;
                    status: 'suggested' | 'optimized' | 'over_used' | 'under_used';
                    run_id: number | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: number;
                    keyword: string;
                    url: string;
                    current_count?: number;
                    suggested_count?: number | null;
                    density?: number | null;
                    target_density?: number | null;
                    search_volume?: number | null;
                    difficulty?: number | null;
                    relevance_score?: number | null;
                    status?: 'suggested' | 'optimized' | 'over_used' | 'under_used';
                    run_id?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: {
                    id?: number;
                    keyword?: string;
                    url?: string;
                    current_count?: number;
                    suggested_count?: number | null;
                    density?: number | null;
                    target_density?: number | null;
                    search_volume?: number | null;
                    difficulty?: number | null;
                    relevance_score?: number | null;
                    status?: 'suggested' | 'optimized' | 'over_used' | 'under_used';
                    run_id?: number | null;
                    created_at?: string;
                    updated_at?: string;
                };
            };
            content_analysis: {
                Row: {
                    id: number;
                    url: string;
                    run_id: number | null;
                    heading_structure: Json | null;
                    paragraph_count: number | null;
                    word_count: number | null;
                    char_count: number | null;
                    readability_score: number | null;
                    avg_sentence_length: number | null;
                    avg_word_length: number | null;
                    top_keywords: Json | null;
                    keyword_density: Json | null;
                    missing_keywords: Json | null;
                    sentiment_score: number | null;
                    tone: string | null;
                    content_score: number | null;
                    improvement_areas: Json | null;
                    created_at: string;
                };
                Insert: {
                    id?: number;
                    url: string;
                    run_id?: number | null;
                    heading_structure?: Json | null;
                    paragraph_count?: number | null;
                    word_count?: number | null;
                    char_count?: number | null;
                    readability_score?: number | null;
                    avg_sentence_length?: number | null;
                    avg_word_length?: number | null;
                    top_keywords?: Json | null;
                    keyword_density?: Json | null;
                    missing_keywords?: Json | null;
                    sentiment_score?: number | null;
                    tone?: string | null;
                    content_score?: number | null;
                    improvement_areas?: Json | null;
                    created_at?: string;
                };
                Update: {
                    id?: number;
                    url?: string;
                    run_id?: number | null;
                    heading_structure?: Json | null;
                    paragraph_count?: number | null;
                    word_count?: number | null;
                    char_count?: number | null;
                    readability_score?: number | null;
                    avg_sentence_length?: number | null;
                    avg_word_length?: number | null;
                    top_keywords?: Json | null;
                    keyword_density?: Json | null;
                    missing_keywords?: Json | null;
                    sentiment_score?: number | null;
                    tone?: string | null;
                    content_score?: number | null;
                    improvement_areas?: Json | null;
                    created_at?: string;
                };
            };
        };
        Views: {
            latest_audits: {
                Row: {
                    audit_id: number;
                    run_id: number;
                    url: string;
                    score: number;
                    lcp: number | null;
                    cls: number | null;
                    inp: number | null;
                    issues: Json | null;
                    created_at: string;
                };
            };
            worst_pages_week: {
                Row: {
                    url: string;
                    current_score: number;
                    prev_score: number | null;
                    score_diff: number;
                    lcp: number | null;
                    cls: number | null;
                    inp: number | null;
                };
            };
        };
        Functions: {
            refresh_materialized_views: {
                Args: Record<string, never>;
                Returns: void;
            };
            run_retention_cleanup: {
                Args: Record<string, never>;
                Returns: Json;
            };
            get_suggestions_by_page: {
                Args: {
                    page_url: string;
                };
                Returns: Array<{
                    section_type: string;
                    suggestions: Json;
                }>;
            };
        };
    };
}
type SectionType = 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
type SuggestionStatus = 'pending' | 'edited' | 'applied' | 'dismissed';
type ImpactLevel = 'low' | 'medium' | 'high';
type KeywordStatus = 'suggested' | 'optimized' | 'over_used' | 'under_used';

declare const supabase: any;
declare function createAnonClient(): _supabase_supabase_js.SupabaseClient<Database, "public", "public", never, {
    PostgrestVersion: "12";
}>;

type PageRow = Database['public']['Tables']['pages']['Row'];
type PageInsert = Database['public']['Tables']['pages']['Insert'];
type RunRow = Database['public']['Tables']['runs']['Row'];
type AuditInsert = Database['public']['Tables']['audits']['Insert'];
type AuditRow = Database['public']['Tables']['audits']['Row'];
type SuggestionInsert = Database['public']['Tables']['suggestions']['Insert'];
type SuggestionRow = Database['public']['Tables']['suggestions']['Row'];
type GSCDailyInsert = Database['public']['Tables']['gsc_daily']['Insert'];
/**
 * Skapar en ny run
 */
declare function createRun(): Promise<number>;
/**
 * Uppdaterar en run med resultat
 */
declare function updateRun(runId: number, update: {
    finished_at?: string;
    pages_checked?: number;
    avg_score?: number;
    status?: string;
    error_message?: string;
}): Promise<void>;
/**
 * Hämtar senaste runs
 */
declare function getRecentRuns(limit?: number): Promise<RunRow[]>;
/**
 * Upsertar en page (insert eller update om URL finns)
 */
declare function upsertPage(page: PageInsert): Promise<void>;
/**
 * Uppdaterar senaste mätvärden för en page
 */
declare function updatePageMetrics(url: string, metrics: {
    senaste_score: number;
    senaste_lcp?: number;
    senaste_cls?: number;
    senaste_inp?: number;
    last_seen_at?: string;
}): Promise<void>;
/**
 * Hämtar alla pages
 */
declare function getAllPages(): Promise<PageRow[]>;
/**
 * Hämtar en page via URL
 */
declare function getPageByUrl(url: string): Promise<PageRow | null>;
/**
 * Hämtar pages med dålig score (under threshold)
 */
declare function getPagesWithLowScore(threshold?: number): Promise<PageRow[]>;
/**
 * Skapar en ny audit
 */
declare function createAudit(audit: AuditInsert): Promise<number>;
/**
 * Hämtar audits för en specifik run
 */
declare function getAuditsByRun(runId: number): Promise<AuditRow[]>;
/**
 * Hämtar audits för en specifik URL
 */
declare function getAuditsByUrl(url: string, limit?: number): Promise<AuditRow[]>;
/**
 * Hämtar senaste audit för varje URL (från materialiserad vy)
 */
declare function getLatestAudits(): Promise<any[]>;
/**
 * Hämtar sämsta sidor senaste veckan (från materialiserad vy)
 */
declare function getWorstPagesWeek(): Promise<any[]>;
/**
 * Skapar ett nytt förslag
 */
declare function createSuggestion(suggestion: SuggestionInsert): Promise<number>;
/**
 * Uppdaterar status på ett förslag
 */
declare function updateSuggestionStatus(suggestionId: number, status: 'pending' | 'in_progress' | 'completed' | 'dismissed'): Promise<void>;
/**
 * Hämtar suggestions filtrerade på status och impact
 */
declare function getSuggestions(filters?: {
    status?: string;
    impact?: string;
    url?: string;
}): Promise<SuggestionRow[]>;
/**
 * Hämtar topp 5 förslag per impact
 */
declare function getTopSuggestions(): Promise<{
    high: SuggestionRow[];
    medium: SuggestionRow[];
    low: SuggestionRow[];
}>;
/**
 * Upsertar GSC daily data
 */
declare function upsertGSCDaily(data: GSCDailyInsert): Promise<void>;
/**
 * Batch insert GSC daily data
 */
declare function batchInsertGSCDaily(data: GSCDailyInsert[]): Promise<void>;
/**
 * Hämtar GSC data för en URL
 */
declare function getGSCDataByUrl(url: string, days?: number): Promise<any[]>;
/**
 * Sparar AI-analys historik
 */
declare function createAIAnalysis(analysis: {
    page_id: number;
    run_id?: number;
    analysis_type?: string;
    ai_summary: string;
    ai_score: number;
    suggestions_count: number;
    used_gsc_data?: boolean;
    used_analytics_data?: boolean;
    used_psi_data?: boolean;
    title_suggestions?: unknown;
    meta_suggestions?: unknown;
    faq_suggestions?: unknown;
    content_outline?: unknown;
    keywords?: unknown;
    full_response?: unknown;
    model_used?: string;
    tokens_used?: number;
    analysis_duration_ms?: number;
}): Promise<number>;
/**
 * Hämtar AI-analyser för en sida
 */
declare function getAIAnalysesByPageId(pageId: number, limit?: number): Promise<any[]>;
/**
 * Skapar en ny SEO task
 */
declare function createTask(task: {
    page_id: number;
    suggestion_id?: number;
    title: string;
    description?: string;
    task_type?: string;
    priority?: 'high' | 'medium' | 'low';
    status?: 'todo' | 'in_progress' | 'done' | 'skipped';
    ai_generated?: boolean;
    expected_impact?: string;
    effort_estimate?: string;
    assigned_to?: string;
    due_date?: string;
    notes?: string;
}): Promise<number>;
/**
 * Uppdaterar en task
 */
declare function updateTask(taskId: number, update: {
    status?: string;
    assigned_to?: string;
    completed_at?: string;
    completed_by?: string;
    notes?: string;
}): Promise<void>;
/**
 * Hämtar tasks för en sida
 */
declare function getTasksByPageId(pageId: number): Promise<any[]>;
/**
 * Hämtar alla aktiva tasks (denna veckans prioriterade)
 */
declare function getActiveTasksThisWeek(): Promise<any[]>;
/**
 * Hämtar pending AI-suggestions som inte är tasks än
 */
declare function getPendingAISuggestions(): Promise<any[]>;
/**
 * Sparar en content version (före/efter ändring)
 */
declare function createContentVersion(version: {
    page_id: number;
    task_id?: number;
    version_number: number;
    version_type: string;
    previous_value?: string;
    new_value: string;
    changed_by?: string;
    change_reason?: string;
    ai_suggested?: boolean;
    previous_metrics?: unknown;
    notes?: string;
}): Promise<number>;
/**
 * Hämtar content versions för en sida
 */
declare function getContentVersionsByPageId(pageId: number): Promise<any[]>;
/**
 * Refreshar materialiserade vyer
 */
declare function refreshMaterializedViews(): Promise<void>;
/**
 * Kör retention cleanup
 */
declare function runRetentionCleanup(): Promise<any>;

interface GSCQuery {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
}
interface GSCPageData {
    page: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries?: GSCQuery[];
}
interface GSCTopQueriesResult {
    success: boolean;
    siteUrl: string;
    data: GSCPageData[];
    totalRows: number;
    startDate: string;
    endDate: string;
    error?: string;
}
/**
 * Hämtar top queries från Google Search Console
 * @param siteUrl - Verified site URL i GSC (e.g. 'https://example.com')
 * @param accessToken - OAuth2 access token
 * @param startDate - Start datum (YYYY-MM-DD)
 * @param endDate - Slut datum (YYYY-MM-DD)
 * @param rowLimit - Max antal rader att hämta
 * @returns GSC query data
 */
declare function gscTopQueries(siteUrl: string, accessToken: string, startDate: string, endDate: string, rowLimit?: number): Promise<GSCTopQueriesResult>;
/**
 * Hittar sidor med låg CTR nära topp 10
 * @param gscData - GSC data från gscTopQueries
 * @param minPosition - Min position för att inkluderas (default 15)
 * @param maxPosition - Max position för att inkluderas (default 1)
 * @param ctrThreshold - CTR under detta värde flaggas (default 0.05 = 5%)
 * @returns Filtrerade sidor med låg CTR
 */
declare function findLowCtrPages(gscData: GSCPageData[], minPosition?: number, maxPosition?: number, ctrThreshold?: number): GSCPageData[];
/**
 * OAuth2 token refresh
 * @param refreshToken - Refresh token från OAuth2 flow
 * @param clientId - Google OAuth2 client ID
 * @param clientSecret - Google OAuth2 client secret
 * @returns Ny access token
 */
declare function refreshGSCToken(refreshToken: string, clientId: string, clientSecret: string): Promise<string>;
/**
 * Hämtar GSC data för en specifik sida/URL
 * @param siteUrl - Verified site URL i GSC
 * @param pageUrl - Specifik page URL att hämta data för
 * @param accessToken - OAuth2 access token
 * @param startDate - Start datum
 * @param endDate - Slut datum
 * @returns GSC data för sidan
 */
declare function gscPageData(siteUrl: string, pageUrl: string, accessToken: string, startDate: string, endDate: string): Promise<GSCPageData | null>;

interface SEOAnalysisInput {
    url: string;
    currentTitle?: string;
    currentMetaDescription?: string;
    currentH1?: string;
    contentLength?: number;
    gscData?: GSCPageData;
    psiScore?: number;
    psiMetrics?: {
        fcp?: number;
        lcp?: number;
        cls?: number;
        tbt?: number;
    };
    competitors?: string[];
    language?: string;
}
interface SEOSuggestion {
    type: 'title' | 'meta_description' | 'h1' | 'content' | 'faq' | 'schema' | 'performance';
    priority: 'high' | 'medium' | 'low';
    category: string;
    suggestion: string;
    reasoning: string;
    expectedImpact: string;
    implementation?: string;
}
interface AIAnalysisResult {
    summary: string;
    score: number;
    suggestions: SEOSuggestion[];
    titleSuggestions: string[];
    metaDescriptionSuggestions: string[];
    faqSuggestions?: {
        question: string;
        answer: string;
    }[];
    contentOutline?: string[];
    keywords: {
        primary: string[];
        secondary: string[];
        longTail: string[];
    };
}
/**
 * Genererar en omfattande SEO-analys med AI
 */
declare function analyzePageWithAI(input: SEOAnalysisInput): Promise<AIAnalysisResult>;
/**
 * Genererar content-optimeringsförslag
 */
declare function generateContentSuggestions(url: string, currentContent: string, targetKeywords: string[]): Promise<{
    outline: string[];
    sections: {
        heading: string;
        content: string;
    }[];
    internalLinkSuggestions: string[];
}>;
/**
 * Genererar schema.org markup
 */
declare function generateSchemaMarkup(pageType: 'article' | 'product' | 'faq' | 'local-business', pageData: Record<string, unknown>): Promise<Record<string, unknown>>;

interface AgentConfig {
    siteUrl: string;
    sitemapUrl?: string;
    psiApiKey: string;
    gscAccessToken?: string;
    gscSiteUrl?: string;
    gaPropertyId?: string;
    maxPagesToCheck?: number;
    priorityThreshold?: number;
    useAI?: boolean;
    openaiApiKey?: string;
}
interface AgentRunResult {
    runId: number;
    pagesChecked: number;
    avgScore: number;
    errors: string[];
    flaggedPages: string[];
    duration: number;
}
interface PageToCheck {
    url: string;
    priority: number;
    lastScore: number | null;
    daysSinceLastCheck: number;
}
/**
 * Huvudfunktion för att köra SEO-agenten
 * @param config - Agent konfiguration
 * @returns Run resultat
 */
declare function runAgent(config: AgentConfig): Promise<AgentRunResult>;

interface AnalyticsData {
    pageviews: number;
    uniquePageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    exitRate: number;
    conversions?: number;
    dateRange: {
        startDate: string;
        endDate: string;
    };
}
interface AnalyticsPageData {
    pagePath: string;
    pageviews: number;
    uniquePageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
}
/**
 * Hämtar Analytics data för en specifik sida
 */
declare function getPageAnalytics(propertyId: string, pagePath: string, startDate: string, endDate: string, credentials?: unknown): Promise<AnalyticsData | null>;
/**
 * Hämtar top pages från Analytics
 */
declare function getTopPages(propertyId: string, startDate: string, endDate: string, limit?: number, credentials?: unknown): Promise<AnalyticsPageData[]>;
/**
 * Kombinerar GSC + Analytics data för en komplett bild
 */
interface CombinedPageData {
    url: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries: Array<{
        query: string;
        clicks: number;
    }>;
    pageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    searchVsDirectRatio: number;
    engagementScore: number;
}
declare function combineGSCAndAnalytics(gscData: {
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
    topQueries?: Array<{
        query: string;
        clicks: number;
    }>;
}, analyticsData: AnalyticsData | null): Partial<CombinedPageData>;

interface OnPageIssue {
    type: 'title' | 'meta-description' | 'h1' | 'canonical' | 'images' | 'other';
    severity: 'low' | 'medium' | 'high';
    message: string;
    current?: string;
    recommendation?: string;
}
interface OnPageResult {
    title?: string;
    titleLength: number;
    metaDescription?: string;
    metaDescriptionLength: number;
    h1Tags: string[];
    h1Count: number;
    canonical?: string;
    totalImages: number;
    imagesWithAlt: number;
    imagesWithoutAlt: number;
    altCoverage: number;
    issues: OnPageIssue[];
    score: number;
}
/**
 * Analyserar HTML för on-page SEO faktorer
 * @param html - HTML innehåll att analysera
 * @param url - URL för canonical check
 * @returns On-page analys resultat
 */
declare function analyzeOnPage(html: string, url: string): OnPageResult;
/**
 * Genererar actionable förslag från on-page issues
 */
declare function generateOnPageSuggestions(result: OnPageResult, url: string): Array<{
    action: string;
    impact: 'low' | 'medium' | 'high';
}>;

interface CoreWebVitals {
    lcp: number;
    cls: number;
    inp: number;
    fcp?: number;
    ttfb?: number;
}
interface LighthouseMetrics {
    performance: number;
    accessibility?: number;
    bestPractices?: number;
    seo?: number;
}
interface PSIIssue {
    title: string;
    description: string;
    score?: number;
    displayValue?: string;
    impact?: 'low' | 'medium' | 'high';
}
interface PSIAuditResult {
    success: boolean;
    url: string;
    vitals?: CoreWebVitals;
    lighthouse?: LighthouseMetrics;
    issues: PSIIssue[];
    rawData?: any;
    error?: string;
    requestId?: string;
}
/**
 * Kör PageSpeed Insights audit på en URL
 * @param url - URL att analysera
 * @param apiKey - Google PageSpeed Insights API key
 * @param strategy - 'mobile' eller 'desktop'
 * @returns PSI audit resultat
 */
declare function psiAudit(url: string, apiKey: string, strategy?: 'mobile' | 'desktop'): Promise<PSIAuditResult>;
/**
 * Batch PSI audit med rate limiting och retry
 */
declare function psiAuditBatch(urls: string[], apiKey: string, strategy?: 'mobile' | 'desktop', delayMs?: number): Promise<PSIAuditResult[]>;

interface ScoringWeights {
    onPage: number;
    vitals: number;
    gsc: number;
}
interface GSCMetrics {
    ctr: number;
    position: number;
    impressions: number;
}
interface ScoreBreakdown {
    total: number;
    onPageScore: number;
    vitalsScore: number;
    gscScore: number;
    issues: Array<{
        category: 'on-page' | 'vitals' | 'gsc';
        severity: 'low' | 'medium' | 'high';
        message: string;
    }>;
}
/**
 * Beräknar total SEO score
 * @param onPageResult - On-page analys resultat
 * @param vitals - Core Web Vitals från PSI
 * @param gscMetrics - Google Search Console metrics (optional)
 * @param weights - Viktning av olika faktorer
 * @returns Score breakdown
 */
declare function calculateSEOScore(onPageResult: OnPageResult, vitals?: CoreWebVitals, gscMetrics?: GSCMetrics, weights?: ScoringWeights): ScoreBreakdown;
/**
 * Bestämmer prioritet baserat på score och trend
 * @param currentScore - Nuvarande score
 * @param previousScore - Tidigare score (optional)
 * @param vitals - Core Web Vitals
 * @param daysSinceLastCheck - Dagar sedan senaste check
 * @returns Priority weight (högre = mer urgent)
 */
declare function calculatePriority(currentScore: number, previousScore: number | null, vitals: CoreWebVitals | undefined, daysSinceLastCheck: number): number;
/**
 * Flaggar sidor som behöver omedelbar uppmärksamhet
 * @param score - Total score
 * @param vitals - Core Web Vitals
 * @param scoreDiff - Förändring i score sedan förra
 * @returns True om sidan ska flaggas
 */
declare function shouldFlagPage(score: number, vitals: CoreWebVitals | undefined, scoreDiff: number | null): boolean;

interface TextSuggestion {
    section_type: SectionType;
    section_identifier: string | null;
    original_text: string | null;
    suggested_text: string;
    keywords: string[];
    keyword_density: Record<string, number>;
    reason: string;
    impact: ImpactLevel;
    seo_score_impact: number;
    readability_score: number;
}
interface KeywordAnalysis {
    keyword: string;
    current_count: number;
    suggested_count: number;
    density: number;
    target_density: number;
    relevance_score: number;
    status: 'suggested' | 'optimized' | 'over_used' | 'under_used';
}
interface ContentAnalysisResult {
    url: string;
    heading_structure: any;
    paragraph_count: number;
    word_count: number;
    char_count: number;
    readability_score: number;
    avg_sentence_length: number;
    avg_word_length: number;
    top_keywords: Record<string, number>;
    keyword_density: Record<string, number>;
    missing_keywords: string[];
    sentiment_score: number;
    tone: string;
    content_score: number;
    improvement_areas: string[];
}
/**
 * Extraherar nyckelord från text
 */
declare function extractKeywords(text: string, topN?: number): Record<string, number>;
/**
 * Beräknar keyword density
 */
declare function calculateKeywordDensity(text: string, keywords: string[]): Record<string, number>;
/**
 * Analyserar nyckelord och ger rekommendationer
 */
declare function analyzeKeywords(text: string, targetKeywords?: string[]): KeywordAnalysis[];
/**
 * Beräknar Flesch Reading Ease score (anpassad för svenska)
 */
declare function calculateReadability(text: string): number;
/**
 * Får läsbarhetsnivå som text
 */
declare function getReadabilityLevel(score: number): string;
/**
 * Genererar förbättrat title-förslag
 */
declare function generateTitleSuggestion(originalTitle: string | null, url: string, keywords: string[]): TextSuggestion | null;
/**
 * Genererar förbättrat meta description-förslag
 */
declare function generateMetaDescriptionSuggestion(originalDesc: string | null, pageContent: string, keywords: string[]): TextSuggestion | null;
/**
 * Genererar förbättringsförslag för rubriker (H1-H4)
 */
declare function generateHeadingSuggestion(headingLevel: 'h1' | 'h2' | 'h3' | 'h4', originalText: string, keywords: string[], index: number): TextSuggestion | null;
/**
 * Analyserar fullständigt sidinnehåll
 */
declare function analyzePageContent(html: string, url: string): Promise<ContentAnalysisResult>;
/**
 * Genererar alla textförslag för en sida
 */
declare function generateAllSuggestions(html: string, url: string, targetKeywords?: string[]): Promise<TextSuggestion[]>;

interface FetchUrlOptions {
    url: string;
    timeout?: number;
    userAgent?: string;
}
interface FetchUrlResult {
    success: boolean;
    url: string;
    html?: string;
    statusCode?: number;
    error?: string;
    redirectUrl?: string;
    contentType?: string;
}
/**
 * Hämtar HTML innehåll från en URL
 * @param options - URL och optionella inställningar
 * @returns Resultat med HTML eller felmeddelande
 */
declare function fetchUrl(options: FetchUrlOptions): Promise<FetchUrlResult>;
/**
 * Batch fetch flera URLs med rate limiting
 * @param urls - Array av URLs att hämta
 * @param concurrency - Max antal samtidiga requests
 * @returns Array av resultat
 */
declare function fetchUrlBatch(urls: string[], concurrency?: number): Promise<FetchUrlResult[]>;

interface SitemapUrl {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: number;
}
interface ReadSitemapResult {
    success: boolean;
    urls: SitemapUrl[];
    totalUrls: number;
    error?: string;
    isSitemapIndex?: boolean;
    childSitemaps?: string[];
}
/**
 * Läser och parsar en sitemap.xml eller sitemap index
 * @param sitemapUrl - URL till sitemap.xml
 * @returns Parsed sitemap med alla URLs
 */
declare function readSitemap(sitemapUrl: string): Promise<ReadSitemapResult>;
/**
 * Läser robots.txt och hittar sitemap URLs
 * @param domain - Domain URL (e.g. https://example.com)
 * @returns Array av sitemap URLs från robots.txt
 */
declare function findSitemapsInRobotsTxt(domain: string): Promise<string[]>;
/**
 * Auto-discover sitemap för en domain
 * Försöker hitta sitemap via robots.txt eller vanliga platser
 */
declare function discoverSitemap(domain: string): Promise<ReadSitemapResult>;

interface FetchSERPConfig {
    apiToken: string;
}
interface SERPParams {
    q: string;
    engine?: 'google' | 'bing' | 'yahoo' | 'duckduckgo';
    gl?: string;
    hl?: string;
    num?: number;
    page?: number;
}
interface KeywordVolumeParams {
    keywords: string[];
    country?: string;
    language?: string;
}
interface BacklinksParams {
    domain: string;
    limit?: number;
}
interface DomainInfoParams {
    domain: string;
}
interface ScrapeParams {
    url: string;
    headers?: Record<string, string>;
}
interface ScrapeJSParams {
    url: string;
    js_code: string;
    headers?: Record<string, string>;
}
interface SEOAnalysisParams {
    url: string;
    keywords?: string[];
}
interface AIAnalysisParams {
    url: string;
    prompt: string;
}
interface RankingParams {
    domain: string;
    keyword: string;
    engine?: string;
    gl?: string;
}
interface PageIndexationParams {
    url: string;
    engine?: string;
}
declare class FetchSERPClient {
    private client;
    constructor(config: FetchSERPConfig);
    /**
     * Get structured SERP results
     */
    getSERP(params: SERPParams): Promise<any>;
    /**
     * Get SERP results with full HTML
     */
    getSERPHTML(params: SERPParams): Promise<any>;
    /**
     * Get SERP results with extracted text
     */
    getSERPText(params: SERPParams): Promise<any>;
    /**
     * Get JavaScript-rendered SERP with AI Overview
     */
    getSERPJS(params: SERPParams): Promise<any>;
    /**
     * Get AI Overview and AI Mode results
     */
    getSERPAI(params: SERPParams): Promise<any>;
    /**
     * Get cached US-only AI Mode results
     */
    getSERPAIMode(params: SERPParams): Promise<any>;
    /**
     * Get monthly search volume and competition metrics
     */
    getKeywordsSearchVolume(params: KeywordVolumeParams): Promise<any>;
    /**
     * Get keyword suggestions with metrics
     */
    getKeywordsSuggestions(params: {
        keyword: string;
        country?: string;
        language?: string;
    }): Promise<any>;
    /**
     * Generate long-tail keyword variations
     */
    getLongTailKeywords(params: {
        keyword: string;
        country?: string;
        language?: string;
    }): Promise<any>;
    /**
     * Get domain ranking for specific keywords
     */
    getDomainRanking(params: RankingParams): Promise<any>;
    /**
     * Get backlink data for a domain
     */
    getBacklinks(params: BacklinksParams): Promise<any>;
    /**
     * Get DNS, WHOIS, and tech stack information
     */
    getDomainInfo(params: DomainInfoParams): Promise<any>;
    /**
     * Extract emails from SERP results
     */
    getDomainEmails(params: {
        query: string;
        engine?: string;
    }): Promise<any>;
    /**
     * Get Moz domain authority metrics
     */
    getMozMetrics(params: {
        domain: string;
    }): Promise<any>;
    /**
     * Check page indexation status
     */
    getPageIndexation(params: PageIndexationParams): Promise<any>;
    /**
     * Get raw HTML without JavaScript
     */
    scrape(params: ScrapeParams): Promise<any>;
    /**
     * Custom JavaScript extraction
     */
    scrapeJS(params: ScrapeJSParams): Promise<any>;
    /**
     * JS extraction through proxy
     */
    scrapeJSWithProxy(params: ScrapeJSParams): Promise<any>;
    /**
     * Crawl entire domain
     */
    scrapeDomain(params: {
        domain: string;
        max_pages?: number;
    }): Promise<any>;
    /**
     * Technical & on-page SEO audit
     */
    analyzeSEO(params: SEOAnalysisParams): Promise<any>;
    /**
     * AI-powered content analysis
     */
    analyzeWithAI(params: AIAnalysisParams): Promise<any>;
    /**
     * Get current user information
     */
    getUser(): Promise<any>;
}
declare function getFetchSERPClient(): FetchSERPClient;

export { type AIAnalysisParams, type AIAnalysisResult, type AgentConfig, type AgentRunResult, type AnalyticsData, type AnalyticsPageData, type BacklinksParams, type CombinedPageData, type ContentAnalysisResult, type CoreWebVitals, type Database, type DomainInfoParams, FetchSERPClient, type FetchSERPConfig, type FetchUrlOptions, type FetchUrlResult, type GSCMetrics, type GSCPageData, type GSCQuery, type GSCTopQueriesResult, type ImpactLevel, type Json, type KeywordAnalysis, type KeywordStatus, type KeywordVolumeParams, type LighthouseMetrics, type OnPageIssue, type OnPageResult, type PSIAuditResult, type PSIIssue, type PageIndexationParams, type PageToCheck, type RankingParams, type ReadSitemapResult, type SEOAnalysisInput, type SEOAnalysisParams, type SEOSuggestion, type SERPParams, type ScoreBreakdown, type ScoringWeights, type ScrapeJSParams, type ScrapeParams, type SectionType, type SitemapUrl, type SuggestionStatus, type TextSuggestion, analyzeKeywords, analyzeOnPage, analyzePageContent, analyzePageWithAI, batchInsertGSCDaily, calculateKeywordDensity, calculatePriority, calculateReadability, calculateSEOScore, combineGSCAndAnalytics, createAIAnalysis, createAnonClient, createAudit, createContentVersion, createRun, createSuggestion, createTask, discoverSitemap, extractKeywords, fetchUrl, fetchUrlBatch, findLowCtrPages, findSitemapsInRobotsTxt, generateAllSuggestions, generateContentSuggestions, generateHeadingSuggestion, generateMetaDescriptionSuggestion, generateOnPageSuggestions, generateSchemaMarkup, generateTitleSuggestion, getAIAnalysesByPageId, getActiveTasksThisWeek, getAllPages, getAuditsByRun, getAuditsByUrl, getContentVersionsByPageId, getFetchSERPClient, getGSCDataByUrl, getLatestAudits, getPageAnalytics, getPageByUrl, getPagesWithLowScore, getPendingAISuggestions, getReadabilityLevel, getRecentRuns, getSuggestions, getTasksByPageId, getTopPages, getTopSuggestions, getWorstPagesWeek, gscPageData, gscTopQueries, psiAudit, psiAuditBatch, readSitemap, refreshGSCToken, refreshMaterializedViews, runAgent, runRetentionCleanup, shouldFlagPage, supabase, updatePageMetrics, updateRun, updateSuggestionStatus, updateTask, upsertGSCDaily, upsertPage };
