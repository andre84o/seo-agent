// Content Optimizer - AI-driven text suggestions
// Genererar konkreta textförslag för bättre SEO

import * as cheerio from 'cheerio';
import type { SectionType, ImpactLevel } from '../db/types';

// ============================================================================
// TYPES
// ============================================================================

export interface TextSuggestion {
  section_type: SectionType;
  section_identifier: string | null;
  original_text: string | null;
  suggested_text: string;
  keywords: string[];
  keyword_density: Record<string, number>;
  reason: string;
  impact: ImpactLevel;
  seo_score_impact: number;
  readability_score: number;
}

export interface KeywordAnalysis {
  keyword: string;
  current_count: number;
  suggested_count: number;
  density: number;
  target_density: number;
  relevance_score: number;
  status: 'suggested' | 'optimized' | 'over_used' | 'under_used';
}

export interface ContentAnalysisResult {
  url: string;
  heading_structure: any;
  paragraph_count: number;
  word_count: number;
  char_count: number;
  readability_score: number;
  avg_sentence_length: number;
  avg_word_length: number;
  top_keywords: Record<string, number>;
  keyword_density: Record<string, number>;
  missing_keywords: string[];
  sentiment_score: number;
  tone: string;
  content_score: number;
  improvement_areas: string[];
}

// ============================================================================
// KEYWORD EXTRACTION & ANALYSIS
// ============================================================================

// Stop words (vanliga ord att filtrera bort)
const STOP_WORDS = new Set([
  'och', 'i', 'att', 'det', 'som', 'en', 'på', 'är', 'för', 'med',
  'till', 'av', 'om', 'så', 'den', 'men', 'ett', 'har', 'de', 'var',
  'vad', 'kan', 'vi', 'inte', 'från', 'ska', 'eller', 'när', 'han',
  'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i',
  'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
  'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she'
]);

/**
 * Extraherar nyckelord från text
 */
export function extractKeywords(text: string, topN: number = 10): Record<string, number> {
  const words = text.toLowerCase()
    .replace(/[^\w\såäöéèêëàâäüûùôöîï-]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3 && !STOP_WORDS.has(word));

  const frequency: Record<string, number> = {};
  words.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Sortera och ta top N
  const sorted = Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topN);

  return Object.fromEntries(sorted);
}

/**
 * Beräknar keyword density
 */
export function calculateKeywordDensity(text: string, keywords: string[]): Record<string, number> {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  const density: Record<string, number> = {};
  keywords.forEach(keyword => {
    const count = words.filter(w => w.includes(keyword.toLowerCase())).length;
    density[keyword] = totalWords > 0 ? (count / totalWords) * 100 : 0;
  });

  return density;
}

/**
 * Analyserar nyckelord och ger rekommendationer
 */
export function analyzeKeywords(text: string, targetKeywords: string[] = []): KeywordAnalysis[] {
  const extractedKeywords = extractKeywords(text, 15);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const totalWords = words.length;

  const results: KeywordAnalysis[] = [];

  // Analysera target keywords
  targetKeywords.forEach(keyword => {
    const currentCount = (extractedKeywords[keyword.toLowerCase()] || 0);
    const density = totalWords > 0 ? (currentCount / totalWords) * 100 : 0;

    // Target density: 0.5-2.5% är optimalt
    let targetDensity = 1.5;
    let suggestedCount = Math.round(totalWords * (targetDensity / 100));
    let status: KeywordAnalysis['status'] = 'suggested';

    if (density >= 0.5 && density <= 2.5) {
      status = 'optimized';
    } else if (density > 2.5) {
      status = 'over_used';
      suggestedCount = Math.round(totalWords * 0.02); // Max 2%
    } else {
      status = 'under_used';
    }

    results.push({
      keyword,
      current_count: currentCount,
      suggested_count: suggestedCount,
      density,
      target_density: targetDensity,
      relevance_score: 85, // Detta kan förbättras med AI
      status
    });
  });

  return results;
}

// ============================================================================
// READABILITY ANALYSIS
// ============================================================================

/**
 * Beräknar Flesch Reading Ease score (anpassad för svenska)
 */
export function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease formula (anpassad)
  const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

  return Math.max(0, Math.min(100, score));
}

/**
 * Räknar stavelser i ord (approximation)
 */
function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = /[aeiouyåäö]/g;
  const matches = word.match(vowels);
  return matches ? matches.length : 1;
}

/**
 * Får läsbarhetsnivå som text
 */
export function getReadabilityLevel(score: number): string {
  if (score >= 90) return 'Mycket lätt';
  if (score >= 80) return 'Lätt';
  if (score >= 70) return 'Ganska lätt';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Ganska svår';
  if (score >= 30) return 'Svår';
  return 'Mycket svår';
}

// ============================================================================
// TEXT SUGGESTIONS GENERATOR
// ============================================================================

/**
 * Genererar förbättrat title-förslag
 */
export function generateTitleSuggestion(
  originalTitle: string | null,
  url: string,
  keywords: string[]
): TextSuggestion | null {
  const title = originalTitle || '';
  const length = title.length;

  // Optimalt: 50-60 tecken
  if (length >= 50 && length <= 60 && keywords.some(k => title.toLowerCase().includes(k.toLowerCase()))) {
    return null; // Title är redan bra
  }

  let suggestedTitle = title;
  let reason = '';
  let impact: ImpactLevel = 'medium';
  let scoreImpact = 5;

  if (length === 0) {
    // Skapa ny title från URL och keywords
    const pageName = url.split('/').pop()?.replace(/[-_]/g, ' ') || 'Hem';
    suggestedTitle = `${keywords[0] || pageName} | Professional Services`;
    reason = 'Title saknas helt. Skapad baserat på URL och keywords.';
    impact = 'high';
    scoreImpact = 20;
  } else if (length < 50) {
    // För kort - lägg till keywords
    const missingKeyword = keywords.find(k => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${title} - ${missingKeyword}`;
    }
    reason = `Title är för kort (${length} tecken). Optimalt är 50-60 tecken.`;
    impact = 'medium';
    scoreImpact = 10;
  } else if (length > 60) {
    // För lång - korta ner
    suggestedTitle = title.substring(0, 57) + '...';
    reason = `Title är för lång (${length} tecken). Trunkerad till 60 tecken.`;
    impact = 'medium';
    scoreImpact = 8;
  } else {
    // Rätt längd men saknar keywords
    const missingKeyword = keywords.find(k => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${missingKeyword} | ${title}`.substring(0, 60);
      reason = 'Title saknar huvudnyckelord. Lagt till för bättre ranking.';
      impact = 'high';
      scoreImpact = 15;
    } else {
      return null;
    }
  }

  return {
    section_type: 'title',
    section_identifier: 'title',
    original_text: title,
    suggested_text: suggestedTitle,
    keywords: keywords.filter(k => suggestedTitle.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedTitle, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: 100 // Titles är enkla
  };
}

/**
 * Genererar förbättrat meta description-förslag
 */
export function generateMetaDescriptionSuggestion(
  originalDesc: string | null,
  pageContent: string,
  keywords: string[]
): TextSuggestion | null {
  const desc = originalDesc || '';
  const length = desc.length;

  // Optimalt: 140-160 tecken med CTA
  if (length >= 140 && length <= 160 &&
      keywords.some(k => desc.toLowerCase().includes(k.toLowerCase())) &&
      /läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
    return null; // Redan bra
  }

  let suggestedDesc = desc;
  let reason = '';
  let impact: ImpactLevel = 'medium';
  let scoreImpact = 5;

  if (length === 0) {
    // Skapa från sidinnehåll
    const firstParagraph = pageContent.split('.')[0] || '';
    const keywordPhrase = keywords.slice(0, 2).join(' och ');
    suggestedDesc = `Upptäck ${keywordPhrase}. ${firstParagraph.substring(0, 100)}... Läs mer här!`;
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = 'Meta description saknas. Skapad från sidinnehåll med keywords och CTA.';
    impact = 'high';
    scoreImpact = 20;
  } else if (length < 140) {
    // För kort - utöka med keywords och CTA
    const missingKeywords = keywords.filter(k => !desc.toLowerCase().includes(k.toLowerCase()));
    if (missingKeywords.length > 0) {
      suggestedDesc = `${desc} Inkluderar ${missingKeywords[0]}. Läs mer!`;
    } else {
      suggestedDesc = `${desc} Läs mer här!`;
    }
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = `Meta description är för kort (${length} tecken). Utökad till 140-160 tecken med CTA.';
    impact = 'medium';
    scoreImpact = 12;
  } else if (length > 160) {
    // För lång - korta ner men behåll keywords
    const keywordPart = keywords.find(k => desc.toLowerCase().includes(k.toLowerCase())) || '';
    suggestedDesc = desc.substring(0, 145) + '... Läs mer!';
    reason = `Meta description är för lång (${length} tecken). Kortad till 160 tecken.`;
    impact = 'medium';
    scoreImpact = 8;
  } else {
    // Rätt längd men saknar CTA eller keywords
    if (!/läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
      suggestedDesc = desc.substring(0, 145) + ' Läs mer!';
      reason = 'Lagt till call-to-action för bättre CTR.';
      impact = 'low';
      scoreImpact = 5;
    }
  }

  return {
    section_type: 'meta_description',
    section_identifier: 'meta[name="description"]',
    original_text: desc,
    suggested_text: suggestedDesc,
    keywords: keywords.filter(k => suggestedDesc.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedDesc, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: calculateReadability(suggestedDesc)
  };
}

/**
 * Genererar förbättringsförslag för rubriker (H1-H4)
 */
export function generateHeadingSuggestion(
  headingLevel: 'h1' | 'h2' | 'h3' | 'h4',
  originalText: string,
  keywords: string[],
  index: number
): TextSuggestion | null {
  const text = originalText.trim();

  // H1 är mest viktig
  if (headingLevel === 'h1') {
    // H1 borde innehålla huvudnyckelord
    if (!keywords.some(k => text.toLowerCase().includes(k.toLowerCase()))) {
      const suggestedText = `${keywords[0]}: ${text}`;
      return {
        section_type: 'h1',
        section_identifier: `h1:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: suggestedText,
        keywords: [keywords[0]],
        keyword_density: calculateKeywordDensity(suggestedText, keywords),
        reason: 'H1 saknar huvudnyckelord. Detta är kritiskt för SEO.',
        impact: 'high',
        seo_score_impact: 15,
        readability_score: calculateReadability(suggestedText)
      };
    }
  }

  // H2-H4: Kolla längd och keywords
  if (text.length < 20) {
    const relevantKeyword = keywords.find(k => !text.toLowerCase().includes(k.toLowerCase()));
    if (relevantKeyword) {
      return {
        section_type: headingLevel,
        section_identifier: `${headingLevel}:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: `${text} - ${relevantKeyword}`,
        keywords: [relevantKeyword],
        keyword_density: calculateKeywordDensity(`${text} - ${relevantKeyword}`, keywords),
        reason: `${headingLevel.toUpperCase()} är för kort. Lagt till nyckelord för kontext.`,
        impact: 'low',
        seo_score_impact: 3,
        readability_score: 90
      };
    }
  }

  return null;
}

// ============================================================================
// FULL CONTENT ANALYSIS
// ============================================================================

/**
 * Analyserar fullständigt sidinnehåll
 */
export async function analyzePageContent(html: string, url: string): Promise<ContentAnalysisResult> {
  const $ = cheerio.load(html);

  // Ta bort script och style
  $('script, style, noscript').remove();

  const bodyText = $('body').text().trim();
  const words = bodyText.split(/\s+/).filter(w => w.length > 0);
  const sentences = bodyText.split(/[.!?]+/).filter(s => s.trim().length > 0);

  // Heading struktur
  const headingStructure: any[] = [];
  $('h1, h2, h3, h4, h5, h6').each((i, elem) => {
    headingStructure.push({
      level: elem.tagName,
      text: $(elem).text().trim(),
      index: i
    });
  });

  // Paragraphs
  const paragraphCount = $('p').length;

  // Keywords
  const topKeywords = extractKeywords(bodyText, 20);
  const keywordDensity = calculateKeywordDensity(bodyText, Object.keys(topKeywords).slice(0, 10));

  // Readability
  const readabilityScore = calculateReadability(bodyText);
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(words.length, 1);

  // Content score (0-100)
  let contentScore = 70; // Base score

  // Deduct för problem
  if (words.length < 300) contentScore -= 20; // För lite innehåll
  if (headingStructure.length === 0) contentScore -= 15; // Inga rubriker
  if (paragraphCount < 3) contentScore -= 10; // För få paragrafer
  if (readabilityScore < 50) contentScore -= 10; // Svårläst

  // Förbättringsområden
  const improvementAreas: string[] = [];
  if (words.length < 300) improvementAreas.push('Lägg till mer innehåll (minst 300 ord)');
  if (headingStructure.length === 0) improvementAreas.push('Lägg till rubriker (H1-H4)');
  if (paragraphCount < 3) improvementAreas.push('Dela upp text i fler paragrafer');
  if (readabilityScore < 50) improvementAreas.push('Förenkla språket för bättre läsbarhet');
  if (avgSentenceLength > 25) improvementAreas.push('Korta ner meningarna');

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
    missing_keywords: [], // Detta kan förbättras med konkurrenssanalys
    sentiment_score: 0.5, // Neutral - kan förbättras med sentiment analysis
    tone: avgWordLength > 6 ? 'professional' : 'casual',
    content_score: Math.max(0, Math.min(100, contentScore)),
    improvement_areas: improvementAreas
  };
}

/**
 * Genererar alla textförslag för en sida
 */
export async function generateAllSuggestions(
  html: string,
  url: string,
  targetKeywords: string[] = []
): Promise<TextSuggestion[]> {
  const $ = cheerio.load(html);
  const suggestions: TextSuggestion[] = [];

  // Extrahera automatiska keywords om inga ges
  const bodyText = $('body').text();
  const keywords = targetKeywords.length > 0
    ? targetKeywords
    : Object.keys(extractKeywords(bodyText, 5));

  // Title
  const title = $('title').text();
  const titleSuggestion = generateTitleSuggestion(title, url, keywords);
  if (titleSuggestion) suggestions.push(titleSuggestion);

  // Meta description
  const metaDesc = $('meta[name="description"]').attr('content') || null;
  const descSuggestion = generateMetaDescriptionSuggestion(metaDesc, bodyText, keywords);
  if (descSuggestion) suggestions.push(descSuggestion);

  // H1 headings
  $('h1').each((i, elem) => {
    const h1Suggestion = generateHeadingSuggestion('h1', $(elem).text(), keywords, i);
    if (h1Suggestion) suggestions.push(h1Suggestion);
  });

  // H2 headings (max 5)
  $('h2').slice(0, 5).each((i, elem) => {
    const h2Suggestion = generateHeadingSuggestion('h2', $(elem).text(), keywords, i);
    if (h2Suggestion) suggestions.push(h2Suggestion);
  });

  // H3 headings (max 3)
  $('h3').slice(0, 3).each((i, elem) => {
    const h3Suggestion = generateHeadingSuggestion('h3', $(elem).text(), keywords, i);
    if (h3Suggestion) suggestions.push(h3Suggestion);
  });

  return suggestions;
}
