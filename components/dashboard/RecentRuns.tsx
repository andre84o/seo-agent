'use client';

// Komponent för att visa senaste agent-körningar
// Visar historik med stats och status

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { History, CheckCircle2, XCircle, Clock, PlayCircle } from 'lucide-react';

interface Run {
  run_id: number;
  started_at: string;
  finished_at: string | null;
  pages_checked: number;
  avg_score: number | null;
  status: string;
  error_message: string | null;
}

export default function RecentRuns() {
  const [runs, setRuns] = useState<Run[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRuns();
  }, []);

  const fetchRuns = async () => {
    try {
      const response = await fetch('/api/agent/data?type=runs&limit=20');
      const data = await response.json();

      if (data.success) {
        setRuns(data.data);
      }
    } catch (error) {
      console.error('Error fetching runs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      running: { variant: 'default' as const, icon: PlayCircle, label: 'RUNNING', className: '' },
      completed: { variant: 'default' as const, icon: CheckCircle2, label: 'COMPLETED', className: 'bg-green-600 hover:bg-green-700' },
      failed: { variant: 'destructive' as const, icon: XCircle, label: 'FAILED', className: '' },
    };

    const config = variants[status as keyof typeof variants] || {
      variant: 'outline' as const,
      icon: Clock,
      label: status.toUpperCase(),
      className: ''
    };

    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const calculateDuration = (run: Run) => {
    if (!run.finished_at) return 'Running...';

    const start = new Date(run.started_at).getTime();
    const end = new Date(run.finished_at).getTime();
    const durationSeconds = (end - start) / 1000;

    if (durationSeconds < 60) {
      return `${durationSeconds.toFixed(0)}s`;
    }

    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Runs</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <History className="h-8 w-8 text-blue-600" />
              {runs.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Completed</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              {runs.filter(r => r.status === 'completed').length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <XCircle className="h-8 w-8 text-red-600" />
              {runs.filter(r => r.status === 'failed').length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Runs List */}
      <div className="space-y-3">
        {runs.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              No runs yet. Click "Run Agent" to start your first audit.
            </CardContent>
          </Card>
        ) : (
          runs.map((run) => (
            <Card key={run.run_id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-mono text-muted-foreground">
                      Run #{run.run_id}
                    </span>
                    {getStatusBadge(run.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Started</p>
                    <p className="font-medium">
                      {new Date(run.started_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Duration</p>
                    <p className="font-medium">
                      {calculateDuration(run)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Pages Checked</p>
                    <p className="font-medium">
                      {run.pages_checked}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">Avg Score</p>
                    <p className="font-medium">
                      {run.avg_score ? run.avg_score.toFixed(1) : 'N/A'}
                    </p>
                  </div>
                </div>

                {run.error_message && (
                  <Alert variant="destructive" className="mt-4">
                    <XCircle className="h-4 w-4" />
                    <AlertDescription>
                      {run.error_message}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
