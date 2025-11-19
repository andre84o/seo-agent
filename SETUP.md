# SEO Agent - Setup Guide

## Vad gör appen?

SEO Agent är en AI-driven dashboard som automatiskt analyserar och övervakar din webbplats SEO-prestanda. Appen:

1. **Crawlar din sitemap** - Hittar alla sidor på din webbplats
2. **Kör PageSpeed Insights audit** - Mäter Core Web Vitals (LCP, CLS, INP)
3. **Analyserar on-page SEO** - Title, meta description, headings, etc.
4. **Hämtar Google Search Console data** - Klick, visningar, CTR, position
5. **Genererar AI-drivna förslag** - Konkreta förbättringsförslag med OpenAI
6. **Prioriterar automatiskt** - Väljer vilka sidor som behöver mest uppmärksamhet
7. **Lagrar historik** - Spårar trender och förändringar över tid

---

## Snabbstart

### 1. Klona och installera

```bash
git clone https://github.com/andre84o/seo-agent.git
cd seo-agent
npm install
```

### 2. Konfigurera miljövariabler

Kopiera `.env.example` till `.env.local` och fyll i:

```bash
cp .env.example .env.local
```

### 3. Skapa databas i Supabase

1. Skapa ett konto på [Supabase](https://supabase.com)
2. Skapa nytt projekt
3. Gå till SQL Editor och kör innehållet i `supabase/complete-schema.sql`

### 4. Starta utvecklingsservern

```bash
npm run dev
```

---

## Vercel Environment Variables

Lägg till dessa i **Vercel Dashboard > Settings > Environment Variables**:

### Obligatoriska

| Variabel | Beskrivning | Hur du skaffar |
|----------|-------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Din Supabase projekt-URL | Supabase Dashboard > Settings > API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonym nyckel (publik) | Supabase Dashboard > Settings > API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role nyckel (hemlig) | Supabase Dashboard > Settings > API |
| `PSI_API_KEY` | PageSpeed Insights API-nyckel | [Google Cloud Console](https://console.cloud.google.com/apis/credentials) - Aktivera "PageSpeed Insights API" |
| `SITE_URL` | Din webbplats URL att analysera | Ex: `https://example.com` |

### Rekommenderade

| Variabel | Beskrivning | Hur du skaffar |
|----------|-------------|----------------|
| `OPENAI_API_KEY` | OpenAI API-nyckel för AI-analys | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `SITEMAP_URL` | URL till din sitemap | Ex: `https://example.com/sitemap.xml` (auto-discover om ej angiven) |
| `CRON_SECRET` | Hemlig nyckel för cron-endpoints | Generera: `openssl rand -hex 32` |
| `MAX_PAGES_PER_RUN` | Max antal sidor per körning | Default: `20` |

### Valfria (Google Search Console)

| Variabel | Beskrivning | Hur du skaffar |
|----------|-------------|----------------|
| `GSC_ACCESS_TOKEN` | OAuth2 access token | [Google Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original/v3/quickstart) |
| `GSC_SITE_URL` | Verifierad site URL i GSC | Ex: `https://example.com/` eller `sc-domain:example.com` |
| `GSC_CLIENT_ID` | OAuth2 client ID | Google Cloud Console > Credentials |
| `GSC_CLIENT_SECRET` | OAuth2 client secret | Google Cloud Console > Credentials |
| `GSC_REFRESH_TOKEN` | OAuth2 refresh token | Genereras vid OAuth-flödet |

### Valfria (SERP-analys)

| Variabel | Beskrivning | Hur du skaffar |
|----------|-------------|----------------|
| `FETCHSERP_API_TOKEN` | FetchSERP API för sökresultat | [FetchSERP](https://fetchserp.com) |

### Webhook (automatisk uppdatering)

| Variabel | Beskrivning | Hur du skaffar |
|----------|-------------|----------------|
| `WEBHOOK_URL` | URL dit textförslag skickas | Din webbplats endpoint, ex: `https://your-site.com/api/seo-updates` |
| `WEBHOOK_SECRET` | Hemlig nyckel för autentisering | Generera: `openssl rand -hex 32` |

---

## Supabase Setup

### 1. Skapa projekt

1. Gå till [supabase.com](https://supabase.com) och logga in
2. Klicka "New Project"
3. Välj organisation och ange projektnamn
4. Vänta tills projektet skapats

### 2. Kör databasschema

1. Gå till **SQL Editor** i Supabase Dashboard
2. Öppna filen `supabase/complete-schema.sql` från detta repo
3. Kopiera hela innehållet och klistra in i SQL Editor
4. Klicka **Run** för att skapa alla tabeller och funktioner

### 3. Hämta API-nycklar

Gå till **Settings > API** och kopiera:

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (hemlig!)

---

## Vercel Cron Jobs

För automatiska nattliga körningar, skapa `vercel.json` i projektroten:

```json
{
  "crons": [
    {
      "path": "/api/cron/nightly",
      "schedule": "0 2 * * *"
    },
    {
      "path": "/api/cron/weekly",
      "schedule": "0 3 * * 0"
    }
  ]
}
```

**Viktigt:**
- Cron jobs kräver Vercel Pro-plan
- `CRON_SECRET` måste vara satt för att skydda endpoints i produktion
- Vercel skickar automatiskt `Authorization: Bearer <CRON_SECRET>` till cron endpoints

---

## API-nycklar - Steg för steg

### PageSpeed Insights API

1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Skapa nytt projekt eller välj befintligt
3. Gå till **APIs & Services > Library**
4. Sök efter "PageSpeed Insights API" och aktivera
5. Gå till **Credentials > Create Credentials > API Key**
6. Kopiera nyckeln → `PSI_API_KEY`

### OpenAI API

1. Gå till [platform.openai.com](https://platform.openai.com)
2. Skapa konto eller logga in
3. Gå till **API Keys**
4. Klicka "Create new secret key"
5. Kopiera nyckeln → `OPENAI_API_KEY`

**Kostnad:** OpenAI debiterar per token. SEO Agent använder GPT-4 för analyser. En typisk körning med 20 sidor kostar ca $0.10-0.50.

### Google Search Console API (valfritt)

Detta kräver OAuth2-flöde:

1. Gå till [Google Cloud Console](https://console.cloud.google.com)
2. Aktivera "Search Console API"
3. Skapa OAuth 2.0 credentials
4. Konfigurera redirect URI
5. Kör OAuth-flödet för att få access token och refresh token

---

## Dashboard Settings

Appen har en Settings-sida där du kan konfigurera:

- **Site URL** - Webbplatsen som ska analyseras
- **Sitemap URL** - Direkt länk till sitemap (om auto-discover inte fungerar)
- **Max Pages Per Run** - Hur många sidor som ska kontrolleras per körning
- **API Keys** - Kan sparas i databasen istället för env variables

Prioritet för API-nycklar:
1. **Känsliga nycklar** (API keys): `.env.local` prioriteras först
2. **Övriga inställningar**: Databas prioriteras först, sedan `.env.local`

---

## Databastabeller

Appen skapar följande tabeller:

| Tabell | Beskrivning |
|--------|-------------|
| `pages` | Alla övervakade sidor med senaste mätvärden |
| `runs` | Varje agent-körning (nattlig eller manuell) |
| `audits` | Auditresultat per sida och körning |
| `suggestions` | Genererade förbättringsförslag |
| `gsc_daily` | Google Search Console data per dag |
| `weekly_summaries` | Veckosammanfattningar (efter 90 dagar) |
| `text_suggestions` | AI-genererade textförslag |
| `keywords` | Nyckelord och densitet per sida |
| `content_analysis` | Djupanalys av innehåll |
| `settings` | Applikationsinställningar |

---

## Manuell körning

Du kan köra agenten manuellt via dashboard eller API:

### Via Dashboard
Klicka "Kör Agent" i dashboarden för att starta en manuell körning.

### Via API
```bash
curl -X POST https://your-app.vercel.app/api/agent/run \
  -H "Content-Type: application/json" \
  -d '{
    "siteUrl": "https://example.com",
    "maxPagesToCheck": 10
  }'
```

---

## Felsökning

### "SITE_URL not configured"
Lägg till `SITE_URL` i Vercel Environment Variables.

### "PSI_API_KEY not configured"
Skapa PageSpeed Insights API-nyckel i Google Cloud Console.

### "Failed to fetch sitemap"
- Kontrollera att `SITEMAP_URL` är korrekt
- Eller lägg till en sitemap på `https://your-site.com/sitemap.xml`

### "Supabase connection failed"
- Verifiera att alla tre Supabase-nycklar är korrekta
- Kör databaschemat i SQL Editor

### Cron jobs körs inte
- Kräver Vercel Pro-plan
- Kontrollera att `vercel.json` finns med crons-konfiguration
- Verifiera att `CRON_SECRET` är satt

---

## Användning som npm-paket

### Installation via GitHub

```bash
npm install github:andre84o/seo-agent
```

### Installation via npm link (lokal utveckling)

```bash
# I seo-agent-mappen:
npm link

# I ditt projekt:
npm link @intennze/seo-agent
```

### Importera komponenter

```typescript
import { Dashboard } from '@intennze/seo-agent/components/dashboard';
import { runAgent } from '@intennze/seo-agent/lib';
```

---

## Webhook Integration (Automatisk uppdatering)

Med webhook-funktionen kan SEO Agent automatiskt skicka textförslag till din webbplats för att uppdatera innehåll utan manuell kopiering.

### Hur det fungerar

1. SEO Agent analyserar din webbplats och genererar textförslag
2. Du skickar förslagen via API:et till din konfigurerade webhook URL
3. Din webbplats tar emot förslagen och uppdaterar innehållet

### Konfigurera webhook

Lägg till i Vercel Environment Variables:

```
WEBHOOK_URL=https://your-site.com/api/seo-updates
WEBHOOK_SECRET=your-secret-key
```

### Webhook API

```bash
# Testa anslutningen
curl -X POST https://your-seo-agent.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"action": "test"}'

# Skicka alla pending suggestions för en URL
curl -X POST https://your-seo-agent.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"action": "send_pending", "url": "https://example.com/page"}'

# Skicka godkända suggestions (markeras som applied)
curl -X POST https://your-seo-agent.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"action": "send_approved", "url": "https://example.com/page"}'

# Skicka en enskild suggestion
curl -X POST https://your-seo-agent.vercel.app/api/webhook \
  -H "Content-Type: application/json" \
  -d '{"action": "send_single", "suggestionId": 123}'
```

### Webhook Payload Format

Din endpoint kommer ta emot följande JSON-struktur:

```json
{
  "event": "batch_suggestions",
  "timestamp": "2025-01-19T12:00:00.000Z",
  "data": [
    {
      "id": 123,
      "url": "https://example.com/page",
      "section_type": "title",
      "section_identifier": null,
      "original_text": "Old Title",
      "suggested_text": "New Optimized Title - SEO Friendly",
      "edited_text": null,
      "reason": "Titeln saknar huvudnyckord och är för kort",
      "impact": "high",
      "keywords": ["seo", "optimization"],
      "seo_score_impact": 15,
      "char_count": 42,
      "word_count": 6
    }
  ]
}
```

### Section Types

| Type | Beskrivning |
|------|-------------|
| `title` | Sidans `<title>` tag |
| `meta_description` | Meta description |
| `h1` - `h6` | Rubriker |
| `paragraph` | Brödtext |
| `image_alt` | Alt-text för bilder |
| `canonical` | Canonical URL |

### Implementera mottagare

Här är ett exempel på hur du implementerar en webhook-mottagare i Next.js:

```typescript
// app/api/seo-updates/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Validera webhook secret
  const authHeader = request.headers.get('authorization');
  const expectedSecret = process.env.SEO_WEBHOOK_SECRET;

  if (authHeader !== `Bearer ${expectedSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const { event, data } = payload;

  console.log(`Received ${event} with ${Array.isArray(data) ? data.length : 1} suggestions`);

  // Hantera suggestions
  const suggestions = Array.isArray(data) ? data : [data];

  for (const suggestion of suggestions) {
    // Exempel: Uppdatera i ditt CMS
    await updateContent({
      url: suggestion.url,
      sectionType: suggestion.section_type,
      sectionIdentifier: suggestion.section_identifier,
      newText: suggestion.edited_text || suggestion.suggested_text,
    });
  }

  return NextResponse.json({
    success: true,
    processed: suggestions.length
  });
}

async function updateContent(data: {
  url: string;
  sectionType: string;
  sectionIdentifier: string | null;
  newText: string;
}) {
  // Implementera din logik här:
  // - Uppdatera databas
  // - Anropa CMS API
  // - Skapa git commit
  // etc.

  console.log(`Updating ${data.sectionType} for ${data.url}`);
}
```

### Flödesalternativ

**Alternativ 1: Direkt tillämpning**
- Skicka `send_pending` direkt efter agent-körning
- Din webbplats uppdaterar automatiskt

**Alternativ 2: Godkänn först**
- Granska förslag i dashboard
- Redigera om nödvändigt (status blir 'edited')
- Skicka `send_approved` för att tillämpa

**Alternativ 3: Manuell trigger**
- Skicka `send_single` för enskilda förslag
- Bra för stegvis utrullning

### Säkerhet

- Alltid validera `Authorization: Bearer <secret>` header
- Alternativt kan du också kolla `X-Webhook-Secret` header
- Använd HTTPS för webhook URL
- Begränsa vilka IP-adresser som får anropa (om möjligt)

---

## Support

- **Issues:** [GitHub Issues](https://github.com/andre84o/seo-agent/issues)
- **Dokumentation:** Se denna fil och `.env.example`

---

## Checklista för deployment

- [ ] Supabase-projekt skapat
- [ ] Databasschema kört (`supabase/complete-schema.sql`)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` satt
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` satt
- [ ] `SUPABASE_SERVICE_ROLE_KEY` satt
- [ ] `PSI_API_KEY` satt
- [ ] `SITE_URL` satt
- [ ] `OPENAI_API_KEY` satt (rekommenderat)
- [ ] `CRON_SECRET` satt (för produktion)
- [ ] `vercel.json` med crons konfigurerat (valfritt)
- [ ] `WEBHOOK_URL` satt (för automatisk uppdatering)
- [ ] `WEBHOOK_SECRET` satt (för webhook-säkerhet)
- [ ] Webhook-mottagare implementerad på din webbplats
