# SEO Agent

Automatisk SEO-agent med historik och enkel "lärning" för Next.js 15 och Vercel.

## Funktioner

- ✅ **Automatisk SEO-övervakning** med nattliga körningar via Vercel Cron
- 📊 **PageSpeed Insights integration** för Core Web Vitals (LCP, CLS, INP)
- 🔍 **On-page analys** av title, meta description, H1, canonical, och bildalt-text
- 📈 **Google Search Console integration** för CTR och positionsdata
- 🎯 **Adaptiv prioritering** baserad på score-trender och historik
- 💡 **Automatiska förbättringsförslag** med impact-nivåer
- ✏️ **AI-drivna textförslag** - NEW! Klick-för-att-kopiera textoptimering för Title, Meta, H1-H6
- 🔤 **Nyckelordsanalys** - NEW! Automatisk keyword extraction och density-analys
- 📖 **Läsbarhetsscore** - NEW! Flesch Reading Ease för varje textförslag
- ✍️ **Redigerbar text** - NEW! Redigera AI-genererade förslag innan tillämpning
- 📁 **CSV-export** av audits och förslag
- 🗄️ **90-dagars retention** med veckosammanfattningar
- 🚨 **Automatisk flaggning** av sidor med problem

## Teknisk Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes, TypeScript
- **Databas**: Supabase (PostgreSQL)
- **Datakällor**: PageSpeed Insights API, Google Search Console API, Sitemap parsing
- **Deployment**: Vercel med Cron Jobs

## Setup-guide

### 1. Klona och installera dependencies

```bash
git clone <your-repo-url>
cd seo-agent
npm install
```

### 2. Skapa Supabase-projekt

1. Gå till [supabase.com](https://supabase.com) och skapa ett nytt projekt
2. Vänta tills projektet är klart (ca 2 minuter)
3. Gå till **Settings > API** och kopiera:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. Kör Supabase migrations

#### Alternativ A: Via Supabase Dashboard (enklast)

1. Gå till **SQL Editor** i Supabase Dashboard
2. Öppna `supabase/migrations/20250111000000_initial_schema.sql`
3. Kopiera innehållet och klistra in i SQL Editor
4. Klicka på **Run**
5. Upprepa för `supabase/migrations/20250111000001_retention_and_cleanup.sql`

#### Alternativ B: Via Supabase CLI

```bash
npm install -g supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

### 4. Skaffa PageSpeed Insights API-nyckel

1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Skapa ett nytt projekt eller välj ett befintligt
3. Aktivera **PageSpeed Insights API**
4. Gå till **Credentials > Create Credentials > API Key**
5. Kopiera API-nyckeln → `PSI_API_KEY`

### 5. (Valfritt) Google Search Console API

Om du vill använda GSC-data för CTR och positioner:

1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Aktivera **Google Search Console API**
3. Skapa **OAuth 2.0 Client ID** (Web application)
4. Lägg till `http://localhost:3000/api/auth/callback` som redirect URI
5. Följ [OAuth2 Playground](https://developers.google.com/oauthplayground/) för att få tokens
6. Välj scope: `https://www.googleapis.com/auth/webmasters.readonly`
7. Kopiera `access_token` och `refresh_token`

### 6. Konfigurera miljövariabler

Kopiera `.env.example` till `.env.local`:

```bash
cp .env.example .env.local
```

Fyll i alla värden i `.env.local` med dina nycklar.

### 7. Kör utvecklingsserver

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

### 8. Deploy till Vercel

1. Pusha koden till GitHub
2. Gå till [vercel.com](https://vercel.com) och importera projektet
3. Lägg till alla miljövariabler från `.env.local` i Vercel Project Settings
4. Deploy!

### 9. Verifiera Cron Jobs

Efter deployment:

1. Gå till **Vercel Dashboard > Crons**
2. Verifiera att två cron jobs är registrerade:
   - `/api/cron/nightly` - Kör kl 02:00 varje dag
   - `/api/cron/weekly` - Kör kl 03:00 varje söndag

## Användning

### Dashboard

Öppna applikationen och du ser:

- **Run Agent**: Kör agenten manuellt för att starta en audit
- **Score Overview**: Senaste scores för alla sidor med Core Web Vitals
- **Suggestions**: Genererade förbättringsförslag sorterade efter impact
- **✏️ Textförslag (NEW!)**: AI-drivna textförbättringar med klick-för-att-kopiera
- **Recent Runs**: Historik över alla agent-körningar
- **Export**: Ladda ner data som CSV

### Textförslag - Ny funktion! ✨

Den nya "Textförslag"-fliken ger dig AI-drivna förbättringar för:
- **Title tags** - Optimerad längd (50-60 tecken) med keywords
- **Meta descriptions** - 140-160 tecken med CTA
- **H1-H6 rubriker** - Keyword-optimerade headings
- **Paragrafer** - Innehållsförbättringar
- **Bild alt-text** - Beskrivande alt-text

**Funktioner:**
- ✅ Automatisk nyckelordsanalys och keyword density
- ✅ Läsbarhetsscore (Flesch Reading Ease)
- ✅ Redigera förslag innan tillämpning
- ✅ Kopiera till clipboard med ett klick
- ✅ Markera som tillämpat/avfärdat
- ✅ Förslag grupperade per sektion

**Hur man använder:**
1. Ange URL i textfältet
2. Klicka "Generera nya förslag"
3. Granska förslagen sorterade per sektion
4. Redigera om önskvärt (klicka "✏️ Redigera")
5. Kopiera texten ("📋 Kopiera")
6. Klistra in i din CMS/kod
7. Markera som klar ("✓ Tillämpa")

Se `INSTALLATION.md` för fullständig dokumentation.

### Manuell körning

Fyll i:
- **Site URL**: Din sites huvudadress (t.ex. `https://example.com`)
- **Sitemap URL** (valfritt): Lämna tom för auto-discover
- **Max Pages**: Antal sidor att checka (standard 20)

Klicka på **Run Agent** och vänta på resultat.

### Automatiska körningar

Agenten kör automatiskt varje natt kl 02:00 via Vercel Cron och:

1. Läser sitemap
2. Beräknar prioritering för alla sidor
3. Väljer top 20 sidor (konfigurerbart via `MAX_PAGES_PER_RUN`)
4. Kör on-page analys + PSI audit + GSC data
5. Beräknar score och genererar förslag
6. Sparar i Supabase och uppdaterar materialiserade vyer

### Veckosammanfattning

Varje söndag kl 03:00:

1. Skapar veckosammanfattningar av data äldre än 90 dagar
2. Rensar gamla audits och GSC-data
3. Refreshar materialiserade vyer

## Scoring-system

Totalt score (0-100) beräknas som:

- **40% On-page** (title, meta, H1, canonical, alt-text)
- **50% Core Web Vitals** (LCP, CLS, INP)
- **10% GSC** (CTR jämfört med förväntad för position)

### On-page regler

- Title: 50-60 tecken, huvudord först
- Meta description: 140-160 tecken med tydlig CTA
- Exakt en H1 som matchar sidans avsikt
- Canonical-tag krävs
- Alt-text täckning: minst 80%

### Core Web Vitals tresholds

- **LCP**: < 2.5s (good), 2.5-4.0s (needs improvement), > 4.0s (poor)
- **CLS**: < 0.1 (good), 0.1-0.25 (needs improvement), > 0.25 (poor)
- **INP**: < 200ms (good), 200-500ms (needs improvement), > 500ms (poor)

### Flaggning

Sidor flaggas automatiskt om:
- Score faller mer än 10 poäng
- LCP > 2.5s
- CLS > 0.1
- INP > 200ms
- Total score < 40

## Prioritering och "lärning"

Agenten beräknar prioritet för varje sida baserat på:

1. **Nuvarande score** (lägre = högre prio)
2. **Trend** (försämring ger +30 prio, förbättring ger -10)
3. **Vitals** (dåliga vitals ger +20 prio)
4. **Tid sedan senaste check** (>7 dagar ger +10, >14 dagar ger +20)

Sidor med högst prioritet väljs för nästa körning.

## API Endpoints

### Agent

- `POST /api/agent/run` - Kör agenten manuellt
- `GET /api/agent/data?type=latest|worst|suggestions|runs|pages` - Hämta data
- `GET /api/agent/suggestions?status=pending&impact=high` - Hämta förslag
- `PATCH /api/agent/suggestions` - Uppdatera förslag status
- `GET /api/agent/export?type=audits|suggestions` - Exportera CSV

### Textförslag (NEW!)

- `GET /api/text-suggestions?url=<url>&status=<status>` - Hämta textförslag
- `POST /api/text-suggestions` - Generera nya textförslag
- `PATCH /api/text-suggestions` - Uppdatera/redigera förslag
- `DELETE /api/text-suggestions?id=<id>` - Ta bort förslag

### Nyckelord (NEW!)

- `GET /api/keywords?url=<url>` - Hämta nyckelordsanalys
- `POST /api/keywords` - Generera nyckelordsanalys

### Innehållsanalys (NEW!)

- `GET /api/content-analysis?url=<url>` - Hämta innehållsanalys

### Cron (Internal)

- `GET /api/cron/nightly` - Nattlig körning
- `GET /api/cron/weekly` - Veckosammanfattning

## Datamodell

### Tabeller

- **pages**: Alla övervakade sidor med senaste metrics
- **runs**: Varje agent-körning med stats
- **audits**: Auditresultat per sida och run (idempotent)
- **suggestions**: Genererade förslag
- **text_suggestions** (NEW!): AI-genererade textförslag per sektion
- **keywords** (NEW!): Nyckelordsanalys och tracking
- **content_analysis** (NEW!): Djupgående innehållsanalys
- **gsc_daily**: Google Search Console data per dag
- **weekly_summaries**: Veckosammanfattningar av äldre data

### Materialiserade vyer

- **latest_audits**: Senaste audit per URL
- **worst_pages_week**: Sämsta sidor senaste veckan med diff

## Miljövariabler

| Variabel | Krävs | Beskrivning |
|----------|-------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Ja | Supabase projekt URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Ja | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Ja | Supabase service role key |
| `PSI_API_KEY` | Ja | PageSpeed Insights API key |
| `GSC_ACCESS_TOKEN` | Nej | Google Search Console access token |
| `GSC_SITE_URL` | Nej | Verified site URL i GSC |
| `GSC_CLIENT_ID` | Nej | OAuth2 client ID |
| `GSC_CLIENT_SECRET` | Nej | OAuth2 client secret |
| `GSC_REFRESH_TOKEN` | Nej | OAuth2 refresh token |
| `SITE_URL` | Ja* | Din sites URL (*krävs för cron) |
| `SITEMAP_URL` | Nej | Sitemap URL (auto-discover om tom) |
| `MAX_PAGES_PER_RUN` | Nej | Max sidor per körning (default 20) |
| `CRON_SECRET` | Ja* | Random secret för cron auth (*production) |

## Felsökning

### "Failed to fetch sitemap"

- Kontrollera att `SITE_URL` eller `SITEMAP_URL` är korrekt
- Testa manuellt: `curl https://yoursite.com/sitemap.xml`
- Kolla att sitemap är valid XML

### "PSI API error: 429"

- Du har nått rate limit (25 queries/100 sekunder för gratis)
- Minska `MAX_PAGES_PER_RUN`
- Vänta och försök igen

### "Missing env.SUPABASE_SERVICE_ROLE_KEY"

- Kontrollera att miljövariabler är korrekt inställda i Vercel
- Redeploya efter att ha lagt till variabler

### Cron körs inte

- Verifiera att `vercel.json` är deployad
- Kolla Vercel Dashboard > Crons för felmeddelanden
- Kontrollera att `CRON_SECRET` matchar i både kod och Vercel settings

## Utveckling

### Kodstruktur

```
├── app/
│   ├── api/
│   │   ├── agent/        # Agent API endpoints
│   │   └── cron/         # Cron endpoints
│   ├── page.tsx          # Dashboard huvudsida
│   └── layout.tsx
├── components/
│   └── dashboard/        # Dashboard komponenter
├── lib/
│   ├── agent/            # Agentkärna
│   ├── db/               # Supabase client och operations
│   ├── mcp/              # MCP verktyg (fetch, sitemap, PSI, GSC)
│   └── seo/              # SEO analys och scoring
├── supabase/
│   └── migrations/       # Database migrations
└── vercel.json           # Cron configuration
```

### Köra migrations lokalt

```bash
# Via Supabase CLI
supabase db reset
supabase db push

# Eller via SQL Editor i Supabase Dashboard
```

### Linting och TypeScript

```bash
npm run lint
npm run build  # Kolla TypeScript errors
```

## Licens

MIT

## Support

Öppna en issue på GitHub om du har frågor eller problem.
