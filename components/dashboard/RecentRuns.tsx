'use client';

// Komponent för att visa senaste agent-körningar
// Visar historik med stats och status

import { useState, useEffect } from 'react';

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
    const colors = {
      running: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      failed: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'}`}
      >
        {status.toUpperCase()}
      </span>
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
      <div className="text-center py-12">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading runs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Runs</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{runs.length}</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">Completed</p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">
            {runs.filter(r => r.status === 'completed').length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">Failed</p>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100">
            {runs.filter(r => r.status === 'failed').length}
          </p>
        </div>
      </div>

      {/* Runs List */}
      <div className="space-y-3">
        {runs.map((run) => (
          <div
            key={run.run_id}
            className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                    Run #{run.run_id}
                  </span>
                  {getStatusBadge(run.status)}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Started</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {new Date(run.started_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Duration</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {calculateDuration(run)}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Pages Checked</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {run.pages_checked}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Avg Score</p>
                    <p className="text-gray-900 dark:text-gray-100 font-medium">
                      {run.avg_score ? run.avg_score.toFixed(1) : 'N/A'}
                    </p>
                  </div>
                </div>

                {run.error_message && (
                  <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-xs text-red-800 dark:text-red-200">
                      Error: {run.error_message}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {runs.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No runs yet. Click "Run Agent" to start your first audit.
          </div>
        )}
      </div>
    </div>
  );
}
