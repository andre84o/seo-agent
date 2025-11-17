# SEO Agent - Installationsguide

Komplett guide för att installera SEO Agent i nya Next.js-projekt.

## 📋 Innehållsförteckning

1. [Snabbstart](#snabbstart)
2. [Krav](#krav)
3. [Installation](#installation)
4. [Databaskonfiguration](#databaskonfiguration)
5. [Miljövariabler](#miljövariabler)
6. [Körning](#körning)
7. [Användning](#användning)

---

## ⚡ Snabbstart

**Snabb installation med minimal konfiguration.**

### Kortversion för erfarna användare:

1. **Klona & installera**
   ```bash
   git clone <repo-url> && cd seo-agent && npm install
   ```

2. **Supabase setup**
   - Skapa Supabase-projekt
   - Kör alla 4 migrations i SQL Editor
   - Kopiera Supabase URL och keys

3. **Konfigurera .env.local**
   ```bash
   # Supabase (OBLIGATORISKT)
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   SUPABASE_SERVICE_ROLE_KEY=eyJ...

   # Google PageSpeed Insights (OBLIGATORISKT)
   PSI_API_KEY=din-api-nyckel-här

   # Webbplats (kan konfigureras i UI istället)
   SITE_URL=https://example.com
   SITEMAP_URL=https://example.com/sitemap.xml
   MAX_PAGES_PER_RUN=20

   # Google Search Console (Valfritt)
   GSC_ACCESS_TOKEN=din-token-här
   GSC_SITE_URL=https://example.com
   ```

4. **Starta & konfigurera**
   ```bash
   npm run dev
   ```
   Gå till `http://localhost:3000` → **Settings-fliken** → Konfigurera resten:
   - Lägg till dina sidor
   - Lägg till keywords
   - Klicka "Run Agent" för att analysera!

**Säkerhet först: API-nycklar lagras säkert i .env.local, icke-känsliga inställningar i UI:et.** 🔒

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

Det finns fyra migrationsfiler i `supabase/migrations/`:

1. `20250111000000_initial_schema.sql` - Grundschema
2. `20250111000001_retention_and_cleanup.sql` - Data retention
3. `20250114000000_text_suggestions.sql` - Textförslag
4. `20250116000000_settings_table.sql` - Settings-tabell för UI-konfiguration (nytt!)

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
6. Upprepa för `20250116000000_settings_table.sql`

### Steg 4: Verifiera tabeller

Gå till **Table Editor** och kontrollera att följande tabeller finns:
- ✅ `pages`
- ✅ `runs`
- ✅ `audits`
- ✅ `suggestions`
- ✅ `gsc_daily`
- ✅ `weekly_summaries`
- ✅ `text_suggestions`
- ✅ `keywords`
- ✅ `content_analysis`
- ✅ `settings` (nytt!)

---

## 🔐 Miljövariabler

### Säkerhet först: API-nycklar i .env.local

**Av säkerhetsskäl lagras alla API-nycklar i `.env.local` på servern, INTE i databasen.**

Skapa filen `.env.local` i projektets root med följande innehåll:

```bash
# ============================================================================
# SUPABASE (OBLIGATORISKT)
# ============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================================================
# GOOGLE PAGESPEED INSIGHTS (OBLIGATORISKT)
# ============================================================================
PSI_API_KEY=AIzaSy...

# ============================================================================
# WEBBPLATS-KONFIGURATION (Kan konfigureras i Settings UI istället)
# ============================================================================
SITE_URL=https://dinwebbplats.se
SITEMAP_URL=https://dinwebbplats.se/sitemap.xml
MAX_PAGES_PER_RUN=20

# ============================================================================
# GOOGLE SEARCH CONSOLE (Valfritt)
# ============================================================================
GSC_ACCESS_TOKEN=ya29...
GSC_SITE_URL=https://dinwebbplats.se
GSC_CLIENT_ID=xxx.apps.googleusercontent.com
GSC_CLIENT_SECRET=xxx
GSC_REFRESH_TOKEN=xxx
```

### Vad konfigureras var?

| Inställning | Var | Säkerhetsskäl |
|------------|-----|---------------|
| **Supabase credentials** | `.env.local` | Känslig - servercredentials |
| **PSI API-nyckel** | `.env.local` | Känslig - API-nyckel |
| **GSC credentials** | `.env.local` | Känslig - OAuth tokens |
| **Site URL** | `.env.local` eller Settings UI | Icke-känslig |
| **Sitemap URL** | `.env.local` eller Settings UI | Icke-känslig |
| **Max pages per run** | `.env.local` eller Settings UI | Icke-känslig |
| **Sidor att övervaka** | Settings UI | Icke-känslig |
| **Keywords** | Settings UI | Icke-känslig |

**Prioritet:** `.env.local` → Settings-tabellen → Default-värden

### Beskrivning av variabler

| Variabel | Typ | Beskrivning |
|----------|-----|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | **Krävs** | Din Supabase projekt-URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | **Krävs** | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | **Krävs** | Supabase service role key (hemlig!) |
| `PSI_API_KEY` | **Krävs** | Google PageSpeed Insights API-nyckel |
| `SITE_URL` | Valfri* | Webbplatsen som ska analyseras |
| `SITEMAP_URL` | Valfri* | Sitemap URL (auto-upptäcks om tom) |
| `MAX_PAGES_PER_RUN` | Valfri* | Max sidor per körning (default: 20) |
| `GSC_ACCESS_TOKEN` | Valfri | Google Search Console access token |
| `GSC_SITE_URL` | Valfri | Google Search Console site URL |
| `GSC_CLIENT_ID` | Valfri | Google OAuth Client ID |
| `GSC_CLIENT_SECRET` | Valfri | Google OAuth Client Secret |
| `GSC_REFRESH_TOKEN` | Valfri | Google OAuth Refresh Token |

**\* Kan också konfigureras i Settings UI**

### Hämta PageSpeed Insights API-nyckel

1. Gå till [Google Cloud Console](https://console.cloud.google.com/)
2. Skapa nytt projekt eller välj befintligt
3. Gå till **APIs & Services** > **Library**
4. Sök efter "PageSpeed Insights API"
5. Klicka **Enable**
6. Gå till **Credentials** > **Create Credentials** > **API Key**
7. Kopiera API-nyckeln och lägg till den i `.env.local` som `PSI_API_KEY`

**Säkerhetsnotering:** API-nycklar ska ENDAST lagras i `.env.local` och ALDRIG i Settings UI eller databasen.

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
3. Lägg till **alla nödvändiga** environment variables i Vercel Dashboard:

   **Obligatoriska:**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `PSI_API_KEY`

   **Valfria (kan konfigureras i Settings UI istället):**
   - `SITE_URL`
   - `SITEMAP_URL`
   - `MAX_PAGES_PER_RUN`

   **Valfria (Google Search Console):**
   - `GSC_ACCESS_TOKEN`
   - `GSC_SITE_URL`
   - `GSC_CLIENT_ID`
   - `GSC_CLIENT_SECRET`
   - `GSC_REFRESH_TOKEN`

4. Deploy!
5. Konfigurera icke-känsliga inställningar i **Settings-fliken** i dashboarden

### Kör migrations i production

Efter första deploy, kör alla migrations (inkl. settings) i Supabase Dashboard SQL Editor.

---

## 📱 Användning

### Dashboard

Öppna `http://localhost:3000` för att se dashboarden med 5 flikar:

1. **📊 Score Overview** - Senaste SEO-scores och Core Web Vitals
2. **💡 Suggestions** - Automatiskt genererade förbättringsförslag
3. **✏️ Textförslag** - AI-drivna textförbättringar med klick-för-att-kopiera
4. **🕐 Recent Runs** - Historik över agentens körningar
5. **⚙️ Settings** - Konfigurera API-nycklar, sidor och nyckelord (nytt!)

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

### Settings-flik

Settings-fliken ger dig kontroll över icke-känsliga systemkonfigurationer:

#### API-nycklar (Konfigureras i .env.local)
Settings UI visar vilka API-nycklar som behövs, men dessa måste konfigureras i `.env.local` av säkerhetsskäl:
- **PSI_API_KEY** - Google PageSpeed Insights (obligatorisk)
- **GSC_ACCESS_TOKEN** - Google Search Console (valfritt)
- Och övriga GSC OAuth-credentials

#### Webbplatsinställningar (Kan konfigureras här!)
- **Site URL** - Din huvudwebbplats
- **Sitemap URL** - Valfritt (lämna tom för auto-upptäckt)
- **Max sidor per run** - Begränsa antal sidor per analys
- **GSC Site URL** - För Google Search Console-integration

#### Hantera nyckelord
Lägg till nyckelord manuellt för att:
- Spåra viktiga keywords per sida
- Sätta mål-densitet för keywords
- Få nyckelordsförslag i textanalys

#### Hantera sidor
Lägg till specifika sidor att övervaka:
- Se senaste SEO-score per sida
- Spåra när sidan senast analyserades
- Ta bort sidor från övervakning

### Manuell körning

Klicka "Run Agent" i dashboarden och fyll i:
- **Site URL**: Webbplats att analysera (eller använd standardvärde från Settings)
- **Sitemap URL**: (valfri) Om du har custom sitemap
- **Max Pages**: Antal sidor att kontrollera (eller använd standardvärde från Settings)

### API Endpoints

#### Settings API

```bash
# Hämta alla inställningar
GET /api/settings

# Uppdatera en inställning
POST /api/settings
{
  "setting_key": "psi_api_key",
  "setting_value": "AIzaSy..."
}
```

#### Pages API (Nytt!)

```bash
# Hämta alla övervakade sidor
GET /api/pages

# Lägg till ny sida
PUT /api/pages
{
  "url": "https://example.com/page"
}

# Ta bort sida
DELETE /api/pages?url=https://example.com/page
```

#### Keywords API (Uppdaterad!)

```bash
# Hämta nyckelord för en sida
GET /api/keywords?url=https://example.com/page

# Hämta alla nyckelord
GET /api/keywords?url=all

# Lägg till/uppdatera keyword manuellt (Nytt!)
PUT /api/keywords
{
  "keyword": "seo optimering",
  "url": "https://example.com/page",
  "target_density": 2.5
}

# Ta bort keyword (Nytt!)
DELETE /api/keywords?id=123

# Generera nyckelordsanalys (från innehåll)
POST /api/keywords
{
  "url": "https://example.com/page",
  "targetKeywords": ["keyword1", "keyword2"]
}
```

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

#### Innehållsanalys API

```bash
# Hämta innehållsanalys
GET /api/content-analysis?url=https://example.com/page
```

---

## 🛠️ Anpassning

### Lägg till egna keywords

**Enklaste sättet**: Använd Settings-fliken i dashboarden!
1. Gå till Settings-fliken
2. Scrolla ner till "Hantera nyckelord"
3. Fyll i keyword, URL och mål-densitet
4. Klicka "Lägg till nyckelord"

**Programmatiskt**: Via API

```javascript
const response = await fetch('/api/keywords', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    keyword: 'seo optimering',
    url: 'https://example.com/page',
    target_density: 2.5
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
2. **API-nycklar ENDAST i .env.local** - Lagra ALDRIG i databasen eller Settings UI
3. **Service role key** är hemlig - Använd bara server-side
4. **RLS policies** är aktiverade i Supabase för extra säkerhet
5. **Settings-tabellen** innehåller ENDAST icke-känsliga konfigurationer

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
1. `20250111000000_initial_schema.sql`
2. `20250111000001_retention_and_cleanup.sql`
3. `20250114000000_text_suggestions.sql`
4. `20250116000000_settings_table.sql`

### Problem: "Failed to fetch suggestions" eller "Failed to fetch settings"

**Lösning**:
1. Kontrollera att **alla** migrations är körda (inkl. settings_table.sql)
2. Verifiera Supabase credentials i `.env.local`
3. Kolla RLS policies i Supabase Dashboard
4. Kontrollera att `settings`-tabellen existerar i Supabase

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
- [Google Search Console API](https://developers.google.com/webmaster-tools)

---

## 💡 Tips & Best Practices

1. **Konfigurera .env.local först**: Lägg till Supabase-credentials och PSI API-nyckel innan du startar appen
2. **Använd Settings UI för icke-känsligt**: Site URL, sitemap och max pages kan konfigureras i UI:et
3. **Lägg till dina sidor**: Använd "Hantera sidor" i Settings för att lägga till specifika sidor att övervaka
4. **Definiera keywords**: Lägg till viktiga keywords per sida i "Hantera nyckelord" för bättre textförslag
5. **Börja smått**: Testa med 5-10 sidor först
6. **Prioritera high impact**: Fokusera på förslag med "HIGH IMPACT" först
7. **Redigera förslag**: AI-genererade förslag är startpunkter - anpassa till din brand voice
8. **Följ upp resultat**: Jämför scores före/efter tillämpning av förslag
9. **Säkerhet först**: Håll API-nycklar i `.env.local`, ALDRIG i databasen eller UI:et

---

## 🎉 Klart!

Du är nu redo att använda SEO Agent för att optimera din webbplats!

För support eller frågor, öppna ett issue på GitHub.

**Lycka till med SEO-optimeringen! 🚀**
