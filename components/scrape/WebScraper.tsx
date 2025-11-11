'use client';

import { useState } from 'react';

export default function WebScraper() {
  const [url, setUrl] = useState('');
  const [scrapeType, setScrapeType] = useState<'webpage' | 'screenshot'>('webpage');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleScrape = async () => {
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const endpoint = `/api/fetchserp/scrape/${scrapeType}?url=${encodeURIComponent(url)}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scrape');
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
          Web Scraper
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Scrape any webpage or capture screenshots
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            URL to Scrape
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Scrape Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="webpage"
                checked={scrapeType === 'webpage'}
                onChange={(e) => setScrapeType(e.target.value as 'webpage' | 'screenshot')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Webpage Content</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="screenshot"
                checked={scrapeType === 'screenshot'}
                onChange={(e) => setScrapeType(e.target.value as 'webpage' | 'screenshot')}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Screenshot</span>
            </label>
          </div>
        </div>

        <button
          onClick={handleScrape}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          {loading ? 'Scraping...' : 'Scrape'}
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
            Results
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
