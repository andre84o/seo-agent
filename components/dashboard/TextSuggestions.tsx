'use client';

// Text Suggestions Component
// Visar och hanterar textförslag med redigerings- och tillämpningsfunktion

import { useState, useEffect } from 'react';
import type { Database } from '@/lib/db/types';

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

const IMPACT_COLORS = {
  high: 'bg-red-100 text-red-800 border-red-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  low: 'bg-blue-100 text-blue-800 border-blue-300'
};

const STATUS_COLORS = {
  pending: 'bg-gray-100 text-gray-700',
  edited: 'bg-purple-100 text-purple-700',
  applied: 'bg-green-100 text-green-700',
  dismissed: 'bg-gray-200 text-gray-500'
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

      // Hämta uppdaterade förslag
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

      // Uppdatera lokalt state
      setSuggestions(prev =>
        prev.map(s => s.id === id ? data.suggestion : s)
      );

      // Uppdatera grupperad data
      await fetchSuggestions();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Kopiera text till clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Text kopierad till clipboard!');
    } catch (err) {
      alert('Kunde inte kopiera text');
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchSuggestions();
    }
  }, [selectedUrl, filter]);

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Textförslag & Optimering</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* URL Input */}
          <div>
            <label className="block text-sm font-medium mb-2">URL att analysera</label>
            <input
              type="url"
              value={selectedUrl}
              onChange={(e) => setSelectedUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Filtrera förslag</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Alla förslag</option>
              <option value="pending">Väntande</option>
              <option value="edited">Redigerade</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={fetchSuggestions}
            disabled={!selectedUrl || loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Hämtar...' : 'Hämta förslag'}
          </button>

          <button
            onClick={generateSuggestions}
            disabled={!selectedUrl || loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Genererar...' : 'Generera nya förslag'}
          </button>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}
      </div>

      {/* Suggestions List */}
      {!loading && suggestions.length > 0 && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-2">
              {suggestions.length} förslag funna
            </h3>
            <p className="text-sm text-gray-600">
              Klicka på "Redigera" för att ändra texten, eller "Tillämpa" för att markera som klar.
            </p>
          </div>

          {/* Grupperade förslag per sektion */}
          {Object.entries(grouped).map(([sectionType, sectionSuggestions]) => {
            const meta = SECTION_META[sectionType as SectionType];
            if (!meta || sectionSuggestions.length === 0) return null;

            return (
              <div key={sectionType} className="bg-white rounded-lg shadow overflow-hidden">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{meta.label}</h3>
                      <p className="text-sm text-gray-600">{meta.description}</p>
                    </div>
                    <span className="ml-auto bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {sectionSuggestions.length} förslag
                    </span>
                  </div>
                </div>

                {/* Suggestions */}
                <div className="divide-y">
                  {sectionSuggestions.map((suggestion) => {
                    const isEditing = editingId === suggestion.id;
                    const displayText = suggestion.edited_text || suggestion.suggested_text;

                    return (
                      <div key={suggestion.id} className="p-6 hover:bg-gray-50">
                        {/* Impact & Status Badges */}
                        <div className="flex gap-2 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${IMPACT_COLORS[suggestion.impact]}`}>
                            {suggestion.impact.toUpperCase()} IMPACT
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[suggestion.status]}`}>
                            {suggestion.status.toUpperCase()}
                          </span>
                          {suggestion.seo_score_impact && (
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                              +{suggestion.seo_score_impact} poäng
                            </span>
                          )}
                        </div>

                        {/* Original Text */}
                        {suggestion.original_text && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nuvarande text:
                            </label>
                            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-gray-700">
                              {suggestion.original_text}
                              <div className="text-xs text-gray-500 mt-1">
                                {suggestion.original_text.length} tecken, {suggestion.original_text.split(' ').length} ord
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Suggested/Edited Text */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {suggestion.edited_text ? 'Din redigerade text:' : 'Föreslagen text:'}
                          </label>

                          {isEditing ? (
                            <textarea
                              value={editedText}
                              onChange={(e) => setEditedText(e.target.value)}
                              className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                              placeholder="Redigera texten här..."
                            />
                          ) : (
                            <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-gray-700">
                              {displayText}
                              <div className="text-xs text-gray-500 mt-1">
                                {displayText.length} tecken, {displayText.split(' ').length} ord
                                {suggestion.readability_score && (
                                  <span className="ml-3">
                                    • Läsbarhet: {suggestion.readability_score.toFixed(0)}/100
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Reason */}
                        <div className="mb-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold">Varför:</span> {suggestion.reason}
                          </p>
                        </div>

                        {/* Keywords */}
                        {suggestion.keywords && Array.isArray(suggestion.keywords) && suggestion.keywords.length > 0 && (
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Inkluderade nyckelord:
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {suggestion.keywords.map((keyword: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                                >
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-2 flex-wrap">
                          {isEditing ? (
                            <>
                              <button
                                onClick={() => {
                                  updateSuggestion(suggestion.id, { editedText });
                                  setEditingId(null);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                              >
                                Spara redigering
                              </button>
                              <button
                                onClick={() => {
                                  setEditingId(null);
                                  setEditedText('');
                                }}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 text-sm"
                              >
                                Avbryt
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditingId(suggestion.id);
                                  setEditedText(displayText);
                                }}
                                disabled={suggestion.status === 'applied'}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 text-sm"
                              >
                                ✏️ Redigera
                              </button>
                              <button
                                onClick={() => copyToClipboard(displayText)}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                              >
                                📋 Kopiera
                              </button>
                              <button
                                onClick={() => updateSuggestion(suggestion.id, { status: 'applied' })}
                                disabled={suggestion.status === 'applied'}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 text-sm"
                              >
                                ✓ Tillämpa
                              </button>
                              <button
                                onClick={() => updateSuggestion(suggestion.id, { status: 'dismissed' })}
                                disabled={suggestion.status === 'dismissed'}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 text-sm"
                              >
                                ✗ Avfärda
                              </button>
                            </>
                          )}
                        </div>

                        {/* Applied timestamp */}
                        {suggestion.applied_at && (
                          <div className="mt-3 text-xs text-gray-500">
                            Tillämpades: {new Date(suggestion.applied_at).toLocaleString('sv-SE')}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Empty State */}
      {!loading && suggestions.length === 0 && selectedUrl && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <div className="text-6xl mb-4">💡</div>
          <h3 className="text-xl font-semibold mb-2">Inga förslag än</h3>
          <p className="text-gray-600 mb-6">
            Generera textförslag för denna sida genom att klicka på knappen ovan.
          </p>
        </div>
      )}
    </div>
  );
}
