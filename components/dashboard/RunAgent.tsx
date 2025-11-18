'use client';

// Komponent för att köra SEO-agenten manuellt
// Tillåter användaren att starta en audit-körning

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, PlayCircle, CheckCircle2, AlertCircle } from 'lucide-react';

interface RunAgentProps {
  onRunComplete: () => void;
  compact?: boolean;
}

export default function RunAgent({ onRunComplete, compact = false }: RunAgentProps) {
  const [siteUrl, setSiteUrl] = useState('');
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [maxPages, setMaxPages] = useState(20);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingSettings, setLoadingSettings] = useState(true);

  // Hämta sparade inställningar vid mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();

        if (data.success && data.settings) {
          data.settings.forEach((setting: { setting_key: string; setting_value: string | null }) => {
            if (setting.setting_key === 'site_url' && setting.setting_value) {
              setSiteUrl(setting.setting_value);
            }
            if (setting.setting_key === 'sitemap_url' && setting.setting_value) {
              setSitemapUrl(setting.setting_value);
            }
            if (setting.setting_key === 'max_pages_per_run' && setting.setting_value) {
              setMaxPages(parseInt(setting.setting_value));
            }
          });
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setLoadingSettings(false);
      }
    };

    fetchSettings();
  }, []);

  const handleRun = async () => {
    if (!siteUrl) {
      setError('Please enter a site URL');
      return;
    }

    setIsRunning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/agent/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          siteUrl,
          sitemapUrl: sitemapUrl || undefined,
          maxPages,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to run agent');
      }

      setResult(data);
      onRunComplete();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsRunning(false);
    }
  };

  if (compact) {
    return (
      <Button
        onClick={() => {
          // For compact mode, use last known values or defaults
          if (siteUrl || window.confirm('No site URL configured. Set one up?')) {
            handleRun();
          }
        }}
        disabled={isRunning}
        variant="default"
        size="sm"
      >
        {isRunning ? (
          <>
            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <PlayCircle className="mr-2 h-3 w-3" />
            Run Agent
          </>
        )}
      </Button>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlayCircle className="h-6 w-6" />
          Run SEO Agent
        </CardTitle>
        <CardDescription>
          Start a manual SEO audit of your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Site URL */}
          <div className="space-y-2">
            <Label htmlFor="site-url">Site URL *</Label>
            <Input
              id="site-url"
              type="url"
              value={siteUrl}
              onChange={(e) => setSiteUrl(e.target.value)}
              placeholder="https://example.com"
              disabled={isRunning}
            />
          </div>

          {/* Sitemap URL (optional) */}
          <div className="space-y-2">
            <Label htmlFor="sitemap-url">Sitemap URL (optional)</Label>
            <Input
              id="sitemap-url"
              type="url"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              disabled={isRunning}
            />
            <p className="text-xs text-muted-foreground">
              Leave empty to auto-discover from robots.txt
            </p>
          </div>

          {/* Max Pages */}
          <div className="space-y-2">
            <Label htmlFor="max-pages">Max Pages to Check</Label>
            <Input
              id="max-pages"
              type="number"
              value={maxPages}
              onChange={(e) => setMaxPages(parseInt(e.target.value))}
              min="1"
              max="100"
              disabled={isRunning}
            />
          </div>

          {/* Run Button */}
          <Button
            onClick={handleRun}
            disabled={isRunning}
            className="w-full"
            size="lg"
          >
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running Agent...
              </>
            ) : (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Run Agent
              </>
            )}
          </Button>

          {/* Error */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Result */}
          {result && (
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Run Completed Successfully</AlertTitle>
              <AlertDescription>
                <div className="mt-2 space-y-1 text-sm">
                  <p>Run ID: {result.runId}</p>
                  <p>Pages Checked: {result.pagesChecked}</p>
                  <p>Average Score: {result.avgScore.toFixed(1)}/100</p>
                  <p>Duration: {result.duration.toFixed(1)}s</p>
                  {result.flaggedPages.length > 0 && (
                    <p className="text-orange-600 dark:text-orange-400">
                      <i className="bi bi-exclamation-triangle-fill me-1"></i>{result.flaggedPages.length} pages flagged for attention
                    </p>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
