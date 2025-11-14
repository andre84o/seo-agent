// Database Types
// TypeScript definitions för Supabase tabeller

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
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
        Args: { page_url: string };
        Returns: Array<{
          section_type: string;
          suggestions: Json;
        }>;
      };
    };
  };
}

// Helper types for text suggestions
export type SectionType = 'title' | 'meta_description' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'image_alt' | 'canonical';
export type SuggestionStatus = 'pending' | 'edited' | 'applied' | 'dismissed';
export type ImpactLevel = 'low' | 'medium' | 'high';
export type KeywordStatus = 'suggested' | 'optimized' | 'over_used' | 'under_used';
