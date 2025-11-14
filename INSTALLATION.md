# SEO Agent - Installationsguide

Komplett guide för att installera SEO Agent i nya Next.js-projekt.

## 📋 Innehållsförteckning

1. [Krav](#krav)
2. [Installation](#installation)
3. [Databaskonfiguration](#databaskonfiguration)
4. [Miljövariabler](#miljövariabler)
5. [Körning](#körning)
6. [Användning](#användning)

---

## 🔧 Krav

### Systemkrav
- **Node.js**: v18 eller senare
- **npm**: v8 eller senare (eller yarn/pnpm)
- **Git**: För versionshantering

### Externa tjänster
1. **Supabase-konto** (gratis tier fungerar)
   - Skapa konto på [supabase.com](https://supabase.com)
   - Skapa nytt projekt

2. **Google PageSpeed Insights API-nyckel** (gratis)
   - Gå till [Google Cloud Console](https://console.cloud.google.com/)
   - Aktivera PageSpeed Insights API
   - Skapa API-nyckel

3. **Google Search Console** (valfritt)
   - För att hämta CTR och position data
   - Kräver OAuth2-konfiguration

---

## 📦 Installation

### Steg 1: Klona eller kopiera projektet

```bash
# Klona från GitHub
git clone <your-repo-url> seo-agent
cd seo-agent

# ELLER kopiera filerna manuellt till ditt projekt
```

### Steg 2: Installera beroenden

```bash
npm install
```

### Huvudberoenden som installeras:
- `next` (v16+)
- `react` (v19+)
- `@supabase/supabase-js` - Databasklient
- `axios` - HTTP requests
- `cheerio` - HTML parsing
- `fast-xml-parser` - Sitemap parsing
- `tailwindcss` - Styling

---

## 🗄️ Databaskonfiguration

### Steg 1: Skapa Supabase-projekt

1. Logga in på [Supabase Dashboard](https://app.supabase.com)
2. Klicka "New project"
3. Fyll i projektdetaljer:
   - **Name**: SEO Agent (eller valfritt namn)
   - **Database Password**: Välj ett starkt lösenord
   - **Region**: Välj närmaste region
   - **Pricing Plan**: Free (eller högre)

4. Vänta tills projektet är skapat (~2 minuter)

### Steg 2: Hämta API-nycklar

I Supabase Dashboard:
1. Gå till **Settings** > **API**
2. Kopiera följande:
   - **Project URL** (t.ex. `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (håll denna hemlig!)

### Steg 3: Kör migrations

Det finns tre migrationsfiler i `supabase/migrations/`:

1. `20250111000000_initial_schema.sql` - Grundschema
2. `20250111000001_retention_and_cleanup.sql` - Data retention
3. `20250114000000_text_suggestions.sql` - Textförslag (nytt!)

#### Alternativ A: Använd Supabase CLI (rekommenderat)

```bash
# Installera Supabase CLI
npm install -g supabase

# Logga in
supabase login

# Länka till ditt projekt
supabase link --project-ref <your-project-ref>

# Kör migrations
supabase db push
```

#### Alternativ B: Kör manuellt i SQL Editor

1. Öppna **SQL Editor** i Supabase Dashboard
2. Kopiera innehållet från `supabase/migrations/20250111000000_initial_schema.sql`
3. Klistra in och kör (Run)
4. Upprepa för `20250111000001_retention_and_cleanup.sql`
5. Upprepa för `20250114000000_text_suggestions.sql`

### Steg 4: Verifiera tabeller

Gå till **Table Editor** och kontrollera att följande tabeller finns:
- ✅ `pages`
- ✅ `runs`
- ✅ `audits`
- ✅ `suggestions`
- ✅ `gsc_daily`
- ✅ `weekly_summaries`
- ✅ `text_suggestions` (nytt!)
- ✅ `keywords` (nytt!)
- ✅ `content_analysis` (nytt!)

---

## 🔐 Miljövariabler

### Skapa .env.local-fil

I projektets root, skapa filen `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# PageSpeed Insights
PSI_API_KEY=AIzaSy...

# Site Configuration (för cron jobs)
SITE_URL=https://dinwebbplats.se
SITEMAP_URL=https://dinwebbplats.se/sitemap.xml
MAX_PAGES_PER_RUN=20

# Vercel Cron (production only)
CRON_SECRET=din-hemliga-nyckel-här

# Google Search Console (valfritt)
GSC_ACCESS_TOKEN=ya29...
GSC_SITE_URL=https://dinwebbplats.se
GSC_CLIENT_ID=xxx.apps.googleusercontent.com
GSC_CLIENT_SECRET=xxx
GSC_REFRESH_TOKEN=xxx
```

### Beskrivning av variabler

| Variabel | Typ | Beskrivning |
|----------|-----|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Krävs | Din Supabase projekt-URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Krävs | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Krävs | Supabase service role key (hemlig!) |
| `PSI_API_KEY` | Krävs | Google PageSpeed Insights API-nyckel |
| `SITE_URL` | Krävs | Webbplatsen som ska analyseras |
| `SITEMAP_URL` | Valfri | Sitemap URL (auto-upptäcks om tom) |
| `MAX_PAGES_PER_RUN` | Valfri | Max sidor per körning (default: 20) |
| `CRON_SECRET` | Valfri | Hemlig nyckel för cron-autentisering |
| `GSC_*` | Valfri | Google Search Console credentials |

### Hämta PageSpeed Insights API-nyckel

1. Gå till [Google Cloud Console](https://console.cloud.google.com/)
2. Skapa nytt projekt eller välj befintligt
3. Gå till **APIs & Services** > **Library**
4. Sök efter "PageSpeed Insights API"
5. Klicka **Enable**
6. Gå till **Credentials** > **Create Credentials** > **API Key**
7. Kopiera API-nyckeln till `.env.local`

---

## 🚀 Körning

### Development

```bash
# Starta development server
npm run dev

# Öppna i webbläsare
# http://localhost:3000
```

### Production (Vercel)

1. Pusha kod till GitHub
2. Importera projekt i Vercel
3. Lägg till environment variables i Vercel Dashboard
4. Deploy!

### Kör migrations i production

Efter första deploy, kör migrations i Supabase Dashboard SQL Editor.

---

## 📱 Användning

### Dashboard

Öppna `http://localhost:3000` för att se dashboarden med 4 flikar:

1. **📊 Score Overview** - Senaste SEO-scores och Core Web Vitals
2. **💡 Suggestions** - Automatiskt genererade förbättringsförslag
3. **✏️ Textförslag** - AI-drivna textförbättringar med klick-för-att-kopiera
4. **🕐 Recent Runs** - Historik över agenten körningar

### Textförslag - Nytt!

Den nya "Textförslag"-fliken ger dig:

#### Funktioner
- ✅ **Automatisk analys** av title, meta description, H1-H6
- ✅ **Nyckelordsoptimering** med density-analys
- ✅ **Läsbarhetsscore** (Flesch Reading Ease)
- ✅ **Redigerbar text** - Klicka "Redigera" för att ändra förslag
- ✅ **Kopiera till clipboard** - Ett klick för att kopiera text
- ✅ **Tillämpa/Avfärda** - Markera förslag som hanterade

#### Hur man använder

1. **Ange URL** i textfältet
2. **Klicka "Generera nya förslag"** - Agenten analyserar sidan
3. **Gå igenom förslagen** - Sorterade per sektion (Title, Meta, H1, etc.)
4. **Redigera om önskvärt** - Klicka "✏️ Redigera" för att ändra texten
5. **Kopiera text** - Klicka "📋 Kopiera" för att kopiera till clipboard
6. **Tillämpa manuellt** - Klistra in texten i din CMS/kod
7. **Markera som klar** - Klicka "✓ Tillämpa" när du har uppdaterat sidan

#### Exempel på förslag

**Title Tag:**
- **Original**: "Hem"
- **Föreslagen**: "SEO Optimering | Professional Services - Expert rådgivning"
- **Nyckelord**: [SEO, optimering, professional]
- **Varför**: Title är för kort och saknar nyckelord

**Meta Description:**
- **Original**: "Välkommen till vår hemsida"
- **Föreslagen**: "Upptäck professionell SEO optimering och expert rådgivning för din webbplats. Öka din synlighet i Google. Läs mer här!"
- **Varför**: Meta description saknar nyckelord och CTA

### Manuell körning

Klicka "Run Agent" i dashboarden och fyll i:
- **Site URL**: Webbplats att analysera
- **Sitemap URL**: (valfri) Om du har custom sitemap
- **Max Pages**: Antal sidor att kontrollera (default: 20)

### Automatisk körning (Cron)

Agenten körs automatiskt varje natt kl 02:00 UTC om du deployer till Vercel.

Se `vercel.json` för cron-konfiguration.

### API Endpoints

#### Textförslag API

```bash
# Hämta textförslag för en sida
GET /api/text-suggestions?url=https://example.com/page

# Generera nya förslag
POST /api/text-suggestions
{
  "url": "https://example.com/page",
  "keywords": ["seo", "optimering"],
  "runId": 123
}

# Uppdatera förslag (redigera eller ändra status)
PATCH /api/text-suggestions
{
  "id": 456,
  "editedText": "Min redigerade text...",
  "status": "applied"
}
```

#### Nyckelords API

```bash
# Hämta nyckelordsanalys
GET /api/keywords?url=https://example.com/page

# Generera nyckelordsanalys
POST /api/keywords
{
  "url": "https://example.com/page",
  "targetKeywords": ["keyword1", "keyword2"]
}
```

#### Innehållsanalys API

```bash
# Hämta innehållsanalys
GET /api/content-analysis?url=https://example.com/page
```

---

## 🛠️ Anpassning

### Lägg till egna keywords

När du genererar förslag, kan du ange egna target keywords:

```javascript
const response = await fetch('/api/text-suggestions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    url: 'https://example.com/page',
    keywords: ['ditt keyword', 'annat keyword', 'seo']
  })
});
```

### Justera readability-nivå

Redigera `lib/seo/content-optimizer.ts`:

```typescript
export function calculateReadability(text: string): number {
  // Justera formlerna här för striktare/mildare läsbarhet
}
```

### Anpassa förslags-logik

All logik för att generera förslag finns i:
- `lib/seo/content-optimizer.ts` - Textförslag
- `lib/seo/on-page-analysis.ts` - On-page analys
- `lib/seo/scoring.ts` - Scoring-algoritmer

---

## 🔒 Säkerhet

### Viktiga säkerhetsåtgärder:

1. **Håll `.env.local` hemlig** - Lägg ALDRIG till i Git
2. **Använd CRON_SECRET** i production för att skydda cron endpoints
3. **Service role key** är hemlig - Använd bara server-side
4. **RLS policies** är aktiverade i Supabase för extra säkerhet

---

## 📊 Datahantering

### Data Retention

- **Detaljerade audits**: 90 dagar
- **Veckosammanfattningar**: Permanent
- **GSC data**: 90 dagar
- **Textförslag**: Ingen automatisk borttagning

### Manuell cleanup

```sql
-- Ta bort gamla textförslag
DELETE FROM text_suggestions WHERE created_at < NOW() - INTERVAL '90 days';

-- Ta bort alla förslag för en URL
DELETE FROM text_suggestions WHERE url = 'https://example.com/old-page';
```

---

## 🐛 Felsökning

### Problem: Migrationer fungerar inte

**Lösning**: Kör migrations i rätt ordning:
1. `initial_schema.sql`
2. `retention_and_cleanup.sql`
3. `text_suggestions.sql`

### Problem: "Failed to fetch suggestions"

**Lösning**:
1. Kontrollera att migrations är körda
2. Verifiera Supabase credentials i `.env.local`
3. Kolla RLS policies i Supabase Dashboard

### Problem: PageSpeed API-fel

**Lösning**:
1. Verifiera API-nyckel
2. Kontrollera rate limits (25 queries/100 sekunder på free tier)
3. Lägg till delay mellan requests

---

## 📚 Ytterligare resurser

- [Supabase Documentation](https://supabase.com/docs)
- [PageSpeed Insights API](https://developers.google.com/speed/docs/insights/v5/get-started)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)

---

## 💡 Tips & Best Practices

1. **Börja smått**: Testa med 5-10 sidor först
2. **Kör regelbundet**: Sätt upp nightly cron för kontinuerlig övervakning
3. **Prioritera high impact**: Fokusera på förslag med "HIGH IMPACT" först
4. **Redigera förslag**: AI-genererade förslag är startpunkter - anpassa till din brand voice
5. **Följ upp resultat**: Jämför scores före/efter tillämpning av förslag

---

## 🎉 Klart!

Du är nu redo att använda SEO Agent för att optimera din webbplats!

För support eller frågor, öppna ett issue på GitHub.

**Lycka till med SEO-optimeringen! 🚀**
