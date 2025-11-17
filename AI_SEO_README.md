# 🤖 AI-Driven SEO Manager

En automatiserad SEO-manager som kombinerar **OpenAI GPT-4**, **Google Search Console**, **Google Analytics** och **PageSpeed Insights** för att ge dig AI-driven SEO-analys och konkreta förbättringsförslag.

## 🎯 Vad är detta?

Detta är inte bara en SEO-chatt. Det är en komplett SEO-manager som:

- 👁️ **Ser** din trafik via Google Search Console & Analytics
- 🧠 **Tänker** med OpenAI GPT-4 för att analysera och prioritera
- 🔧 **Agerar** genom konkreta förslag och en automatisk todo-lista

## 🏗️ Arkitektur

```
┌─────────────────┐
│   Frontend      │  Next.js Dashboard med React
│   (UI)          │  - AI-analys vy
└────────┬────────┘  - Todo-lista
         │           - Score overview
         │
┌────────▼────────┐
│   Backend       │  Next.js API Routes
│   (Logik)       │  - /api/seo/analyze-page
└────────┬────────┘  - /api/tasks
         │           - /api/agent/run
         │
    ┌────┴──────────────────┐
    │                       │
┌───▼────┐           ┌──────▼──────┐
│ OpenAI │           │   Google    │
│ GPT-4  │           │   APIs      │
│        │           │             │
│ AI-    │           │ - GSC       │
│ analys │           │ - Analytics │
└────────┘           │ - PSI       │
                     └──────┬──────┘
                            │
                     ┌──────▼──────┐
                     │  Supabase   │
                     │  Database   │
                     │             │
                     │ - Pages     │
                     │ - Tasks     │
                     │ - AI History│
                     └─────────────┘
```

## ✨ Features

### 1. AI SEO-Analys per sida
- Kör djupgående analys på specifika sidor
- Kombinerar GSC-data, Analytics och PageSpeed Insights
- AI genererar konkreta förslag med prioritering
- Färdiga title/meta description-alternativ
- FAQ-förslag baserat på sökord
- Keyword-analys (primära, sekundära, long-tail)

### 2. Automatisk Todo-lista
- AI skapar tasks från sina förslag
- Prioritering: High, Medium, Low
- Status-tracking: Todo → In Progress → Done
- Förväntad effekt per task (t.ex. "+15% CTR")
- Denna veckans prioriterade uppgifter

### 3. Multi-source Data
**Google Search Console:**
- Klick, impressions, CTR, position
- Top queries per sida
- Trend-analys

**Google Analytics (valfritt):**
- Pageviews, bounce rate, tid på sidan
- Engagement scoring
- Search vs Direct traffic ratio

**PageSpeed Insights:**
- Performance score
- Core Web Vitals (LCP, CLS, INP)
- Tekniska förbättringsförslag

### 4. AI-genererade insights
- Sammanfattning av sidans SEO-status
- AI Score (0-100)
- Prioriterade suggestions med reasoning
- Implementation notes
- Expected impact estimations

## 🚀 Snabbstart

### 1. Installera dependencies
```bash
npm install
```

Nya dependencies:
- `openai` - OpenAI SDK för GPT-4
- `googleapis` - Google Analytics API
- `zod` - Schema validation

### 2. Konfigurera API-nycklar

Uppdatera `.env.local`:

```bash
# OpenAI (KRÄVS för AI-analys)
OPENAI_API_KEY=sk-proj-your-key-here

# Google Analytics (valfritt)
GA_PROPERTY_ID=123456789

# Google Search Console (du har redan detta)
GSC_ACCESS_TOKEN=your-token
GSC_SITE_URL=https://your-site.com

# PageSpeed Insights (du har redan detta)
PSI_API_KEY=your-key
```

### 3. Kör migrations
```bash
# Kör ny migration för AI-systemet
npm run db:migrate
```

Detta skapar:
- `seo_tasks` - Todo-system
- `ai_analysis_history` - AI-analys historik
- `content_versions` - Content ändrings-tracking
- Uppdaterade `suggestions` med AI-fields

### 4. Starta projektet
```bash
npm run dev
```

## 📖 Användning

### Manuell AI-analys på en sida

1. Gå till **AI Analys**-fliken
2. Ange URL (måste finnas i databasen först - kör agent)
3. Kryssa i "Skapa automatiskt tasks" om du vill
4. Klicka **Analysera**

AI kommer att:
- Hämta sidans HTML och analysera on-page SEO
- Hämta GSC-data (senaste 30 dagarna)
- Hämta Analytics-data (om konfigurerat)
- Köra PageSpeed Insights audit
- Skicka allt till GPT-4 för analys
- Returnera konkreta förslag med prioritering

### Todo-listan

Under **Todo**-fliken ser du:
- Alla AI-genererade tasks
- Manuellt skapade tasks
- Filter: Todo, In Progress, Done
- Denna veckans prioriterade uppgifter

Klicka **Starta** för att börja arbeta på en task, **Markera klar** när du är färdig.

### Automatisk körning

Agent-run kör fortfarande automatiskt och analyserar alla sidor enligt prioritering. Nu kan du efter en run:

1. Välj en sida med låg score
2. Kör AI-analys på den
3. Få konkreta tasks
4. Implementera förbättringar
5. Kör agent igen för att se resultat

## 🗂️ Databas Schema

### `seo_tasks`
```sql
- id
- page_id (ref: pages)
- suggestion_id (ref: suggestions)
- title
- description
- task_type (title, meta, content, technical, etc.)
- priority (high, medium, low)
- status (todo, in_progress, done, skipped)
- expected_impact
- effort_estimate
- ai_generated (boolean)
- due_date
- completed_at
```

### `ai_analysis_history`
```sql
- id
- page_id
- run_id
- ai_summary
- ai_score (0-100)
- suggestions_count
- used_gsc_data, used_analytics_data, used_psi_data
- title_suggestions (jsonb)
- meta_suggestions (jsonb)
- faq_suggestions (jsonb)
- keywords (jsonb)
- full_response (jsonb)
- model_used (gpt-4o)
- tokens_used
```

### `content_versions`
```sql
- id
- page_id
- task_id
- version_type (title, meta_description, h1, full_content)
- previous_value, new_value
- changed_by
- ai_suggested
- previous_metrics, new_metrics (jsonb)
- implemented_at
```

## 🔌 API Endpoints

### `POST /api/seo/analyze-page`
Kör AI-analys på en specifik sida.

**Request:**
```json
{
  "url": "https://example.com/page",
  "createTasks": true,
  "language": "svenska"
}
```

**Response:**
```json
{
  "success": true,
  "analysisId": 123,
  "duration": 15000,
  "analysis": {
    "summary": "...",
    "score": 75,
    "suggestions": [...],
    "titleSuggestions": [...],
    "keywords": {...}
  },
  "tasks": [...]
}
```

### `GET /api/tasks?thisWeek=true`
Hämta denna veckans tasks.

### `PATCH /api/tasks`
Uppdatera task status.

**Request:**
```json
{
  "taskId": 123,
  "status": "done"
}
```

## 💡 Best Practices

### 1. Regelbunden AI-analys
- Kör AI-analys på sidor med:
  - Många impressions men låg CTR
  - Position 5-15 (nära topp, men inte där än)
  - Sjunkande trends

### 2. Prioritera tasks
- High priority = Stora snabba vinster
- Medium priority = Viktiga men tar tid
- Low priority = "Nice to have"

### 3. Mät resultat
- Implementera en task
- Vänta 2-4 veckor
- Kör agent igen och jämför metrics
- `content_versions` tabellen spårar detta automatiskt

### 4. Iterera
1. Agent run → Identifiera problem
2. AI-analys → Få förslag
3. Todo → Implementera
4. Agent run → Mät resultat
5. Repeat

## 🎨 Frontend Komponenter

### `<AIAnalysis />`
AI-analys interface med resultat-visning i tabs.

### `<SEOTasks />`
Todo-lista med filtering och status-uppdatering.

### Befintliga komponenter
- `<RunAgent />` - Kör automatisk agent
- `<ScoreOverview />` - Score metrics
- `<SuggestionsList />` - Gamla suggestions

## 🔒 Säkerhet

- OpenAI API-nyckel: Endast i `.env.local`, aldrig commitad
- Google credentials: OAuth tokens, refresh när behövs
- Supabase RLS: Policies för public read, service_role write
- API routes: Server-side only, ingen client-side exposure

## 🚧 Roadmap

- [ ] A/B testing av title/meta suggestions
- [ ] Automatisk content generation
- [ ] Competitor analysis
- [ ] Schema.org markup generation
- [ ] Slack/Email notifications för tasks
- [ ] Bulk AI-analys på alla sidor

## 📊 Kostnader

**OpenAI GPT-4:**
- ~$0.03-0.06 per analys (beroende på data-mängd)
- 10 analyser/dag = ~$1.50/månad

**Google APIs:**
- Gratis upp till vissa limits
- GSC: 1000 requests/dag gratis
- Analytics: 100,000 requests/dag gratis

## 🤝 Support

Se INSTALLATION.md för detaljerad setup-guide.

För frågor om AI-integration, se kommentarer i:
- `lib/ai/openai-client.ts`
- `app/api/seo/analyze-page/route.ts`

---

**Byggd med:**
- Next.js 16
- OpenAI GPT-4
- Google APIs (GSC, Analytics, PSI)
- Supabase (PostgreSQL)
- Tailwind CSS + shadcn/ui
