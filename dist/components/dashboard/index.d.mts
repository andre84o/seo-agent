import * as react_jsx_runtime from 'react/jsx-runtime';

declare function Dashboard({ refreshKey }: {
    refreshKey: number;
}): react_jsx_runtime.JSX.Element;

declare function AIAnalysis(): react_jsx_runtime.JSX.Element;

interface ExportDataProps {
    compact?: boolean;
}
declare function ExportData({ compact }: ExportDataProps): react_jsx_runtime.JSX.Element;

declare function RecentRuns(): react_jsx_runtime.JSX.Element;

interface RunAgentProps {
    onRunComplete: () => void;
    compact?: boolean;
}
declare function RunAgent({ onRunComplete, compact }: RunAgentProps): react_jsx_runtime.JSX.Element;

declare function ScoreOverview(): react_jsx_runtime.JSX.Element;

declare function SEOTasks(): react_jsx_runtime.JSX.Element;

declare function Settings(): react_jsx_runtime.JSX.Element;

interface SidebarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}
declare function Sidebar({ activeTab, onTabChange }: SidebarProps): react_jsx_runtime.JSX.Element;

declare function SuggestionsList(): react_jsx_runtime.JSX.Element;

interface TextSuggestionsProps {
    url?: string;
}
declare function TextSuggestions({ url }: TextSuggestionsProps): react_jsx_runtime.JSX.Element;

export { AIAnalysis, Dashboard, ExportData, RecentRuns, RunAgent, SEOTasks, ScoreOverview, Settings, Sidebar, SuggestionsList, TextSuggestions };
