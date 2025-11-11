'use client';

import { useState } from 'react';

type AnalysisType = 'content' | 'competitor';

export default function SEOAnalyzer() {
  const [analysisType, setAnalysisType] = useState<AnalysisType>('content');
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (analysisType === 'content' && !url) {
      setError('Please enter a URL for content analysis');
      return;
    }
    if (analysisType === 'competitor' && !keyword) {
      setError('Please enter a keyword for competitor analysis');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      let endpoint = '';
      if (analysisType === 'content') {
        endpoint = `/api/fetchserp/analysis/content?url=${encodeURIComponent(url)}`;
      } else {
        endpoint = `/api/fetchserp/analysis/competitor?keyword=${encodeURIComponent(keyword)}`;
        if (domain) {
          endpoint += `&domain=${encodeURIComponent(domain)}`;
        }
      }

      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          SEO Analyzer
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze content and competitors for SEO insights
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Analysis Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="content"
                checked={analysisType === 'content'}
                onChange={(e) => setAnalysisType(e.target.value as AnalysisType)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Content Analysis</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="competitor"
                checked={analysisType === 'competitor'}
                onChange={(e) => setAnalysisType(e.target.value as AnalysisType)}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Competitor Analysis</span>
            </label>
          </div>
        </div>

        {analysisType === 'content' ? (
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL to Analyze
            </label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        ) : (
          <>
            <div>
              <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keyword
              </label>
              <input
                id="keyword"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Enter keyword"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Domain (Optional)
              </label>
              <input
                id="domain"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </>
        )}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 overflow-auto max-h-[600px]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Analysis Results
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
