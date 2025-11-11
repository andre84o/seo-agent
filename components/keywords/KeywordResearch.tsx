'use client';

import { useState } from 'react';

interface KeywordData {
  keyword: string;
  search_volume?: number;
  competition?: string;
  cpc?: number;
}

type ResearchType = 'volume' | 'suggestions' | 'long-tail';

export default function KeywordResearch() {
  const [researchType, setResearchType] = useState<ResearchType>('suggestions');
  const [keyword, setKeyword] = useState('');
  const [keywords, setKeywords] = useState<string[]>(['']);
  const [country, setCountry] = useState('us');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      let response;

      if (researchType === 'volume') {
        const filteredKeywords = keywords.filter(k => k.trim() !== '');
        response = await fetch('/api/fetchserp/keywords/search-volume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ keywords: filteredKeywords, country }),
        });
      } else if (researchType === 'suggestions') {
        const params = new URLSearchParams({ keyword, country });
        response = await fetch(`/api/fetchserp/keywords/suggestions?${params}`);
      } else {
        const params = new URLSearchParams({ keyword, country });
        response = await fetch(`/api/fetchserp/keywords/long-tail?${params}`);
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch keyword data');
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addKeywordField = () => {
    setKeywords([...keywords, '']);
  };

  const updateKeyword = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const removeKeyword = (index: number) => {
    const newKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(newKeywords);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Keyword Research
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Discover search volume, keyword suggestions, and long-tail variations
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setResearchType('suggestions')}
          className={`px-4 py-2 font-medium ${
            researchType === 'suggestions'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Suggestions
        </button>
        <button
          onClick={() => setResearchType('volume')}
          className={`px-4 py-2 font-medium ${
            researchType === 'volume'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Search Volume
        </button>
        <button
          onClick={() => setResearchType('long-tail')}
          className={`px-4 py-2 font-medium ${
            researchType === 'long-tail'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Long-Tail
        </button>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {researchType === 'volume' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keywords
            </label>
            <div className="space-y-2">
              {keywords.map((kw, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={kw}
                    onChange={(e) => updateKeyword(index, e.target.value)}
                    placeholder="Enter keyword..."
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                  {keywords.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addKeywordField}
              className="mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
            >
              + Add another keyword
            </button>
          </div>
        ) : (
          <div>
            <label htmlFor="keyword-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keyword
            </label>
            <input
              id="keyword-input"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        )}

        <div>
          <label htmlFor="country-code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <input
            id="country-code"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="us, uk, se..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
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
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Results
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
