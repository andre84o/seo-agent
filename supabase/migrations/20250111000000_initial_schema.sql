-- SEO Agent Initial Schema
-- Skapar tabeller, index, policies och materialiserade vyer för SEO-agenten

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- TABLES
-- ============================================================================

-- Pages table: Lagrar alla övervakade sidor med senaste mätvärden
CREATE TABLE pages (
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
CREATE TABLE runs (
  run_id BIGSERIAL PRIMARY KEY,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finished_at TIMESTAMPTZ,
  pages_checked INTEGER DEFAULT 0,
  avg_score NUMERIC(5,2),
  status TEXT DEFAULT 'running', -- running, completed, failed
  error_message TEXT
);

-- Audits table: Varje sidas auditresultat per körning
CREATE TABLE audits (
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
CREATE TABLE suggestions (
  suggestion_id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  action TEXT NOT NULL, -- Beskrivning av förslag
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GSC Daily table: Google Search Console data per dag och URL
CREATE TABLE gsc_daily (
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

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Pages indexes
CREATE INDEX idx_pages_url ON pages(url);
CREATE INDEX idx_pages_score ON pages(senaste_score);
CREATE INDEX idx_pages_updated ON pages(updated_at);

-- Audits indexes
CREATE INDEX idx_audits_url ON audits(url);
CREATE INDEX idx_audits_run_id ON audits(run_id);
CREATE INDEX idx_audits_score ON audits(score);
CREATE INDEX idx_audits_created ON audits(created_at);

-- Suggestions indexes
CREATE INDEX idx_suggestions_url ON suggestions(url);
CREATE INDEX idx_suggestions_status ON suggestions(status);
CREATE INDEX idx_suggestions_impact ON suggestions(impact);

-- GSC indexes (sammansatt för effektiva queries)
CREATE INDEX idx_gsc_url_date ON gsc_daily(url, date DESC);
CREATE INDEX idx_gsc_date ON gsc_daily(date DESC);

-- ============================================================================
-- MATERIALIZED VIEWS
-- ============================================================================

-- Senaste audit per URL för snabb access
CREATE MATERIALIZED VIEW latest_audits AS
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

CREATE UNIQUE INDEX idx_latest_audits_url ON latest_audits(url);

-- Sämsta sidor senaste veckan med största negativa diff
CREATE MATERIALIZED VIEW worst_pages_week AS
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

CREATE INDEX idx_worst_pages_week_url ON worst_pages_week(url);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS på alla tabeller
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE gsc_daily ENABLE ROW LEVEL SECURITY;

-- Skapa roller för server (write) och app (read)
-- OBS: Du skapar dessa roller i Supabase Dashboard under Authentication > Policies

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

-- Trigger för att auto-uppdatera updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON pages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_suggestions_updated_at
  BEFORE UPDATE ON suggestions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Funktion för att refresha materialiserade vyer
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY latest_audits;
  REFRESH MATERIALIZED VIEW CONCURRENTLY worst_pages_week;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Inget initial data, tabellerna börjar tomma

COMMENT ON TABLE pages IS 'Lagrar alla övervakade sidor med senaste mätvärden';
COMMENT ON TABLE runs IS 'Varje nattlig eller manuell körning';
COMMENT ON TABLE audits IS 'Auditresultat per sida och körning';
COMMENT ON TABLE suggestions IS 'Genererade förbättringsförslag';
COMMENT ON TABLE gsc_daily IS 'Google Search Console data per dag';
