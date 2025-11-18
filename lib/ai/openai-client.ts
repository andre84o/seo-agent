// OpenAI Client - AI-driven SEO Analysis
// Hjärnan i SEO-manager systemet

import OpenAI from 'openai';
import type { GSCPageData } from '../mcp/gsc-top-queries';

// Initialisera OpenAI klient
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export interface SEOAnalysisInput {
  url: string;
  currentTitle?: string;
  currentMetaDescription?: string;
  currentH1?: string;
  contentLength?: number;
  gscData?: GSCPageData;
  psiScore?: number;
  psiMetrics?: {
    fcp?: number;
    lcp?: number;
    cls?: number;
    tbt?: number;
  };
  competitors?: string[];
  language?: string;
}

export interface SEOSuggestion {
  type: 'title' | 'meta_description' | 'h1' | 'content' | 'faq' | 'schema' | 'performance';
  priority: 'high' | 'medium' | 'low';
  category: string;
  suggestion: string;
  reasoning: string;
  expectedImpact: string;
  implementation?: string;
}

export interface AIAnalysisResult {
  summary: string;
  score: number; // 0-100
  suggestions: SEOSuggestion[];
  titleSuggestions: string[];
  metaDescriptionSuggestions: string[];
  faqSuggestions?: {
    question: string;
    answer: string;
  }[];
  contentOutline?: string[];
  keywords: {
    primary: string[];
    secondary: string[];
    longTail: string[];
  };
}

/**
 * Genererar en omfattande SEO-analys med AI
 */
export async function analyzePageWithAI(
  input: SEOAnalysisInput
): Promise<AIAnalysisResult> {
  // Kolla om API-nyckel finns
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY saknas i environment variables');
  }

  const systemPrompt = `Du är en expert SEO-konsult som analyserar webbsidor och ger konkreta, prioriterade förbättringsförslag.

Din uppgift:
1. Analysera sidans nuvarande SEO-status
2. Identifiera förbättringsmöjligheter baserat på GSC-data (klick, impressions, CTR, position)
3. Ge konkreta, implementerbara förslag
4. Prioritera baserat på förväntad effekt

Fokusera på:
- Title och meta description optimering för högre CTR
- Content-kvalitet och relevans
- Användarintention och sökbeteende
- Teknisk SEO (om performance-data finns)
- Strukturerad data (FAQ, schema.org)

Svara alltid på svenska med konkreta exempel.`;

  const userPrompt = buildAnalysisPrompt(input);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('Ingen respons från OpenAI');
    }

    const parsed = JSON.parse(result) as AIAnalysisResult;
    return parsed;
  } catch (error) {
    console.error('[OpenAI] Analysis error:', error);
    throw new Error(
      `AI-analys misslyckades: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Bygger prompten för AI-analysen
 */
function buildAnalysisPrompt(input: SEOAnalysisInput): string {
  let prompt = `Analysera följande webbsida och ge konkreta SEO-förbättringar:\n\n`;
  prompt += `URL: ${input.url}\n`;
  prompt += `Språk: ${input.language || 'svenska'}\n\n`;

  // Nuvarande SEO-data
  if (input.currentTitle) {
    prompt += `Nuvarande title: "${input.currentTitle}"\n`;
  }
  if (input.currentMetaDescription) {
    prompt += `Nuvarande meta description: "${input.currentMetaDescription}"\n`;
  }
  if (input.currentH1) {
    prompt += `Nuvarande H1: "${input.currentH1}"\n`;
  }
  if (input.contentLength) {
    prompt += `Content-längd: ${input.contentLength} tecken\n`;
  }
  prompt += '\n';

  // Google Search Console data
  if (input.gscData) {
    prompt += `Google Search Console data:\n`;
    prompt += `- Klick: ${input.gscData.clicks}\n`;
    prompt += `- Impressions: ${input.gscData.impressions}\n`;
    prompt += `- CTR: ${(input.gscData.ctr * 100).toFixed(2)}%\n`;
    prompt += `- Genomsnittlig position: ${input.gscData.position.toFixed(1)}\n\n`;

    if (input.gscData.topQueries && input.gscData.topQueries.length > 0) {
      prompt += `Top queries:\n`;
      input.gscData.topQueries.slice(0, 10).forEach((q, i) => {
        prompt += `${i + 1}. "${q.query}" - ${q.clicks} klick, pos ${q.position.toFixed(1)}, CTR ${(q.ctr * 100).toFixed(1)}%\n`;
      });
      prompt += '\n';
    }
  }

  // PageSpeed Insights data
  if (input.psiScore !== undefined) {
    prompt += `PageSpeed Insights:\n`;
    prompt += `- Performance score: ${input.psiScore}/100\n`;
    if (input.psiMetrics) {
      if (input.psiMetrics.lcp) prompt += `- LCP: ${input.psiMetrics.lcp}s\n`;
      if (input.psiMetrics.fcp) prompt += `- FCP: ${input.psiMetrics.fcp}s\n`;
      if (input.psiMetrics.cls) prompt += `- CLS: ${input.psiMetrics.cls}\n`;
      if (input.psiMetrics.tbt) prompt += `- TBT: ${input.psiMetrics.tbt}ms\n`;
    }
    prompt += '\n';
  }

  prompt += `Ge mig ett JSON-svar med följande struktur:
{
  "summary": "Kort sammanfattning av sidans SEO-status (2-3 meningar)",
  "score": 75,
  "suggestions": [
    {
      "type": "title",
      "priority": "high",
      "category": "On-page SEO",
      "suggestion": "Konkret förslag",
      "reasoning": "Varför detta är viktigt",
      "expectedImpact": "Förväntad effekt (t.ex. '+15% CTR', 'Bättre ranking')",
      "implementation": "Hur man implementerar (valfritt)"
    }
  ],
  "titleSuggestions": ["Förslag 1", "Förslag 2", "Förslag 3"],
  "metaDescriptionSuggestions": ["Förslag 1", "Förslag 2"],
  "faqSuggestions": [
    {
      "question": "Vanlig fråga baserad på sökord",
      "answer": "Kort, informativt svar"
    }
  ],
  "contentOutline": ["Rubrik 1", "Rubrik 2", "Rubrik 3"],
  "keywords": {
    "primary": ["huvudsökord"],
    "secondary": ["relaterade sökord"],
    "longTail": ["long-tail varianter"]
  }
}

Prioritera förslag baserat på:
1. GSC-data (låg CTR men många impressions = fokusera på title/meta)
2. Position (nära topp 10 = små ändringar kan ge stor effekt)
3. Performance (långsam sida = tekniska förbättringar viktiga)

Ge minst 5 konkreta suggestions.`;

  return prompt;
}

/**
 * Genererar content-optimeringsförslag
 */
export async function generateContentSuggestions(
  url: string,
  currentContent: string,
  targetKeywords: string[]
): Promise<{
  outline: string[];
  sections: { heading: string; content: string }[];
  internalLinkSuggestions: string[];
}> {
  // Kolla om API-nyckel finns
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY saknas i environment variables');
  }

  const prompt = `Analysera följande content och ge förbättringsförslag för SEO:

URL: ${url}
Target keywords: ${targetKeywords.join(', ')}

Nuvarande content (första 500 tecken):
${currentContent.slice(0, 500)}

Ge mig ett JSON-svar med:
{
  "outline": ["Föreslagen struktur med rubriker"],
  "sections": [
    {
      "heading": "H2-rubrik",
      "content": "Förslag på textinnehåll (2-3 stycken)"
    }
  ],
  "internalLinkSuggestions": ["Förslag på interna länkar baserat på keywords"]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Du är en SEO content-expert som optimerar text för sökord och användarupplevelse.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('Ingen respons från OpenAI');
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('[OpenAI] Content generation error:', error);
    throw error;
  }
}

/**
 * Genererar schema.org markup
 */
export async function generateSchemaMarkup(
  pageType: 'article' | 'product' | 'faq' | 'local-business',
  pageData: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const prompt = `Generera schema.org JSON-LD markup för följande:

Page type: ${pageType}
Data: ${JSON.stringify(pageData, null, 2)}

Ge endast valid JSON-LD enligt schema.org spec.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'Du är en expert på strukturerad data och schema.org markup.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error('Ingen respons från OpenAI');
    }

    return JSON.parse(result);
  } catch (error) {
    console.error('[OpenAI] Schema generation error:', error);
    throw error;
  }
}
