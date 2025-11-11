'use client';

import { useState } from 'react';
import SERPAnalysis from '@/components/serp/SERPAnalysis';
import KeywordResearch from '@/components/keywords/KeywordResearch';
import DomainAnalysis from '@/components/domain/DomainAnalysis';
import WebScraper from '@/components/scrape/WebScraper';
import SEOAnalyzer from '@/components/analysis/SEOAnalyzer';

type Tab = 'serp' | 'keywords' | 'domain' | 'scraper' | 'analyzer';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('serp');

  const tabs = [
    { id: 'serp' as Tab, label: 'SERP Analysis', icon: '🔍' },
    { id: 'keywords' as Tab, label: 'Keyword Research', icon: '🔑' },
    { id: 'domain' as Tab, label: 'Domain Analysis', icon: '🌐' },
    { id: 'scraper' as Tab, label: 'Web Scraper', icon: '🕷️' },
    { id: 'analyzer' as Tab, label: 'SEO Analyzer', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            SEO Agent
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            All-in-One SEO & Web Intelligence Toolkit powered by FetchSERP
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'serp' && <SERPAnalysis />}
            {activeTab === 'keywords' && <KeywordResearch />}
            {activeTab === 'domain' && <DomainAnalysis />}
            {activeTab === 'scraper' && <WebScraper />}
            {activeTab === 'analyzer' && <SEOAnalyzer />}
          </div>
        </div>
      </main>
    </div>
  );
}
