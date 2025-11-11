'use client';

// Komponent för att visa senaste scores och trends
// Visar alla sidor med score, vitals och flaggade issues

import { useState, useEffect } from 'react';

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
    if (value === null) return <span className="text-gray-400">N/A</span>;

    const isGood = value <= threshold;
    const colorClass = isGood
      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colorClass}`}>
        {value.toFixed(value < 1 ? 4 : 2)}
        {unit}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading audits...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header med stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Pages</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {audits.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg">
          <p className="text-sm text-green-600 dark:text-green-400 font-medium">
            Average Score
          </p>
          <p className="text-3xl font-bold text-green-900 dark:text-green-100">
            {audits.length > 0
              ? (audits.reduce((sum, a) => sum + a.score, 0) / audits.length).toFixed(1)
              : '0'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-4 rounded-lg">
          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
            Flagged Issues
          </p>
          <p className="text-3xl font-bold text-orange-900 dark:text-orange-100">
            {flaggedAudits.length}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All Pages ({audits.length})
        </button>
        <button
          onClick={() => setFilter('flagged')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'flagged'
              ? 'bg-orange-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Flagged ({flaggedAudits.length})
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                URL
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Score
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                LCP
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                CLS
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                INP
              </th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">
                Checked
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {displayedAudits.map((audit, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                  <a
                    href={audit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline"
                  >
                    {audit.url.length > 50 ? audit.url.substring(0, 50) + '...' : audit.url}
                  </a>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`text-2xl font-bold ${getScoreColor(audit.score)}`}>
                    {audit.score}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {getVitalBadge(audit.lcp, 2.5, 's')}
                </td>
                <td className="px-4 py-3 text-center">
                  {getVitalBadge(audit.cls, 0.1, '')}
                </td>
                <td className="px-4 py-3 text-center">
                  {getVitalBadge(audit.inp, 200, 'ms')}
                </td>
                <td className="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400">
                  {new Date(audit.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {displayedAudits.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No audits found. Run the agent to start monitoring.
          </div>
        )}
      </div>
    </div>
  );
}
