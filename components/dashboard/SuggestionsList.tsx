'use client';

// Komponent för att visa och hantera förslag
// Visar topp förslag filtrerade på impact och status

import { useState, useEffect } from 'react';

interface Suggestion {
  suggestion_id: number;
  url: string;
  action: string;
  impact: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'dismissed';
  created_at: string;
  updated_at: string;
}

export default function SuggestionsList() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [impactFilter, setImpactFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('pending');

  useEffect(() => {
    fetchSuggestions();
  }, [impactFilter, statusFilter]);

  const fetchSuggestions = async () => {
    try {
      const params = new URLSearchParams();
      if (impactFilter !== 'all') params.set('impact', impactFilter);
      if (statusFilter !== 'all') params.set('status', statusFilter);

      const response = await fetch(`/api/agent/suggestions?${params}`);
      const data = await response.json();

      if (data.success) {
        setSuggestions(data.data);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (
    suggestionId: number,
    newStatus: 'pending' | 'in_progress' | 'completed' | 'dismissed'
  ) => {
    try {
      const response = await fetch('/api/agent/suggestions', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ suggestionId, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        // Refresh lista
        fetchSuggestions();
      }
    } catch (error) {
      console.error('Error updating suggestion:', error);
    }
  };

  const getImpactBadge = (impact: string) => {
    const colors = {
      high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${colors[impact as keyof typeof colors]}`}
      >
        {impact.toUpperCase()}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      in_progress: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      dismissed: 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400',
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${colors[status as keyof typeof colors]}`}
      >
        {status.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="text-gray-600 dark:text-gray-400 mt-4">Loading suggestions...</p>
      </div>
    );
  }

  // Gruppera suggestions per URL och impact
  const suggestionsByImpact = {
    high: suggestions.filter(s => s.impact === 'high'),
    medium: suggestions.filter(s => s.impact === 'medium'),
    low: suggestions.filter(s => s.impact === 'low'),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">High Impact</p>
          <p className="text-3xl font-bold text-red-900 dark:text-red-100">
            {suggestionsByImpact.high.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg">
          <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">
            Medium Impact
          </p>
          <p className="text-3xl font-bold text-yellow-900 dark:text-yellow-100">
            {suggestionsByImpact.medium.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Low Impact</p>
          <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
            {suggestionsByImpact.low.length}
          </p>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {suggestions.length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Impact
          </label>
          <select
            value={impactFilter}
            onChange={(e) => setImpactFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Impacts</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="dismissed">Dismissed</option>
          </select>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.suggestion_id}
            className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getImpactBadge(suggestion.impact)}
                {getStatusBadge(suggestion.status)}
              </div>
              <div className="flex gap-2">
                {suggestion.status === 'pending' && (
                  <button
                    onClick={() => updateStatus(suggestion.suggestion_id, 'in_progress')}
                    className="text-xs px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                  >
                    Start
                  </button>
                )}
                {suggestion.status === 'in_progress' && (
                  <button
                    onClick={() => updateStatus(suggestion.suggestion_id, 'completed')}
                    className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition-colors"
                  >
                    Complete
                  </button>
                )}
                {suggestion.status !== 'dismissed' && (
                  <button
                    onClick={() => updateStatus(suggestion.suggestion_id, 'dismissed')}
                    className="text-xs px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded transition-colors"
                  >
                    Dismiss
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
              {suggestion.action}
            </p>

            <a
              href={suggestion.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {suggestion.url}
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Created: {new Date(suggestion.created_at).toLocaleString()}
            </p>
          </div>
        ))}

        {suggestions.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No suggestions found. Run the agent to generate suggestions.
          </div>
        )}
      </div>
    </div>
  );
}
