// AI SEO Analysis Component
// Visar AI-genererade insights och låter användaren köra analys per sida

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface AISuggestion {
  type: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  suggestion: string;
  reasoning: string;
  expectedImpact: string;
  implementation?: string;
}

interface AIAnalysis {
  summary: string;
  score: number;
  suggestions: AISuggestion[];
  titleSuggestions: string[];
  metaDescriptionSuggestions: string[];
  faqSuggestions?: Array<{ question: string; answer: string }>;
  contentOutline?: string[];
  keywords: {
    primary: string[];
    secondary: string[];
    longTail: string[];
  };
}

export function AIAnalysis() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [createTasks, setCreateTasks] = useState(true);

  const runAnalysis = async () => {
    if (!url) {
      setError('Ange en URL');
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch('/api/seo/analyze-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, createTasks }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Analys misslyckades');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ett fel uppstod');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🤖</span> AI SEO Analysis
          </CardTitle>
          <CardDescription>
            Get AI-powered insights and recommendations for any page
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Input */}
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="https://example.com/page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={runAnalysis} disabled={loading || !url} className="px-8">
              {loading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="createTasks"
            checked={createTasks}
            onChange={(e) => setCreateTasks(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="createTasks" className="text-sm text-gray-600">
            Skapa automatiskt tasks från AI-förslag
          </label>
        </div>

        {error && (
          <Card className="border-destructive bg-destructive/10">
            <CardContent className="pt-4">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}
        </CardContent>
      </Card>

      {/* Results */}
      {analysis && (
        <div className="space-y-6">
          {/* Score & Summary */}
          <Card className="border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                  <div
                    className={`text-5xl font-bold ${
                      analysis.score >= 80
                        ? 'text-green-600'
                        : analysis.score >= 60
                        ? 'text-yellow-600'
                        : 'text-red-600'
                    }`}
                  >
                    {analysis.score}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">AI Score</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Summary</h3>
                  <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs for detailed analysis */}
          <Card>

            <CardHeader>
              <CardTitle className="text-lg">Detailed Analysis</CardTitle>
              <CardDescription>Explore AI-generated recommendations and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="suggestions">
              <TabsList>
                <TabsTrigger value="suggestions">
                  Förslag ({analysis.suggestions.length})
                </TabsTrigger>
                <TabsTrigger value="titles">Title-förslag</TabsTrigger>
                <TabsTrigger value="meta">Meta Description</TabsTrigger>
                <TabsTrigger value="keywords">Sökord</TabsTrigger>
                {analysis.faqSuggestions && (
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                )}
              </TabsList>

              {/* Suggestions */}
              <TabsContent value="suggestions" className="space-y-3">
                {analysis.suggestions.map((suggestion, idx) => (
                  <Card key={idx}>
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant={getPriorityColor(suggestion.priority)}>
                            {suggestion.priority}
                          </Badge>
                          <Badge variant="outline">{suggestion.category}</Badge>
                        </div>
                      </div>
                      <h4 className="font-semibold mb-2">{suggestion.suggestion}</h4>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.reasoning}</p>
                      <div className="text-sm">
                        <span className="font-medium">Förväntad effekt:</span>{' '}
                        <span className="text-green-600">{suggestion.expectedImpact}</span>
                      </div>
                      {suggestion.implementation && (
                        <details className="mt-2">
                          <summary className="text-sm font-medium cursor-pointer text-blue-600">
                            Implementeringsdetaljer
                          </summary>
                          <p className="text-sm text-gray-600 mt-1 pl-4">
                            {suggestion.implementation}
                          </p>
                        </details>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Title Suggestions */}
              <TabsContent value="titles" className="space-y-2">
                {analysis.titleSuggestions.map((title, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{title}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Längd: {title.length} tecken
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Meta Description Suggestions */}
              <TabsContent value="meta" className="space-y-2">
                {analysis.metaDescriptionSuggestions.map((meta, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="text-sm">{meta}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      Längd: {meta.length} tecken
                    </div>
                  </div>
                ))}
              </TabsContent>

              {/* Keywords */}
              <TabsContent value="keywords" className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Primära sökord</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.primary.map((kw, idx) => (
                      <Badge key={idx} variant="default">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Sekundära sökord</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.secondary.map((kw, idx) => (
                      <Badge key={idx} variant="secondary">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Long-tail varianter</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords.longTail.map((kw, idx) => (
                      <Badge key={idx} variant="outline">
                        {kw}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* FAQ */}
              {analysis.faqSuggestions && (
                <TabsContent value="faq" className="space-y-3">
                  {analysis.faqSuggestions.map((faq, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-4">
                        <h4 className="font-semibold mb-2">{faq.question}</h4>
                        <p className="text-sm text-gray-600">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
