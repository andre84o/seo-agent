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

        {/* Tabs Navigation with shadcn */}
        <Tabs defaultValue="overview" className="w-full">
          <Card>
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview"><i className="bi bi-bar-chart-fill me-2"></i>Score Overview</TabsTrigger>
                <TabsTrigger value="suggestions"><i className="bi bi-lightbulb-fill me-2"></i>Suggestions</TabsTrigger>
                <TabsTrigger value="text-suggestions"><i className="bi bi-pencil-fill me-2"></i>Textförslag</TabsTrigger>
                <TabsTrigger value="runs"><i className="bi bi-clock-history me-2"></i>Recent Runs</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  );
}
