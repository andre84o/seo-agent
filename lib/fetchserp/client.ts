import axios, { AxiosInstance } from 'axios';

const FETCHSERP_API_URL = 'https://www.fetchserp.com';

export interface FetchSERPConfig {
  apiToken: string;
}

export interface SERPParams {
  q: string;
  engine?: 'google' | 'bing' | 'yahoo' | 'duckduckgo';
  gl?: string;
  hl?: string;
  num?: number;
  page?: number;
}

export interface KeywordVolumeParams {
  keywords: string[];
  country?: string;
  language?: string;
}

export interface BacklinksParams {
  domain: string;
  limit?: number;
}

export interface DomainInfoParams {
  domain: string;
}

export interface ScrapeParams {
  url: string;
  headers?: Record<string, string>;
}

export interface ScrapeJSParams {
  url: string;
  js_code: string;
  headers?: Record<string, string>;
}

export interface SEOAnalysisParams {
  url: string;
  keywords?: string[];
}

export interface AIAnalysisParams {
  url: string;
  prompt: string;
}

export interface RankingParams {
  domain: string;
  keyword: string;
  engine?: string;
  gl?: string;
}

export interface PageIndexationParams {
  url: string;
  engine?: string;
}

export class FetchSERPClient {
  private client: AxiosInstance;

  constructor(config: FetchSERPConfig) {
    this.client = axios.create({
      baseURL: FETCHSERP_API_URL,
      headers: {
        'Authorization': `Bearer ${config.apiToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // ==================== SERP Endpoints ====================

  /**
   * Get structured SERP results
   */
  async getSERP(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp', { params });
    return response.data;
  }

  /**
   * Get SERP results with full HTML
   */
  async getSERPHTML(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp_html', { params });
    return response.data;
  }

  /**
   * Get SERP results with extracted text
   */
  async getSERPText(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp_text', { params });
    return response.data;
  }

  /**
   * Get JavaScript-rendered SERP with AI Overview
   */
  async getSERPJS(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp_js', { params });
    return response.data;
  }

  /**
   * Get AI Overview and AI Mode results
   */
  async getSERPAI(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp_ai', { params });
    return response.data;
  }

  /**
   * Get cached US-only AI Mode results
   */
  async getSERPAIMode(params: SERPParams) {
    const response = await this.client.get('/api/v1/serp_ai_mode', { params });
    return response.data;
  }

  // ==================== Keyword Research Endpoints ====================

  /**
   * Get monthly search volume and competition metrics
   */
  async getKeywordsSearchVolume(params: KeywordVolumeParams) {
    const response = await this.client.post('/api/v1/keywords_search_volume', params);
    return response.data;
  }

  /**
   * Get keyword suggestions with metrics
   */
  async getKeywordsSuggestions(params: { keyword: string; country?: string; language?: string }) {
    const response = await this.client.get('/api/v1/keywords_suggestions', { params });
    return response.data;
  }

  /**
   * Generate long-tail keyword variations
   */
  async getLongTailKeywords(params: { keyword: string; country?: string; language?: string }) {
    const response = await this.client.get('/api/v1/long_tail_keywords_generator', { params });
    return response.data;
  }

  // ==================== Domain Analysis Endpoints ====================

  /**
   * Get domain ranking for specific keywords
   */
  async getDomainRanking(params: RankingParams) {
    const response = await this.client.get('/api/v1/ranking', { params });
    return response.data;
  }

  /**
   * Get backlink data for a domain
   */
  async getBacklinks(params: BacklinksParams) {
    const response = await this.client.get('/api/v1/backlinks', { params });
    return response.data;
  }

  /**
   * Get DNS, WHOIS, and tech stack information
   */
  async getDomainInfo(params: DomainInfoParams) {
    const response = await this.client.get('/api/v1/domain_infos', { params });
    return response.data;
  }

  /**
   * Extract emails from SERP results
   */
  async getDomainEmails(params: { query: string; engine?: string }) {
    const response = await this.client.get('/api/v1/domain_emails', { params });
    return response.data;
  }

  /**
   * Get Moz domain authority metrics
   */
  async getMozMetrics(params: { domain: string }) {
    const response = await this.client.get('/api/v1/moz', { params });
    return response.data;
  }

  /**
   * Check page indexation status
   */
  async getPageIndexation(params: PageIndexationParams) {
    const response = await this.client.get('/api/v1/page_indexation', { params });
    return response.data;
  }

  // ==================== Web Scraping Endpoints ====================

  /**
   * Get raw HTML without JavaScript
   */
  async scrape(params: ScrapeParams) {
    const response = await this.client.post('/api/v1/scrape', params);
    return response.data;
  }

  /**
   * Custom JavaScript extraction
   */
  async scrapeJS(params: ScrapeJSParams) {
    const response = await this.client.post('/api/v1/scrape_js', params);
    return response.data;
  }

  /**
   * JS extraction through proxy
   */
  async scrapeJSWithProxy(params: ScrapeJSParams) {
    const response = await this.client.post('/api/v1/scrape_js_with_proxy', params);
    return response.data;
  }

  /**
   * Crawl entire domain
   */
  async scrapeDomain(params: { domain: string; max_pages?: number }) {
    const response = await this.client.post('/api/v1/scrape_domain', params);
    return response.data;
  }

  // ==================== Analysis Endpoints ====================

  /**
   * Technical & on-page SEO audit
   */
  async analyzeSEO(params: SEOAnalysisParams) {
    const response = await this.client.post('/api/v1/web_page_seo_analysis', params);
    return response.data;
  }

  /**
   * AI-powered content analysis
   */
  async analyzeWithAI(params: AIAnalysisParams) {
    const response = await this.client.post('/api/v1/web_page_ai_analysis', params);
    return response.data;
  }

  // ==================== User Endpoints ====================

  /**
   * Get current user information
   */
  async getUser() {
    const response = await this.client.get('/api/v1/user');
    return response.data;
  }
}

// Export singleton instance
let fetchSERPClient: FetchSERPClient | null = null;

export function getFetchSERPClient(): FetchSERPClient {
  if (!fetchSERPClient) {
    const apiToken = process.env.FETCHSERP_API_TOKEN;
    if (!apiToken) {
      throw new Error('FETCHSERP_API_TOKEN is not defined in environment variables');
    }
    fetchSERPClient = new FetchSERPClient({ apiToken });
  }
  return fetchSERPClient;
}
