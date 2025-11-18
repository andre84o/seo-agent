'use strict';

var supabaseJs = require('@supabase/supabase-js');
var OpenAI = require('openai');
var axios3 = require('axios');
var fastXmlParser = require('fast-xml-parser');
var cheerio2 = require('cheerio');
var googleapis = require('googleapis');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var OpenAI__default = /*#__PURE__*/_interopDefault(OpenAI);
var axios3__default = /*#__PURE__*/_interopDefault(axios3);
var cheerio2__namespace = /*#__PURE__*/_interopNamespace(cheerio2);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
var supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return supabaseJs.createClient(url, anon);
}

// lib/db/operations.ts
async function createRun() {
  const { data, error } = await supabase.from("runs").insert({
    started_at: (/* @__PURE__ */ new Date()).toISOString(),
    status: "running"
  }).select("run_id").single();
  if (error) throw new Error(`Failed to create run: ${error.message}`);
  return data.run_id;
}
async function updateRun(runId, update) {
  const { error } = await supabase.from("runs").update(update).eq("run_id", runId);
  if (error) throw new Error(`Failed to update run: ${error.message}`);
}
async function getRecentRuns(limit = 10) {
  const { data, error } = await supabase.from("runs").select("*").order("started_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch runs: ${error.message}`);
  return data || [];
}
async function upsertPage(page) {
  const { error } = await supabase.from("pages").upsert(page, { onConflict: "url" });
  if (error) throw new Error(`Failed to upsert page: ${error.message}`);
}
async function updatePageMetrics(url, metrics) {
  const { error } = await supabase.from("pages").update(__spreadProps(__spreadValues({}, metrics), {
    last_seen_at: metrics.last_seen_at || (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  })).eq("url", url);
  if (error) throw new Error(`Failed to update page metrics: ${error.message}`);
}
async function getAllPages() {
  const { data, error } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch pages: ${error.message}`);
  return data || [];
}
async function getPageByUrl(url) {
  const { data, error } = await supabase.from("pages").select("*").eq("url", url).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch page: ${error.message}`);
  }
  return data;
}
async function getPagesWithLowScore(threshold = 50) {
  const { data, error } = await supabase.from("pages").select("*").lt("senaste_score", threshold).order("senaste_score", { ascending: true });
  if (error) throw new Error(`Failed to fetch low score pages: ${error.message}`);
  return data || [];
}
async function createAudit(audit) {
  const { data, error } = await supabase.from("audits").insert(audit).select("audit_id").single();
  if (error) {
    if (error.code === "23505") {
      throw new Error(`Audit already exists for URL in this run`);
    }
    throw new Error(`Failed to create audit: ${error.message}`);
  }
  return data.audit_id;
}
async function getAuditsByRun(runId) {
  const { data, error } = await supabase.from("audits").select("*").eq("run_id", runId).order("score", { ascending: true });
  if (error) throw new Error(`Failed to fetch audits: ${error.message}`);
  return data || [];
}
async function getAuditsByUrl(url, limit = 10) {
  const { data, error } = await supabase.from("audits").select("*").eq("url", url).order("created_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch audits for URL: ${error.message}`);
  return data || [];
}
async function getLatestAudits() {
  const { data, error } = await supabase.from("latest_audits").select("*").order("score", { ascending: true });
  if (error) throw new Error(`Failed to fetch latest audits: ${error.message}`);
  return data || [];
}
async function getWorstPagesWeek() {
  const { data, error } = await supabase.from("worst_pages_week").select("*").limit(20);
  if (error) throw new Error(`Failed to fetch worst pages: ${error.message}`);
  return data || [];
}
async function createSuggestion(suggestion) {
  const { data, error } = await supabase.from("suggestions").insert(suggestion).select("suggestion_id").single();
  if (error) throw new Error(`Failed to create suggestion: ${error.message}`);
  return data.suggestion_id;
}
async function updateSuggestionStatus(suggestionId, status) {
  const { error } = await supabase.from("suggestions").update({
    status,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("suggestion_id", suggestionId);
  if (error) throw new Error(`Failed to update suggestion: ${error.message}`);
}
async function getSuggestions(filters) {
  let query = supabase.from("suggestions").select("*").order("created_at", { ascending: false });
  if (filters == null ? void 0 : filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters == null ? void 0 : filters.impact) {
    query = query.eq("impact", filters.impact);
  }
  if (filters == null ? void 0 : filters.url) {
    query = query.eq("url", filters.url);
  }
  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch suggestions: ${error.message}`);
  return data || [];
}
async function getTopSuggestions() {
  const [high, medium, low] = await Promise.all([
    getSuggestions({ impact: "high", status: "pending" }),
    getSuggestions({ impact: "medium", status: "pending" }),
    getSuggestions({ impact: "low", status: "pending" })
  ]);
  return {
    high: high.slice(0, 5),
    medium: medium.slice(0, 5),
    low: low.slice(0, 5)
  };
}
async function upsertGSCDaily(data) {
  const { error } = await supabase.from("gsc_daily").upsert(data, { onConflict: "url,date" });
  if (error) throw new Error(`Failed to upsert GSC data: ${error.message}`);
}
async function batchInsertGSCDaily(data) {
  const { error } = await supabase.from("gsc_daily").upsert(data, { onConflict: "url,date" });
  if (error) throw new Error(`Failed to batch insert GSC data: ${error.message}`);
}
async function getGSCDataByUrl(url, days = 30) {
  const startDate = /* @__PURE__ */ new Date();
  startDate.setDate(startDate.getDate() - days);
  const { data, error } = await supabase.from("gsc_daily").select("*").eq("url", url).gte("date", startDate.toISOString().split("T")[0]).order("date", { ascending: false });
  if (error) throw new Error(`Failed to fetch GSC data: ${error.message}`);
  return data || [];
}
async function createAIAnalysis(analysis) {
  const { data, error } = await supabase.from("ai_analysis_history").insert(analysis).select("id").single();
  if (error) throw new Error(`Failed to create AI analysis: ${error.message}`);
  return data.id;
}
async function getAIAnalysesByPageId(pageId, limit = 10) {
  const { data, error } = await supabase.from("ai_analysis_history").select("*").eq("page_id", pageId).order("created_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch AI analyses: ${error.message}`);
  return data || [];
}
async function createTask(task) {
  const { data, error } = await supabase.from("seo_tasks").insert(task).select("id").single();
  if (error) throw new Error(`Failed to create task: ${error.message}`);
  return data.id;
}
async function updateTask(taskId, update) {
  const { error } = await supabase.from("seo_tasks").update(update).eq("id", taskId);
  if (error) throw new Error(`Failed to update task: ${error.message}`);
}
async function getTasksByPageId(pageId) {
  const { data, error } = await supabase.from("seo_tasks").select("*").eq("page_id", pageId).order("priority", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch tasks: ${error.message}`);
  return data || [];
}
async function getActiveTasksThisWeek() {
  const { data, error } = await supabase.from("this_week_priority_tasks").select("*");
  if (error) {
    console.warn("View this_week_priority_tasks not available, using fallback query:", error.message);
    const { data: fallbackData, error: fallbackError } = await supabase.from("seo_tasks").select("*").in("status", ["todo", "in_progress"]).order("priority", { ascending: true }).order("created_at", { ascending: false });
    if (fallbackError) {
      throw new Error(`Failed to fetch tasks: ${fallbackError.message}`);
    }
    return fallbackData || [];
  }
  return data || [];
}
async function getPendingAISuggestions() {
  const { data, error } = await supabase.from("pending_ai_suggestions").select("*");
  if (error) {
    console.warn("View pending_ai_suggestions not available, using fallback query:", error.message);
    const { data: fallbackData, error: fallbackError } = await supabase.from("suggestions").select("*").eq("ai_generated", true).eq("status", "pending").order("created_at", { ascending: false });
    if (fallbackError) {
      throw new Error(`Failed to fetch suggestions: ${fallbackError.message}`);
    }
    return fallbackData || [];
  }
  return data || [];
}
async function createContentVersion(version) {
  const { data, error } = await supabase.from("content_versions").insert(version).select("id").single();
  if (error) throw new Error(`Failed to create content version: ${error.message}`);
  return data.id;
}
async function getContentVersionsByPageId(pageId) {
  const { data, error } = await supabase.from("content_versions").select("*").eq("page_id", pageId).order("implemented_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch content versions: ${error.message}`);
  return data || [];
}
async function refreshMaterializedViews() {
  const { error } = await supabase.rpc("refresh_materialized_views");
  if (error) throw new Error(`Failed to refresh views: ${error.message}`);
}
async function runRetentionCleanup() {
  const { data, error } = await supabase.rpc("run_retention_cleanup");
  if (error) throw new Error(`Failed to run retention cleanup: ${error.message}`);
  return data;
}
var openai = new OpenAI__default.default({
  apiKey: process.env.OPENAI_API_KEY || ""
});
async function analyzePageWithAI(input) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY saknas i environment variables");
  }
  const systemPrompt = `Du \xE4r en expert SEO-konsult som analyserar webbsidor och ger konkreta, prioriterade f\xF6rb\xE4ttringsf\xF6rslag.

Din uppgift:
1. Analysera sidans nuvarande SEO-status
2. Identifiera f\xF6rb\xE4ttringsm\xF6jligheter baserat p\xE5 GSC-data (klick, impressions, CTR, position)
3. Ge konkreta, implementerbara f\xF6rslag
4. Prioritera baserat p\xE5 f\xF6rv\xE4ntad effekt

Fokusera p\xE5:
- Title och meta description optimering f\xF6r h\xF6gre CTR
- Content-kvalitet och relevans
- Anv\xE4ndarintention och s\xF6kbeteende
- Teknisk SEO (om performance-data finns)
- Strukturerad data (FAQ, schema.org)

Svara alltid p\xE5 svenska med konkreta exempel.`;
  const userPrompt = buildAnalysisPrompt(input);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    const parsed = JSON.parse(result);
    return parsed;
  } catch (error) {
    console.error("[OpenAI] Analysis error:", error);
    throw new Error(
      `AI-analys misslyckades: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
function buildAnalysisPrompt(input) {
  let prompt = `Analysera f\xF6ljande webbsida och ge konkreta SEO-f\xF6rb\xE4ttringar:

`;
  prompt += `URL: ${input.url}
`;
  prompt += `Spr\xE5k: ${input.language || "svenska"}

`;
  if (input.currentTitle) {
    prompt += `Nuvarande title: "${input.currentTitle}"
`;
  }
  if (input.currentMetaDescription) {
    prompt += `Nuvarande meta description: "${input.currentMetaDescription}"
`;
  }
  if (input.currentH1) {
    prompt += `Nuvarande H1: "${input.currentH1}"
`;
  }
  if (input.contentLength) {
    prompt += `Content-l\xE4ngd: ${input.contentLength} tecken
`;
  }
  prompt += "\n";
  if (input.gscData) {
    prompt += `Google Search Console data:
`;
    prompt += `- Klick: ${input.gscData.clicks}
`;
    prompt += `- Impressions: ${input.gscData.impressions}
`;
    prompt += `- CTR: ${(input.gscData.ctr * 100).toFixed(2)}%
`;
    prompt += `- Genomsnittlig position: ${input.gscData.position.toFixed(1)}

`;
    if (input.gscData.topQueries && input.gscData.topQueries.length > 0) {
      prompt += `Top queries:
`;
      input.gscData.topQueries.slice(0, 10).forEach((q, i) => {
        prompt += `${i + 1}. "${q.query}" - ${q.clicks} klick, pos ${q.position.toFixed(1)}, CTR ${(q.ctr * 100).toFixed(1)}%
`;
      });
      prompt += "\n";
    }
  }
  if (input.psiScore !== void 0) {
    prompt += `PageSpeed Insights:
`;
    prompt += `- Performance score: ${input.psiScore}/100
`;
    if (input.psiMetrics) {
      if (input.psiMetrics.lcp) prompt += `- LCP: ${input.psiMetrics.lcp}s
`;
      if (input.psiMetrics.fcp) prompt += `- FCP: ${input.psiMetrics.fcp}s
`;
      if (input.psiMetrics.cls) prompt += `- CLS: ${input.psiMetrics.cls}
`;
      if (input.psiMetrics.tbt) prompt += `- TBT: ${input.psiMetrics.tbt}ms
`;
    }
    prompt += "\n";
  }
  prompt += `Ge mig ett JSON-svar med f\xF6ljande struktur:
{
  "summary": "Kort sammanfattning av sidans SEO-status (2-3 meningar)",
  "score": 75,
  "suggestions": [
    {
      "type": "title",
      "priority": "high",
      "category": "On-page SEO",
      "suggestion": "Konkret f\xF6rslag",
      "reasoning": "Varf\xF6r detta \xE4r viktigt",
      "expectedImpact": "F\xF6rv\xE4ntad effekt (t.ex. '+15% CTR', 'B\xE4ttre ranking')",
      "implementation": "Hur man implementerar (valfritt)"
    }
  ],
  "titleSuggestions": ["F\xF6rslag 1", "F\xF6rslag 2", "F\xF6rslag 3"],
  "metaDescriptionSuggestions": ["F\xF6rslag 1", "F\xF6rslag 2"],
  "faqSuggestions": [
    {
      "question": "Vanlig fr\xE5ga baserad p\xE5 s\xF6kord",
      "answer": "Kort, informativt svar"
    }
  ],
  "contentOutline": ["Rubrik 1", "Rubrik 2", "Rubrik 3"],
  "keywords": {
    "primary": ["huvuds\xF6kord"],
    "secondary": ["relaterade s\xF6kord"],
    "longTail": ["long-tail varianter"]
  }
}

Prioritera f\xF6rslag baserat p\xE5:
1. GSC-data (l\xE5g CTR men m\xE5nga impressions = fokusera p\xE5 title/meta)
2. Position (n\xE4ra topp 10 = sm\xE5 \xE4ndringar kan ge stor effekt)
3. Performance (l\xE5ngsam sida = tekniska f\xF6rb\xE4ttringar viktiga)

Ge minst 5 konkreta suggestions.`;
  return prompt;
}
async function generateContentSuggestions(url, currentContent, targetKeywords) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY saknas i environment variables");
  }
  const prompt = `Analysera f\xF6ljande content och ge f\xF6rb\xE4ttringsf\xF6rslag f\xF6r SEO:

URL: ${url}
Target keywords: ${targetKeywords.join(", ")}

Nuvarande content (f\xF6rsta 500 tecken):
${currentContent.slice(0, 500)}

Ge mig ett JSON-svar med:
{
  "outline": ["F\xF6reslagen struktur med rubriker"],
  "sections": [
    {
      "heading": "H2-rubrik",
      "content": "F\xF6rslag p\xE5 textinneh\xE5ll (2-3 stycken)"
    }
  ],
  "internalLinkSuggestions": ["F\xF6rslag p\xE5 interna l\xE4nkar baserat p\xE5 keywords"]
}`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du \xE4r en SEO content-expert som optimerar text f\xF6r s\xF6kord och anv\xE4ndarupplevelse."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    return JSON.parse(result);
  } catch (error) {
    console.error("[OpenAI] Content generation error:", error);
    throw error;
  }
}
async function generateSchemaMarkup(pageType, pageData) {
  const prompt = `Generera schema.org JSON-LD markup f\xF6r f\xF6ljande:

Page type: ${pageType}
Data: ${JSON.stringify(pageData, null, 2)}

Ge endast valid JSON-LD enligt schema.org spec.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du \xE4r en expert p\xE5 strukturerad data och schema.org markup."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    return JSON.parse(result);
  } catch (error) {
    console.error("[OpenAI] Schema generation error:", error);
    throw error;
  }
}
async function fetchUrl(options) {
  var _a, _b;
  const {
    url,
    timeout = 3e4,
    userAgent = "SEO-Agent/1.0 (+https://yoursite.com/bot)"
  } = options;
  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return {
        success: false,
        url,
        error: "Only HTTP and HTTPS protocols are supported"
      };
    }
    const response = await axios3__default.default.get(url, {
      timeout,
      headers: {
        "User-Agent": userAgent,
        "Accept": "text/html,application/xhtml+xml"
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500
      // Acceptera alla statuskoder under 500
    });
    const contentType = response.headers["content-type"] || "";
    const isHtml = contentType.includes("text/html") || contentType.includes("application/xhtml");
    if (!isHtml) {
      return {
        success: false,
        url,
        statusCode: response.status,
        contentType,
        error: `Content-Type is not HTML: ${contentType}`
      };
    }
    return {
      success: true,
      url,
      html: response.data,
      statusCode: response.status,
      contentType,
      redirectUrl: ((_b = (_a = response.request) == null ? void 0 : _a.res) == null ? void 0 : _b.responseUrl) || url
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.code === "ECONNABORTED") {
        return {
          success: false,
          url,
          error: `Request timeout after ${timeout}ms`
        };
      }
      if (axiosError.response) {
        return {
          success: false,
          url,
          statusCode: axiosError.response.status,
          error: `HTTP ${axiosError.response.status}: ${axiosError.response.statusText}`
        };
      }
      if (axiosError.request) {
        return {
          success: false,
          url,
          error: "No response received from server"
        };
      }
    }
    return {
      success: false,
      url,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
async function fetchUrlBatch(urls, concurrency = 3) {
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((url) => fetchUrl({ url }))
    );
    results.push(...batchResults);
    if (i + concurrency < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    }
  }
  return results;
}
async function readSitemap(sitemapUrl) {
  try {
    const fetchResult = await fetchUrl({ url: sitemapUrl });
    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        urls: [],
        totalUrls: 0,
        error: fetchResult.error || "Failed to fetch sitemap"
      };
    }
    const parser = new fastXmlParser.XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const parsed = parser.parse(fetchResult.html);
    if (parsed.sitemapindex) {
      return await parseSitemapIndex(parsed.sitemapindex, sitemapUrl);
    }
    if (parsed.urlset) {
      return parseSitemapUrlset(parsed.urlset);
    }
    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: "Invalid sitemap format: missing urlset or sitemapindex"
    };
  } catch (error) {
    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: error instanceof Error ? error.message : "Unknown error parsing sitemap"
    };
  }
}
function parseSitemapUrlset(urlset) {
  const urls = [];
  const urlEntries = Array.isArray(urlset.url) ? urlset.url : [urlset.url];
  for (const entry of urlEntries) {
    if (!entry || !entry.loc) continue;
    urls.push({
      loc: entry.loc,
      lastmod: entry.lastmod,
      changefreq: entry.changefreq,
      priority: entry.priority ? parseFloat(entry.priority) : void 0
    });
  }
  return {
    success: true,
    urls,
    totalUrls: urls.length,
    isSitemapIndex: false
  };
}
async function parseSitemapIndex(sitemapindex, baseUrl) {
  const childSitemaps = [];
  const allUrls = [];
  const sitemapEntries = Array.isArray(sitemapindex.sitemap) ? sitemapindex.sitemap : [sitemapindex.sitemap];
  for (const entry of sitemapEntries) {
    if (entry && entry.loc) {
      childSitemaps.push(entry.loc);
    }
  }
  const sitemapsToFetch = childSitemaps.slice(0, 10);
  for (const childUrl of sitemapsToFetch) {
    try {
      const result = await readSitemap(childUrl);
      if (result.success) {
        allUrls.push(...result.urls);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching child sitemap ${childUrl}:`, error);
    }
  }
  return {
    success: true,
    urls: allUrls,
    totalUrls: allUrls.length,
    isSitemapIndex: true,
    childSitemaps
  };
}
async function findSitemapsInRobotsTxt(domain) {
  try {
    const robotsUrl = new URL("/robots.txt", domain).toString();
    const fetchResult = await fetchUrl({ url: robotsUrl });
    if (!fetchResult.success || !fetchResult.html) {
      return [];
    }
    const sitemaps = [];
    const lines = fetchResult.html.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith("sitemap:")) {
        const sitemapUrl = trimmed.substring(8).trim();
        if (sitemapUrl) {
          sitemaps.push(sitemapUrl);
        }
      }
    }
    return sitemaps;
  } catch (error) {
    console.error("Error reading robots.txt:", error);
    return [];
  }
}
async function discoverSitemap(domain) {
  const robotsSitemaps = await findSitemapsInRobotsTxt(domain);
  if (robotsSitemaps.length > 0) {
    return await readSitemap(robotsSitemaps[0]);
  }
  const commonPaths = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-index.xml",
    "/sitemap1.xml"
  ];
  for (const path of commonPaths) {
    try {
      const sitemapUrl = new URL(path, domain).toString();
      const result = await readSitemap(sitemapUrl);
      if (result.success && result.totalUrls > 0) {
        return result;
      }
    } catch (error) {
      continue;
    }
  }
  return {
    success: false,
    urls: [],
    totalUrls: 0,
    error: "Could not discover sitemap for domain"
  };
}
async function psiAudit(url, apiKey, strategy = "mobile") {
  try {
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("key", apiKey);
    apiUrl.searchParams.set("strategy", strategy);
    apiUrl.searchParams.set("category", "performance");
    apiUrl.searchParams.set("category", "accessibility");
    apiUrl.searchParams.set("category", "best-practices");
    apiUrl.searchParams.set("category", "seo");
    const response = await axios3__default.default.get(apiUrl.toString(), {
      timeout: 6e4
      // 60 sekunder
    });
    const data = response.data;
    const vitals = extractCoreWebVitals(data);
    const lighthouse = extractLighthouseScores(data);
    const issues = extractIssues(data);
    return {
      success: true,
      url,
      vitals,
      lighthouse,
      issues,
      rawData: data,
      requestId: data.id
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          url,
          issues: [],
          error: `PSI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        };
      }
      if (error.code === "ECONNABORTED") {
        return {
          success: false,
          url,
          issues: [],
          error: "PSI API timeout after 60 seconds"
        };
      }
    }
    return {
      success: false,
      url,
      issues: [],
      error: error instanceof Error ? error.message : "Unknown PSI error"
    };
  }
}
function extractCoreWebVitals(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  try {
    const metrics = (_a = data.loadingExperience) == null ? void 0 : _a.metrics;
    const labData = (_b = data.lighthouseResult) == null ? void 0 : _b.audits;
    if (!metrics && !labData) return void 0;
    const lcp = ((_c = metrics == null ? void 0 : metrics.LARGEST_CONTENTFUL_PAINT_MS) == null ? void 0 : _c.percentile) ? metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1e3 : ((_d = labData == null ? void 0 : labData["largest-contentful-paint"]) == null ? void 0 : _d.numericValue) ? labData["largest-contentful-paint"].numericValue / 1e3 : 0;
    const cls = ((_e = metrics == null ? void 0 : metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE) == null ? void 0 : _e.percentile) ? metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : ((_f = labData == null ? void 0 : labData["cumulative-layout-shift"]) == null ? void 0 : _f.numericValue) || 0;
    const inp = ((_g = metrics == null ? void 0 : metrics.INTERACTION_TO_NEXT_PAINT) == null ? void 0 : _g.percentile) ? metrics.INTERACTION_TO_NEXT_PAINT.percentile : ((_h = labData == null ? void 0 : labData["interaction-to-next-paint"]) == null ? void 0 : _h.numericValue) || 0;
    const fcp = ((_i = labData == null ? void 0 : labData["first-contentful-paint"]) == null ? void 0 : _i.numericValue) ? labData["first-contentful-paint"].numericValue / 1e3 : void 0;
    const ttfb = ((_j = labData == null ? void 0 : labData["server-response-time"]) == null ? void 0 : _j.numericValue) || void 0;
    return {
      lcp: parseFloat(lcp.toFixed(2)),
      cls: parseFloat(cls.toFixed(4)),
      inp: parseFloat(inp.toFixed(2)),
      fcp: fcp ? parseFloat(fcp.toFixed(2)) : void 0,
      ttfb: ttfb ? parseFloat(ttfb.toFixed(2)) : void 0
    };
  } catch (error) {
    console.error("Error extracting Core Web Vitals:", error);
    return void 0;
  }
}
function extractLighthouseScores(data) {
  var _a, _b;
  try {
    const categories = (_a = data.lighthouseResult) == null ? void 0 : _a.categories;
    if (!categories) return void 0;
    return {
      performance: Math.round((((_b = categories.performance) == null ? void 0 : _b.score) || 0) * 100),
      accessibility: categories.accessibility ? Math.round(categories.accessibility.score * 100) : void 0,
      bestPractices: categories["best-practices"] ? Math.round(categories["best-practices"].score * 100) : void 0,
      seo: categories.seo ? Math.round(categories.seo.score * 100) : void 0
    };
  } catch (error) {
    console.error("Error extracting Lighthouse scores:", error);
    return void 0;
  }
}
function extractIssues(data) {
  var _a;
  const issues = [];
  try {
    const audits = (_a = data.lighthouseResult) == null ? void 0 : _a.audits;
    if (!audits) return issues;
    const importantAudits = [
      "largest-contentful-paint",
      "cumulative-layout-shift",
      "interaction-to-next-paint",
      "first-contentful-paint",
      "speed-index",
      "total-blocking-time",
      "server-response-time",
      "render-blocking-resources",
      "unminified-css",
      "unminified-javascript",
      "unused-css-rules",
      "unused-javascript",
      "modern-image-formats",
      "uses-optimized-images",
      "uses-text-compression",
      "uses-responsive-images"
    ];
    for (const auditKey of importantAudits) {
      const audit = audits[auditKey];
      if (!audit) continue;
      if (audit.score !== null && audit.score < 0.9) {
        issues.push({
          title: audit.title || auditKey,
          description: audit.description || "",
          score: audit.score,
          displayValue: audit.displayValue,
          impact: determineImpact(audit.score)
        });
      }
    }
    return issues;
  } catch (error) {
    console.error("Error extracting issues:", error);
    return issues;
  }
}
function determineImpact(score) {
  if (score >= 0.5) return "low";
  if (score >= 0.3) return "medium";
  return "high";
}
async function psiAuditBatch(urls, apiKey, strategy = "mobile", delayMs = 2e3) {
  var _a;
  const results = [];
  for (const url of urls) {
    try {
      const result = await psiAudit(url, apiKey, strategy);
      results.push(result);
      if (urls.indexOf(url) < urls.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
      if (!result.success && ((_a = result.error) == null ? void 0 : _a.includes("429"))) {
        console.log("Rate limit hit, waiting 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 1e4));
      }
    } catch (error) {
      results.push({
        success: false,
        url,
        issues: [],
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
  return results;
}
async function gscTopQueries(siteUrl, accessToken, startDate, endDate, rowLimit = 1e3) {
  try {
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;
    const requestBody = {
      startDate,
      endDate,
      dimensions: ["page", "query"],
      rowLimit,
      startRow: 0
    };
    const response = await axios3__default.default.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    });
    const rows = response.data.rows || [];
    const pageMap = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const [page, query] = row.keys;
      const { clicks, impressions, ctr, position } = row;
      if (!pageMap.has(page)) {
        pageMap.set(page, {
          page,
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
          topQueries: []
        });
      }
      const pageData = pageMap.get(page);
      pageData.clicks += clicks;
      pageData.impressions += impressions;
      pageData.topQueries.push({
        query,
        clicks,
        impressions,
        ctr,
        position
      });
    }
    const data = Array.from(pageMap.values()).map((pageData) => {
      pageData.topQueries.sort((a, b) => b.clicks - a.clicks);
      const totalQueries = pageData.topQueries.length;
      pageData.ctr = pageData.clicks / pageData.impressions;
      pageData.position = pageData.topQueries.reduce((sum, q) => sum + q.position, 0) / totalQueries;
      return pageData;
    });
    data.sort((a, b) => b.clicks - a.clicks);
    return {
      success: true,
      siteUrl,
      data,
      totalRows: data.length,
      startDate,
      endDate
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          siteUrl,
          data: [],
          totalRows: 0,
          startDate,
          endDate,
          error: `GSC API error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        };
      }
    }
    return {
      success: false,
      siteUrl,
      data: [],
      totalRows: 0,
      startDate,
      endDate,
      error: error instanceof Error ? error.message : "Unknown GSC error"
    };
  }
}
function findLowCtrPages(gscData, minPosition = 1, maxPosition = 15, ctrThreshold = 0.05) {
  return gscData.filter(
    (page) => page.position >= minPosition && page.position <= maxPosition && page.ctr < ctrThreshold && page.impressions > 10
    // Minst 10 impressions för att vara relevant
  );
}
async function refreshGSCToken(refreshToken, clientId, clientSecret) {
  try {
    const response = await axios3__default.default.post("https://oauth2.googleapis.com/token", {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error(
      `Failed to refresh GSC token: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
async function gscPageData(siteUrl, pageUrl, accessToken, startDate, endDate) {
  try {
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;
    const requestBody = {
      startDate,
      endDate,
      dimensions: ["query"],
      dimensionFilterGroups: [
        {
          filters: [
            {
              dimension: "page",
              expression: pageUrl,
              operator: "equals"
            }
          ]
        }
      ],
      rowLimit: 100
    };
    const response = await axios3__default.default.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    });
    const rows = response.data.rows || [];
    if (rows.length === 0) {
      return null;
    }
    const topQueries = rows.map((row) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));
    const totalClicks = topQueries.reduce((sum, q) => sum + q.clicks, 0);
    const totalImpressions = topQueries.reduce((sum, q) => sum + q.impressions, 0);
    const avgPosition = topQueries.reduce((sum, q) => sum + q.position, 0) / topQueries.length;
    return {
      page: pageUrl,
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalClicks / totalImpressions,
      position: avgPosition,
      topQueries
    };
  } catch (error) {
    console.error("Error fetching GSC page data:", error);
    return null;
  }
}
function analyzeOnPage(html, url) {
  var _a, _b;
  const $ = cheerio2__namespace.load(html);
  const issues = [];
  const title = $("title").first().text().trim();
  const titleLength = title.length;
  if (!title) {
    issues.push({
      type: "title",
      severity: "high",
      message: "Missing title tag",
      recommendation: "Add a descriptive title tag (50-60 characters)"
    });
  } else if (titleLength < 30) {
    issues.push({
      type: "title",
      severity: "medium",
      message: "Title too short",
      current: `${titleLength} characters`,
      recommendation: "Title should be 50-60 characters for optimal display"
    });
  } else if (titleLength > 70) {
    issues.push({
      type: "title",
      severity: "medium",
      message: "Title too long",
      current: `${titleLength} characters`,
      recommendation: "Title should be 50-60 characters to avoid truncation"
    });
  }
  const metaDescription = ((_a = $('meta[name="description"]').attr("content")) == null ? void 0 : _a.trim()) || "";
  const metaDescriptionLength = metaDescription.length;
  if (!metaDescription) {
    issues.push({
      type: "meta-description",
      severity: "high",
      message: "Missing meta description",
      recommendation: "Add a compelling meta description (140-160 characters)"
    });
  } else if (metaDescriptionLength < 120) {
    issues.push({
      type: "meta-description",
      severity: "medium",
      message: "Meta description too short",
      current: `${metaDescriptionLength} characters`,
      recommendation: "Meta description should be 140-160 characters"
    });
  } else if (metaDescriptionLength > 170) {
    issues.push({
      type: "meta-description",
      severity: "low",
      message: "Meta description too long",
      current: `${metaDescriptionLength} characters`,
      recommendation: "Meta description should be 140-160 characters to avoid truncation"
    });
  }
  const h1Tags = [];
  $("h1").each((_, el) => {
    const text = $(el).text().trim();
    if (text) h1Tags.push(text);
  });
  const h1Count = h1Tags.length;
  if (h1Count === 0) {
    issues.push({
      type: "h1",
      severity: "high",
      message: "Missing H1 tag",
      recommendation: "Add exactly one H1 tag that matches page intent"
    });
  } else if (h1Count > 1) {
    issues.push({
      type: "h1",
      severity: "medium",
      message: "Multiple H1 tags found",
      current: `${h1Count} H1 tags`,
      recommendation: "Use only one H1 tag per page"
    });
  }
  const canonical = (_b = $('link[rel="canonical"]').attr("href")) == null ? void 0 : _b.trim();
  if (!canonical) {
    issues.push({
      type: "canonical",
      severity: "medium",
      message: "Missing canonical tag",
      recommendation: "Add a canonical tag to prevent duplicate content issues"
    });
  }
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  $("img").each((_, el) => {
    totalImages++;
    const alt = $(el).attr("alt");
    if (alt !== void 0 && alt.trim() !== "") {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  });
  const altCoverage = totalImages > 0 ? imagesWithAlt / totalImages * 100 : 100;
  if (altCoverage < 80 && totalImages > 0) {
    issues.push({
      type: "images",
      severity: altCoverage < 50 ? "high" : "medium",
      message: "Low alt text coverage",
      current: `${altCoverage.toFixed(0)}% coverage (${imagesWithAlt}/${totalImages} images)`,
      recommendation: "Add descriptive alt text to at least 80% of images"
    });
  }
  const score = calculateOnPageScore({
    titleLength,
    metaDescriptionLength,
    h1Count,
    hasCanonical: !!canonical,
    altCoverage
  });
  return {
    title,
    titleLength,
    metaDescription,
    metaDescriptionLength,
    h1Tags,
    h1Count,
    canonical,
    totalImages,
    imagesWithAlt,
    imagesWithoutAlt,
    altCoverage: parseFloat(altCoverage.toFixed(2)),
    issues,
    score
  };
}
function calculateOnPageScore(params) {
  let score = 100;
  if (params.titleLength === 0) {
    score -= 25;
  } else if (params.titleLength < 30 || params.titleLength > 70) {
    score -= 10;
  } else if (params.titleLength >= 50 && params.titleLength <= 60) {
    score += 0;
  } else {
    score -= 5;
  }
  if (params.metaDescriptionLength === 0) {
    score -= 20;
  } else if (params.metaDescriptionLength < 120 || params.metaDescriptionLength > 170) {
    score -= 10;
  } else if (params.metaDescriptionLength >= 140 && params.metaDescriptionLength <= 160) {
    score += 0;
  } else {
    score -= 5;
  }
  if (params.h1Count === 0) {
    score -= 20;
  } else if (params.h1Count === 1) {
    score += 0;
  } else {
    score -= 10;
  }
  if (!params.hasCanonical) {
    score -= 15;
  }
  if (params.altCoverage < 50) {
    score -= 20;
  } else if (params.altCoverage < 80) {
    score -= 10;
  }
  return Math.max(0, Math.min(100, score));
}
function generateOnPageSuggestions(result, url) {
  const suggestions = [];
  for (const issue of result.issues) {
    suggestions.push({
      action: `${issue.message}${issue.recommendation ? `: ${issue.recommendation}` : ""}`,
      impact: issue.severity
    });
  }
  return suggestions;
}

// lib/seo/scoring.ts
var DEFAULT_WEIGHTS = {
  onPage: 0.4,
  vitals: 0.5,
  gsc: 0.1
};
function calculateSEOScore(onPageResult, vitals, gscMetrics, weights = DEFAULT_WEIGHTS) {
  const issues = [];
  const onPageScore = onPageResult.score;
  for (const issue of onPageResult.issues) {
    issues.push({
      category: "on-page",
      severity: issue.severity,
      message: issue.message
    });
  }
  let vitalsScore = 100;
  if (vitals) {
    if (vitals.lcp > 4) {
      vitalsScore -= 30;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`
      });
    } else if (vitals.lcp > 2.5) {
      vitalsScore -= 15;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`
      });
    }
    if (vitals.cls > 0.25) {
      vitalsScore -= 30;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`
      });
    } else if (vitals.cls > 0.1) {
      vitalsScore -= 15;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`
      });
    }
    if (vitals.inp > 500) {
      vitalsScore -= 20;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`
      });
    } else if (vitals.inp > 200) {
      vitalsScore -= 10;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`
      });
    }
    vitalsScore = Math.max(0, vitalsScore);
  } else {
    vitalsScore = 50;
  }
  let gscScore = 100;
  if (gscMetrics && gscMetrics.impressions > 10) {
    const expectedCtr = calculateExpectedCtr(gscMetrics.position);
    const ctrRatio = gscMetrics.ctr / expectedCtr;
    if (ctrRatio < 0.5) {
      gscScore -= 40;
      issues.push({
        category: "gsc",
        severity: "high",
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (expected ~${(expectedCtr * 100).toFixed(2)}% for position ${gscMetrics.position.toFixed(1)})`
      });
    } else if (ctrRatio < 0.8) {
      gscScore -= 20;
      issues.push({
        category: "gsc",
        severity: "medium",
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (below expected for position ${gscMetrics.position.toFixed(1)})`
      });
    }
    if (gscMetrics.position > 10) {
      gscScore -= 30;
    } else if (gscMetrics.position > 5) {
      gscScore -= 15;
    } else if (gscMetrics.position > 3) {
      gscScore -= 5;
    }
    gscScore = Math.max(0, gscScore);
  } else {
    gscScore = 50;
  }
  const total = Math.round(
    onPageScore * weights.onPage + vitalsScore * weights.vitals + gscScore * weights.gsc
  );
  return {
    total,
    onPageScore,
    vitalsScore,
    gscScore,
    issues
  };
}
function calculateExpectedCtr(position) {
  if (position <= 1) return 0.3;
  if (position <= 2) return 0.15;
  if (position <= 3) return 0.1;
  if (position <= 5) return 0.06;
  if (position <= 10) return 0.03;
  return 0.01;
}
function calculatePriority(currentScore, previousScore, vitals, daysSinceLastCheck) {
  let priority = 0;
  priority += (100 - currentScore) * 0.5;
  if (previousScore !== null) {
    const scoreDiff = currentScore - previousScore;
    if (scoreDiff < -10) {
      priority += 30;
    } else if (scoreDiff < 0) {
      priority += 15;
    } else if (scoreDiff > 10) {
      priority -= 10;
    }
  }
  if (vitals) {
    if (vitals.lcp > 4) priority += 20;
    if (vitals.cls > 0.25) priority += 20;
    if (vitals.inp > 500) priority += 15;
  }
  if (daysSinceLastCheck > 7) {
    priority += 10;
  } else if (daysSinceLastCheck > 14) {
    priority += 20;
  }
  return Math.max(0, priority);
}
function shouldFlagPage(score, vitals, scoreDiff) {
  if (scoreDiff !== null && scoreDiff < -10) {
    return true;
  }
  if (vitals && vitals.lcp > 2.5) {
    return true;
  }
  if (vitals && vitals.cls > 0.1) {
    return true;
  }
  if (vitals && vitals.inp > 200) {
    return true;
  }
  if (score < 40) {
    return true;
  }
  return false;
}

// lib/agent/core.ts
async function runAgent(config) {
  var _a, _b, _c, _d, _e, _f;
  const startTime = Date.now();
  const errors = [];
  const flaggedPages = [];
  console.log("[Agent] Starting SEO agent run...");
  const runId = await createRun();
  console.log(`[Agent] Created run ID: ${runId}`);
  try {
    console.log("[Agent] Fetching sitemap...");
    const sitemapResult = config.sitemapUrl ? await readSitemap(config.sitemapUrl) : await discoverSitemap(config.siteUrl);
    let urlsToProcess = [];
    if (!sitemapResult.success || sitemapResult.totalUrls === 0) {
      console.warn(`[Agent] \u26A0\uFE0F Sitemap not found: ${sitemapResult.error}`);
      console.log("[Agent] Falling back to checking only the site URL");
      urlsToProcess = [config.siteUrl];
    } else {
      console.log(`[Agent] Found ${sitemapResult.totalUrls} URLs in sitemap`);
      urlsToProcess = sitemapResult.urls.map((u) => u.loc);
    }
    for (const url of urlsToProcess) {
      try {
        await upsertPage({
          url,
          last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (error) {
        console.error(`Error upserting page ${url}:`, error);
      }
    }
    console.log("[Agent] Calculating page priorities...");
    const allPages = await getAllPages();
    const pagesToCheck = await selectPagesToCheck(
      allPages,
      config.maxPagesToCheck || 20,
      config.priorityThreshold
    );
    console.log(`[Agent] Selected ${pagesToCheck.length} pages to check`);
    let totalScore = 0;
    let successCount = 0;
    for (const page of pagesToCheck) {
      console.log(`[Agent] Checking ${page.url}...`);
      try {
        const result = await checkPage(page.url, config);
        if (result.success) {
          await createAudit({
            run_id: runId,
            url: page.url,
            score: result.score,
            lcp: ((_a = result.vitals) == null ? void 0 : _a.lcp) || null,
            cls: ((_b = result.vitals) == null ? void 0 : _b.cls) || null,
            inp: ((_c = result.vitals) == null ? void 0 : _c.inp) || null,
            issues: result.issues
          });
          await updatePageMetrics(page.url, {
            senaste_score: result.score,
            senaste_lcp: (_d = result.vitals) == null ? void 0 : _d.lcp,
            senaste_cls: (_e = result.vitals) == null ? void 0 : _e.cls,
            senaste_inp: (_f = result.vitals) == null ? void 0 : _f.inp,
            last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
          });
          for (const suggestion of result.suggestions) {
            await createSuggestion({
              url: page.url,
              action: suggestion.action,
              impact: suggestion.impact,
              status: "pending"
            });
          }
          totalScore += result.score;
          successCount++;
          const scoreDiff = page.lastScore ? result.score - page.lastScore : null;
          if (shouldFlagPage(result.score, result.vitals, scoreDiff)) {
            flaggedPages.push(page.url);
            console.log(`[Agent] \u26A0\uFE0F  Flagged ${page.url} (score: ${result.score})`);
          }
        } else {
          errors.push(`${page.url}: ${result.error}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        errors.push(`${page.url}: ${errorMsg}`);
        console.error(`[Agent] Error checking ${page.url}:`, error);
      }
    }
    const avgScore = successCount > 0 ? totalScore / successCount : 0;
    await updateRun(runId, {
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      pages_checked: successCount,
      avg_score: avgScore,
      status: "completed"
    });
    console.log("[Agent] Refreshing materialized views...");
    await refreshMaterializedViews();
    const duration = (Date.now() - startTime) / 1e3;
    console.log("[Agent] \u2705 Run completed successfully");
    console.log(`[Agent] Checked ${successCount} pages in ${duration.toFixed(1)}s`);
    console.log(`[Agent] Average score: ${avgScore.toFixed(1)}`);
    return {
      runId,
      pagesChecked: successCount,
      avgScore,
      errors,
      flaggedPages,
      duration
    };
  } catch (error) {
    await updateRun(runId, {
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error"
    });
    throw error;
  }
}
async function selectPagesToCheck(allPages, maxPages, priorityThreshold) {
  const pagesToCheck = [];
  for (const page of allPages) {
    const previousAudits = await getAuditsByUrl(page.url, 2);
    const lastScore = previousAudits.length > 0 ? previousAudits[0].score : null;
    const prevScore = previousAudits.length > 1 ? previousAudits[1].score : null;
    const daysSinceLastCheck = page.last_seen_at ? (Date.now() - new Date(page.last_seen_at).getTime()) / (1e3 * 60 * 60 * 24) : 999;
    const priority = calculatePriority(
      page.senaste_score || 50,
      prevScore,
      {
        lcp: page.senaste_lcp || 0,
        cls: page.senaste_cls || 0,
        inp: page.senaste_inp || 0
      },
      daysSinceLastCheck
    );
    if (priorityThreshold && priority < priorityThreshold) {
      continue;
    }
    pagesToCheck.push({
      url: page.url,
      priority,
      lastScore,
      daysSinceLastCheck
    });
  }
  pagesToCheck.sort((a, b) => b.priority - a.priority);
  return pagesToCheck.slice(0, maxPages);
}
async function checkPage(url, config) {
  try {
    const fetchResult = await fetchUrl({ url });
    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: fetchResult.error || "Failed to fetch HTML"
      };
    }
    const onPageResult = analyzeOnPage(fetchResult.html, url);
    const psiResult = await psiAudit(url, config.psiApiKey, "mobile");
    if (!psiResult.success) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: psiResult.error || "PSI audit failed"
      };
    }
    let gscMetrics;
    if (config.gscAccessToken && config.gscSiteUrl) {
      try {
        const endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
        const gscData = await gscPageData(
          config.gscSiteUrl,
          url,
          config.gscAccessToken,
          startDate,
          endDate
        );
        if (gscData && gscData.impressions > 10) {
          gscMetrics = {
            ctr: gscData.ctr,
            position: gscData.position,
            impressions: gscData.impressions
          };
        }
      } catch (error) {
        console.error("GSC error (non-fatal):", error);
      }
    }
    const scoreBreakdown = calculateSEOScore(
      onPageResult,
      psiResult.vitals,
      gscMetrics
    );
    const onPageSuggestions = generateOnPageSuggestions(onPageResult, url);
    const psiSuggestions = psiResult.issues.map((issue) => ({
      action: issue.title + ": " + issue.description,
      impact: issue.impact || "medium"
    }));
    const allSuggestions = [...onPageSuggestions, ...psiSuggestions];
    return {
      success: true,
      score: scoreBreakdown.total,
      vitals: psiResult.vitals,
      issues: {
        onPage: onPageResult.issues,
        psi: psiResult.issues,
        scoreBreakdown
      },
      suggestions: allSuggestions
    };
  } catch (error) {
    return {
      success: false,
      score: 0,
      issues: {},
      suggestions: [],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function getPageAnalytics(propertyId, pagePath, startDate, endDate, credentials) {
  var _a, _b, _c, _d;
  try {
    const analyticsData = googleapis.google.analyticsdata("v1beta");
    const auth = credentials ? new googleapis.google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    }) : new googleapis.google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    });
    const authClient = await auth.getClient();
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" }
        ],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: {
              matchType: "EXACT",
              value: pagePath
            }
          }
        }
      },
      auth: authClient
    });
    const rows = response.data.rows;
    if (!rows || rows.length === 0) {
      return null;
    }
    const row = rows[0];
    const metricValues = row.metricValues || [];
    return {
      pageviews: parseInt(((_a = metricValues[0]) == null ? void 0 : _a.value) || "0"),
      uniquePageviews: parseInt(((_b = metricValues[1]) == null ? void 0 : _b.value) || "0"),
      avgTimeOnPage: parseFloat(((_c = metricValues[2]) == null ? void 0 : _c.value) || "0"),
      bounceRate: parseFloat(((_d = metricValues[3]) == null ? void 0 : _d.value) || "0"),
      exitRate: 0,
      // GA4 beräknar inte exitRate på samma sätt
      dateRange: { startDate, endDate }
    };
  } catch (error) {
    console.error("[Analytics] Error fetching page data:", error);
    return null;
  }
}
async function getTopPages(propertyId, startDate, endDate, limit = 50, credentials) {
  try {
    const analyticsData = googleapis.google.analyticsdata("v1beta");
    const auth = credentials ? new googleapis.google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    }) : new googleapis.google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    });
    const authClient = await auth.getClient();
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" }
        ],
        orderBys: [
          {
            metric: {
              metricName: "screenPageViews"
            },
            desc: true
          }
        ],
        limit: limit.toString()
      },
      auth: authClient
    });
    const rows = response.data.rows || [];
    return rows.map((row) => {
      var _a, _b, _c, _d, _e;
      const dimensionValues = row.dimensionValues || [];
      const metricValues = row.metricValues || [];
      return {
        pagePath: ((_a = dimensionValues[0]) == null ? void 0 : _a.value) || "",
        pageviews: parseInt(((_b = metricValues[0]) == null ? void 0 : _b.value) || "0"),
        uniquePageviews: parseInt(((_c = metricValues[1]) == null ? void 0 : _c.value) || "0"),
        avgTimeOnPage: parseFloat(((_d = metricValues[2]) == null ? void 0 : _d.value) || "0"),
        bounceRate: parseFloat(((_e = metricValues[3]) == null ? void 0 : _e.value) || "0")
      };
    });
  } catch (error) {
    console.error("[Analytics] Error fetching top pages:", error);
    return [];
  }
}
function combineGSCAndAnalytics(gscData, analyticsData) {
  var _a;
  const combined = {
    clicks: gscData.clicks,
    impressions: gscData.impressions,
    ctr: gscData.ctr,
    position: gscData.position,
    topQueries: ((_a = gscData.topQueries) == null ? void 0 : _a.slice(0, 5)) || []
  };
  if (analyticsData) {
    combined.pageviews = analyticsData.pageviews;
    combined.avgTimeOnPage = analyticsData.avgTimeOnPage;
    combined.bounceRate = analyticsData.bounceRate;
    combined.searchVsDirectRatio = analyticsData.pageviews > 0 ? gscData.clicks / analyticsData.pageviews : 0;
    const timeScore = Math.min(analyticsData.avgTimeOnPage / 180, 1);
    const bounceScore = 1 - analyticsData.bounceRate / 100;
    combined.engagementScore = (timeScore + bounceScore) / 2;
  }
  return combined;
}
var STOP_WORDS = /* @__PURE__ */ new Set([
  "och",
  "i",
  "att",
  "det",
  "som",
  "en",
  "p\xE5",
  "\xE4r",
  "f\xF6r",
  "med",
  "till",
  "av",
  "om",
  "s\xE5",
  "den",
  "men",
  "ett",
  "har",
  "de",
  "var",
  "vad",
  "kan",
  "vi",
  "inte",
  "fr\xE5n",
  "ska",
  "eller",
  "n\xE4r",
  "han",
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she"
]);
function extractKeywords(text, topN = 10) {
  const words = text.toLowerCase().replace(/[^\w\såäöéèêëàâäüûùôöîï-]/g, " ").split(/\s+/).filter((word) => word.length > 3 && !STOP_WORDS.has(word));
  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  const sorted = Object.entries(frequency).sort(([, a], [, b]) => b - a).slice(0, topN);
  return Object.fromEntries(sorted);
}
function calculateKeywordDensity(text, keywords) {
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;
  const density = {};
  keywords.forEach((keyword) => {
    const count = words.filter((w) => w.includes(keyword.toLowerCase())).length;
    density[keyword] = totalWords > 0 ? count / totalWords * 100 : 0;
  });
  return density;
}
function analyzeKeywords(text, targetKeywords = []) {
  const extractedKeywords = extractKeywords(text, 15);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;
  const results = [];
  targetKeywords.forEach((keyword) => {
    const currentCount = extractedKeywords[keyword.toLowerCase()] || 0;
    const density = totalWords > 0 ? currentCount / totalWords * 100 : 0;
    let targetDensity = 1.5;
    let suggestedCount = Math.round(totalWords * (targetDensity / 100));
    let status = "suggested";
    if (density >= 0.5 && density <= 2.5) {
      status = "optimized";
    } else if (density > 2.5) {
      status = "over_used";
      suggestedCount = Math.round(totalWords * 0.02);
    } else {
      status = "under_used";
    }
    results.push({
      keyword,
      current_count: currentCount,
      suggested_count: suggestedCount,
      density,
      target_density: targetDensity,
      relevance_score: 85,
      // Detta kan förbättras med AI
      status
    });
  });
  return results;
}
function calculateReadability(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  return Math.max(0, Math.min(100, score));
}
function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  const vowels = /[aeiouyåäö]/g;
  const matches = word.match(vowels);
  return matches ? matches.length : 1;
}
function getReadabilityLevel(score) {
  if (score >= 90) return "Mycket l\xE4tt";
  if (score >= 80) return "L\xE4tt";
  if (score >= 70) return "Ganska l\xE4tt";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Ganska sv\xE5r";
  if (score >= 30) return "Sv\xE5r";
  return "Mycket sv\xE5r";
}
function generateTitleSuggestion(originalTitle, url, keywords) {
  var _a;
  const title = originalTitle || "";
  const length = title.length;
  if (length >= 50 && length <= 60 && keywords.some((k) => title.toLowerCase().includes(k.toLowerCase()))) {
    return null;
  }
  let suggestedTitle = title;
  let reason = "";
  let impact = "medium";
  let scoreImpact = 5;
  if (length === 0) {
    const pageName = ((_a = url.split("/").pop()) == null ? void 0 : _a.replace(/[-_]/g, " ")) || "Hem";
    suggestedTitle = `${keywords[0] || pageName} | Professional Services`;
    reason = "Title saknas helt. Skapad baserat p\xE5 URL och keywords.";
    impact = "high";
    scoreImpact = 20;
  } else if (length < 50) {
    const missingKeyword = keywords.find((k) => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${title} - ${missingKeyword}`;
    }
    reason = `Title \xE4r f\xF6r kort (${length} tecken). Optimalt \xE4r 50-60 tecken.`;
    impact = "medium";
    scoreImpact = 10;
  } else if (length > 60) {
    suggestedTitle = title.substring(0, 57) + "...";
    reason = `Title \xE4r f\xF6r l\xE5ng (${length} tecken). Trunkerad till 60 tecken.`;
    impact = "medium";
    scoreImpact = 8;
  } else {
    const missingKeyword = keywords.find((k) => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${missingKeyword} | ${title}`.substring(0, 60);
      reason = "Title saknar huvudnyckelord. Lagt till f\xF6r b\xE4ttre ranking.";
      impact = "high";
      scoreImpact = 15;
    } else {
      return null;
    }
  }
  return {
    section_type: "title",
    section_identifier: "title",
    original_text: title,
    suggested_text: suggestedTitle,
    keywords: keywords.filter((k) => suggestedTitle.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedTitle, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: 100
    // Titles är enkla
  };
}
function generateMetaDescriptionSuggestion(originalDesc, pageContent, keywords) {
  const desc = originalDesc || "";
  const length = desc.length;
  if (length >= 140 && length <= 160 && keywords.some((k) => desc.toLowerCase().includes(k.toLowerCase())) && /läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
    return null;
  }
  let suggestedDesc = desc;
  let reason = "";
  let impact = "medium";
  let scoreImpact = 5;
  if (length === 0) {
    const firstParagraph = pageContent.split(".")[0] || "";
    const keywordPhrase = keywords.slice(0, 2).join(" och ");
    suggestedDesc = `Uppt\xE4ck ${keywordPhrase}. ${firstParagraph.substring(0, 100)}... L\xE4s mer h\xE4r!`;
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = "Meta description saknas. Skapad fr\xE5n sidinneh\xE5ll med keywords och CTA.";
    impact = "high";
    scoreImpact = 20;
  } else if (length < 140) {
    const missingKeywords = keywords.filter((k) => !desc.toLowerCase().includes(k.toLowerCase()));
    if (missingKeywords.length > 0) {
      suggestedDesc = `${desc} Inkluderar ${missingKeywords[0]}. L\xE4s mer!`;
    } else {
      suggestedDesc = `${desc} L\xE4s mer h\xE4r!`;
    }
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = `Meta description \xE4r f\xF6r kort (${length} tecken). Ut\xF6kad till 140-160 tecken med CTA.`;
    impact = "medium";
    scoreImpact = 12;
  } else if (length > 160) {
    keywords.find((k) => desc.toLowerCase().includes(k.toLowerCase())) || "";
    suggestedDesc = desc.substring(0, 145) + "... L\xE4s mer!";
    reason = `Meta description \xE4r f\xF6r l\xE5ng (${length} tecken). Kortad till 160 tecken.`;
    impact = "medium";
    scoreImpact = 8;
  } else {
    if (!/läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
      suggestedDesc = desc.substring(0, 145) + " L\xE4s mer!";
      reason = "Lagt till call-to-action f\xF6r b\xE4ttre CTR.";
      impact = "low";
      scoreImpact = 5;
    }
  }
  return {
    section_type: "meta_description",
    section_identifier: 'meta[name="description"]',
    original_text: desc,
    suggested_text: suggestedDesc,
    keywords: keywords.filter((k) => suggestedDesc.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedDesc, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: calculateReadability(suggestedDesc)
  };
}
function generateHeadingSuggestion(headingLevel, originalText, keywords, index) {
  const text = originalText.trim();
  if (headingLevel === "h1") {
    if (!keywords.some((k) => text.toLowerCase().includes(k.toLowerCase()))) {
      const suggestedText = `${keywords[0]}: ${text}`;
      return {
        section_type: "h1",
        section_identifier: `h1:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: suggestedText,
        keywords: [keywords[0]],
        keyword_density: calculateKeywordDensity(suggestedText, keywords),
        reason: "H1 saknar huvudnyckelord. Detta \xE4r kritiskt f\xF6r SEO.",
        impact: "high",
        seo_score_impact: 15,
        readability_score: calculateReadability(suggestedText)
      };
    }
  }
  if (text.length < 20) {
    const relevantKeyword = keywords.find((k) => !text.toLowerCase().includes(k.toLowerCase()));
    if (relevantKeyword) {
      return {
        section_type: headingLevel,
        section_identifier: `${headingLevel}:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: `${text} - ${relevantKeyword}`,
        keywords: [relevantKeyword],
        keyword_density: calculateKeywordDensity(`${text} - ${relevantKeyword}`, keywords),
        reason: `${headingLevel.toUpperCase()} \xE4r f\xF6r kort. Lagt till nyckelord f\xF6r kontext.`,
        impact: "low",
        seo_score_impact: 3,
        readability_score: 90
      };
    }
  }
  return null;
}
async function analyzePageContent(html, url) {
  const $ = cheerio2__namespace.load(html);
  $("script, style, noscript").remove();
  const bodyText = $("body").text().trim();
  const words = bodyText.split(/\s+/).filter((w) => w.length > 0);
  const sentences = bodyText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const headingStructure = [];
  $("h1, h2, h3, h4, h5, h6").each((i, elem) => {
    headingStructure.push({
      level: elem.tagName,
      text: $(elem).text().trim(),
      index: i
    });
  });
  const paragraphCount = $("p").length;
  const topKeywords = extractKeywords(bodyText, 20);
  const keywordDensity = calculateKeywordDensity(bodyText, Object.keys(topKeywords).slice(0, 10));
  const readabilityScore = calculateReadability(bodyText);
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(words.length, 1);
  let contentScore = 70;
  if (words.length < 300) contentScore -= 20;
  if (headingStructure.length === 0) contentScore -= 15;
  if (paragraphCount < 3) contentScore -= 10;
  if (readabilityScore < 50) contentScore -= 10;
  const improvementAreas = [];
  if (words.length < 300) improvementAreas.push("L\xE4gg till mer inneh\xE5ll (minst 300 ord)");
  if (headingStructure.length === 0) improvementAreas.push("L\xE4gg till rubriker (H1-H4)");
  if (paragraphCount < 3) improvementAreas.push("Dela upp text i fler paragrafer");
  if (readabilityScore < 50) improvementAreas.push("F\xF6renkla spr\xE5ket f\xF6r b\xE4ttre l\xE4sbarhet");
  if (avgSentenceLength > 25) improvementAreas.push("Korta ner meningarna");
  return {
    url,
    heading_structure: headingStructure,
    paragraph_count: paragraphCount,
    word_count: words.length,
    char_count: bodyText.length,
    readability_score: readabilityScore,
    avg_sentence_length: avgSentenceLength,
    avg_word_length: avgWordLength,
    top_keywords: topKeywords,
    keyword_density: keywordDensity,
    missing_keywords: [],
    // Detta kan förbättras med konkurrenssanalys
    sentiment_score: 0.5,
    // Neutral - kan förbättras med sentiment analysis
    tone: avgWordLength > 6 ? "professional" : "casual",
    content_score: Math.max(0, Math.min(100, contentScore)),
    improvement_areas: improvementAreas
  };
}
async function generateAllSuggestions(html, url, targetKeywords = []) {
  const $ = cheerio2__namespace.load(html);
  const suggestions = [];
  const bodyText = $("body").text();
  const keywords = targetKeywords.length > 0 ? targetKeywords : Object.keys(extractKeywords(bodyText, 5));
  const title = $("title").text();
  const titleSuggestion = generateTitleSuggestion(title, url, keywords);
  if (titleSuggestion) suggestions.push(titleSuggestion);
  const metaDesc = $('meta[name="description"]').attr("content") || null;
  const descSuggestion = generateMetaDescriptionSuggestion(metaDesc, bodyText, keywords);
  if (descSuggestion) suggestions.push(descSuggestion);
  $("h1").each((i, elem) => {
    const h1Suggestion = generateHeadingSuggestion("h1", $(elem).text(), keywords, i);
    if (h1Suggestion) suggestions.push(h1Suggestion);
  });
  $("h2").slice(0, 5).each((i, elem) => {
    const h2Suggestion = generateHeadingSuggestion("h2", $(elem).text(), keywords, i);
    if (h2Suggestion) suggestions.push(h2Suggestion);
  });
  $("h3").slice(0, 3).each((i, elem) => {
    const h3Suggestion = generateHeadingSuggestion("h3", $(elem).text(), keywords, i);
    if (h3Suggestion) suggestions.push(h3Suggestion);
  });
  return suggestions;
}
var FETCHSERP_API_URL = "https://www.fetchserp.com";
var FetchSERPClient = class {
  constructor(config) {
    this.client = axios3__default.default.create({
      baseURL: FETCHSERP_API_URL,
      headers: {
        "Authorization": `Bearer ${config.apiToken}`,
        "Content-Type": "application/json"
      }
    });
  }
  // ==================== SERP Endpoints ====================
  /**
   * Get structured SERP results
   */
  async getSERP(params) {
    const response = await this.client.get("/api/v1/serp", { params });
    return response.data;
  }
  /**
   * Get SERP results with full HTML
   */
  async getSERPHTML(params) {
    const response = await this.client.get("/api/v1/serp_html", { params });
    return response.data;
  }
  /**
   * Get SERP results with extracted text
   */
  async getSERPText(params) {
    const response = await this.client.get("/api/v1/serp_text", { params });
    return response.data;
  }
  /**
   * Get JavaScript-rendered SERP with AI Overview
   */
  async getSERPJS(params) {
    const response = await this.client.get("/api/v1/serp_js", { params });
    return response.data;
  }
  /**
   * Get AI Overview and AI Mode results
   */
  async getSERPAI(params) {
    const response = await this.client.get("/api/v1/serp_ai", { params });
    return response.data;
  }
  /**
   * Get cached US-only AI Mode results
   */
  async getSERPAIMode(params) {
    const response = await this.client.get("/api/v1/serp_ai_mode", { params });
    return response.data;
  }
  // ==================== Keyword Research Endpoints ====================
  /**
   * Get monthly search volume and competition metrics
   */
  async getKeywordsSearchVolume(params) {
    const response = await this.client.post("/api/v1/keywords_search_volume", params);
    return response.data;
  }
  /**
   * Get keyword suggestions with metrics
   */
  async getKeywordsSuggestions(params) {
    const response = await this.client.get("/api/v1/keywords_suggestions", { params });
    return response.data;
  }
  /**
   * Generate long-tail keyword variations
   */
  async getLongTailKeywords(params) {
    const response = await this.client.get("/api/v1/long_tail_keywords_generator", { params });
    return response.data;
  }
  // ==================== Domain Analysis Endpoints ====================
  /**
   * Get domain ranking for specific keywords
   */
  async getDomainRanking(params) {
    const response = await this.client.get("/api/v1/ranking", { params });
    return response.data;
  }
  /**
   * Get backlink data for a domain
   */
  async getBacklinks(params) {
    const response = await this.client.get("/api/v1/backlinks", { params });
    return response.data;
  }
  /**
   * Get DNS, WHOIS, and tech stack information
   */
  async getDomainInfo(params) {
    const response = await this.client.get("/api/v1/domain_infos", { params });
    return response.data;
  }
  /**
   * Extract emails from SERP results
   */
  async getDomainEmails(params) {
    const response = await this.client.get("/api/v1/domain_emails", { params });
    return response.data;
  }
  /**
   * Get Moz domain authority metrics
   */
  async getMozMetrics(params) {
    const response = await this.client.get("/api/v1/moz", { params });
    return response.data;
  }
  /**
   * Check page indexation status
   */
  async getPageIndexation(params) {
    const response = await this.client.get("/api/v1/page_indexation", { params });
    return response.data;
  }
  // ==================== Web Scraping Endpoints ====================
  /**
   * Get raw HTML without JavaScript
   */
  async scrape(params) {
    const response = await this.client.post("/api/v1/scrape", params);
    return response.data;
  }
  /**
   * Custom JavaScript extraction
   */
  async scrapeJS(params) {
    const response = await this.client.post("/api/v1/scrape_js", params);
    return response.data;
  }
  /**
   * JS extraction through proxy
   */
  async scrapeJSWithProxy(params) {
    const response = await this.client.post("/api/v1/scrape_js_with_proxy", params);
    return response.data;
  }
  /**
   * Crawl entire domain
   */
  async scrapeDomain(params) {
    const response = await this.client.post("/api/v1/scrape_domain", params);
    return response.data;
  }
  // ==================== Analysis Endpoints ====================
  /**
   * Technical & on-page SEO audit
   */
  async analyzeSEO(params) {
    const response = await this.client.post("/api/v1/web_page_seo_analysis", params);
    return response.data;
  }
  /**
   * AI-powered content analysis
   */
  async analyzeWithAI(params) {
    const response = await this.client.post("/api/v1/web_page_ai_analysis", params);
    return response.data;
  }
  // ==================== User Endpoints ====================
  /**
   * Get current user information
   */
  async getUser() {
    const response = await this.client.get("/api/v1/user");
    return response.data;
  }
};
var fetchSERPClient = null;
function getFetchSERPClient() {
  if (!fetchSERPClient) {
    const apiToken = process.env.FETCHSERP_API_TOKEN;
    if (!apiToken) {
      throw new Error("FETCHSERP_API_TOKEN is not defined in environment variables");
    }
    fetchSERPClient = new FetchSERPClient({ apiToken });
  }
  return fetchSERPClient;
}

exports.FetchSERPClient = FetchSERPClient;
exports.analyzeKeywords = analyzeKeywords;
exports.analyzeOnPage = analyzeOnPage;
exports.analyzePageContent = analyzePageContent;
exports.analyzePageWithAI = analyzePageWithAI;
exports.batchInsertGSCDaily = batchInsertGSCDaily;
exports.calculateKeywordDensity = calculateKeywordDensity;
exports.calculatePriority = calculatePriority;
exports.calculateReadability = calculateReadability;
exports.calculateSEOScore = calculateSEOScore;
exports.combineGSCAndAnalytics = combineGSCAndAnalytics;
exports.createAIAnalysis = createAIAnalysis;
exports.createAnonClient = createAnonClient;
exports.createAudit = createAudit;
exports.createContentVersion = createContentVersion;
exports.createRun = createRun;
exports.createSuggestion = createSuggestion;
exports.createTask = createTask;
exports.discoverSitemap = discoverSitemap;
exports.extractKeywords = extractKeywords;
exports.fetchUrl = fetchUrl;
exports.fetchUrlBatch = fetchUrlBatch;
exports.findLowCtrPages = findLowCtrPages;
exports.findSitemapsInRobotsTxt = findSitemapsInRobotsTxt;
exports.generateAllSuggestions = generateAllSuggestions;
exports.generateContentSuggestions = generateContentSuggestions;
exports.generateHeadingSuggestion = generateHeadingSuggestion;
exports.generateMetaDescriptionSuggestion = generateMetaDescriptionSuggestion;
exports.generateOnPageSuggestions = generateOnPageSuggestions;
exports.generateSchemaMarkup = generateSchemaMarkup;
exports.generateTitleSuggestion = generateTitleSuggestion;
exports.getAIAnalysesByPageId = getAIAnalysesByPageId;
exports.getActiveTasksThisWeek = getActiveTasksThisWeek;
exports.getAllPages = getAllPages;
exports.getAuditsByRun = getAuditsByRun;
exports.getAuditsByUrl = getAuditsByUrl;
exports.getContentVersionsByPageId = getContentVersionsByPageId;
exports.getFetchSERPClient = getFetchSERPClient;
exports.getGSCDataByUrl = getGSCDataByUrl;
exports.getLatestAudits = getLatestAudits;
exports.getPageAnalytics = getPageAnalytics;
exports.getPageByUrl = getPageByUrl;
exports.getPagesWithLowScore = getPagesWithLowScore;
exports.getPendingAISuggestions = getPendingAISuggestions;
exports.getReadabilityLevel = getReadabilityLevel;
exports.getRecentRuns = getRecentRuns;
exports.getSuggestions = getSuggestions;
exports.getTasksByPageId = getTasksByPageId;
exports.getTopPages = getTopPages;
exports.getTopSuggestions = getTopSuggestions;
exports.getWorstPagesWeek = getWorstPagesWeek;
exports.gscPageData = gscPageData;
exports.gscTopQueries = gscTopQueries;
exports.psiAudit = psiAudit;
exports.psiAuditBatch = psiAuditBatch;
exports.readSitemap = readSitemap;
exports.refreshGSCToken = refreshGSCToken;
exports.refreshMaterializedViews = refreshMaterializedViews;
exports.runAgent = runAgent;
exports.runRetentionCleanup = runRetentionCleanup;
exports.shouldFlagPage = shouldFlagPage;
exports.supabase = supabase;
exports.updatePageMetrics = updatePageMetrics;
exports.updateRun = updateRun;
exports.updateSuggestionStatus = updateSuggestionStatus;
exports.updateTask = updateTask;
exports.upsertGSCDaily = upsertGSCDaily;
exports.upsertPage = upsertPage;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map