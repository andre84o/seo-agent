'use client';

// Huvudsida för SEO-agent dashboard
// Modern layout med sidebar navigation

import { useState } from 'react';
import RunAgent from '@/components/dashboard/RunAgent';
import ScoreOverview from '@/components/dashboard/ScoreOverview';
import SuggestionsList from '@/components/dashboard/SuggestionsList';
import RecentRuns from '@/components/dashboard/RecentRuns';
import ExportData from '@/components/dashboard/ExportData';
import TextSuggestions from '@/components/dashboard/TextSuggestions';
import Settings from '@/components/dashboard/Settings';
import { AIAnalysis } from '@/components/dashboard/AIAnalysis';
import { SEOTasks } from '@/components/dashboard/SEOTasks';
import { Dashboard as DashboardView } from '@/components/dashboard/Dashboard';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Download } from 'lucide-react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  // Refresh data efter agent run
  const handleRunComplete = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-gray-900 dark:via-blue-900/10 dark:to-gray-800">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-8 py-6 max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent mb-1">
                  {activeTab === 'dashboard' && 'Dashboard'}
                  {activeTab === 'tasks' && 'SEO Tasks'}
                  {activeTab === 'ai-analysis' && 'AI Analysis'}
                  {activeTab === 'overview' && 'Score Overview'}
                  {activeTab === 'suggestions' && 'Suggestions'}
                  {activeTab === 'text-suggestions' && 'Text Suggestions'}
                  {activeTab === 'runs' && 'Run History'}
                  {activeTab === 'settings' && 'Settings'}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {activeTab === 'dashboard' && 'Overview of your SEO performance'}
                  {activeTab === 'tasks' && 'Manage your SEO tasks and priorities'}
                  {activeTab === 'ai-analysis' && 'AI-powered insights and recommendations'}
                  {activeTab === 'overview' && 'Detailed metrics and performance data'}
                  {activeTab === 'suggestions' && 'SEO improvement suggestions'}
                  {activeTab === 'text-suggestions' && 'Content optimization ideas'}
                  {activeTab === 'runs' && 'Historical run data'}
                  {activeTab === 'settings' && 'Configure your SEO manager'}
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <RunAgent onRunComplete={handleRunComplete} compact />
                <ExportData compact />
              </div>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {activeTab === 'dashboard' && <DashboardView refreshKey={refreshKey} />}
              {activeTab === 'tasks' && <SEOTasks key={refreshKey} />}
              {activeTab === 'ai-analysis' && <AIAnalysis />}
              {activeTab === 'overview' && <ScoreOverview key={refreshKey} />}
              {activeTab === 'suggestions' && <SuggestionsList key={refreshKey} />}
              {activeTab === 'text-suggestions' && <TextSuggestions key={refreshKey} />}
              {activeTab === 'runs' && <RecentRuns key={refreshKey} />}
              {activeTab === 'settings' && <Settings />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
