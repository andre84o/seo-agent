'use client';

// Settings Component
// Hantera applikationsinställningar som API-nycklar och konfiguration

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings as SettingsIcon, Save, Eye, EyeOff, CheckCircle, AlertCircle, Plus, Trash2, Link as LinkIcon, Key } from 'lucide-react';

interface Setting {
  id: number;
  setting_key: string;
  setting_value: string | null;
  description: string;
  is_sensitive: boolean;
  updated_at: string;
}

interface Keyword {
  id: number;
  keyword: string;
  url: string;
  target_density: number | null;
  search_volume: number | null;
  difficulty: number | null;
  relevance_score: number | null;
  status: string;
  created_at: string;
}

interface Page {
  id: number;
  url: string;
  senaste_score: number | null;
  last_seen_at: string | null;
  updated_at: string;
  created_at: string;
}

export default function Settings() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});
  const [showSensitive, setShowSensitive] = useState<Record<string, boolean>>({});

  // Keywords state
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [loadingKeywords, setLoadingKeywords] = useState(false);
  const [newKeyword, setNewKeyword] = useState({ keyword: '', url: '', target_density: '' });
  const [addingKeyword, setAddingKeyword] = useState(false);

  // Pages state
  const [pages, setPages] = useState<Page[]>([]);
  const [loadingPages, setLoadingPages] = useState(false);
  const [newPageUrl, setNewPageUrl] = useState('');
  const [addingPage, setAddingPage] = useState(false);

  useEffect(() => {
    fetchSettings();
    fetchKeywords();
    fetchPages();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
        // Initiera editedValues med nuvarande värden
        const values: Record<string, string> = {};
        data.settings.forEach((s: Setting) => {
          values[s.setting_key] = s.setting_value || '';
        });
        setEditedValues(values);
      }
    } catch (err) {
      setError('Kunde inte hämta inställningar');
    } finally {
      setLoading(false);
    }
  };

  const saveSetting = async (settingKey: string) => {
    setSaving(settingKey);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          setting_key: settingKey,
          setting_value: editedValues[settingKey]
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(`${settingKey} uppdaterad!`);
        setTimeout(() => setSuccess(null), 3000);
        await fetchSettings();
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError(`Kunde inte spara ${settingKey}`);
    } finally {
      setSaving(null);
    }
  };

  const toggleShowSensitive = (key: string) => {
    setShowSensitive(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Keywords functions
  const fetchKeywords = async () => {
    setLoadingKeywords(true);
    try {
      const response = await fetch('/api/keywords?url=all');
      const data = await response.json();
      if (data.keywords) {
        setKeywords(data.keywords);
      }
    } catch (err) {
      console.error('Failed to fetch keywords:', err);
    } finally {
      setLoadingKeywords(false);
    }
  };

  const addKeyword = async () => {
    if (!newKeyword.keyword || !newKeyword.url) {
      setError('Keyword och URL måste anges');
      return;
    }

    setAddingKeyword(true);
    setError(null);
    try {
      const response = await fetch('/api/keywords', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: newKeyword.keyword,
          url: newKeyword.url,
          target_density: newKeyword.target_density ? parseFloat(newKeyword.target_density) : null
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setNewKeyword({ keyword: '', url: '', target_density: '' });
        await fetchKeywords();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Kunde inte lägga till keyword');
    } finally {
      setAddingKeyword(false);
    }
  };

  const deleteKeyword = async (id: number) => {
    try {
      const response = await fetch(`/api/keywords?id=${id}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Keyword borttagen');
        await fetchKeywords();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Kunde inte ta bort keyword');
    }
  };

  // Pages functions
  const fetchPages = async () => {
    setLoadingPages(true);
    try {
      const response = await fetch('/api/pages');
      const data = await response.json();
      if (data.pages) {
        setPages(data.pages);
      }
    } catch (err) {
      console.error('Failed to fetch pages:', err);
    } finally {
      setLoadingPages(false);
    }
  };

  const addPage = async () => {
    if (!newPageUrl) {
      setError('URL måste anges');
      return;
    }

    setAddingPage(true);
    setError(null);
    try {
      const response = await fetch('/api/pages', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: newPageUrl })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        setNewPageUrl('');
        await fetchPages();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Kunde inte lägga till sida');
    } finally {
      setAddingPage(false);
    }
  };

  const deletePage = async (url: string) => {
    try {
      const response = await fetch(`/api/pages?url=${encodeURIComponent(url)}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Sida borttagen');
        await fetchPages();
        setTimeout(() => setSuccess(null), 3000);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Kunde inte ta bort sida');
    }
  };

  const getSettingIcon = (key: string) => {
    const icons: Record<string, string> = {
      site_url: '🌐',
      sitemap_url: '🗺️',
      gsc_site_url: '📊',
      max_pages_per_run: '📄'
    };
    return icons[key] || '⚙️';
  };

  const getSettingLabel = (key: string) => {
    const labels: Record<string, string> = {
      site_url: 'Standard webbplats URL',
      sitemap_url: 'Sitemap URL (valfritt)',
      gsc_site_url: 'Google Search Console Site URL (valfritt)',
      max_pages_per_run: 'Max sidor per körning'
    };
    return labels[key] || key;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" />
            Inställningar
          </CardTitle>
          <CardDescription>
            Konfigurera webbplatsinställningar och hantera sidor och nyckelord.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* API Keys Info Card */}
      <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <i className="bi bi-shield-lock text-amber-600"></i>
            API-nycklar (Konfigurera i .env.local)
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Av säkerhetsskäl lagras API-nycklar i <code className="bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded">.env.local</code> istället för i databasen.
          </p>
          <div className="text-sm space-y-2 text-muted-foreground">
            <div>
              <strong className="text-foreground">PSI_API_KEY</strong> - Google PageSpeed Insights API-nyckel (obligatorisk)
            </div>
            <div>
              <strong className="text-foreground">GSC_ACCESS_TOKEN</strong> - Google Search Console access token (valfritt)
            </div>
            <div>
              <strong className="text-foreground">GSC_CLIENT_ID</strong> - Google OAuth Client ID (valfritt)
            </div>
            <div>
              <strong className="text-foreground">GSC_CLIENT_SECRET</strong> - Google OAuth Client Secret (valfritt)
            </div>
            <div>
              <strong className="text-foreground">GSC_REFRESH_TOKEN</strong> - Google OAuth Refresh Token (valfritt)
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success/Error Messages */}
      {success && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {success}
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Settings Cards */}
      {settings.map((setting) => {
        const isSensitive = setting.is_sensitive;
        const isEdited = editedValues[setting.setting_key] !== (setting.setting_value || '');
        const isSaving = saving === setting.setting_key;

        return (
          <Card key={setting.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getSettingIcon(setting.setting_key)}</span>
                  <div>
                    <CardTitle className="text-lg">
                      {getSettingLabel(setting.setting_key)}
                    </CardTitle>
                    <CardDescription>{setting.description}</CardDescription>
                  </div>
                </div>
                {isSensitive && (
                  <Badge variant="secondary">
                    <i className="bi bi-shield-lock me-1"></i>
                    Känslig
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative">
                  <Label htmlFor={setting.setting_key}>Värde</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id={setting.setting_key}
                      type={isSensitive && !showSensitive[setting.setting_key] ? 'password' : 'text'}
                      value={editedValues[setting.setting_key] || ''}
                      onChange={(e) => setEditedValues(prev => ({
                        ...prev,
                        [setting.setting_key]: e.target.value
                      }))}
                      placeholder={`Ange ${getSettingLabel(setting.setting_key).toLowerCase()}`}
                      className="flex-1"
                    />
                    {isSensitive && (
                      <Button
                        onClick={() => toggleShowSensitive(setting.setting_key)}
                        variant="outline"
                        size="icon"
                      >
                        {showSensitive[setting.setting_key] ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Senast uppdaterad: {new Date(setting.updated_at).toLocaleString('sv-SE')}
                  </div>
                  <Button
                    onClick={() => saveSetting(setting.setting_key)}
                    disabled={!isEdited || isSaving}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isSaving ? (
                      <>
                        <i className="bi bi-arrow-repeat animate-spin me-2"></i>
                        Sparar...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Spara
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Keywords Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6" />
              <div>
                <CardTitle>Hantera nyckelord</CardTitle>
                <CardDescription>
                  Lägg till nyckelord manuellt för att spåra och optimera
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add keyword form */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Lägg till nytt nyckelord</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor="new-keyword">Nyckelord</Label>
                <Input
                  id="new-keyword"
                  placeholder="t.ex. SEO optimering"
                  value={newKeyword.keyword}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, keyword: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="keyword-url">URL</Label>
                <Input
                  id="keyword-url"
                  placeholder="https://example.com/page"
                  value={newKeyword.url}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, url: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="target-density">Mål-densitet % (valfritt)</Label>
                <Input
                  id="target-density"
                  type="number"
                  step="0.1"
                  placeholder="2.5"
                  value={newKeyword.target_density}
                  onChange={(e) => setNewKeyword(prev => ({ ...prev, target_density: e.target.value }))}
                />
              </div>
            </div>
            <Button
              onClick={addKeyword}
              disabled={addingKeyword}
              className="w-full md:w-auto"
            >
              {addingKeyword ? (
                <>
                  <i className="bi bi-arrow-repeat animate-spin me-2"></i>
                  Lägger till...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Lägg till nyckelord
                </>
              )}
            </Button>
          </div>

          <Separator />

          {/* Keywords list */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Dina nyckelord ({keywords.length})</h3>
            {loadingKeywords ? (
              <Skeleton className="h-20" />
            ) : keywords.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Inga nyckelord tillagda ännu. Lägg till ett nyckelord för att börja spåra.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {keywords.map((kw) => (
                  <div
                    key={kw.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{kw.keyword}</span>
                        <Badge variant="secondary" className="text-xs">
                          {kw.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {kw.url}
                        {kw.target_density && ` · Mål: ${kw.target_density}%`}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteKeyword(kw.id)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Pages Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LinkIcon className="h-6 w-6" />
              <div>
                <CardTitle>Hantera sidor</CardTitle>
                <CardDescription>
                  Lägg till sidor att övervaka och analysera
                </CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add page form */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-3">
            <h3 className="font-semibold text-sm">Lägg till ny sida</h3>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/page"
                value={newPageUrl}
                onChange={(e) => setNewPageUrl(e.target.value)}
                className="flex-1"
              />
              <Button
                onClick={addPage}
                disabled={addingPage}
              >
                {addingPage ? (
                  <>
                    <i className="bi bi-arrow-repeat animate-spin me-2"></i>
                    Lägger till...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Lägg till
                  </>
                )}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Pages list */}
          <div className="space-y-2">
            <h3 className="font-semibold text-sm">Dina sidor ({pages.length})</h3>
            {loadingPages ? (
              <Skeleton className="h-20" />
            ) : pages.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4">
                Inga sidor tillagda ännu. Lägg till en sida för att börja övervaka.
              </p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm break-all">{page.url}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        {page.senaste_score !== null && (
                          <span>Score: {page.senaste_score}</span>
                        )}
                        <span>
                          Senast sedd: {page.last_seen_at
                            ? new Date(page.last_seen_at).toLocaleDateString('sv-SE')
                            : 'Aldrig'}
                        </span>
                      </div>
                    </div>
                    <Button
                      onClick={() => deletePage(page.url)}
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Help Section */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <i className="bi bi-info-circle"></i>
            Setup-guide
          </h3>

          <div className="space-y-4 text-sm text-muted-foreground">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">1. Konfigurera API-nycklar i .env.local</h4>
              <p className="mb-2">Lägg till följande i din <code className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">.env.local</code> fil:</p>
              <pre className="bg-slate-100 dark:bg-slate-700 p-2 rounded text-xs overflow-x-auto">
{`# Google PageSpeed Insights (OBLIGATORISK)
PSI_API_KEY=din-api-nyckel-här

# Google Search Console (Valfritt)
GSC_ACCESS_TOKEN=din-token-här
GSC_SITE_URL=https://example.com
GSC_CLIENT_ID=xxx.apps.googleusercontent.com
GSC_CLIENT_SECRET=xxx
GSC_REFRESH_TOKEN=xxx`}
              </pre>
              <p className="mt-2">
                Hämta PSI API-nyckel från{' '}
                <a
                  href="https://console.cloud.google.com/apis/credentials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Google Cloud Console
                </a>
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">2. Konfigurera webbplatsinställningar</h4>
              <p className="mb-2">Använd formulären ovan för att konfigurera:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Site URL:</strong> Din huvudwebbplats (t.ex. https://example.com)</li>
                <li><strong>Sitemap URL:</strong> Valfritt - lämna tom för auto-upptäckt</li>
                <li><strong>Max sidor per run:</strong> Hur många sidor som analyseras åt gången</li>
                <li><strong>GSC Site URL:</strong> Valfritt - för Google Search Console-integration</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-lg">
              <h4 className="font-semibold text-foreground mb-2">3. Lägg till sidor och nyckelord</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Använd "Hantera sidor" för att lägga till specifika sidor att övervaka</li>
                <li>Använd "Hantera nyckelord" för att lägga till viktiga keywords per sida</li>
                <li>Dessa kommer användas vid nästa analys-körning</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
