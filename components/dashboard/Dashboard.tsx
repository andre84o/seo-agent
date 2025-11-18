'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardStats {
  totalPages: number;
  avgScore: number;
  scoreChange: number;
  flaggedIssues: number;
  activeTasks: number;
  completedTasks: number;
  pendingSuggestions: number;
  lastRun?: string;
}

export function Dashboard({ refreshKey }: { refreshKey: number }) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, [refreshKey]);

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      // Fetch multiple endpoints
      const [pagesRes, tasksRes, suggestionsRes, runsRes] = await Promise.all([
        fetch('/api/agent/data?type=latest'),
        fetch('/api/tasks?thisWeek=true'),
        fetch('/api/agent/suggestions'),
        fetch('/api/agent/data?type=runs&limit=1'),
      ]);

      const pages = await pagesRes.json();
      const tasks = await tasksRes.json();
      const suggestions = await suggestionsRes.json();
      const runs = await runsRes.json();

      // Calculate stats
      const totalPages = pages.data?.length || 0;
      const avgScore = totalPages > 0
        ? pages.data.reduce((sum: number, p: any) => sum + p.score, 0) / totalPages
        : 0;

      const flaggedIssues = pages.data?.filter(
        (p: any) => p.score < 50 || (p.lcp && p.lcp > 2.5) || (p.cls && p.cls > 0.1)
      ).length || 0;

      const activeTasks = tasks.tasks?.filter((t: any) => t.status === 'todo' || t.status === 'in_progress').length || 0;
      const completedTasks = tasks.tasks?.filter((t: any) => t.status === 'done').length || 0;

      const pendingSuggestions = suggestions.suggestions?.filter((s: any) => s.status === 'pending').length || 0;

      const lastRun = runs.data?.[0]?.started_at;

      setStats({
        totalPages,
        avgScore: Math.round(avgScore),
        scoreChange: 0, // TODO: Calculate from historical data
        flaggedIssues,
        activeTasks,
        completedTasks,
        pendingSuggestions,
        lastRun,
      });
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Skeleton className="h-80 col-span-4" />
          <Skeleton className="h-80 col-span-3" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <Activity className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalPages || 0}</div>
            <p className="text-xs text-muted-foreground">
              Monitored URLs
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.avgScore || 0}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats?.scoreChange && stats.scoreChange > 0 ? (
                <>
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                  <span className="text-green-600">+{stats.scoreChange}%</span>
                </>
              ) : (
                <span>vs last week</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.activeTasks || 0}</div>
            <p className="text-xs text-muted-foreground">
              {stats?.completedTasks || 0} completed
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats?.flaggedIssues || 0}</div>
            <p className="text-xs text-muted-foreground">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-dashed hover:border-solid hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" />
              AI Suggestions
            </CardTitle>
            <CardDescription>
              {stats?.pendingSuggestions || 0} pending suggestions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View All Suggestions
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed hover:border-solid hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Latest Run
            </CardTitle>
            <CardDescription>
              {stats?.lastRun
                ? new Date(stats.lastRun).toLocaleDateString('sv-SE', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'No runs yet'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              View History
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed hover:border-solid hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Critical Pages
            </CardTitle>
            <CardDescription>
              {stats?.flaggedIssues || 0} pages need review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">
              Review Issues
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Overview</CardTitle>
          <CardDescription>
            Your SEO performance at a glance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Pages Monitored</p>
                <p className="text-xs text-muted-foreground">Total URLs tracked</p>
              </div>
              <Badge variant="secondary" className="text-lg">
                {stats?.totalPages || 0}
              </Badge>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Average Performance</p>
                <p className="text-xs text-muted-foreground">Overall score</p>
              </div>
              <Badge
                variant={stats && stats.avgScore >= 80 ? "default" : stats && stats.avgScore >= 50 ? "secondary" : "destructive"}
                className="text-lg"
              >
                {stats?.avgScore || 0}/100
              </Badge>
            </div>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium">Tasks Progress</p>
                <p className="text-xs text-muted-foreground">Completed vs Total</p>
              </div>
              <Badge variant="outline" className="text-lg">
                {stats?.completedTasks || 0}/{(stats?.activeTasks || 0) + (stats?.completedTasks || 0)}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
