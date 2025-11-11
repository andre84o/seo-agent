'use client';

import { useState } from 'react';

type AnalysisType = 'ranking' | 'backlinks' | 'info' | 'moz' | 'indexation';

export default function DomainAnalysis() {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('info');
  const [domain, setDomain] = useState('');
  const [keyword, setKeyword] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResults(null);

    try {
      let response;

      switch (analysisType) {
        case 'ranking':
          const rankingParams = new URLSearchParams({ domain, keyword });
          response = await fetch(`/api/fetchserp/domain/ranking?${rankingParams}`);
          break;
        case 'backlinks':
          const backlinksParams = new URLSearchParams({ domain });
          response = await fetch(`/api/fetchserp/domain/backlinks?${backlinksParams}`);
          break;
        case 'info':
          const infoParams = new URLSearchParams({ domain });
          response = await fetch(`/api/fetchserp/domain/info?${infoParams}`);
          break;
        case 'moz':
          const mozParams = new URLSearchParams({ domain });
          response = await fetch(`/api/fetchserp/domain/moz?${mozParams}`);
          break;
        case 'indexation':
          const indexParams = new URLSearchParams({ url });
          response = await fetch(`/api/fetchserp/domain/indexation?${indexParams}`);
          break;
      }

      if (!response!.ok) {
        const errorData = await response!.json();
        throw new Error(errorData.error || 'Failed to fetch domain data');
      }

      const data = await response!.json();
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
          Domain Analysis
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze domains with backlinks, rankings, WHOIS, DNS, and more
        </p>
      </div>

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <button
          onClick={() => setAnalysisType('info')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            analysisType === 'info'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Domain Info
        </button>
        <button
          onClick={() => setAnalysisType('backlinks')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            analysisType === 'backlinks'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Backlinks
        </button>
        <button
          onClick={() => setAnalysisType('ranking')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            analysisType === 'ranking'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Ranking
        </button>
        <button
          onClick={() => setAnalysisType('moz')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            analysisType === 'moz'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Moz Metrics
        </button>
        <button
          onClick={() => setAnalysisType('indexation')}
          className={`px-4 py-2 font-medium whitespace-nowrap ${
            analysisType === 'indexation'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          Indexation
        </button>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-4">
        {analysisType === 'indexation' ? (
          <div>
            <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL
            </label>
            <input
              id="url-input"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="domain-input" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Domain
            </label>
            <input
              id="domain-input"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        )}

        {analysisType === 'ranking' && (
          <div>
            <label htmlFor="ranking-keyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Keyword
            </label>
            <input
              id="ranking-keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keyword to check ranking"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
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
            Analysis Results
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
