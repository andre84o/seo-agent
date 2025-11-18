// Kör AI system migration direkt via Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://mjxjxwlxbtdralhdpodo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qeGp4d2x4YnRkcmFsaGRwb2RvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjk1MzU1OCwiZXhwIjoyMDc4NTI5NTU4fQ.vsKLoQhMA_y5UdHBm7ejAkr7GBoJxmBhv_reKWJTp7Q';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  console.log('📖 Läser migration fil...');
  const sql = fs.readFileSync('supabase/migrations/20250117000000_ai_system.sql', 'utf8');

  console.log('🔄 Kör migration via Supabase...');

  try {
    // Split SQL into statements (simple version - assumes statements end with ;)
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    console.log(`📝 Hittade ${statements.length} SQL-satser att köra...`);

    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip comments
      if (statement.startsWith('--')) continue;

      try {
        // Try to execute via REST API
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify({ query: statement + ';' })
        });

        if (!response.ok) {
          // Some statements might fail if they already exist (like ADD COLUMN IF NOT EXISTS)
          // Those are often safe to ignore
          const errorText = await response.text();
          if (errorText.includes('already exists') || errorText.includes('duplicate')) {
            console.log(`⚠️  Statement ${i + 1} already exists (skipping)`);
          } else {
            console.error(`❌ Statement ${i + 1} failed:`, errorText.substring(0, 200));
            errorCount++;
          }
        } else {
          successCount++;
          if (i % 10 === 0 && i > 0) {
            console.log(`✓ ${i} statements processed...`);
          }
        }
      } catch (err) {
        console.error(`❌ Error on statement ${i + 1}:`, err.message);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);

    if (errorCount === 0) {
      console.log('\n✅ Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with errors. Check the logs above.');
    }

  } catch (error) {
    console.error('❌ Migration misslyckades:', error);
    process.exit(1);
  }
}

runMigration().catch(console.error);
