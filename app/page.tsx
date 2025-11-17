'use client';

// Huvudsida för SEO-agent dashboard
// Visar senaste score, trends, förslag och exportfunktioner

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
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
            🤖 AI-Driven SEO Manager
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            OpenAI + Google Search Console + Analytics = Din personliga SEO-expert
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

        {/* Tabs Navigation with shadcn */}
        <Tabs defaultValue="tasks" className="w-full">
          <Card>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="tasks"><i className="bi bi-list-check me-2"></i>Todo</TabsTrigger>
                <TabsTrigger value="ai-analysis"><i className="bi bi-robot me-2"></i>AI Analys</TabsTrigger>
                <TabsTrigger value="overview"><i className="bi bi-bar-chart-fill me-2"></i>Score</TabsTrigger>
                <TabsTrigger value="suggestions"><i className="bi bi-lightbulb-fill me-2"></i>Förslag</TabsTrigger>
                <TabsTrigger value="text-suggestions"><i className="bi bi-pencil-fill me-2"></i>Text</TabsTrigger>
                <TabsTrigger value="runs"><i className="bi bi-clock-history me-2"></i>Runs</TabsTrigger>
                <TabsTrigger value="settings"><i className="bi bi-gear-fill me-2"></i>Settings</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="tasks" className="mt-0">
                <SEOTasks key={refreshKey} />
              </TabsContent>
              <TabsContent value="ai-analysis" className="mt-0">
                <AIAnalysis />
              </TabsContent>
              <TabsContent value="overview" className="mt-0">
                <ScoreOverview key={refreshKey} />
              </TabsContent>
              <TabsContent value="suggestions" className="mt-0">
                <SuggestionsList key={refreshKey} />
              </TabsContent>
              <TabsContent value="text-suggestions" className="mt-0">
                <TextSuggestions key={refreshKey} />
              </TabsContent>
              <TabsContent value="runs" className="mt-0">
                <RecentRuns key={refreshKey} />
              </TabsContent>
              <TabsContent value="settings" className="mt-0">
                <Settings />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
