'use client';

// Text Suggestions Component
// Visar och hanterar textförslag med redigerings- och tillämpningsfunktion

import { useState, useEffect } from 'react';
import type { Database } from '@/lib/db/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import {
  Sparkles,
  Copy,
  Check,
  X,
  Edit,
  Save,
  AlertCircle,
  TrendingUp,
  Hash
} from 'lucide-react';

type TextSuggestion = Database['public']['Tables']['text_suggestions']['Row'];
type SectionType = TextSuggestion['section_type'];

interface TextSuggestionsProps {
  url?: string;
}

// Sektion metadata
const SECTION_META: Record<SectionType, { label: string; icon: string; description: string }> = {
  title: { label: 'Title Tag', icon: '📝', description: 'Sidans titel i sökmotorer' },
  meta_description: { label: 'Meta Description', icon: '📄', description: 'Beskrivning i sökresultat' },
  h1: { label: 'H1 Rubrik', icon: '🔤', description: 'Huvudrubrik' },
  h2: { label: 'H2 Underrubrik', icon: '📋', description: 'Sekundära rubriker' },
  h3: { label: 'H3 Underrubrik', icon: '📌', description: 'Tertiära rubriker' },
  h4: { label: 'H4 Underrubrik', icon: '📍', description: 'Fjärde nivåns rubriker' },
  h5: { label: 'H5 Underrubrik', icon: '•', description: 'Femte nivåns rubriker' },
  h6: { label: 'H6 Underrubrik', icon: '·', description: 'Sjätte nivåns rubriker' },
  paragraph: { label: 'Paragraf', icon: '¶', description: 'Brödtext' },
  image_alt: { label: 'Bild Alt-text', icon: '🖼️', description: 'Alternativ text för bilder' },
  canonical: { label: 'Canonical URL', icon: '🔗', description: 'Kanonisk URL' }
};

export default function TextSuggestions({ url }: TextSuggestionsProps) {
  const [selectedUrl, setSelectedUrl] = useState(url || '');
  const [suggestions, setSuggestions] = useState<TextSuggestion[]>([]);
  const [grouped, setGrouped] = useState<Record<string, TextSuggestion[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'edited'>('pending');
  const [copySuccess, setCopySuccess] = useState<number | null>(null);

  // Hämta förslag
  const fetchSuggestions = async () => {
    if (!selectedUrl) return;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ url: selectedUrl });
      if (filter !== 'all') {
        params.append('status', filter);
      }

      const response = await fetch(`/api/text-suggestions?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch suggestions');
      }

      setSuggestions(data.suggestions || []);
      setGrouped(data.grouped || {});
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Generera nya förslag
  const generateSuggestions = async () => {
    if (!selectedUrl) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/text-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: selectedUrl, forceRegenerate: false })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate suggestions');
      }

      await fetchSuggestions();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Uppdatera förslag (redigera eller ändra status)
  const updateSuggestion = async (id: number, updates: { editedText?: string; status?: string }) => {
    try {
      const response = await fetch('/api/text-suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update suggestion');
      }

      setSuggestions(prev =>
        prev.map(s => s.id === id ? data.suggestion : s)
      );

      await fetchSuggestions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Kopiera text till clipboard
  const copyToClipboard = async (text: string, id: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      setError('Kunde inte kopiera text');
    }
  };

  const getImpactBadge = (impact: string) => {
    const variants = {
      high: { variant: 'destructive' as const, label: 'HIGH IMPACT' },
      medium: { variant: 'default' as const, label: 'MEDIUM IMPACT' },
      low: { variant: 'secondary' as const, label: 'LOW IMPACT' },
    };
    const config = variants[impact as keyof typeof variants];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: 'outline' as const, label: 'PENDING', className: '' },
      edited: { variant: 'default' as const, label: 'EDITED', className: 'bg-purple-600 hover:bg-purple-700' },
      applied: { variant: 'default' as const, label: 'APPLIED', className: 'bg-green-600 hover:bg-green-700' },
      dismissed: { variant: 'secondary' as const, label: 'DISMISSED', className: '' },
    };
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant} className={config.className}>{config.label}</Badge>;
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchSuggestions();
    }
  }, [selectedUrl, filter]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Textförslag & Optimering
          </CardTitle>
          <CardDescription>
            AI-genererade textförslag för att förbättra SEO
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="url-input">URL att analysera</Label>
              <Input
                id="url-input"
                type="url"
                value={selectedUrl}
                onChange={(e) => setSelectedUrl(e.target.value)}
                placeholder="https://example.com/page"
              />
            </div>

            {/* Filter */}
            <div className="space-y-2">
              <Label htmlFor="filter-select">Filtrera förslag</Label>
              <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
                <SelectTrigger id="filter-select">
                  <SelectValue placeholder="Välj filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alla förslag</SelectItem>
                  <SelectItem value="pending">Väntande</SelectItem>
                  <SelectItem value="edited">Redigerade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              onClick={fetchSuggestions}
              disabled={!selectedUrl || loading}
              variant="default"
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              {loading ? 'Hämtar...' : 'Hämta förslag'}
            </Button>

            <Button
              onClick={generateSuggestions}
              disabled={!selectedUrl || loading}
              variant="default"
              className="bg-green-600 hover:bg-green-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              {loading ? 'Genererar...' : 'Generera nya förslag'}
            </Button>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <div className="space-y-4">
          <Skeleton className="h-32" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      )}

      {/* Suggestions List */}
      {!loading && suggestions.length > 0 && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">
                  {suggestions.length} förslag funna
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Klicka på "Redigera" för att ändra texten, eller "Tillämpa" för att markera som klar.
              </p>
            </CardContent>
          </Card>

          {/* Grupperade förslag per sektion */}
          {Object.entries(grouped).map(([sectionType, sectionSuggestions]) => {
            const meta = SECTION_META[sectionType as SectionType];
            if (!meta || sectionSuggestions.length === 0) return null;

            return (
              <Card key={sectionType}>
                {/* Section Header */}
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meta.icon}</span>
                      <div>
                        <CardTitle className="text-lg">{meta.label}</CardTitle>
                        <CardDescription>{meta.description}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-blue-600">
                      {sectionSuggestions.length} förslag
                    </Badge>
                  </div>
                </CardHeader>

                {/* Suggestions */}
                <CardContent className="p-0">
                  <div className="divide-y">
                    {sectionSuggestions.map((suggestion) => {
                      const isEditing = editingId === suggestion.id;
                      const displayText = suggestion.edited_text || suggestion.suggested_text;

                      return (
                        <div key={suggestion.id} className="p-6 hover:bg-muted/50 transition-colors">
                          {/* Impact & Status Badges */}
                          <div className="flex gap-2 mb-4">
                            {getImpactBadge(suggestion.impact)}
                            {getStatusBadge(suggestion.status)}
                            {suggestion.seo_score_impact && (
                              <Badge variant="default" className="bg-green-600 hover:bg-green-700">
                                +{suggestion.seo_score_impact} poäng
                              </Badge>
                            )}
                          </div>

                          {/* Original Text */}
                          {suggestion.original_text && (
                            <div className="mb-4">
                              <Label className="mb-2 block">Nuvarande text:</Label>
                              <Alert variant="destructive" className="bg-red-50 dark:bg-red-950">
                                <AlertDescription>
                                  {suggestion.original_text}
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {suggestion.original_text.length} tecken, {suggestion.original_text.split(' ').length} ord
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </div>
                          )}

                          {/* Suggested/Edited Text */}
                          <div className="mb-4">
                            <Label className="mb-2 block">
                              {suggestion.edited_text ? 'Din redigerade text:' : 'Föreslagen text:'}
                            </Label>

                            {isEditing ? (
                              <Textarea
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                className="min-h-[100px]"
                                placeholder="Redigera texten här..."
                              />
                            ) : (
                              <Alert className="bg-green-50 dark:bg-green-950 border-green-200">
                                <AlertDescription>
                                  {displayText}
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {displayText.length} tecken, {displayText.split(' ').length} ord
                                    {suggestion.readability_score && (
                                      <span className="ml-3">
                                        • Läsbarhet: {suggestion.readability_score.toFixed(0)}/100
                                      </span>
                                    )}
                                  </div>
                                </AlertDescription>
                              </Alert>
                            )}
                          </div>

                          {/* Reason */}
                          <Alert className="mb-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400">
                            <AlertDescription>
                              <span className="font-semibold">Varför:</span> {suggestion.reason}
                            </AlertDescription>
                          </Alert>

                          {/* Keywords */}
                          {suggestion.keywords && Array.isArray(suggestion.keywords) && suggestion.keywords.length > 0 && (
                            <div className="mb-4">
                              <Label className="mb-2 flex items-center gap-2">
                                <Hash className="h-4 w-4" />
                                Inkluderade nyckelord:
                              </Label>
                              <div className="flex flex-wrap gap-2">
                                {suggestion.keywords.map((keyword: any, idx: number) => (
                                  <Badge key={idx} variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                                    {String(keyword)}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          <Separator className="my-4" />

                          {/* Action Buttons */}
                          <div className="flex gap-2 flex-wrap">
                            {isEditing ? (
                              <>
                                <Button
                                  onClick={() => {
                                    updateSuggestion(suggestion.id, { editedText });
                                    setEditingId(null);
                                  }}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Save className="h-4 w-4 mr-1" />
                                  Spara redigering
                                </Button>
                                <Button
                                  onClick={() => {
                                    setEditingId(null);
                                    setEditedText('');
                                  }}
                                  size="sm"
                                  variant="outline"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Avbryt
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  onClick={() => {
                                    setEditingId(suggestion.id);
                                    setEditedText(displayText);
                                  }}
                                  disabled={suggestion.status === 'applied'}
                                  size="sm"
                                  variant="default"
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  Redigera
                                </Button>
                                <Button
                                  onClick={() => copyToClipboard(displayText, suggestion.id)}
                                  size="sm"
                                  variant="secondary"
                                >
                                  {copySuccess === suggestion.id ? (
                                    <>
                                      <Check className="h-4 w-4 mr-1" />
                                      Kopierad!
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-4 w-4 mr-1" />
                                      Kopiera
                                    </>
                                  )}
                                </Button>
                                <Button
                                  onClick={() => updateSuggestion(suggestion.id, { status: 'applied' })}
                                  disabled={suggestion.status === 'applied'}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-1" />
                                  Tillämpa
                                </Button>
                                <Button
                                  onClick={() => updateSuggestion(suggestion.id, { status: 'dismissed' })}
                                  disabled={suggestion.status === 'dismissed'}
                                  size="sm"
                                  variant="destructive"
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Avfärda
                                </Button>
                              </>
                            )}
                          </div>

                          {/* Applied timestamp */}
                          {suggestion.applied_at && (
                            <div className="mt-3 text-xs text-muted-foreground">
                              Tillämpades: {new Date(suggestion.applied_at).toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/-/g, '/')}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && suggestions.length === 0 && selectedUrl && (
        <Card>
          <CardContent className="py-12 text-center">
            <i className="bi bi-lightbulb text-6xl text-muted-foreground mb-4 d-block"></i>
            <h3 className="text-xl font-semibold mb-2">Inga förslag än</h3>
            <p className="text-muted-foreground mb-6">
              Generera textförslag för denna sida genom att klicka på knappen ovan.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
