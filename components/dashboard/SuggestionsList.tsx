'use client';

// Komponent för att visa och hantera förslag
// Visar topp förslag filtrerade på impact och status

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { AlertTriangle, TrendingUp, TrendingDown, ExternalLink, Play, CheckCircle, X } from 'lucide-react';

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
        fetchSuggestions();
      }
    } catch (error) {
      console.error('Error updating suggestion:', error);
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: { variant: 'destructive' as const, icon: AlertTriangle },
      medium: { variant: 'default' as const, icon: TrendingUp },
      low: { variant: 'secondary' as const, icon: TrendingDown },
    };

    const config = variants[impact as keyof typeof variants];
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {impact.toUpperCase()}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'outline' as const,
      in_progress: 'default' as const,
      completed: 'default' as const,
      dismissed: 'secondary' as const,
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  const suggestionsByImpact = {
    high: suggestions.filter(s => s.impact === 'high'),
    medium: suggestions.filter(s => s.impact === 'medium'),
    low: suggestions.filter(s => s.impact === 'low'),
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>High Impact</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              {suggestionsByImpact.high.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Medium Impact</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              {suggestionsByImpact.medium.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Low Impact</CardDescription>
            <CardTitle className="text-4xl flex items-center gap-2">
              <TrendingDown className="h-8 w-8 text-blue-600" />
              {suggestionsByImpact.low.length}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-4xl">
              {suggestions.length}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="space-y-2">
          <Label htmlFor="impact-filter">Impact</Label>
          <Select value={impactFilter} onValueChange={setImpactFilter}>
            <SelectTrigger id="impact-filter" className="w-[180px]">
              <SelectValue placeholder="Select impact" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Impacts</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status-filter">Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" className="w-[180px]">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="dismissed">Dismissed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Suggestions List */}
      <div className="space-y-4">
        {suggestions.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12 text-muted-foreground">
              No suggestions found. Run the agent to generate suggestions.
            </CardContent>
          </Card>
        ) : (
          suggestions.map((suggestion) => (
            <Card key={suggestion.suggestion_id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getImpactBadge(suggestion.impact)}
                    {getStatusBadge(suggestion.status)}
                  </div>
                  <div className="flex gap-2">
                    {suggestion.status === 'pending' && (
                      <Button
                        onClick={() => updateStatus(suggestion.suggestion_id, 'in_progress')}
                        size="sm"
                        variant="default"
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    )}
                    {suggestion.status === 'in_progress' && (
                      <Button
                        onClick={() => updateStatus(suggestion.suggestion_id, 'completed')}
                        size="sm"
                        variant="default"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                    )}
                    {suggestion.status !== 'dismissed' && (
                      <Button
                        onClick={() => updateStatus(suggestion.suggestion_id, 'dismissed')}
                        size="sm"
                        variant="outline"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Dismiss
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">
                  {suggestion.action}
                </p>

                <a
                  href={suggestion.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  {suggestion.url}
                  <ExternalLink className="h-3 w-3" />
                </a>

                <p className="text-xs text-muted-foreground mt-3">
                  Created: {new Date(suggestion.created_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
