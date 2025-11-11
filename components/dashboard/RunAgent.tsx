'use client';

// Komponent för att köra SEO-agenten manuellt
// Tillåter användaren att starta en audit-körning

import { useState } from 'react';

interface RunAgentProps {
  onRunComplete: () => void;
}

export default function RunAgent({ onRunComplete }: RunAgentProps) {
  const [siteUrl, setSiteUrl] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [maxPages, setMaxPages] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    if (!siteUrl) {
      setError('Please enter a site URL');
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/agent/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteUrl,
          sitemapUrl: sitemapUrl || undefined,
          maxPages,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to run agent');
      }

      setResult(data);
      onRunComplete();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Run SEO Agent
      </h2>

      <div className="space-y-4">
        {/* Site URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Site URL *
          </label>
          <input
            type="url"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
        </div>

        {/* Sitemap URL (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sitemap URL (optional)
          </label>
          <input
            type="url"
            value={sitemapUrl}
            onChange={(e) => setSitemapUrl(e.target.value)}
            placeholder="https://example.com/sitemap.xml"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Leave empty to auto-discover from robots.txt
          </p>
        </div>

        {/* Max Pages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Pages to Check
          </label>
          <input
            type="number"
            value={maxPages}
            onChange={(e) => setMaxPages(parseInt(e.target.value))}
            min="1"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            disabled={isRunning}
          />
        </div>

        {/* Run Button */}
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
        >
          {isRunning ? 'Running Agent...' : 'Run Agent'}
        </button>

        {/* Error */}
        {error && (
          <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              ✅ Run Completed Successfully
            </h3>
            <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <p>Run ID: {result.runId}</p>
              <p>Pages Checked: {result.pagesChecked}</p>
              <p>Average Score: {result.avgScore.toFixed(1)}/100</p>
              <p>Duration: {result.duration.toFixed(1)}s</p>
              {result.flaggedPages.length > 0 && (
                <p className="text-orange-600 dark:text-orange-400">
                  ⚠️ {result.flaggedPages.length} pages flagged for attention
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
