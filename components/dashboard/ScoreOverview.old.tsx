'use client';

// Komponent för att visa senaste scores och trends
// Visar alla sidor med score, vitals och flaggade issues

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart3, AlertTriangle, CheckCircle, ExternalLink } from 'lucide-react';

interface AuditData {
  url: string;
  score: number;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  created_at: string;
}

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

  // Flaggade sidor (score < 50, LCP > 2.5, CLS > 0.1, INP > 200)
  const flaggedAudits = audits.filter(
    audit =>
      audit.score < 50 ||
      (audit.lcp && audit.lcp > 2.5) ||
      (audit.cls && audit.cls > 0.1) ||
      (audit.inp && audit.inp > 200)
  );

  const displayedAudits = filter === 'flagged' ? flaggedAudits : audits;

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
      {/* Header med stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Pages</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              {audits.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Average Score</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              {audits.length > 0
                ? (audits.reduce((sum, a) => sum + a.score, 0) / audits.length).toFixed(1)
                : '0'}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Flagged Issues</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-orange-600" />
              {flaggedAudits.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

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
                <TableRow key={index}>
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
                    {new Date(audit.created_at).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
