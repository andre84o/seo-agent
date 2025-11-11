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
    };
  };
}
