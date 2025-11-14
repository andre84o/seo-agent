-- ============================================================================
-- SEO AGENT - KOMPLETT DATABASSCHEMA
-- Kör detta script i Supabase SQL Editor för att skapa alla tabeller och vyer
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Pages table: Lagrar alla övervakade sidor med senaste mätvärden
CREATE TABLE IF NOT EXISTS pages (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL UNIQUE,
  senaste_score INTEGER,
  senaste_lcp NUMERIC(8,2), -- i sekunder
  senaste_cls NUMERIC(6,4),
  senaste_inp NUMERIC(8,2), -- i millisekunder
  last_seen_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Runs table: En körning per natt eller manuell trigger
CREATE TABLE IF NOT EXISTS runs (
  run_id BIGSERIAL PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  pages_checked INTEGER DEFAULT 0,
  avg_score NUMERIC(5,2),
  status TEXT DEFAULT 'running', -- running, completed, failed
  error_message TEXT
);

-- Audits table: Varje sidas auditresultat per körning
CREATE TABLE IF NOT EXISTS audits (
  audit_id BIGSERIAL PRIMARY KEY,
  run_id BIGINT NOT NULL REFERENCES runs(run_id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  score INTEGER NOT NULL, -- 0-100
  lcp NUMERIC(8,2),
  cls NUMERIC(6,4),
  inp NUMERIC(8,2),
  issues JSONB, -- Rådata från PSI och on-page analys
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(run_id, url) -- Idempotens: samma URL inte dubbelt per run
);

-- Suggestions table: Förslag genererade från audits
CREATE TABLE IF NOT EXISTS suggestions (
  suggestion_id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  action TEXT NOT NULL, -- Beskrivning av förslag
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GSC Daily table: Google Search Console data per dag och URL
CREATE TABLE IF NOT EXISTS gsc_daily (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  date DATE NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr NUMERIC(6,4), -- Click-through rate
  position NUMERIC(6,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(url, date)
);

-- Weekly summaries: Veckosammanfattningar för äldre data (efter 90 dagar)
CREATE TABLE IF NOT EXISTS weekly_summaries (
  id BIGSERIAL PRIMARY KEY,
  week_start DATE NOT NULL,
  week_end DATE NOT NULL,
  total_pages_checked INTEGER,
  avg_score NUMERIC(5,2),
  avg_lcp NUMERIC(8,2),
  avg_cls NUMERIC(6,4),
  avg_inp NUMERIC(8,2),
  top_issues JSONB, -- Array av vanligaste issues
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(week_start)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Pages indexes
CREATE INDEX IF NOT EXISTS idx_pages_url ON pages(url);
CREATE INDEX IF NOT EXISTS idx_pages_score ON pages(senaste_score);
CREATE INDEX IF NOT EXISTS idx_pages_updated ON pages(updated_at);

-- Audits indexes
CREATE INDEX IF NOT EXISTS idx_audits_url ON audits(url);
CREATE INDEX IF NOT EXISTS idx_audits_run_id ON audits(run_id);
CREATE INDEX IF NOT EXISTS idx_audits_score ON audits(score);
CREATE INDEX IF NOT EXISTS idx_audits_created ON audits(created_at);

-- Suggestions indexes
CREATE INDEX IF NOT EXISTS idx_suggestions_url ON suggestions(url);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions(status);
CREATE INDEX IF NOT EXISTS idx_suggestions_impact ON suggestions(impact);

-- GSC indexes (sammansatt för effektiva queries)
CREATE INDEX IF NOT EXISTS idx_gsc_url_date ON gsc_daily(url, date DESC);
CREATE INDEX IF NOT EXISTS idx_gsc_date ON gsc_daily(date DESC);

-- Weekly summaries index
CREATE INDEX IF NOT EXISTS idx_weekly_summaries_week ON weekly_summaries(week_start DESC);

-- ============================================================================
-- VIEWS (med RLS-stöd)
-- ============================================================================

-- Drop existing views if they exist
DROP MATERIALIZED VIEW IF EXISTS latest_audits CASCADE;
DROP MATERIALIZED VIEW IF EXISTS worst_pages_week CASCADE;
DROP VIEW IF EXISTS latest_audits CASCADE;
DROP VIEW IF EXISTS worst_pages_week CASCADE;

-- Senaste audit per URL för snabb access
-- Använder vanliga vyer med security_invoker för RLS-stöd
CREATE OR REPLACE VIEW latest_audits
WITH (security_invoker = true) AS
SELECT DISTINCT ON (url)
  audit_id,
  run_id,
  url,
  score,
  lcp,
  cls,
  inp,
  issues,
  created_at
FROM audits
ORDER BY url, created_at DESC;

-- Sämsta sidor senaste veckan med största negativa diff
CREATE OR REPLACE VIEW worst_pages_week
WITH (security_invoker = true) AS
WITH recent_audits AS (
  SELECT
    url,
    score,
    lcp,
    cls,
    inp,
    created_at,
    LAG(score) OVER (PARTITION BY url ORDER BY created_at) as prev_score
  FROM audits
  WHERE created_at > NOW() - INTERVAL '7 days'
)
SELECT
  url,
  score as current_score,
  prev_score,
  (score - COALESCE(prev_score, score)) as score_diff,
  lcp,
  cls,
  inp
FROM recent_audits
WHERE prev_score IS NOT NULL
ORDER BY (score - prev_score) ASC, score ASC
LIMIT 50;

-- Index på underliggande tabeller för bättre prestanda
CREATE INDEX IF NOT EXISTS idx_audits_url_created ON audits(url, created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS på alla tabeller
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gsc_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Server full access on pages" ON pages;
DROP POLICY IF EXISTS "Server full access on runs" ON runs;
DROP POLICY IF EXISTS "Server full access on audits" ON audits;
DROP POLICY IF EXISTS "Server full access on suggestions" ON suggestions;
DROP POLICY IF EXISTS "Server full access on gsc_daily" ON gsc_daily;
DROP POLICY IF EXISTS "Server full access on weekly_summaries" ON weekly_summaries;

-- Policy för server roll (full access)
CREATE POLICY "Server full access on pages" ON pages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on runs" ON runs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on audits" ON audits
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on suggestions" ON suggestions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on gsc_daily" ON gsc_daily
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on weekly_summaries" ON weekly_summaries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Funktion för att uppdatera updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_pages_updated_at ON pages;
DROP TRIGGER IF EXISTS update_suggestions_updated_at ON suggestions;

-- Trigger för att auto-uppdatera updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at
  BEFORE UPDATE ON suggestions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Funktion för att refresha vyer (legacy - nu auto-uppdateras vyerna)
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
  -- Vyerna är nu vanliga vyer och uppdateras automatiskt
  -- Denna funktion behålls för bakåtkompatibilitet
  RAISE NOTICE 'Views are now regular views and auto-update. No refresh needed.';
END;
$$ LANGUAGE plpgsql;

-- Funktion för att skapa veckosammanfattning från gamla audits
CREATE OR REPLACE FUNCTION create_weekly_summary(summary_week_start DATE)
RETURNS void AS $$
DECLARE
  summary_week_end DATE;
BEGIN
  summary_week_end := summary_week_start + INTERVAL '6 days';

  INSERT INTO weekly_summaries (
    week_start,
    week_end,
    total_pages_checked,
    avg_score,
    avg_lcp,
    avg_cls,
    avg_inp,
    top_issues
  )
  SELECT
    summary_week_start,
    summary_week_end,
    COUNT(DISTINCT url) as total_pages_checked,
    AVG(score) as avg_score,
    AVG(lcp) as avg_lcp,
    AVG(cls) as avg_cls,
    AVG(inp) as avg_inp,
    jsonb_agg(DISTINCT issues) as top_issues
  FROM audits
  WHERE created_at >= summary_week_start
    AND created_at < summary_week_end + INTERVAL '1 day'
  ON CONFLICT (week_start) DO UPDATE SET
    total_pages_checked = EXCLUDED.total_pages_checked,
    avg_score = EXCLUDED.avg_score,
    avg_lcp = EXCLUDED.avg_lcp,
    avg_cls = EXCLUDED.avg_cls,
    avg_inp = EXCLUDED.avg_inp,
    top_issues = EXCLUDED.top_issues;
END;
$$ LANGUAGE plpgsql;

-- Funktion för att rensa gamla audits (äldre än 90 dagar)
CREATE OR REPLACE FUNCTION cleanup_old_audits()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
  cutoff_date TIMESTAMPTZ;
BEGIN
  cutoff_date := NOW() - INTERVAL '90 days';

  -- Ta bort gamla audits
  DELETE FROM audits
  WHERE created_at < cutoff_date;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  -- Ta bort gamla runs som inte har audits kvar
  DELETE FROM runs
  WHERE run_id NOT IN (SELECT DISTINCT run_id FROM audits)
    AND finished_at < cutoff_date;

  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Funktion för att rensa gamla GSC data (äldre än 90 dagar)
CREATE OR REPLACE FUNCTION cleanup_old_gsc_data()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
  cutoff_date DATE;
BEGIN
  cutoff_date := CURRENT_DATE - INTERVAL '90 days';

  DELETE FROM gsc_daily
  WHERE date < cutoff_date;

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Huvudfunktion för retention (kör detta i cron)
CREATE OR REPLACE FUNCTION run_retention_cleanup()
RETURNS jsonb AS $$
DECLARE
  result jsonb;
  audits_deleted INTEGER;
  gsc_deleted INTEGER;
  weeks_to_summarize RECORD;
BEGIN
  -- Skapa veckosammanfattningar för veckor mellan 90 och 97 dagar gamla
  FOR weeks_to_summarize IN
    SELECT DISTINCT DATE_TRUNC('week', created_at)::DATE as week_start
    FROM audits
    WHERE created_at < NOW() - INTERVAL '90 days'
      AND created_at >= NOW() - INTERVAL '97 days'
      AND DATE_TRUNC('week', created_at)::DATE NOT IN (
        SELECT week_start FROM weekly_summaries
      )
  LOOP
    PERFORM create_weekly_summary(weeks_to_summarize.week_start);
  END LOOP;

  -- Rensa gamla audits
  audits_deleted := cleanup_old_audits();

  -- Rensa gamla GSC data
  gsc_deleted := cleanup_old_gsc_data();

  -- Refresh materialiserade vyer
  PERFORM refresh_materialized_views();

  -- Returnera resultat
  result := jsonb_build_object(
    'audits_deleted', audits_deleted,
    'gsc_deleted', gsc_deleted,
    'timestamp', NOW()
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE pages IS 'Lagrar alla övervakade sidor med senaste mätvärden';
COMMENT ON TABLE runs IS 'Varje nattlig eller manuell körning';
COMMENT ON TABLE audits IS 'Auditresultat per sida och körning';
COMMENT ON TABLE suggestions IS 'Genererade förbättringsförslag';
COMMENT ON TABLE gsc_daily IS 'Google Search Console data per dag';
COMMENT ON TABLE weekly_summaries IS 'Veckosammanfattningar av äldre audit-data efter 90 dagar';
COMMENT ON VIEW latest_audits IS 'Senaste audit per URL - uppdateras automatiskt';
COMMENT ON VIEW worst_pages_week IS 'Sämsta sidor senaste veckan - uppdateras automatiskt';
COMMENT ON FUNCTION refresh_materialized_views() IS 'Legacy funktion - views uppdateras nu automatiskt';
COMMENT ON FUNCTION run_retention_cleanup() IS 'Huvudfunktion för retention - körs veckovis via cron';
COMMENT ON FUNCTION cleanup_old_audits() IS 'Rensar audits äldre än 90 dagar';
COMMENT ON FUNCTION cleanup_old_gsc_data() IS 'Rensar GSC data äldre än 90 dagar';

-- ============================================================================
-- SLUTFÖRT!
-- ============================================================================

SELECT 'Schema skapades framgångsrikt! 🎉' as status;
