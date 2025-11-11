-- SEO Agent Retention och Cleanup
-- Hanterar data retention (90 dagar) och veckosammanfattningar

-- ============================================================================
-- WEEKLY SUMMARIES TABLE
-- ============================================================================

-- Veckosammanfattningar för äldre data (efter 90 dagar)
CREATE TABLE weekly_summaries (
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

CREATE INDEX idx_weekly_summaries_week ON weekly_summaries(week_start DESC);

-- ============================================================================
-- RETENTION FUNCTIONS
-- ============================================================================

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
-- RLS FÖR NYA TABELLER
-- ============================================================================

ALTER TABLE weekly_summaries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Server full access on weekly_summaries" ON weekly_summaries
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE weekly_summaries IS 'Veckosammanfattningar av äldre audit-data efter 90 dagar';
COMMENT ON FUNCTION run_retention_cleanup() IS 'Huvudfunktion för retention - körs veckovis via cron';
COMMENT ON FUNCTION cleanup_old_audits() IS 'Rensar audits äldre än 90 dagar';
COMMENT ON FUNCTION cleanup_old_gsc_data() IS 'Rensar GSC data äldre än 90 dagar';
