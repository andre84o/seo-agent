// Check if migration views exist
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mjxjxwlxbtdralhdpodo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qeGp4d2x4YnRkcmFsaGRwb2RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjk1MzU1OCwiZXhwIjoyMDc4NTI5NTU4fQ.vsKLoQhMA_y5UdHBm7ejAkr7GBoJxmBhv_reKWJTp7Q';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Checking database views...\n');

  // Check if this_week_priority_tasks view exists
  console.log('1. Checking this_week_priority_tasks view...');
  const { data: tasks, error: tasksError } = await supabase
    .from('this_week_priority_tasks')
    .select('*')
    .limit(1);

  if (tasksError) {
    console.log('❌ this_week_priority_tasks ERROR:', tasksError.message);
  } else {
    console.log('✅ this_week_priority_tasks exists!');
    console.log('   Rows:', tasks?.length || 0);
  }

  // Check if pending_ai_suggestions view exists
  console.log('\n2. Checking pending_ai_suggestions view...');
  const { data: suggestions, error: suggestionsError } = await supabase
    .from('pending_ai_suggestions')
    .select('*')
    .limit(1);

  if (suggestionsError) {
    console.log('❌ pending_ai_suggestions ERROR:', suggestionsError.message);
  } else {
    console.log('✅ pending_ai_suggestions exists!');
    console.log('   Rows:', suggestions?.length || 0);
  }

  // Check if seo_tasks table exists
  console.log('\n3. Checking seo_tasks table...');
  const { data: seoTasks, error: seoTasksError } = await supabase
    .from('seo_tasks')
    .select('*')
    .limit(1);

  if (seoTasksError) {
    console.log('❌ seo_tasks ERROR:', seoTasksError.message);
  } else {
    console.log('✅ seo_tasks exists!');
    console.log('   Rows:', seoTasks?.length || 0);
  }

  // Check if ai_analysis_history table exists
  console.log('\n4. Checking ai_analysis_history table...');
  const { data: analysis, error: analysisError } = await supabase
    .from('ai_analysis_history')
    .select('*')
    .limit(1);

  if (analysisError) {
    console.log('❌ ai_analysis_history ERROR:', analysisError.message);
  } else {
    console.log('✅ ai_analysis_history exists!');
    console.log('   Rows:', analysis?.length || 0);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Database check complete!');
}

checkDatabase().catch(console.error);
