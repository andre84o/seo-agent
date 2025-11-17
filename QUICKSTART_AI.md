# 🚀 Snabbstart Guide - AI SEO Manager

## Steg 1: Installera dependencies ✅
Redan klart! Nya paket installerade:
- `openai` (v4.77.3)
- `googleapis` (v144.0.0)
- `zod` (v3.24.1)

## Steg 2: Konfigurera OpenAI API-nyckel

### Skaffa OpenAI API-nyckel
1. Gå till https://platform.openai.com/api-keys
2. Logga in eller skapa konto
3. Klicka "Create new secret key"
4. Kopiera nyckeln (visas bara en gång!)

### Lägg till i .env.local
```bash
# Öppna .env.local och lägg till:
OPENAI_API_KEY=sk-proj-din-nyckel-här
```

## Steg 3: (Valfritt) Google Analytics

Om du vill ha Analytics-data:

1. Gå till https://console.cloud.google.com/
2. Aktivera "Google Analytics Data API"
3. Skapa Service Account credentials
4. Lägg till i .env.local:
```bash
GA_PROPERTY_ID=ditt-property-id
```

## Steg 4: Kör databas-migration

```powershell
# Koppla till Supabase och kör ny migration
# I Supabase Dashboard SQL Editor, kör:
# supabase/migrations/20250117000000_ai_system.sql
```

Eller via Supabase CLI:
```powershell
npx supabase db push
```

## Steg 5: Starta projektet

```powershell
npm run dev
```

Öppna http://localhost:3000

## Steg 6: Testa AI-funktionen

1. Kör först en agent run för att få sidor i databasen
2. Gå till **AI Analys**-fliken
3. Ange URL för en sida från din site
4. Klicka "Analysera"

AI kommer att:
- ✅ Analysera sidans SEO
- ✅ Hämta GSC-data
- ✅ Generera konkreta förslag
- ✅ Skapa tasks automatiskt (om valt)

## 🎯 Nästa steg

### Workflow
1. **Agent Run** → Identifiera problem-sidor
2. **AI Analys** → Få detaljerade förslag
3. **Todo-lista** → Implementera åtgärder
4. **Agent Run** → Mät resultat
5. **Repeat!**

### Tips
- Kör AI-analys på sidor med många impressions men låg CTR
- Fokusera på position 5-15 (lätt att förbättra till topp 3)
- Implementera high-priority tasks först
- Vänta 2-4 veckor mellan ändringar för att mäta effekt

## 📊 Vad kostar det?

**OpenAI GPT-4o:**
- Cirka $0.03-0.06 per analys
- 10 analyser/dag ≈ $1.50/månad
- Billigare än en kopp kaffe, smartare än en junior SEO 😉

**Google APIs:**
- Gratis för normalt bruk
- GSC: 1000 requests/dag
- Analytics: 100,000 requests/dag

## ❓ Felsökning

### "OpenAI API-nyckel saknas"
→ Kontrollera att `OPENAI_API_KEY` finns i `.env.local`

### "Sida inte hittad i databasen"
→ Kör först agent run för att indexera sidor

### "GSC data error"
→ Valfritt! AI fungerar utan GSC, men ger bättre förslag med det

### Compile errors
→ Kör: `npm install` igen

## 🎉 Klart!

Du har nu en komplett AI-driven SEO-manager!

**Viktiga filer att känna till:**
- `lib/ai/openai-client.ts` - AI-logik
- `app/api/seo/analyze-page/route.ts` - AI-analys endpoint
- `components/dashboard/AIAnalysis.tsx` - AI-UI
- `components/dashboard/SEOTasks.tsx` - Todo-lista

Se `AI_SEO_README.md` för fullständig dokumentation.
