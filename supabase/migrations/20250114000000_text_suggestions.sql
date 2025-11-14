-- SEO Agent Text Suggestions
-- Lägger till text-baserade förslag med klick-för-att-ersätta funktionalitet

-- ============================================================================
-- TEXT SUGGESTIONS TABLE
-- ============================================================================

-- Text suggestions: Konkreta textförslag per sektion
CREATE TABLE text_suggestions (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  section_type TEXT NOT NULL CHECK (section_type IN (
    'title',           -- <title> tag
    'meta_description', -- Meta description
    'h1',              -- H1 heading
    'h2',              -- H2 heading
    'h3',              -- H3 heading
    'h4',              -- H4 heading
    'h5',              -- H5 heading
    'h6',              -- H6 heading
    'paragraph',       -- Body paragraph
    'image_alt',       -- Image alt text
    'canonical'        -- Canonical URL
  )),
  section_identifier TEXT, -- CSS selector eller index för att identifiera exakt element
  original_text TEXT,      -- Nuvarande text
  suggested_text TEXT NOT NULL, -- AI-genererad förbättrad text
  edited_text TEXT,        -- Användarredigerad version (om användaren ändrar)
  keywords JSONB,          -- Array av keywords: ["keyword1", "keyword2"]
  keyword_density JSONB,   -- Keyword density analysis
  reason TEXT NOT NULL,    -- Förklaring varför förslaget är bättre
  impact TEXT NOT NULL CHECK (impact IN ('low', 'medium', 'high')),
  status TEXT DEFAULT 'pending' CHECK (status IN (
    'pending',      -- Väntar på att tillämpas
    'edited',       -- Användaren har redigerat förslaget
    'applied',      -- Har tillämpats på hemsidan
    'dismissed'     -- Användaren har avfärdat förslaget
  )),
  seo_score_impact INTEGER, -- Uppskattad poängförbättring (0-100)
  char_count INTEGER,       -- Antal tecken i suggested_text
  word_count INTEGER,       -- Antal ord i suggested_text
  readability_score NUMERIC(5,2), -- Läsbarhetsscore (Flesch Reading Ease)
  run_id BIGINT REFERENCES runs(run_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  applied_at TIMESTAMPTZ    -- När förslaget tillämpades
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_text_suggestions_url ON text_suggestions(url);
CREATE INDEX idx_text_suggestions_section ON text_suggestions(section_type);
CREATE INDEX idx_text_suggestions_status ON text_suggestions(status);
CREATE INDEX idx_text_suggestions_impact ON text_suggestions(impact);
CREATE INDEX idx_text_suggestions_run_id ON text_suggestions(run_id);
CREATE INDEX idx_text_suggestions_url_section ON text_suggestions(url, section_type);

-- GIN index för snabb keyword-sökning
CREATE INDEX idx_text_suggestions_keywords ON text_suggestions USING GIN(keywords);

-- ============================================================================
-- KEYWORD TRACKING TABLE
-- ============================================================================

-- Keywords: Spåra nyckelord över tid
CREATE TABLE keywords (
  id BIGSERIAL PRIMARY KEY,
  keyword TEXT NOT NULL,
  url TEXT NOT NULL,
  current_count INTEGER DEFAULT 0,   -- Nuvarande antal förekomster
  suggested_count INTEGER,            -- Rekommenderat antal
  density NUMERIC(5,2),               -- Nuvarande density %
  target_density NUMERIC(5,2),        -- Målad density %
  search_volume INTEGER,              -- Månatlig sökvolym (om tillgänglig)
  difficulty INTEGER,                 -- SEO svårighetsgrad 0-100
  relevance_score NUMERIC(5,2),       -- Hur relevant är keywordet för sidan
  status TEXT DEFAULT 'suggested' CHECK (status IN (
    'suggested',    -- Föreslaget att lägga till
    'optimized',    -- Redan optimerat
    'over_used',    -- Används för mycket
    'under_used'    -- Används för lite
  )),
  run_id BIGINT REFERENCES runs(run_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(url, keyword, run_id)
);

CREATE INDEX idx_keywords_url ON keywords(url);
CREATE INDEX idx_keywords_keyword ON keywords(keyword);
CREATE INDEX idx_keywords_status ON keywords(status);
CREATE INDEX idx_keywords_run_id ON keywords(run_id);

-- ============================================================================
-- CONTENT ANALYSIS TABLE
-- ============================================================================

-- Content analysis: Djupare innehållsanalys per sida
CREATE TABLE content_analysis (
  id BIGSERIAL PRIMARY KEY,
  url TEXT NOT NULL,
  run_id BIGINT REFERENCES runs(run_id) ON DELETE CASCADE,

  -- Struktur
  heading_structure JSONB,  -- Hierarki av headings
  paragraph_count INTEGER,
  word_count INTEGER,
  char_count INTEGER,

  -- Läsbarhet
  readability_score NUMERIC(5,2),  -- Flesch Reading Ease
  avg_sentence_length NUMERIC(5,2),
  avg_word_length NUMERIC(5,2),

  -- Keywords
  top_keywords JSONB,       -- Top 10 keywords med count
  keyword_density JSONB,    -- Overall keyword density
  missing_keywords JSONB,   -- Keywords som borde finnas

  -- Sentiment & Tone
  sentiment_score NUMERIC(5,2), -- -1 (negativ) till 1 (positiv)
  tone TEXT,                -- professional, casual, technical, etc.

  -- Actionable insights
  content_score INTEGER,    -- 0-100 content quality score
  improvement_areas JSONB,  -- Array av områden att förbättra

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_analysis_url ON content_analysis(url);
CREATE INDEX idx_content_analysis_run_id ON content_analysis(run_id);
CREATE INDEX idx_content_analysis_score ON content_analysis(content_score);

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Trigger för att uppdatera updated_at
CREATE TRIGGER update_text_suggestions_updated_at
  BEFORE UPDATE ON text_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_keywords_updated_at
  BEFORE UPDATE ON keywords
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Funktion för att räkna ord och tecken automatiskt
CREATE OR REPLACE FUNCTION calculate_text_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Använd edited_text om det finns, annars suggested_text
  IF NEW.edited_text IS NOT NULL THEN
    NEW.char_count := LENGTH(NEW.edited_text);
    NEW.word_count := array_length(regexp_split_to_array(trim(NEW.edited_text), '\s+'), 1);
  ELSE
    NEW.char_count := LENGTH(NEW.suggested_text);
    NEW.word_count := array_length(regexp_split_to_array(trim(NEW.suggested_text), '\s+'), 1);
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_text_suggestions_metrics
  BEFORE INSERT OR UPDATE ON text_suggestions
  FOR EACH ROW
  EXECUTE FUNCTION calculate_text_metrics();

-- Funktion för att hämta förslag per sida grupperade per sektion
CREATE OR REPLACE FUNCTION get_suggestions_by_page(page_url TEXT)
RETURNS TABLE (
  section_type TEXT,
  suggestions jsonb
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    ts.section_type,
    jsonb_agg(
      jsonb_build_object(
        'id', ts.id,
        'section_identifier', ts.section_identifier,
        'original_text', ts.original_text,
        'suggested_text', ts.suggested_text,
        'edited_text', ts.edited_text,
        'keywords', ts.keywords,
        'reason', ts.reason,
        'impact', ts.impact,
        'status', ts.status,
        'seo_score_impact', ts.seo_score_impact,
        'char_count', ts.char_count,
        'word_count', ts.word_count,
        'readability_score', ts.readability_score
      ) ORDER BY ts.impact DESC, ts.seo_score_impact DESC
    ) as suggestions
  FROM text_suggestions ts
  WHERE ts.url = page_url
    AND ts.status IN ('pending', 'edited')
  GROUP BY ts.section_type
  ORDER BY
    CASE ts.section_type
      WHEN 'title' THEN 1
      WHEN 'meta_description' THEN 2
      WHEN 'h1' THEN 3
      WHEN 'h2' THEN 4
      WHEN 'h3' THEN 5
      WHEN 'h4' THEN 6
      WHEN 'paragraph' THEN 7
      ELSE 8
    END;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE text_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_analysis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Server full access on text_suggestions" ON text_suggestions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on keywords" ON keywords
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Server full access on content_analysis" ON content_analysis
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE text_suggestions IS 'Konkreta textförslag per sektion med klick-för-att-ersätta';
COMMENT ON TABLE keywords IS 'Nyckelordsanalys och spårning per sida';
COMMENT ON TABLE content_analysis IS 'Djupgående innehållsanalys inkl. läsbarhet och sentiment';
COMMENT ON FUNCTION get_suggestions_by_page(TEXT) IS 'Hämtar alla förslag för en sida grupperat per sektion';
