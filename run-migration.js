// Kör migration direkt via Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://mjxjxwlxbtdralhdpodo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qeGp4d2x4YnRkcmFsaGRwb2RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjk1MzU1OCwiZXhwIjoyMDc4NTI5NTU4fQ.vsKLoQhMA_y5UdHBm7ejAkr7GBoJxmBhv_reKWJTp7Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function runMigration() {
  console.log('Läser migration fil...');
  const sql = fs.readFileSync('supabase/migrations/20250117000000_ai_system.sql', 'utf8');
  
  console.log('Kör migration...');
  const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });
  
  if (error) {
    console.error('❌ Migration misslyckades:', error);
    process.exit(1);
  }
  
  console.log('✅ Migration lyckades!');
  console.log('Data:', data);
}

runMigration();
