-- Settings Table
-- Lagrar applikationsinställningar som API-nycklar och konfiguration

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  description TEXT,
  is_sensitive BOOLEAN DEFAULT false, -- Om värdet är känsligt (API-nycklar)
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index för snabb lookup (idempotent)
DROP INDEX IF EXISTS idx_settings_key;
CREATE INDEX idx_settings_key ON settings(setting_key);

-- Ta bort gamla känsliga settings om de finns (dessa ska nu vara i .env.local)
DELETE FROM settings WHERE setting_key IN ('psi_api_key', 'gsc_access_token');

-- Sätt in default-värden (endast icke-känsliga inställningar)
-- API-nycklar lagras säkert i .env.local istället
INSERT INTO settings (setting_key, setting_value, description, is_sensitive) VALUES
('site_url', NULL, 'Standard webbplats URL för automatisk körning', false),
('sitemap_url', NULL, 'Direkt URL till sitemap (valfritt)', false),
('gsc_site_url', NULL, 'Google Search Console verified site URL (valfritt)', false),
('max_pages_per_run', '20', 'Max antal sidor att analysera per körning', false)
ON CONFLICT (setting_key) DO NOTHING;

-- Function för att uppdatera updated_at (idempotent med CREATE OR REPLACE)
CREATE OR REPLACE FUNCTION update_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger för auto-update (idempotent)
DROP TRIGGER IF EXISTS settings_updated_at ON settings;
CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_settings_updated_at();

-- Row Level Security (RLS)
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Policy: Alla kan läsa inställningar (idempotent)
DROP POLICY IF EXISTS "Allow public read access to settings" ON settings;
CREATE POLICY "Allow public read access to settings"
  ON settings FOR SELECT
  TO PUBLIC
  USING (true);

-- Policy: Bara service_role kan uppdatera (via API) (idempotent)
DROP POLICY IF EXISTS "Allow service_role update access to settings" ON settings;
CREATE POLICY "Allow service_role update access to settings"
  ON settings FOR UPDATE
  TO service_role
  USING (true);

COMMENT ON TABLE settings IS 'Applikationsinställningar och konfiguration';
COMMENT ON COLUMN settings.setting_key IS 'Unik nyckel för inställningen';
COMMENT ON COLUMN settings.setting_value IS 'Värdet för inställningen (krypteras om is_sensitive=true)';
COMMENT ON COLUMN settings.is_sensitive IS 'Om true, värdet behandlas som känsligt (API-nycklar)';
