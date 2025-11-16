'use client';

// Komponent för att exportera data som CSV
// Tillåter export av audits och suggestions

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, Lightbulb } from 'lucide-react';

export default function ExportData() {
  const handleExport = (type: 'audits' | 'suggestions') => {
    const url = `/api/agent/export?type=${type}`;
    window.open(url, '_blank');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Export Data
        </CardTitle>
        <CardDescription>
          Export latest audit results and suggestions as CSV files for further analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleExport('audits')}
            variant="default"
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Export Audits CSV
          </Button>

          <Button
            onClick={() => handleExport('suggestions')}
            variant="secondary"
            className="flex items-center gap-2"
          >
            <Lightbulb className="h-4 w-4" />
            Export Suggestions CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
