================================================================================
AI SYSTEM MIGRATION SQL
================================================================================

📋 Kopiera SQL:en nedan och kör i Supabase Dashboard > SQL Editor:

================================================================================


-- AI SEO Tasks & Suggestions Schema
-- Uppdaterad för att inkludera AI-genererade förslag och todo-system

-- ============================================================================
-- AI SUGGESTIONS TABLE
-- ============================================================================
-- Uppdatera suggestions-tabellen för att inkludera AI-specifik data
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS ai_generated BOOLEAN DEFAULT false;
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS ai_reasoning TEXT;
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS expected_impact TEXT;
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS implementation_notes TEXT;

-- Lägg till nya kolumner för bättre kategorisering
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS suggestion_type VARCHAR(50);
ALTER TABLE suggestions ADD COLUMN IF NOT EXISTS category VARCHAR(100);

-- Index för snabbare queries
CREATE INDEX IF NOT EXISTS idx_suggestions_ai_generated ON suggestions(ai_generated);
CREATE INDEX IF NOT EXISTS idx_suggestions_type ON suggestions(suggestion_type);
CREATE INDEX IF NOT EXISTS idx_suggestions_status ON suggestions(status);

-- ============================================================================
-- SEO TASKS TABLE (TODO-SYSTEM)
-- ============================================================================
CREATE TABLE IF NOT EXISTS seo_tasks (
  id SERIAL PRIMARY KEY,
  page_id BIGINT REFERENCES pages(id) ON DELETE CASCADE,
  suggestion_id BIGINT REFERENCES suggestions(suggestion_id) ON DELETE SET NULL,
  
  -- Task metadata
  title VARCHAR(500) NOT NULL,
  description TEXT,
  task_type VARCHAR(50), -- 'title', 'meta', 'content', 'technical', 'schema', etc.
  priority VARCHAR(20) DEFAULT 'medium', -- 'high', 'medium', 'low'
  status VARCHAR(20) DEFAULT 'todo', -- 'todo', 'in_progress', 'done', 'skipped'
  
  -- AI-genererade detaljer
  ai_generated BOOLEAN DEFAULT false,
  expected_impact TEXT,
  effort_estimate VARCHAR(20), -- 'small', 'medium', 'large'
  
  -- Implementation
  assigned_to VARCHAR(100),
  due_date TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  completed_by VARCHAR(100),
  
  -- Tracking
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Notes
  notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_tasks_page_id ON seo_tasks(page_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON seo_tasks(status);
CREATE INDEX IF NOT EXISTS idx_tasks_priority ON seo_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON seo_tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_ai_generated ON seo_tasks(ai_generated);

-- ============================================================================
-- AI ANALYSIS HISTORY
-- ============================================================================
CREATE TABLE IF NOT EXISTS ai_analysis_history (
  id SERIAL PRIMARY KEY,
  page_id BIGINT REFERENCES pages(id) ON DELETE CASCADE,
  run_id BIGINT REFERENCES runs(run_id) ON DELETE SET NULL,
  
  -- Analysis input
  analysis_type VARCHAR(50) DEFAULT 'full_seo', -- 'full_seo', 'content_only', 'technical_only'
  
  -- AI response
  ai_summary TEXT,
  ai_score INTEGER, -- 0-100
  suggestions_count INTEGER DEFAULT 0,
  
  -- Data sources used
  used_gsc_data BOOLEAN DEFAULT false,
  used_analytics_data BOOLEAN DEFAULT false,
  used_psi_data BOOLEAN DEFAULT false,
  
  -- Results
  title_suggestions JSONB,
  meta_suggestions JSONB,
  faq_suggestions JSONB,
  content_outline JSONB,
  keywords JSONB,
  full_response JSONB, -- Hela AI-svaret
  
  -- Metadata
  model_used VARCHAR(50) DEFAULT 'gpt-4o',
  tokens_used INTEGER,
  analysis_duration_ms INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_analysis_page_id ON ai_analysis_history(page_id);
CREATE INDEX IF NOT EXISTS idx_analysis_run_id ON ai_analysis_history(run_id);
CREATE INDEX IF NOT EXISTS idx_analysis_created_at ON ai_analysis_history(created_at DESC);

-- ============================================================================
-- CONTENT VERSIONS (för att spåra ändringar)
-- ============================================================================
CREATE TABLE IF NOT EXISTS content_versions (
  id SERIAL PRIMARY KEY,
  page_id BIGINT REFERENCES pages(id) ON DELETE CASCADE,
  task_id BIGINT REFERENCES seo_tasks(id) ON DELETE SET NULL,
  
  -- Version metadata
  version_number INTEGER NOT NULL,
  version_type VARCHAR(50), -- 'title', 'meta_description', 'h1', 'full_content'
  
  -- Content
  previous_value TEXT,
  new_value TEXT,
  
  -- Change tracking
  changed_by VARCHAR(100),
  change_reason TEXT,
  ai_suggested BOOLEAN DEFAULT false,
  
  -- Performance tracking
  previous_metrics JSONB, -- CTR, impressions, etc före ändring
  new_metrics JSONB, -- Efter ändring
  
  -- Timestamps
  implemented_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metrics_compared_at TIMESTAMP WITH TIME ZONE,
  
  -- Notes
  notes TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_versions_page_id ON content_versions(page_id);
CREATE INDEX IF NOT EXISTS idx_versions_task_id ON content_versions(task_id);
CREATE INDEX IF NOT EXISTS idx_versions_implemented_at ON content_versions(implemented_at DESC);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Auto-update timestamp för seo_tasks
CREATE OR REPLACE FUNCTION update_task_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  
  -- Sätt completed_at när status ändras till 'done'
  IF NEW.status = 'done' AND OLD.status != 'done' THEN
    NEW.completed_at = NOW();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tasks_updated_at ON seo_tasks;
CREATE TRIGGER tasks_updated_at
  BEFORE UPDATE ON seo_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_task_updated_at();

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View: Aktiva tasks per sida
CREATE OR REPLACE VIEW active_tasks_per_page AS
SELECT 
  p.url,
  p.id as page_id,
  COUNT(CASE WHEN t.status = 'todo' THEN 1 END) as todo_count,
  COUNT(CASE WHEN t.status = 'in_progress' THEN 1 END) as in_progress_count,
  COUNT(CASE WHEN t.status = 'done' THEN 1 END) as done_count,
  COUNT(CASE WHEN t.priority = 'high' THEN 1 END) as high_priority_count,
  MAX(t.created_at) as latest_task_created
FROM pages p
LEFT JOIN seo_tasks t ON p.id = t.page_id
GROUP BY p.id, p.url;

-- View: Denna veckans prioriterade tasks
CREATE OR REPLACE VIEW this_week_priority_tasks AS
SELECT 
  t.id,
  t.title,
  t.task_type,
  t.priority,
  t.status,
  t.expected_impact,
  t.due_date,
  p.url as page_url,
  p.senaste_score
FROM seo_tasks t
JOIN pages p ON t.page_id = p.id
WHERE t.status IN ('todo', 'in_progress')
  AND (t.due_date IS NULL OR t.due_date <= NOW() + INTERVAL '7 days')
ORDER BY 
  CASE t.priority 
    WHEN 'high' THEN 1 
    WHEN 'medium' THEN 2 
    WHEN 'low' THEN 3 
  END,
  t.due_date NULLS LAST,
  t.created_at DESC;

-- View: AI suggestions som inte blivit tasks än
CREATE OR REPLACE VIEW pending_ai_suggestions AS
SELECT 
  s.id as suggestion_id,
  s.page_id,
  p.url,
  s.type as suggestion_type,
  s.priority,
  s.description,
  s.ai_reasoning,
  s.expected_impact,
  s.created_at
FROM suggestions s
JOIN pages p ON s.page_id = p.id
LEFT JOIN seo_tasks t ON s.id = t.suggestion_id
WHERE s.ai_generated = true
  AND s.status = 'pending'
  AND t.id IS NULL
ORDER BY 
  CASE s.priority 
    WHEN 'high' THEN 1 
    WHEN 'medium' THEN 2 
    WHEN 'low' THEN 3 
  END,
  s.created_at DESC;

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE seo_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Allow public read access to tasks" ON seo_tasks FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access to analysis" ON ai_analysis_history FOR SELECT TO PUBLIC USING (true);
CREATE POLICY "Allow public read access to versions" ON content_versions FOR SELECT TO PUBLIC USING (true);

-- Service role can do everything
CREATE POLICY "Allow service_role full access to tasks" ON seo_tasks FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service_role full access to analysis" ON ai_analysis_history FOR ALL TO service_role USING (true);
CREATE POLICY "Allow service_role full access to versions" ON content_versions FOR ALL TO service_role USING (true);

-- ============================================================================
-- COMMENTS
-- ============================================================================

COMMENT ON TABLE seo_tasks IS 'SEO todo-lista med AI-genererade och manuella uppgifter';
COMMENT ON TABLE ai_analysis_history IS 'Historik över AI-analyser och deras resultat';
COMMENT ON TABLE content_versions IS 'Spårar ändringar i content och deras effekt på metrics';

COMMENT ON COLUMN seo_tasks.expected_impact IS 'AI:s uppskattning av förväntad effekt (t.ex. "+15% CTR")';
COMMENT ON COLUMN seo_tasks.effort_estimate IS 'Uppskattad arbetsinsats för att slutföra';

COMMENT ON VIEW this_week_priority_tasks IS 'Prioriterade tasks för denna vecka';
COMMENT ON VIEW pending_ai_suggestions IS 'AI-suggestions som väntar på att bli tasks';



================================================================================
✅ När du har kört SQL:en i Supabase Dashboard är migrationen klar!
================================================================================
