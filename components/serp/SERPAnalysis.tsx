'use client';

import { useState } from 'react';

interface OrganicResult {
  position: number;
  title: string;
  link: string;
  snippet: string;
  domain: string;
}

interface SERPData {
  organic_results?: OrganicResult[];
  related_searches?: { query: string }[];
  knowledge_graph?: {
    title: string;
    description: string;
  };
}

export default function SERPAnalysis() {
  const [query, setQuery] = useState('');
  const [engine, setEngine] = useState('google');
  const [country, setCountry] = useState('us');
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SERPData | null>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      const params = new URLSearchParams({
        q: query,
        engine,
        gl: country,
        hl: language,
      });

      const response = await fetch(`/api/fetchserp/serp?${params}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch SERP data');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          SERP Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get structured search engine results from Google, Bing, Yahoo, or DuckDuckGo
        </p>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        <div>
          <label htmlFor="serp-query" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Query
          </label>
          <input
            id="serp-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your search query..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="engine" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Search Engine
            </label>
            <select
              id="engine"
              value={engine}
              onChange={(e) => setEngine(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="google">Google</option>
              <option value="bing">Bing</option>
              <option value="yahoo">Yahoo</option>
              <option value="duckduckgo">DuckDuckGo</option>
            </select>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country
            </label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="us, uk, se..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Language
            </label>
            <input
              id="language"
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="en, sv, de..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      {results && (
        <div className="space-y-6">
          {results.knowledge_graph && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Knowledge Graph
              </h3>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                {results.knowledge_graph.title}
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                {results.knowledge_graph.description}
              </p>
            </div>
          )}

          {results.organic_results && results.organic_results.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Organic Results ({results.organic_results.length})
              </h3>
              <div className="space-y-4">
                {results.organic_results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {result.position}
                      </div>
                      <div className="flex-1 min-w-0">
                        <a
                          href={result.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-400 block truncate"
                        >
                          {result.title}
                        </a>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          {result.domain}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                          {result.snippet}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.related_searches && results.related_searches.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Related Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.related_searches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search.query)}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    {search.query}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
