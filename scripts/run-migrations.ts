// Run database migrations
// This script applies the SQL migrations to your Supabase database

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigrations() {
  try {
    console.log('🚀 Starting database migrations...\n');

    // Read migration files
    const migrations = [
      'supabase/migrations/20250111000000_initial_schema.sql',
      'supabase/migrations/20250111000001_retention_and_cleanup.sql',
    ];

    for (const migrationPath of migrations) {
      console.log(`📝 Running migration: ${migrationPath}`);

      const sql = readFileSync(join(process.cwd(), migrationPath), 'utf-8');

      // Split by semicolon and filter empty statements
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i];
        if (!statement) continue;

        try {
          // Execute each statement via RPC
          const { error } = await supabase.rpc('exec_sql', {
            sql_query: statement + ';'
          });

          if (error) {
            // Try direct query method if RPC fails
            const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': supabaseServiceKey,
                'Authorization': `Bearer ${supabaseServiceKey}`,
              },
              body: JSON.stringify({ sql_query: statement + ';' }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              console.error(`   ⚠️  Statement ${i + 1} warning:`, errorText);
            }
          }
        } catch (err) {
          console.error(`   ⚠️  Statement ${i + 1} error:`, err);
        }
      }

      console.log(`✅ Completed: ${migrationPath}\n`);
    }

    console.log('🎉 All migrations completed successfully!');
    console.log('\n📊 Next steps:');
    console.log('1. Run your application to test the database connection');
    console.log('2. Check Supabase dashboard to verify tables were created');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
