'use client';

// Enhanced Score Overview med charts och visualiseringar

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import { BarChart3, AlertTriangle, CheckCircle, ExternalLink, TrendingUp, Activity } from 'lucide-react';

interface AuditData {
  url: string;
  score: number;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  created_at: string;
}

const COLORS = ['#22c55e', '#eab308', '#ef4444'];

export default function ScoreOverview() {
  const [audits, setAudits] = useState<AuditData[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'flagged'>('all');

  useEffect(() => {
    fetchAudits();
  }, []);

  const fetchAudits = async () => {
    try {
      const response = await fetch('/api/agent/data?type=latest');
      const data = await response.json();

      if (data.success) {
        setAudits(data.data);
      }
    } catch (error) {
      console.error('Error fetching audits:', error);
    } finally {
      setLoading(false);
    }
  };

  // Flaggade sidor
  const flaggedAudits = audits.filter(
    audit =>
      audit.score < 50 ||
      (audit.lcp && audit.lcp > 2.5) ||
      (audit.cls && audit.cls > 0.1) ||
      (audit.inp && audit.inp > 200)
  );

  const displayedAudits = filter === 'flagged' ? flaggedAudits : audits;

  // Chart data - Score Distribution
  const scoreDistribution = [
    {
      name: 'Good (80-100)',
      count: audits.filter(a => a.score >= 80).length,
      fill: '#22c55e'
    },
    {
      name: 'Needs Improvement (50-79)',
      count: audits.filter(a => a.score >= 50 && a.score < 80).length,
      fill: '#eab308'
    },
    {
      name: 'Poor (0-49)',
      count: audits.filter(a => a.score < 50).length,
      fill: '#ef4444'
    },
  ];

  // Chart data - Top/Bottom 10 pages
  const sortedByScore = [...audits].sort((a, b) => a.score - b.score);
  const bottomPages = sortedByScore.slice(0, 10).map(audit => ({
    name: new URL(audit.url).pathname.slice(0, 20) + '...',
    score: audit.score,
    url: audit.url,
  }));

  const topPages = sortedByScore.slice(-10).reverse().map(audit => ({
    name: new URL(audit.url).pathname.slice(0, 20) + '...',
    score: audit.score,
    url: audit.url,
  }));

  // Vitals stats
  const avgLcp = audits.filter(a => a.lcp).reduce((sum, a) => sum + (a.lcp || 0), 0) / audits.filter(a => a.lcp).length || 0;
  const avgCls = audits.filter(a => a.cls).reduce((sum, a) => sum + (a.cls || 0), 0) / audits.filter(a => a.cls).length || 0;
  const avgInp = audits.filter(a => a.inp).reduce((sum, a) => sum + (a.inp || 0), 0) / audits.filter(a => a.inp).length || 0;

  const vitalsData = [
    { name: 'LCP (s)', value: avgLcp.toFixed(2), threshold: 2.5, status: avgLcp <= 2.5 ? 'good' : 'poor' },
    { name: 'CLS', value: (avgCls * 1000).toFixed(0), threshold: 0.1, status: avgCls <= 0.1 ? 'good' : 'poor' },
    { name: 'INP (ms)', value: avgInp.toFixed(0), threshold: 200, status: avgInp <= 200 ? 'good' : 'poor' },
  ];

  // Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Vital badge
  const getVitalBadge = (value: number | null, threshold: number, unit: string) => {
    if (value === null) return <Badge variant="outline">N/A</Badge>;

    const isGood = value <= threshold;

    return (
      <Badge variant={isGood ? "default" : "destructive"} className={isGood ? "bg-green-600 hover:bg-green-700" : ""}>
        {value.toFixed(value < 1 ? 4 : 2)}{unit}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-12" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Total Pages
            </CardDescription>
            <CardTitle className="text-4xl">
              {audits.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Monitored URLs</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Average Score
            </CardDescription>
            <CardTitle className="text-4xl">
              {audits.length > 0
                ? (audits.reduce((sum, a) => sum + a.score, 0) / audits.length).toFixed(1)
                : '0'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Flagged Issues
            </CardDescription>
            <CardTitle className="text-4xl text-orange-600">
              {flaggedAudits.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Score Distribution</CardTitle>
            <CardDescription>Pages grouped by performance score</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name.split(' ')[0]}: ${entry.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {scoreDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Core Web Vitals */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Core Web Vitals</CardTitle>
            <CardDescription>Average vital metrics across all pages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 pt-4">
              {vitalsData.map((vital) => (
                <div key={vital.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{vital.name}</span>
                    <Badge variant={vital.status === 'good' ? 'default' : 'destructive'} className={vital.status === 'good' ? 'bg-green-600' : ''}>
                      {vital.value}
                    </Badge>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${vital.status === 'good' ? 'bg-green-600' : 'bg-red-600'}`}
                      style={{ width: vital.status === 'good' ? '100%' : '60%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top/Bottom Pages Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Performance Comparison</CardTitle>
          <CardDescription>Best and worst performing pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bottom">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bottom">Lowest Scores</TabsTrigger>
              <TabsTrigger value="top">Highest Scores</TabsTrigger>
            </TabsList>
            <TabsContent value="bottom" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bottomPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="top" className="mt-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          onClick={() => setFilter('all')}
          variant={filter === 'all' ? 'default' : 'outline'}
        >
          All Pages ({audits.length})
        </Button>
        <Button
          onClick={() => setFilter('flagged')}
          variant={filter === 'flagged' ? 'default' : 'outline'}
        >
          <AlertTriangle className="h-4 w-4 mr-2" />
          Flagged ({flaggedAudits.length})
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Page Details</CardTitle>
          <CardDescription>Detailed metrics for each page</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>URL</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">LCP</TableHead>
                <TableHead className="text-center">CLS</TableHead>
                <TableHead className="text-center">INP</TableHead>
                <TableHead className="text-center">Checked</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayedAudits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No audits found. Run the agent to start monitoring.
                  </TableCell>
                </TableRow>
              ) : (
                displayedAudits.map((audit, index) => (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell>
                      <a
                        href={audit.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 hover:underline flex items-center gap-2"
                      >
                        {audit.url.length > 50 ? audit.url.substring(0, 50) + '...' : audit.url}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-2xl font-bold ${getScoreColor(audit.score)}`}>
                        {audit.score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {getVitalBadge(audit.lcp, 2.5, 's')}
                    </TableCell>
                    <TableCell className="text-center">
                      {getVitalBadge(audit.cls, 0.1, '')}
                    </TableCell>
                    <TableCell className="text-center">
                      {getVitalBadge(audit.inp, 200, 'ms')}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground">
                      {new Date(audit.created_at).toLocaleDateString('sv-SE', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/-/g, '/')}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
