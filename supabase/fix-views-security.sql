-- ============================================================================
-- FIX: Lägg till RLS för materialiserade vyer
-- Kör detta efter att du kört complete-schema.sql
-- ============================================================================

-- Alternativ 1: Gör vyerna till vanliga vyer (rekommenderat för mindre dataset)
-- Vanliga vyer kan ha RLS och är alltid uppdaterade

DROP MATERIALIZED VIEW IF EXISTS latest_audits CASCADE;
DROP MATERIALIZED VIEW IF EXISTS worst_pages_week CASCADE;

-- Skapa vanliga vyer istället (med RLS support)
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

-- Lägg till RLS policies för vyerna
ALTER VIEW latest_audits SET (security_invoker = true);
ALTER VIEW worst_pages_week SET (security_invoker = true);

-- Skapa index på underliggande tabeller för snabbare queries
CREATE INDEX IF NOT EXISTS idx_audits_url_created ON audits(url, created_at DESC);

-- Uppdatera refresh_materialized_views function att inte längre behövas
CREATE OR REPLACE FUNCTION refresh_materialized_views()
RETURNS void AS $$
BEGIN
  -- Vyerna är nu vanliga vyer och uppdateras automatiskt
  -- Denna funktion behålls för bakåtkompatibilitet men gör ingenting
  RAISE NOTICE 'Views are now regular views and auto-update. No refresh needed.';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION refresh_materialized_views() IS 'No longer needed - views are now regular views that auto-update';

SELECT 'Views säkerhetsuppdatering klar! ✅' as status;
