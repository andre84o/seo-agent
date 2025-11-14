'use client';

// Huvudsida för SEO-agent dashboard
// Visar senaste score, trends, förslag och exportfunktioner

import { useState, useEffect } from 'react';
import RunAgent from '@/components/dashboard/RunAgent';
import ScoreOverview from '@/components/dashboard/ScoreOverview';
import SuggestionsList from '@/components/dashboard/SuggestionsList';
import RecentRuns from '@/components/dashboard/RecentRuns';
import ExportData from '@/components/dashboard/ExportData';
import TextSuggestions from '@/components/dashboard/TextSuggestions';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'suggestions' | 'text-suggestions' | 'runs'>('overview');
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh data efter agent run
  const handleRunComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            SEO Agent Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Automated SEO monitoring with PageSpeed Insights, on-page analysis, and GSC data
          </p>
        </div>

        {/* Run Agent Section */}
        <div className="mb-8">
          <RunAgent onRunComplete={handleRunComplete} />
        </div>

        {/* Export Section */}
        <div className="mb-8">
          <ExportData />
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                📊 Score Overview
              </button>
              <button
                onClick={() => setActiveTab('suggestions')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'suggestions'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                💡 Suggestions
              </button>
              <button
                onClick={() => setActiveTab('text-suggestions')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'text-suggestions'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                ✏️ Textförslag
              </button>
              <button
                onClick={() => setActiveTab('runs')}
                className={`px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === 'runs'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                🕐 Recent Runs
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && <ScoreOverview key={refreshKey} />}
            {activeTab === 'suggestions' && <SuggestionsList key={refreshKey} />}
            {activeTab === 'text-suggestions' && <TextSuggestions key={refreshKey} />}
            {activeTab === 'runs' && <RecentRuns key={refreshKey} />}
          </div>
        </div>
      </main>
    </div>
  );
}
