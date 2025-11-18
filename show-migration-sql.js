// Visar SQL som behöver köras
const fs = require('fs');

console.log('='.repeat(80));
console.log('AI SYSTEM MIGRATION SQL');
console.log('='.repeat(80));
console.log('\n📋 Kopiera SQL:en nedan och kör i Supabase Dashboard > SQL Editor:\n');
console.log('='.repeat(80));
console.log('\n');

const sql = fs.readFileSync('supabase/migrations/20250117000000_ai_system.sql', 'utf8');
console.log(sql);

console.log('\n');
console.log('='.repeat(80));
console.log('✅ När du har kört SQL:en i Supabase Dashboard är migrationen klar!');
console.log('='.repeat(80));
