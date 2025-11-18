'use client';

import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  ListTodo,
  Sparkles,
  BarChart3,
  Lightbulb,
  FileText,
  Clock,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Översikt'
    },
    {
      id: 'tasks',
      label: 'Todo',
      icon: ListTodo,
      description: 'Uppgifter'
    },
    {
      id: 'ai-analysis',
      label: 'AI Analys',
      icon: Sparkles,
      description: 'AI-insikter'
    },
    {
      id: 'overview',
      label: 'Score',
      icon: BarChart3,
      description: 'Metrics'
    },
    {
      id: 'suggestions',
      label: 'Förslag',
      icon: Lightbulb,
      description: 'SEO-tips'
    },
    {
      id: 'text-suggestions',
      label: 'Text',
      icon: FileText,
      description: 'Content'
    },
    {
      id: 'runs',
      label: 'Runs',
      icon: Clock,
      description: 'Historik'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Inställningar'
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      {/* Logo / Header */}
      <div className="border-b px-6 py-5">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🤖 SEO Manager
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          AI-Driven Analytics
        </p>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 px-3",
                  isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                </div>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t px-4 py-3">
        <p className="text-xs text-muted-foreground text-center">
          Powered by OpenAI & Google
        </p>
      </div>
    </div>
  );
}
