'use strict';

var React = require('react');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var jsxRuntime = require('react/jsx-runtime');
var reactSlot = require('@radix-ui/react-slot');
var classVarianceAuthority = require('class-variance-authority');
var lucideReact = require('lucide-react');
var TabsPrimitive = require('@radix-ui/react-tabs');
var LabelPrimitive = require('@radix-ui/react-label');
var recharts = require('recharts');
var SeparatorPrimitive = require('@radix-ui/react-separator');
var ScrollAreaPrimitive = require('@radix-ui/react-scroll-area');
var SelectPrimitive = require('@radix-ui/react-select');
var DialogPrimitive = require('@radix-ui/react-dialog');
var ProgressPrimitive = require('@radix-ui/react-progress');
var supabaseJs = require('@supabase/supabase-js');
var OpenAI = require('openai');
var axios3 = require('axios');
var fastXmlParser = require('fast-xml-parser');
var cheerio2 = require('cheerio');
var googleapis = require('googleapis');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var TabsPrimitive__namespace = /*#__PURE__*/_interopNamespace(TabsPrimitive);
var LabelPrimitive__namespace = /*#__PURE__*/_interopNamespace(LabelPrimitive);
var SeparatorPrimitive__namespace = /*#__PURE__*/_interopNamespace(SeparatorPrimitive);
var ScrollAreaPrimitive__namespace = /*#__PURE__*/_interopNamespace(ScrollAreaPrimitive);
var SelectPrimitive__namespace = /*#__PURE__*/_interopNamespace(SelectPrimitive);
var DialogPrimitive__namespace = /*#__PURE__*/_interopNamespace(DialogPrimitive);
var ProgressPrimitive__namespace = /*#__PURE__*/_interopNamespace(ProgressPrimitive);
var OpenAI__default = /*#__PURE__*/_interopDefault(OpenAI);
var axios3__default = /*#__PURE__*/_interopDefault(axios3);
var cheerio2__namespace = /*#__PURE__*/_interopNamespace(cheerio2);

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
function Card(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )
    }, props)
  );
}
function CardHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )
    }, props)
  );
}
function CardTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className)
    }, props)
  );
}
function CardDescription(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className)
    }, props)
  );
}
function CardAction(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-action",
      className: cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )
    }, props)
  );
}
function CardContent(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-content",
      className: cn("px-6", className)
    }, props)
  );
}
function CardFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "card-footer",
      className: cn("flex items-center px-6 [.border-t]:pt-6", className)
    }, props)
  );
}
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button(_a) {
  var _b = _a, {
    className,
    variant,
    size,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "size",
    "asChild"
  ]);
  const Comp = asChild ? reactSlot.Slot : "button";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    __spreadValues({
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className }))
    }, props)
  );
}
var badgeVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge(_a) {
  var _b = _a, {
    className,
    variant,
    asChild = false
  } = _b, props = __objRest(_b, [
    "className",
    "variant",
    "asChild"
  ]);
  const Comp = asChild ? reactSlot.Slot : "span";
  return /* @__PURE__ */ jsxRuntime.jsx(
    Comp,
    __spreadValues({
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className)
    }, props)
  );
}
function Skeleton(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className)
    }, props)
  );
}
function Dashboard({ refreshKey }) {
  const [stats, setStats] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchDashboardStats();
  }, [refreshKey]);
  const fetchDashboardStats = async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    setLoading(true);
    try {
      const [pagesRes, tasksRes, suggestionsRes, runsRes] = await Promise.all([
        fetch("/api/agent/data?type=latest"),
        fetch("/api/tasks?thisWeek=true"),
        fetch("/api/agent/suggestions"),
        fetch("/api/agent/data?type=runs&limit=1")
      ]);
      const pages = await pagesRes.json();
      const tasks = await tasksRes.json();
      const suggestions = await suggestionsRes.json();
      const runs = await runsRes.json();
      const totalPages = ((_a = pages.data) == null ? void 0 : _a.length) || 0;
      const avgScore = totalPages > 0 ? pages.data.reduce((sum, p) => sum + p.score, 0) / totalPages : 0;
      const flaggedIssues = ((_b = pages.data) == null ? void 0 : _b.filter(
        (p) => p.score < 50 || p.lcp && p.lcp > 2.5 || p.cls && p.cls > 0.1
      ).length) || 0;
      const activeTasks = ((_c = tasks.tasks) == null ? void 0 : _c.filter((t) => t.status === "todo" || t.status === "in_progress").length) || 0;
      const completedTasks = ((_d = tasks.tasks) == null ? void 0 : _d.filter((t) => t.status === "done").length) || 0;
      const pendingSuggestions = ((_e = suggestions.suggestions) == null ? void 0 : _e.filter((s) => s.status === "pending").length) || 0;
      const lastRun = (_g = (_f = runs.data) == null ? void 0 : _f[0]) == null ? void 0 : _g.started_at;
      setStats({
        totalPages,
        avgScore: Math.round(avgScore),
        scoreChange: 0,
        // TODO: Calculate from historical data
        flaggedIssues,
        activeTasks,
        completedTasks,
        pendingSuggestions,
        lastRun
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-32" }, i)) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-7", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-80 col-span-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-80 col-span-3" })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-sm font-medium", children: "Total Pages" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Activity, { className: "h-4 w-4 text-blue-600" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: (stats == null ? void 0 : stats.totalPages) || 0 }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Monitored URLs" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-sm font-medium", children: "Average Score" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TrendingUp, { className: "h-4 w-4 text-green-600" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: (stats == null ? void 0 : stats.avgScore) || 0 }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center text-xs text-muted-foreground", children: (stats == null ? void 0 : stats.scoreChange) && stats.scoreChange > 0 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TrendingUp, { className: "h-3 w-3 mr-1 text-green-600" }),
            /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-green-600", children: [
              "+",
              stats.scoreChange,
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntime.jsx("span", { children: "vs last week" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-sm font-medium", children: "Active Tasks" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle2, { className: "h-4 w-4 text-orange-600" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold", children: (stats == null ? void 0 : stats.activeTasks) || 0 }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            (stats == null ? void 0 : stats.completedTasks) || 0,
            " completed"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-lg transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "flex flex-row items-center justify-between space-y-0 pb-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-sm font-medium", children: "Flagged Issues" }),
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "h-4 w-4 text-red-600" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-red-600", children: (stats == null ? void 0 : stats.flaggedIssues) || 0 }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Needs attention" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "border-dashed hover:border-solid hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sparkles, { className: "h-5 w-5 text-purple-600" }),
            "AI Suggestions"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(CardDescription, { children: [
            (stats == null ? void 0 : stats.pendingSuggestions) || 0,
            " pending suggestions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx(Button, { className: "w-full", variant: "outline", children: "View All Suggestions" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "border-dashed hover:border-solid hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Clock, { className: "h-5 w-5 text-blue-600" }),
            "Latest Run"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: (stats == null ? void 0 : stats.lastRun) ? new Date(stats.lastRun).toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
          }) : "No runs yet" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx(Button, { className: "w-full", variant: "outline", children: "View History" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "border-dashed hover:border-solid hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-base flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "h-5 w-5 text-orange-600" }),
            "Critical Pages"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(CardDescription, { children: [
            (stats == null ? void 0 : stats.flaggedIssues) || 0,
            " pages need review"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx(Button, { className: "w-full", variant: "outline", children: "Review Issues" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Quick Overview" }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Your SEO performance at a glance" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: "Pages Monitored" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Total URLs tracked" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", className: "text-lg", children: (stats == null ? void 0 : stats.totalPages) || 0 })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: "Average Performance" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Overall score" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(
            Badge,
            {
              variant: stats && stats.avgScore >= 80 ? "default" : stats && stats.avgScore >= 50 ? "secondary" : "destructive",
              className: "text-lg",
              children: [
                (stats == null ? void 0 : stats.avgScore) || 0,
                "/100"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm font-medium", children: "Tasks Progress" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Completed vs Total" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: "outline", className: "text-lg", children: [
            (stats == null ? void 0 : stats.completedTasks) || 0,
            "/",
            ((stats == null ? void 0 : stats.activeTasks) || 0) + ((stats == null ? void 0 : stats.completedTasks) || 0)
          ] })
        ] })
      ] }) })
    ] })
  ] });
}
function Input(_a) {
  var _b = _a, { className, type } = _b, props = __objRest(_b, ["className", "type"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    __spreadValues({
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )
    }, props)
  );
}
function Tabs(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Root,
    __spreadValues({
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className)
    }, props)
  );
}
function TabsList(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.List,
    __spreadValues({
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )
    }, props)
  );
}
function TabsTrigger(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Trigger,
    __spreadValues({
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props)
  );
}
function TabsContent(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    TabsPrimitive__namespace.Content,
    __spreadValues({
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className)
    }, props)
  );
}
function AIAnalysis() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [analysis, setAnalysis] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [createTasks, setCreateTasks] = React.useState(true);
  const runAnalysis = async () => {
    if (!url) {
      setError("Ange en URL");
      return;
    }
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const response = await fetch("/api/seo/analyze-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, createTasks })
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Analys misslyckades");
      }
      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ett fel uppstod");
    } finally {
      setLoading(false);
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "border-dashed", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl", children: "\u{1F916}" }),
          " AI SEO Analysis"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Get AI-powered insights and recommendations for any page" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Input,
            {
              type: "url",
              placeholder: "https://example.com/page",
              value: url,
              onChange: (e) => setUrl(e.target.value),
              disabled: loading,
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(Button, { onClick: runAnalysis, disabled: loading || !url, className: "px-8", children: loading ? "Analyzing..." : "Analyze" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "checkbox",
              id: "createTasks",
              checked: createTasks,
              onChange: (e) => setCreateTasks(e.target.checked),
              className: "rounded border-gray-300"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("label", { htmlFor: "createTasks", className: "text-sm text-gray-600", children: "Skapa automatiskt tasks fr\xE5n AI-f\xF6rslag" })
        ] }),
        error && /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "border-destructive bg-destructive/10", children: /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "pt-4", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-destructive", children: error }) }) })
      ] })
    ] }),
    analysis && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "border-primary/20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20", children: /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "pt-6", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start gap-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center p-6 bg-white dark:bg-slate-900 rounded-lg shadow-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: `text-5xl font-bold ${analysis.score >= 80 ? "text-green-600" : analysis.score >= 60 ? "text-yellow-600" : "text-red-600"}`,
              children: analysis.score
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm text-muted-foreground mt-2", children: "AI Score" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg mb-2", children: "Summary" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground leading-relaxed", children: analysis.summary })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-lg", children: "Detailed Analysis" }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Explore AI-generated recommendations and insights" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs(Tabs, { defaultValue: "suggestions", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(TabsList, { children: [
            /* @__PURE__ */ jsxRuntime.jsxs(TabsTrigger, { value: "suggestions", children: [
              "F\xF6rslag (",
              analysis.suggestions.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "titles", children: "Title-f\xF6rslag" }),
            /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "meta", children: "Meta Description" }),
            /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "keywords", children: "S\xF6kord" }),
            analysis.faqSuggestions && /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "faq", children: "FAQ" })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "suggestions", className: "space-y-3", children: analysis.suggestions.map((suggestion, idx) => /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-start justify-between mb-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: getPriorityColor(suggestion.priority), children: suggestion.priority }),
              /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "outline", children: suggestion.category })
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-2", children: suggestion.suggestion }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-600 mb-2", children: suggestion.reasoning }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "F\xF6rv\xE4ntad effekt:" }),
              " ",
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-green-600", children: suggestion.expectedImpact })
            ] }),
            suggestion.implementation && /* @__PURE__ */ jsxRuntime.jsxs("details", { className: "mt-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx("summary", { className: "text-sm font-medium cursor-pointer text-blue-600", children: "Implementeringsdetaljer" }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-600 mt-1 pl-4", children: suggestion.implementation })
            ] })
          ] }) }, idx)) }),
          /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "titles", className: "space-y-2", children: analysis.titleSuggestions.map((title, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "font-medium", children: title }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
                  "L\xE4ngd: ",
                  title.length,
                  " tecken"
                ] })
              ]
            },
            idx
          )) }),
          /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "meta", className: "space-y-2", children: analysis.metaDescriptionSuggestions.map((meta, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-sm", children: meta }),
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-gray-500 mt-1", children: [
                  "L\xE4ngd: ",
                  meta.length,
                  " tecken"
                ] })
              ]
            },
            idx
          )) }),
          /* @__PURE__ */ jsxRuntime.jsxs(TabsContent, { value: "keywords", className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-2", children: "Prim\xE4ra s\xF6kord" }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: analysis.keywords.primary.map((kw, idx) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "default", children: kw }, idx)) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-2", children: "Sekund\xE4ra s\xF6kord" }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: analysis.keywords.secondary.map((kw, idx) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", children: kw }, idx)) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-2", children: "Long-tail varianter" }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: analysis.keywords.longTail.map((kw, idx) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "outline", children: kw }, idx)) })
            ] })
          ] }),
          analysis.faqSuggestions && /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "faq", className: "space-y-3", children: analysis.faqSuggestions.map((faq, idx) => /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-4", children: [
            /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-2", children: faq.question }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-600", children: faq.answer })
          ] }) }, idx)) })
        ] }) })
      ] })
    ] })
  ] });
}
function ExportData({ compact = false }) {
  const handleExport = (type) => {
    const url = `/api/agent/export?type=${type}`;
    window.open(url, "_blank");
  };
  if (compact) {
    return /* @__PURE__ */ jsxRuntime.jsxs(
      Button,
      {
        onClick: () => handleExport("audits"),
        variant: "outline",
        size: "sm",
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Download, { className: "mr-2 h-3 w-3" }),
          "Export"
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Download, { className: "h-5 w-5" }),
        "Export Data"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Export latest audit results and suggestions as CSV files for further analysis" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          onClick: () => handleExport("audits"),
          variant: "default",
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.FileText, { className: "h-4 w-4" }),
            "Export Audits CSV"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          onClick: () => handleExport("suggestions"),
          variant: "secondary",
          className: "flex items-center gap-2",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Lightbulb, { className: "h-4 w-4" }),
            "Export Suggestions CSV"
          ]
        }
      )
    ] }) })
  ] });
}
var alertVariants = classVarianceAuthority.cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert(_a) {
  var _b = _a, {
    className,
    variant
  } = _b, props = __objRest(_b, [
    "className",
    "variant"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className)
    }, props)
  );
}
function AlertTitle(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )
    }, props)
  );
}
function AlertDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )
    }, props)
  );
}
function RecentRuns() {
  const [runs, setRuns] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetchRuns();
  }, []);
  const fetchRuns = async () => {
    try {
      const response = await fetch("/api/agent/data?type=runs&limit=20");
      const data = await response.json();
      if (data.success) {
        setRuns(data.data);
      }
    } catch (error) {
      console.error("Error fetching runs:", error);
    } finally {
      setLoading(false);
    }
  };
  const getStatusBadge = (status) => {
    const variants = {
      running: { variant: "default", icon: lucideReact.PlayCircle, label: "RUNNING", className: "" },
      completed: { variant: "default", icon: lucideReact.CheckCircle2, label: "COMPLETED", className: "bg-green-600 hover:bg-green-700" },
      failed: { variant: "destructive", icon: lucideReact.XCircle, label: "FAILED", className: "" }
    };
    const config = variants[status] || {
      variant: "outline",
      icon: lucideReact.Clock,
      label: status.toUpperCase(),
      className: ""
    };
    const Icon2 = config.icon;
    return /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: config.variant, className: config.className, children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "h-3 w-3 mr-1" }),
      config.label
    ] });
  };
  const calculateDuration = (run) => {
    if (!run.finished_at) return "Running...";
    const start = new Date(run.started_at).getTime();
    const end = new Date(run.finished_at).getTime();
    const durationSeconds = (end - start) / 1e3;
    if (durationSeconds < 60) {
      return `${durationSeconds.toFixed(0)}s`;
    }
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    return `${minutes}m ${seconds}s`;
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Total Runs" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.History, { className: "h-8 w-8 text-blue-600" }),
          runs.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Completed" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle2, { className: "h-8 w-8 text-green-600" }),
          runs.filter((r) => r.status === "completed").length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Failed" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XCircle, { className: "h-8 w-8 text-red-600" }),
          runs.filter((r) => r.status === "failed").length
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-3", children: runs.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "text-center py-12 text-muted-foreground", children: 'No runs yet. Click "Run Agent" to start your first audit.' }) }) : runs.map((run) => /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm font-mono text-muted-foreground", children: [
          "Run #",
          run.run_id
        ] }),
        getStatusBadge(run.status)
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Started" }),
            /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "font-medium", children: [
              new Date(run.started_at).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/-/g, "/"),
              " ",
              new Date(run.started_at).toLocaleTimeString("sv-SE")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Duration" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium", children: calculateDuration(run) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Pages Checked" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium", children: run.pages_checked })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground", children: "Avg Score" }),
            /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium", children: run.avg_score ? run.avg_score.toFixed(1) : "N/A" })
          ] })
        ] }),
        run.error_message && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { variant: "destructive", className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XCircle, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: run.error_message })
        ] })
      ] })
    ] }, run.run_id)) })
  ] });
}
function Label(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    LabelPrimitive__namespace.Root,
    __spreadValues({
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )
    }, props)
  );
}
function RunAgent({ onRunComplete, compact = false }) {
  const [siteUrl, setSiteUrl] = React.useState("");
  const [sitemapUrl, setSitemapUrl] = React.useState("");
  const [maxPages, setMaxPages] = React.useState(20);
  const [isRunning, setIsRunning] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loadingSettings, setLoadingSettings] = React.useState(true);
  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("/api/settings");
        const data = await response.json();
        if (data.success && data.settings) {
          data.settings.forEach((setting) => {
            if (setting.setting_key === "site_url" && setting.setting_value) {
              setSiteUrl(setting.setting_value);
            }
            if (setting.setting_key === "sitemap_url" && setting.setting_value) {
              setSitemapUrl(setting.setting_value);
            }
            if (setting.setting_key === "max_pages_per_run" && setting.setting_value) {
              setMaxPages(parseInt(setting.setting_value));
            }
          });
        }
      } catch (err) {
        console.error("Failed to fetch settings:", err);
      } finally {
        setLoadingSettings(false);
      }
    };
    fetchSettings();
  }, []);
  const handleRun = async () => {
    if (!siteUrl) {
      setError("Please enter a site URL");
      return;
    }
    setIsRunning(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/agent/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          siteUrl,
          sitemapUrl: sitemapUrl || void 0,
          maxPages
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to run agent");
      }
      setResult(data);
      onRunComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsRunning(false);
    }
  };
  if (compact) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      Button,
      {
        onClick: () => {
          if (siteUrl || window.confirm("No site URL configured. Set one up?")) {
            handleRun();
          }
        },
        disabled: isRunning,
        variant: "default",
        size: "sm",
        children: isRunning ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "mr-2 h-3 w-3 animate-spin" }),
          "Running..."
        ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PlayCircle, { className: "mr-2 h-3 w-3" }),
          "Run Agent"
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PlayCircle, { className: "h-6 w-6" }),
        "Run SEO Agent"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Start a manual SEO audit of your website" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "site-url", children: "Site URL *" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          Input,
          {
            id: "site-url",
            type: "url",
            value: siteUrl,
            onChange: (e) => setSiteUrl(e.target.value),
            placeholder: "https://example.com",
            disabled: isRunning
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "sitemap-url", children: "Sitemap URL (optional)" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          Input,
          {
            id: "sitemap-url",
            type: "url",
            value: sitemapUrl,
            onChange: (e) => setSitemapUrl(e.target.value),
            placeholder: "https://example.com/sitemap.xml",
            disabled: isRunning
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Leave empty to auto-discover from robots.txt" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "max-pages", children: "Max Pages to Check" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          Input,
          {
            id: "max-pages",
            type: "number",
            value: maxPages,
            onChange: (e) => setMaxPages(parseInt(e.target.value)),
            min: "1",
            max: "100",
            disabled: isRunning
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        Button,
        {
          onClick: handleRun,
          disabled: isRunning,
          className: "w-full",
          size: "lg",
          children: isRunning ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Running Agent..."
          ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.PlayCircle, { className: "mr-2 h-4 w-4" }),
            "Run Agent"
          ] })
        }
      ),
      error && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(AlertTitle, { children: "Error" }),
        /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: error })
      ] }),
      result && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle2, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntime.jsx(AlertTitle, { children: "Run Completed Successfully" }),
        /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-2 space-y-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            "Run ID: ",
            result.runId
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            "Pages Checked: ",
            result.pagesChecked
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            "Average Score: ",
            result.avgScore.toFixed(1),
            "/100"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { children: [
            "Duration: ",
            result.duration.toFixed(1),
            "s"
          ] }),
          result.flaggedPages.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-orange-600 dark:text-orange-400", children: [
            /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-exclamation-triangle-fill me-1" }),
            result.flaggedPages.length,
            " pages flagged for attention"
          ] })
        ] }) })
      ] })
    ] }) })
  ] });
}
function Table(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntime.jsx(
        "table",
        __spreadValues({
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className)
        }, props)
      )
    }
  );
}
function TableHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "thead",
    __spreadValues({
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className)
    }, props)
  );
}
function TableBody(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tbody",
    __spreadValues({
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className)
    }, props)
  );
}
function TableFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tfoot",
    __spreadValues({
      "data-slot": "table-footer",
      className: cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )
    }, props)
  );
}
function TableRow(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "tr",
    __spreadValues({
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )
    }, props)
  );
}
function TableHead(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "th",
    __spreadValues({
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
}
function TableCell(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "td",
    __spreadValues({
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )
    }, props)
  );
}
function TableCaption(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "caption",
    __spreadValues({
      "data-slot": "table-caption",
      className: cn("text-muted-foreground mt-4 text-sm", className)
    }, props)
  );
}
function ScoreOverview() {
  const [audits, setAudits] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("all");
  React.useEffect(() => {
    fetchAudits();
  }, []);
  const fetchAudits = async () => {
    try {
      const response = await fetch("/api/agent/data?type=latest");
      const data = await response.json();
      if (data.success) {
        setAudits(data.data);
      }
    } catch (error) {
      console.error("Error fetching audits:", error);
    } finally {
      setLoading(false);
    }
  };
  const flaggedAudits = audits.filter(
    (audit) => audit.score < 50 || audit.lcp && audit.lcp > 2.5 || audit.cls && audit.cls > 0.1 || audit.inp && audit.inp > 200
  );
  const displayedAudits = filter === "flagged" ? flaggedAudits : audits;
  const scoreDistribution = [
    {
      name: "Good (80-100)",
      count: audits.filter((a) => a.score >= 80).length,
      fill: "#22c55e"
    },
    {
      name: "Needs Improvement (50-79)",
      count: audits.filter((a) => a.score >= 50 && a.score < 80).length,
      fill: "#eab308"
    },
    {
      name: "Poor (0-49)",
      count: audits.filter((a) => a.score < 50).length,
      fill: "#ef4444"
    }
  ];
  const sortedByScore = [...audits].sort((a, b) => a.score - b.score);
  const bottomPages = sortedByScore.slice(0, 10).map((audit) => ({
    name: new URL(audit.url).pathname.slice(0, 20) + "...",
    score: audit.score,
    url: audit.url
  }));
  const topPages = sortedByScore.slice(-10).reverse().map((audit) => ({
    name: new URL(audit.url).pathname.slice(0, 20) + "...",
    score: audit.score,
    url: audit.url
  }));
  const avgLcp = audits.filter((a) => a.lcp).reduce((sum, a) => sum + (a.lcp || 0), 0) / audits.filter((a) => a.lcp).length || 0;
  const avgCls = audits.filter((a) => a.cls).reduce((sum, a) => sum + (a.cls || 0), 0) / audits.filter((a) => a.cls).length || 0;
  const avgInp = audits.filter((a) => a.inp).reduce((sum, a) => sum + (a.inp || 0), 0) / audits.filter((a) => a.inp).length || 0;
  const vitalsData = [
    { name: "LCP (s)", value: avgLcp.toFixed(2), threshold: 2.5, status: avgLcp <= 2.5 ? "good" : "poor" },
    { name: "CLS", value: (avgCls * 1e3).toFixed(0), threshold: 0.1, status: avgCls <= 0.1 ? "good" : "poor" },
    { name: "INP (ms)", value: avgInp.toFixed(0), threshold: 200, status: avgInp <= 200 ? "good" : "poor" }
  ];
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };
  const getVitalBadge = (value, threshold, unit) => {
    if (value === null) return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "outline", children: "N/A" });
    const isGood = value <= threshold;
    return /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: isGood ? "default" : "destructive", className: isGood ? "bg-green-600 hover:bg-green-700" : "", children: [
      value.toFixed(value < 1 ? 4 : 2),
      unit
    ] });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-12" }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardDescription, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.BarChart3, { className: "h-4 w-4" }),
            "Total Pages"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-4xl", children: audits.length })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Monitored URLs" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardDescription, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Activity, { className: "h-4 w-4" }),
            "Average Score"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-4xl", children: audits.length > 0 ? (audits.reduce((sum, a) => sum + a.score, 0) / audits.length).toFixed(1) : "0" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Overall performance" }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { className: "hover:shadow-md transition-shadow", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(CardDescription, { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "h-4 w-4" }),
            "Flagged Issues"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-4xl text-orange-600", children: flaggedAudits.length })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground", children: "Need attention" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-base", children: "Score Distribution" }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Pages grouped by performance score" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.PieChart, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            recharts.Pie,
            {
              data: scoreDistribution,
              cx: "50%",
              cy: "50%",
              labelLine: false,
              label: (entry) => `${entry.name.split(" ")[0]}: ${entry.count}`,
              outerRadius: 80,
              fill: "#8884d8",
              dataKey: "count",
              children: scoreDistribution.map((entry, index) => /* @__PURE__ */ jsxRuntime.jsx(recharts.Cell, { fill: entry.fill }, `cell-${index}`))
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {})
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-base", children: "Core Web Vitals" }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Average vital metrics across all pages" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4 pt-4", children: vitalsData.map((vital) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: vital.name }),
            /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: vital.status === "good" ? "default" : "destructive", className: vital.status === "good" ? "bg-green-600" : "", children: vital.value })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "h-2 w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: `h-full transition-all ${vital.status === "good" ? "bg-green-600" : "bg-red-600"}`,
              style: { width: vital.status === "good" ? "100%" : "60%" }
            }
          ) })
        ] }, vital.name)) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-base", children: "Performance Comparison" }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Best and worst performing pages" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs(Tabs, { defaultValue: "bottom", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "bottom", children: "Lowest Scores" }),
          /* @__PURE__ */ jsxRuntime.jsx(TabsTrigger, { value: "top", children: "Highest Scores" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "bottom", className: "mt-4", children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.BarChart, { data: bottomPages, children: [
          /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.XAxis, { dataKey: "name", angle: -45, textAnchor: "end", height: 100 }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.YAxis, { domain: [0, 100] }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Bar, { dataKey: "score", fill: "#ef4444" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(TabsContent, { value: "top", className: "mt-4", children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: 300, children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.BarChart, { data: topPages, children: [
          /* @__PURE__ */ jsxRuntime.jsx(recharts.CartesianGrid, { strokeDasharray: "3 3" }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.XAxis, { dataKey: "name", angle: -45, textAnchor: "end", height: 100 }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.YAxis, { domain: [0, 100] }),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, {}),
          /* @__PURE__ */ jsxRuntime.jsx(recharts.Bar, { dataKey: "score", fill: "#22c55e" })
        ] }) }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          onClick: () => setFilter("all"),
          variant: filter === "all" ? "default" : "outline",
          children: [
            "All Pages (",
            audits.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          onClick: () => setFilter("flagged"),
          variant: filter === "flagged" ? "default" : "outline",
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "h-4 w-4 mr-2" }),
            "Flagged (",
            flaggedAudits.length,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-base", children: "Page Details" }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Detailed metrics for each page" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { children: "URL" }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { className: "text-center", children: "Score" }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { className: "text-center", children: "LCP" }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { className: "text-center", children: "CLS" }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { className: "text-center", children: "INP" }),
          /* @__PURE__ */ jsxRuntime.jsx(TableHead, { className: "text-center", children: "Checked" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(TableBody, { children: displayedAudits.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntime.jsx(TableCell, { colSpan: 6, className: "text-center py-12 text-muted-foreground", children: "No audits found. Run the agent to start monitoring." }) }) : displayedAudits.map((audit, index) => /* @__PURE__ */ jsxRuntime.jsxs(TableRow, { className: "hover:bg-muted/50", children: [
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntime.jsxs(
            "a",
            {
              href: audit.url,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:text-blue-600 hover:underline flex items-center gap-2",
              children: [
                audit.url.length > 50 ? audit.url.substring(0, 50) + "..." : audit.url,
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ExternalLink, { className: "h-3 w-3" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "text-center", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: `text-2xl font-bold ${getScoreColor(audit.score)}`, children: audit.score }) }),
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "text-center", children: getVitalBadge(audit.lcp, 2.5, "s") }),
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "text-center", children: getVitalBadge(audit.cls, 0.1, "") }),
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "text-center", children: getVitalBadge(audit.inp, 200, "ms") }),
          /* @__PURE__ */ jsxRuntime.jsx(TableCell, { className: "text-center text-sm text-muted-foreground", children: new Date(audit.created_at).toLocaleDateString("sv-SE", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }).replace(/-/g, "/") })
        ] }, index)) })
      ] }) })
    ] })
  ] });
}
function SEOTasks() {
  const [tasks, setTasks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filter, setFilter] = React.useState("todo");
  React.useEffect(() => {
    loadTasks();
  }, []);
  const loadTasks = async () => {
    try {
      const response = await fetch("/api/tasks?thisWeek=true");
      const data = await response.json();
      if (data.success) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskId, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setTasks(tasks.map(
          (task) => task.id === taskId ? __spreadProps(__spreadValues({}, task), { status: newStatus }) : task
        ));
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "todo":
        return "bg-gray-100 text-gray-800";
      case "skipped":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const filteredTasks = filter === "all" ? tasks : tasks.filter((task) => task.status === filter);
  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "hover:shadow-md transition-shadow", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-gray-800 dark:text-gray-100", children: taskCounts.all }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Total Tasks" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "hover:shadow-md transition-shadow border-orange-200 dark:border-orange-800", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-orange-600", children: taskCounts.todo }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "To Do" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "hover:shadow-md transition-shadow border-blue-200 dark:border-blue-800", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-blue-600", children: taskCounts.in_progress }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "In Progress" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "hover:shadow-md transition-shadow border-green-200 dark:border-green-800", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-2xl font-bold text-green-600", children: taskCounts.done }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground", children: "Completed" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xl", children: "\u{1F4CB}" }),
          " SEO Tasks"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "This week's prioritized tasks and improvements" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: loading ? /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "Loading tasks..." }) : /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(Tabs, { defaultValue: "todo", onValueChange: (v) => setFilter(v), children: [
        /* @__PURE__ */ jsxRuntime.jsxs(TabsList, { className: "grid w-full grid-cols-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(TabsTrigger, { value: "all", children: [
            "All (",
            taskCounts.all,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(TabsTrigger, { value: "todo", children: [
            "To Do (",
            taskCounts.todo,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(TabsTrigger, { value: "in_progress", children: [
            "Active (",
            taskCounts.in_progress,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(TabsTrigger, { value: "done", children: [
            "Done (",
            taskCounts.done,
            ")"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-6 space-y-3", children: filteredTasks.length === 0 ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center py-12 text-muted-foreground", children: [
          "No tasks ",
          filter !== "all" && `with status "${filter}"`
        ] }) : filteredTasks.map((task) => /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "hover:shadow-md hover:border-primary/50 transition-all", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-start justify-between mb-2", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: getPriorityColor(task.priority), children: task.priority }),
            task.task_type && /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "outline", children: task.task_type }),
            task.ai_generated && /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", children: "\u{1F916} AI" }),
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: `px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`, children: task.status })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold mb-1", children: task.title }),
          task.page_url && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm text-gray-600 mb-2", children: [
            "\u{1F4C4} ",
            task.page_url,
            task.last_score !== void 0 && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-2", children: [
              "(Score: ",
              task.last_score,
              ")"
            ] })
          ] }),
          task.description && /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-600 mb-2", children: task.description }),
          task.expected_impact && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm mb-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "F\xF6rv\xE4ntad effekt:" }),
            " ",
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-green-600", children: task.expected_impact })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mt-3", children: [
            task.status === "todo" && /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: () => updateTaskStatus(task.id, "in_progress"),
                children: "Starta"
              }
            ),
            task.status === "in_progress" && /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                size: "sm",
                variant: "default",
                onClick: () => updateTaskStatus(task.id, "done"),
                children: "Markera klar"
              }
            ),
            task.status !== "done" && task.status !== "skipped" && /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                onClick: () => updateTaskStatus(task.id, "skipped"),
                children: "Hoppa \xF6ver"
              }
            )
          ] })
        ] }) }, task.id)) })
      ] }) }) })
    ] })
  ] });
}
function Separator(_a) {
  var _b = _a, {
    className,
    orientation = "horizontal",
    decorative = true
  } = _b, props = __objRest(_b, [
    "className",
    "orientation",
    "decorative"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SeparatorPrimitive__namespace.Root,
    __spreadValues({
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )
    }, props)
  );
}
function Settings() {
  const [settings, setSettings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [editedValues, setEditedValues] = React.useState({});
  const [showSensitive, setShowSensitive] = React.useState({});
  const [keywords, setKeywords] = React.useState([]);
  const [loadingKeywords, setLoadingKeywords] = React.useState(false);
  const [newKeyword, setNewKeyword] = React.useState({ keyword: "", url: "", target_density: "" });
  const [addingKeyword, setAddingKeyword] = React.useState(false);
  const [pages, setPages] = React.useState([]);
  const [loadingPages, setLoadingPages] = React.useState(false);
  const [newPageUrl, setNewPageUrl] = React.useState("");
  const [addingPage, setAddingPage] = React.useState(false);
  React.useEffect(() => {
    fetchSettings();
    fetchKeywords();
    fetchPages();
  }, []);
  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/settings");
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
        const values = {};
        data.settings.forEach((s) => {
          values[s.setting_key] = s.setting_value || "";
        });
        setEditedValues(values);
      }
    } catch (err) {
      setError("Kunde inte h\xE4mta inst\xE4llningar");
    } finally {
      setLoading(false);
    }
  };
  const saveSetting = async (settingKey) => {
    setSaving(settingKey);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          setting_key: settingKey,
          setting_value: editedValues[settingKey]
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(`${settingKey} uppdaterad!`);
        setTimeout(() => setSuccess(null), 3e3);
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
  const toggleShowSensitive = (key) => {
    setShowSensitive((prev) => __spreadProps(__spreadValues({}, prev), { [key]: !prev[key] }));
  };
  const fetchKeywords = async () => {
    setLoadingKeywords(true);
    try {
      const response = await fetch("/api/keywords?url=all");
      const data = await response.json();
      if (data.keywords) {
        setKeywords(data.keywords);
      }
    } catch (err) {
      console.error("Failed to fetch keywords:", err);
    } finally {
      setLoadingKeywords(false);
    }
  };
  const addKeyword = async () => {
    if (!newKeyword.keyword || !newKeyword.url) {
      setError("Keyword och URL m\xE5ste anges");
      return;
    }
    setAddingKeyword(true);
    setError(null);
    try {
      const response = await fetch("/api/keywords", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: newKeyword.keyword,
          url: newKeyword.url,
          target_density: newKeyword.target_density ? parseFloat(newKeyword.target_density) : null
        })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setNewKeyword({ keyword: "", url: "", target_density: "" });
        await fetchKeywords();
        setTimeout(() => setSuccess(null), 3e3);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError("Kunde inte l\xE4gga till keyword");
    } finally {
      setAddingKeyword(false);
    }
  };
  const deleteKeyword = async (id) => {
    try {
      const response = await fetch(`/api/keywords?id=${id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        setSuccess("Keyword borttagen");
        await fetchKeywords();
        setTimeout(() => setSuccess(null), 3e3);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError("Kunde inte ta bort keyword");
    }
  };
  const fetchPages = async () => {
    setLoadingPages(true);
    try {
      const response = await fetch("/api/pages");
      const data = await response.json();
      if (data.pages) {
        setPages(data.pages);
      }
    } catch (err) {
      console.error("Failed to fetch pages:", err);
    } finally {
      setLoadingPages(false);
    }
  };
  const addPage = async () => {
    if (!newPageUrl) {
      setError("URL m\xE5ste anges");
      return;
    }
    setAddingPage(true);
    setError(null);
    try {
      const response = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: newPageUrl })
      });
      const data = await response.json();
      if (data.success) {
        setSuccess(data.message);
        setNewPageUrl("");
        await fetchPages();
        setTimeout(() => setSuccess(null), 3e3);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError("Kunde inte l\xE4gga till sida");
    } finally {
      setAddingPage(false);
    }
  };
  const deletePage = async (url) => {
    try {
      const response = await fetch(`/api/pages?url=${encodeURIComponent(url)}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data.success) {
        setSuccess("Sida borttagen");
        await fetchPages();
        setTimeout(() => setSuccess(null), 3e3);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError("Kunde inte ta bort sida");
    }
  };
  const getSettingIcon = (key) => {
    const icons = {
      site_url: "\u{1F310}",
      sitemap_url: "\u{1F5FA}\uFE0F",
      gsc_site_url: "\u{1F4CA}",
      max_pages_per_run: "\u{1F4C4}"
    };
    return icons[key] || "\u2699\uFE0F";
  };
  const getSettingLabel = (key) => {
    const labels = {
      site_url: "Standard webbplats URL",
      sitemap_url: "Sitemap URL (valfritt)",
      gsc_site_url: "Google Search Console Site URL (valfritt)",
      max_pages_per_run: "Max sidor per k\xF6rning"
    };
    return labels[key] || key;
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-32" }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Settings, { className: "h-6 w-6" }),
        "Inst\xE4llningar"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Konfigurera webbplatsinst\xE4llningar och hantera sidor och nyckelord." })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "bg-amber-50 dark:bg-amber-950 border-amber-200", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "font-semibold mb-2 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-shield-lock text-amber-600" }),
        "API-nycklar (Konfigurera i .env.local)"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-muted-foreground mb-3", children: [
        "Av s\xE4kerhetssk\xE4l lagras API-nycklar i ",
        /* @__PURE__ */ jsxRuntime.jsx("code", { className: "bg-amber-100 dark:bg-amber-900 px-2 py-1 rounded", children: ".env.local" }),
        " ist\xE4llet f\xF6r i databasen."
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-sm space-y-2 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-foreground", children: "PSI_API_KEY" }),
          " - Google PageSpeed Insights API-nyckel (obligatorisk)"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-foreground", children: "GSC_ACCESS_TOKEN" }),
          " - Google Search Console access token (valfritt)"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-foreground", children: "GSC_CLIENT_ID" }),
          " - Google OAuth Client ID (valfritt)"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-foreground", children: "GSC_CLIENT_SECRET" }),
          " - Google OAuth Client Secret (valfritt)"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("strong", { className: "text-foreground", children: "GSC_REFRESH_TOKEN" }),
          " - Google OAuth Refresh Token (valfritt)"
        ] })
      ] })
    ] }) }),
    success && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { className: "bg-green-50 dark:bg-green-950 border-green-200", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle, { className: "h-4 w-4 text-green-600" }),
      /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { className: "text-green-800 dark:text-green-200", children: success })
    ] }),
    error && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { variant: "destructive", children: [
      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: error })
    ] }),
    settings.map((setting) => {
      const isSensitive = setting.is_sensitive;
      const isEdited = editedValues[setting.setting_key] !== (setting.setting_value || "");
      const isSaving = saving === setting.setting_key;
      return /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl", children: getSettingIcon(setting.setting_key) }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-lg", children: getSettingLabel(setting.setting_key) }),
              /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: setting.description })
            ] })
          ] }),
          isSensitive && /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: "secondary", children: [
            /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-shield-lock me-1" }),
            "K\xE4nslig"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: setting.setting_key, children: "V\xE4rde" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                Input,
                {
                  id: setting.setting_key,
                  type: isSensitive && !showSensitive[setting.setting_key] ? "password" : "text",
                  value: editedValues[setting.setting_key] || "",
                  onChange: (e) => setEditedValues((prev) => __spreadProps(__spreadValues({}, prev), {
                    [setting.setting_key]: e.target.value
                  })),
                  placeholder: `Ange ${getSettingLabel(setting.setting_key).toLowerCase()}`,
                  className: "flex-1"
                }
              ),
              isSensitive && /* @__PURE__ */ jsxRuntime.jsx(
                Button,
                {
                  onClick: () => toggleShowSensitive(setting.setting_key),
                  variant: "outline",
                  size: "icon",
                  children: showSensitive[setting.setting_key] ? /* @__PURE__ */ jsxRuntime.jsx(lucideReact.EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Eye, { className: "h-4 w-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "Senast uppdaterad: ",
              new Date(setting.updated_at).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/-/g, "/")
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                onClick: () => saveSetting(setting.setting_key),
                disabled: !isEdited || isSaving,
                size: "sm",
                className: "bg-green-600 hover:bg-green-700",
                children: isSaving ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-arrow-repeat animate-spin me-2" }),
                  "Sparar..."
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Save, { className: "h-4 w-4 mr-2" }),
                  "Spara"
                ] })
              }
            )
          ] })
        ] }) })
      ] }, setting.id);
    }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Key, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Hantera nyckelord" }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "L\xE4gg till nyckelord manuellt f\xF6r att sp\xE5ra och optimera" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-sm", children: "L\xE4gg till nytt nyckelord" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "new-keyword", children: "Nyckelord" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                Input,
                {
                  id: "new-keyword",
                  placeholder: "t.ex. SEO optimering",
                  value: newKeyword.keyword,
                  onChange: (e) => setNewKeyword((prev) => __spreadProps(__spreadValues({}, prev), { keyword: e.target.value }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "keyword-url", children: "URL" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                Input,
                {
                  id: "keyword-url",
                  placeholder: "https://example.com/page",
                  value: newKeyword.url,
                  onChange: (e) => setNewKeyword((prev) => __spreadProps(__spreadValues({}, prev), { url: e.target.value }))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "target-density", children: "M\xE5l-densitet % (valfritt)" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                Input,
                {
                  id: "target-density",
                  type: "number",
                  step: "0.1",
                  placeholder: "2.5",
                  value: newKeyword.target_density,
                  onChange: (e) => setNewKeyword((prev) => __spreadProps(__spreadValues({}, prev), { target_density: e.target.value }))
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Button,
            {
              onClick: addKeyword,
              disabled: addingKeyword,
              className: "w-full md:w-auto",
              children: addingKeyword ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-arrow-repeat animate-spin me-2" }),
                "L\xE4gger till..."
              ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4 mr-2" }),
                "L\xE4gg till nyckelord"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "font-semibold text-sm", children: [
            "Dina nyckelord (",
            keywords.length,
            ")"
          ] }),
          loadingKeywords ? /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-20" }) : keywords.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground py-4", children: "Inga nyckelord tillagda \xE4nnu. L\xE4gg till ett nyckelord f\xF6r att b\xF6rja sp\xE5ra." }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: keywords.map((kw) => /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 bg-white dark:bg-slate-800 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: kw.keyword }),
                    /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", className: "text-xs", children: kw.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
                    kw.url,
                    kw.target_density && ` \xB7 M\xE5l: ${kw.target_density}%`
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: () => deleteKeyword(kw.id),
                    variant: "ghost",
                    size: "icon",
                    className: "text-red-600 hover:text-red-700 hover:bg-red-50",
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            kw.id
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Link, { className: "h-6 w-6" }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Hantera sidor" }),
          /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "L\xE4gg till sidor att \xF6vervaka och analysera" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-4 bg-slate-50 dark:bg-slate-900 rounded-lg space-y-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-sm", children: "L\xE4gg till ny sida" }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                placeholder: "https://example.com/page",
                value: newPageUrl,
                onChange: (e) => setNewPageUrl(e.target.value),
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(
              Button,
              {
                onClick: addPage,
                disabled: addingPage,
                children: addingPage ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-arrow-repeat animate-spin me-2" }),
                  "L\xE4gger till..."
                ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Plus, { className: "h-4 w-4 mr-2" }),
                  "L\xE4gg till"
                ] })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "font-semibold text-sm", children: [
            "Dina sidor (",
            pages.length,
            ")"
          ] }),
          loadingPages ? /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-20" }) : pages.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground py-4", children: "Inga sidor tillagda \xE4nnu. L\xE4gg till en sida f\xF6r att b\xF6rja \xF6vervaka." }) : /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-2 max-h-96 overflow-y-auto", children: pages.map((page) => /* @__PURE__ */ jsxRuntime.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-3 bg-white dark:bg-slate-800 border rounded-lg",
              children: [
                /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex-1", children: [
                  /* @__PURE__ */ jsxRuntime.jsx("p", { className: "font-medium text-sm break-all", children: page.url }),
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground mt-1", children: [
                    page.senaste_score !== null && /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                      "Score: ",
                      page.senaste_score
                    ] }),
                    /* @__PURE__ */ jsxRuntime.jsxs("span", { children: [
                      "Senast sedd: ",
                      page.last_seen_at ? new Date(page.last_seen_at).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/-/g, "/") : "Aldrig"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: () => deletePage(page.url),
                    variant: "ghost",
                    size: "icon",
                    className: "text-red-600 hover:text-red-700 hover:bg-red-50",
                    children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Trash2, { className: "h-4 w-4" })
                  }
                )
              ]
            },
            page.id
          )) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(Card, { className: "bg-blue-50 dark:bg-blue-950 border-blue-200", children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "font-semibold mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-info-circle" }),
        "Setup-guide"
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white dark:bg-slate-800 p-3 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "1. Konfigurera API-nycklar i .env.local" }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mb-2", children: [
            "L\xE4gg till f\xF6ljande i din ",
            /* @__PURE__ */ jsxRuntime.jsx("code", { className: "bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded", children: ".env.local" }),
            " fil:"
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx("pre", { className: "bg-slate-100 dark:bg-slate-700 p-2 rounded text-xs overflow-x-auto", children: `# Google PageSpeed Insights (OBLIGATORISK)
PSI_API_KEY=din-api-nyckel-h\xE4r

# Google Search Console (Valfritt)
GSC_ACCESS_TOKEN=din-token-h\xE4r
GSC_SITE_URL=https://example.com
GSC_CLIENT_ID=xxx.apps.googleusercontent.com
GSC_CLIENT_SECRET=xxx
GSC_REFRESH_TOKEN=xxx` }),
          /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "mt-2", children: [
            "H\xE4mta PSI API-nyckel fr\xE5n",
            " ",
            /* @__PURE__ */ jsxRuntime.jsx(
              "a",
              {
                href: "https://console.cloud.google.com/apis/credentials",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-blue-600 hover:underline font-medium",
                children: "Google Cloud Console"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white dark:bg-slate-800 p-3 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "2. Konfigurera webbplatsinst\xE4llningar" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mb-2", children: "Anv\xE4nd formul\xE4ren ovan f\xF6r att konfigurera:" }),
          /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "list-disc list-inside space-y-1 ml-2", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Site URL:" }),
              " Din huvudwebbplats (t.ex. https://example.com)"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Sitemap URL:" }),
              " Valfritt - l\xE4mna tom f\xF6r auto-uppt\xE4ckt"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Max sidor per run:" }),
              " Hur m\xE5nga sidor som analyseras \xE5t g\xE5ngen"
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
              /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "GSC Site URL:" }),
              " Valfritt - f\xF6r Google Search Console-integration"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white dark:bg-slate-800 p-3 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h4", { className: "font-semibold text-foreground mb-2", children: "3. L\xE4gg till sidor och nyckelord" }),
          /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "list-disc list-inside space-y-1 ml-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx("li", { children: 'Anv\xE4nd "Hantera sidor" f\xF6r att l\xE4gga till specifika sidor att \xF6vervaka' }),
            /* @__PURE__ */ jsxRuntime.jsx("li", { children: 'Anv\xE4nd "Hantera nyckelord" f\xF6r att l\xE4gga till viktiga keywords per sida' }),
            /* @__PURE__ */ jsxRuntime.jsx("li", { children: "Dessa kommer anv\xE4ndas vid n\xE4sta analys-k\xF6rning" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
var ScrollArea = React__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    ScrollAreaPrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      ref,
      className: cn("relative overflow-hidden", className)
    }, props), {
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.Viewport, { className: "h-full w-full rounded-[inherit]", children }),
        /* @__PURE__ */ jsxRuntime.jsx(ScrollBar, {}),
        /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.Corner, {})
      ]
    })
  );
});
ScrollArea.displayName = ScrollAreaPrimitive__namespace.Root.displayName;
var ScrollBar = React__namespace.forwardRef((_a, ref) => {
  var _b = _a, { className, orientation = "vertical" } = _b, props = __objRest(_b, ["className", "orientation"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ScrollAreaPrimitive__namespace.ScrollAreaScrollbar,
    __spreadProps(__spreadValues({
      ref,
      orientation,
      className: cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(ScrollAreaPrimitive__namespace.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
    })
  );
});
ScrollBar.displayName = ScrollAreaPrimitive__namespace.ScrollAreaScrollbar.displayName;
function Sidebar({ activeTab, onTabChange }) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: lucideReact.LayoutDashboard,
      description: "\xD6versikt"
    },
    {
      id: "tasks",
      label: "Todo",
      icon: lucideReact.ListTodo,
      description: "Uppgifter"
    },
    {
      id: "ai-analysis",
      label: "AI Analys",
      icon: lucideReact.Sparkles,
      description: "AI-insikter"
    },
    {
      id: "overview",
      label: "Score",
      icon: lucideReact.BarChart3,
      description: "Metrics"
    },
    {
      id: "suggestions",
      label: "F\xF6rslag",
      icon: lucideReact.Lightbulb,
      description: "SEO-tips"
    },
    {
      id: "text-suggestions",
      label: "Text",
      icon: lucideReact.FileText,
      description: "Content"
    },
    {
      id: "runs",
      label: "Runs",
      icon: lucideReact.Clock,
      description: "Historik"
    },
    {
      id: "settings",
      label: "Settings",
      icon: lucideReact.Settings,
      description: "Inst\xE4llningar"
    }
  ];
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex h-full w-64 flex-col border-r bg-card", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border-b px-6 py-5", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent", children: "\u{1F916} SEO Manager" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "AI-Driven Analytics" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(ScrollArea, { className: "flex-1 px-3 py-4", children: /* @__PURE__ */ jsxRuntime.jsx("nav", { className: "space-y-1", children: navItems.map((item) => {
      const Icon2 = item.icon;
      const isActive = activeTab === item.id;
      return /* @__PURE__ */ jsxRuntime.jsxs(
        Button,
        {
          variant: isActive ? "secondary" : "ghost",
          className: cn(
            "w-full justify-start gap-3 px-3",
            isActive && "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary"
          ),
          onClick: () => onTabChange(item.id),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col items-start", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm font-medium", children: item.label }),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-xs text-muted-foreground", children: item.description })
            ] })
          ]
        },
        item.id
      );
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "border-t px-4 py-3", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Powered by OpenAI & Google" }) })
  ] });
}
function Select(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Root, __spreadValues({ "data-slot": "select" }, props));
}
function SelectGroup(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Group, __spreadValues({ "data-slot": "select-group" }, props));
}
function SelectValue(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Value, __spreadValues({ "data-slot": "select-value" }, props));
}
function SelectTrigger(_a) {
  var _b = _a, {
    className,
    size = "default",
    children
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "children"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Trigger,
    __spreadProps(__spreadValues({
      "data-slot": "select-trigger",
      "data-size": size,
      className: cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )
    }, props), {
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Icon, { asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "size-4 opacity-50" }) })
      ]
    })
  );
}
function SelectContent(_a) {
  var _b = _a, {
    className,
    children,
    position = "popper",
    align = "center"
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "position",
    "align"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.Portal, { children: /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Content,
    __spreadProps(__spreadValues({
      "data-slot": "select-content",
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      ),
      position,
      align
    }, props), {
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollUpButton, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          SelectPrimitive__namespace.Viewport,
          {
            className: cn(
              "p-1",
              position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(SelectScrollDownButton, {})
      ]
    })
  ) });
}
function SelectLabel(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Label,
    __spreadValues({
      "data-slot": "select-label",
      className: cn("text-muted-foreground px-2 py-1.5 text-xs", className)
    }, props)
  );
}
function SelectItem(_a) {
  var _b = _a, {
    className,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "children"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    SelectPrimitive__namespace.Item,
    __spreadProps(__spreadValues({
      "data-slot": "select-item",
      className: cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )
    }, props), {
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemIndicator, { children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckIcon, { className: "size-4" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(SelectPrimitive__namespace.ItemText, { children })
      ]
    })
  );
}
function SelectSeparator(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.Separator,
    __spreadValues({
      "data-slot": "select-separator",
      className: cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)
    }, props)
  );
}
function SelectScrollUpButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollUpButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-up-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronUpIcon, { className: "size-4" })
    })
  );
}
function SelectScrollDownButton(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    SelectPrimitive__namespace.ScrollDownButton,
    __spreadProps(__spreadValues({
      "data-slot": "select-scroll-down-button",
      className: cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ChevronDownIcon, { className: "size-4" })
    })
  );
}
function SuggestionsList() {
  const [suggestions, setSuggestions] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [impactFilter, setImpactFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("pending");
  React.useEffect(() => {
    fetchSuggestions();
  }, [impactFilter, statusFilter]);
  const fetchSuggestions = async () => {
    try {
      const params = new URLSearchParams();
      if (impactFilter !== "all") params.set("impact", impactFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const response = await fetch(`/api/agent/suggestions?${params}`);
      const data = await response.json();
      if (data.success) {
        setSuggestions(data.data);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateStatus = async (suggestionId, newStatus) => {
    try {
      const response = await fetch("/api/agent/suggestions", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ suggestionId, status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        fetchSuggestions();
      }
    } catch (error) {
      console.error("Error updating suggestion:", error);
    }
  };
  const getImpactBadge = (impact) => {
    const variants = {
      high: { variant: "destructive", icon: lucideReact.AlertTriangle },
      medium: { variant: "default", icon: lucideReact.TrendingUp },
      low: { variant: "secondary", icon: lucideReact.TrendingDown }
    };
    const config = variants[impact];
    const Icon2 = config.icon;
    return /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: config.variant, className: "gap-1", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icon2, { className: "h-3 w-3" }),
      impact.toUpperCase()
    ] });
  };
  const getStatusBadge = (status) => {
    const variants = {
      pending: "outline",
      in_progress: "default",
      completed: "default",
      dismissed: "secondary"
    };
    return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: variants[status], children: status.replace("_", " ").toUpperCase() });
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" }),
        /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-24" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" })
    ] });
  }
  const suggestionsByImpact = {
    high: suggestions.filter((s) => s.impact === "high"),
    medium: suggestions.filter((s) => s.impact === "medium"),
    low: suggestions.filter((s) => s.impact === "low")
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "High Impact" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertTriangle, { className: "h-8 w-8 text-red-600" }),
          suggestionsByImpact.high.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Medium Impact" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TrendingUp, { className: "h-8 w-8 text-yellow-600" }),
          suggestionsByImpact.medium.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Low Impact" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "text-4xl flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TrendingDown, { className: "h-8 w-8 text-blue-600" }),
          suggestionsByImpact.low.length
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "Total" }),
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-4xl", children: suggestions.length })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "impact-filter", children: "Impact" }),
        /* @__PURE__ */ jsxRuntime.jsxs(Select, { value: impactFilter, onValueChange: setImpactFilter, children: [
          /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { id: "impact-filter", className: "w-[180px]", children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: "Select impact" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "all", children: "All Impacts" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "high", children: "High" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "low", children: "Low" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "status-filter", children: "Status" }),
        /* @__PURE__ */ jsxRuntime.jsxs(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
          /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { id: "status-filter", className: "w-[180px]", children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: "Select status" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "all", children: "All Statuses" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "pending", children: "Pending" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "in_progress", children: "In Progress" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "completed", children: "Completed" }),
            /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "dismissed", children: "Dismissed" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-4", children: suggestions.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "text-center py-12 text-muted-foreground", children: "No suggestions found. Run the agent to generate suggestions." }) }) : suggestions.map((suggestion) => /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          getImpactBadge(suggestion.impact),
          getStatusBadge(suggestion.status)
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2", children: [
          suggestion.status === "pending" && /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              onClick: () => updateStatus(suggestion.suggestion_id, "in_progress"),
              size: "sm",
              variant: "default",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Play, { className: "h-4 w-4 mr-1" }),
                "Start"
              ]
            }
          ),
          suggestion.status === "in_progress" && /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              onClick: () => updateStatus(suggestion.suggestion_id, "completed"),
              size: "sm",
              variant: "default",
              className: "bg-green-600 hover:bg-green-700",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.CheckCircle, { className: "h-4 w-4 mr-1" }),
                "Complete"
              ]
            }
          ),
          suggestion.status !== "dismissed" && /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              onClick: () => updateStatus(suggestion.suggestion_id, "dismissed"),
              size: "sm",
              variant: "outline",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4 mr-1" }),
                "Dismiss"
              ]
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm mb-3", children: suggestion.action }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          "a",
          {
            href: suggestion.url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-sm text-blue-600 hover:underline flex items-center gap-1",
            children: [
              suggestion.url,
              /* @__PURE__ */ jsxRuntime.jsx(lucideReact.ExternalLink, { className: "h-3 w-3" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-xs text-muted-foreground mt-3", children: [
          "Created: ",
          new Date(suggestion.created_at).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/-/g, "/")
        ] })
      ] })
    ] }, suggestion.suggestion_id)) })
  ] });
}
function Textarea(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "textarea",
    __spreadValues({
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )
    }, props)
  );
}
var SECTION_META = {
  title: { label: "Title Tag", icon: "\u{1F4DD}", description: "Sidans titel i s\xF6kmotorer" },
  meta_description: { label: "Meta Description", icon: "\u{1F4C4}", description: "Beskrivning i s\xF6kresultat" },
  h1: { label: "H1 Rubrik", icon: "\u{1F524}", description: "Huvudrubrik" },
  h2: { label: "H2 Underrubrik", icon: "\u{1F4CB}", description: "Sekund\xE4ra rubriker" },
  h3: { label: "H3 Underrubrik", icon: "\u{1F4CC}", description: "Terti\xE4ra rubriker" },
  h4: { label: "H4 Underrubrik", icon: "\u{1F4CD}", description: "Fj\xE4rde niv\xE5ns rubriker" },
  h5: { label: "H5 Underrubrik", icon: "\u2022", description: "Femte niv\xE5ns rubriker" },
  h6: { label: "H6 Underrubrik", icon: "\xB7", description: "Sj\xE4tte niv\xE5ns rubriker" },
  paragraph: { label: "Paragraf", icon: "\xB6", description: "Br\xF6dtext" },
  image_alt: { label: "Bild Alt-text", icon: "\u{1F5BC}\uFE0F", description: "Alternativ text f\xF6r bilder" },
  canonical: { label: "Canonical URL", icon: "\u{1F517}", description: "Kanonisk URL" }
};
function TextSuggestions({ url }) {
  const [selectedUrl, setSelectedUrl] = React.useState(url || "");
  const [suggestions, setSuggestions] = React.useState([]);
  const [grouped, setGrouped] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [editingId, setEditingId] = React.useState(null);
  const [editedText, setEditedText] = React.useState("");
  const [filter, setFilter] = React.useState("pending");
  const [copySuccess, setCopySuccess] = React.useState(null);
  const fetchSuggestions = async () => {
    if (!selectedUrl) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ url: selectedUrl });
      if (filter !== "all") {
        params.append("status", filter);
      }
      const response = await fetch(`/api/text-suggestions?${params}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch suggestions");
      }
      setSuggestions(data.suggestions || []);
      setGrouped(data.grouped || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const generateSuggestions = async () => {
    if (!selectedUrl) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/text-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: selectedUrl, forceRegenerate: false })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate suggestions");
      }
      await fetchSuggestions();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const updateSuggestion = async (id, updates) => {
    try {
      const response = await fetch("/api/text-suggestions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(__spreadValues({ id }, updates))
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to update suggestion");
      }
      setSuggestions(
        (prev) => prev.map((s) => s.id === id ? data.suggestion : s)
      );
      await fetchSuggestions();
    } catch (err) {
      setError(err.message);
    }
  };
  const copyToClipboard = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(id);
      setTimeout(() => setCopySuccess(null), 2e3);
    } catch (err) {
      setError("Kunde inte kopiera text");
    }
  };
  const getImpactBadge = (impact) => {
    const variants = {
      high: { variant: "destructive", label: "HIGH IMPACT" },
      medium: { variant: "default", label: "MEDIUM IMPACT" },
      low: { variant: "secondary", label: "LOW IMPACT" }
    };
    const config = variants[impact];
    return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: config.variant, children: config.label });
  };
  const getStatusBadge = (status) => {
    const variants = {
      pending: { variant: "outline", label: "PENDING", className: "" },
      edited: { variant: "default", label: "EDITED", className: "bg-purple-600 hover:bg-purple-700" },
      applied: { variant: "default", label: "APPLIED", className: "bg-green-600 hover:bg-green-700" },
      dismissed: { variant: "secondary", label: "DISMISSED", className: "" }
    };
    const config = variants[status];
    return /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: config.variant, className: config.className, children: config.label });
  };
  React.useEffect(() => {
    if (selectedUrl) {
      fetchSuggestions();
    }
  }, [selectedUrl, filter]);
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sparkles, { className: "h-6 w-6" }),
          "Textf\xF6rslag & Optimering"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: "AI-genererade textf\xF6rslag f\xF6r att f\xF6rb\xE4ttra SEO" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "url-input", children: "URL att analysera" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Input,
              {
                id: "url-input",
                type: "url",
                value: selectedUrl,
                onChange: (e) => setSelectedUrl(e.target.value),
                placeholder: "https://example.com/page"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntime.jsx(Label, { htmlFor: "filter-select", children: "Filtrera f\xF6rslag" }),
            /* @__PURE__ */ jsxRuntime.jsxs(Select, { value: filter, onValueChange: (value) => setFilter(value), children: [
              /* @__PURE__ */ jsxRuntime.jsx(SelectTrigger, { id: "filter-select", children: /* @__PURE__ */ jsxRuntime.jsx(SelectValue, { placeholder: "V\xE4lj filter" }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "all", children: "Alla f\xF6rslag" }),
                /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "pending", children: "V\xE4ntande" }),
                /* @__PURE__ */ jsxRuntime.jsx(SelectItem, { value: "edited", children: "Redigerade" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              onClick: fetchSuggestions,
              disabled: !selectedUrl || loading,
              variant: "default",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-arrow-clockwise me-2" }),
                loading ? "H\xE4mtar..." : "H\xE4mta f\xF6rslag"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(
            Button,
            {
              onClick: generateSuggestions,
              disabled: !selectedUrl || loading,
              variant: "default",
              className: "bg-green-600 hover:bg-green-700",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Sparkles, { className: "h-4 w-4 mr-2" }),
                loading ? "Genererar..." : "Generera nya f\xF6rslag"
              ]
            }
          )
        ] }),
        error && /* @__PURE__ */ jsxRuntime.jsxs(Alert, { variant: "destructive", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.AlertCircle, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntime.jsx(AlertDescription, { children: error })
        ] })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-32" }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" }),
      /* @__PURE__ */ jsxRuntime.jsx(Skeleton, { className: "h-64" })
    ] }),
    !loading && suggestions.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "pt-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(lucideReact.TrendingUp, { className: "h-5 w-5 text-green-600" }),
          /* @__PURE__ */ jsxRuntime.jsxs("h3", { className: "text-lg font-semibold", children: [
            suggestions.length,
            " f\xF6rslag funna"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: 'Klicka p\xE5 "Redigera" f\xF6r att \xE4ndra texten, eller "Till\xE4mpa" f\xF6r att markera som klar.' })
      ] }) }),
      Object.entries(grouped).map(([sectionType, sectionSuggestions]) => {
        const meta = SECTION_META[sectionType];
        if (!meta || sectionSuggestions.length === 0) return null;
        return /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { className: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-2xl", children: meta.icon }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { className: "text-lg", children: meta.label }),
                /* @__PURE__ */ jsxRuntime.jsx(CardDescription, { children: meta.description })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: "default", className: "bg-blue-600", children: [
              sectionSuggestions.length,
              " f\xF6rslag"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "divide-y", children: sectionSuggestions.map((suggestion) => {
            const isEditing = editingId === suggestion.id;
            const displayText = suggestion.edited_text || suggestion.suggested_text;
            return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "p-6 hover:bg-muted/50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex gap-2 mb-4", children: [
                getImpactBadge(suggestion.impact),
                getStatusBadge(suggestion.status),
                suggestion.seo_score_impact && /* @__PURE__ */ jsxRuntime.jsxs(Badge, { variant: "default", className: "bg-green-600 hover:bg-green-700", children: [
                  "+",
                  suggestion.seo_score_impact,
                  " po\xE4ng"
                ] })
              ] }),
              suggestion.original_text && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Label, { className: "mb-2 block", children: "Nuvarande text:" }),
                /* @__PURE__ */ jsxRuntime.jsx(Alert, { variant: "destructive", className: "bg-red-50 dark:bg-red-950", children: /* @__PURE__ */ jsxRuntime.jsxs(AlertDescription, { children: [
                  suggestion.original_text,
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                    suggestion.original_text.length,
                    " tecken, ",
                    suggestion.original_text.split(" ").length,
                    " ord"
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntime.jsx(Label, { className: "mb-2 block", children: suggestion.edited_text ? "Din redigerade text:" : "F\xF6reslagen text:" }),
                isEditing ? /* @__PURE__ */ jsxRuntime.jsx(
                  Textarea,
                  {
                    value: editedText,
                    onChange: (e) => setEditedText(e.target.value),
                    className: "min-h-[100px]",
                    placeholder: "Redigera texten h\xE4r..."
                  }
                ) : /* @__PURE__ */ jsxRuntime.jsx(Alert, { className: "bg-green-50 dark:bg-green-950 border-green-200", children: /* @__PURE__ */ jsxRuntime.jsxs(AlertDescription, { children: [
                  displayText,
                  /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
                    displayText.length,
                    " tecken, ",
                    displayText.split(" ").length,
                    " ord",
                    suggestion.readability_score && /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "ml-3", children: [
                      "\u2022 L\xE4sbarhet: ",
                      suggestion.readability_score.toFixed(0),
                      "/100"
                    ] })
                  ] })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(Alert, { className: "mb-4 bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-400", children: /* @__PURE__ */ jsxRuntime.jsxs(AlertDescription, { children: [
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-semibold", children: "Varf\xF6r:" }),
                " ",
                suggestion.reason
              ] }) }),
              suggestion.keywords && Array.isArray(suggestion.keywords) && suggestion.keywords.length > 0 && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsxRuntime.jsxs(Label, { className: "mb-2 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Hash, { className: "h-4 w-4" }),
                  "Inkluderade nyckelord:"
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap gap-2", children: suggestion.keywords.map((keyword, idx) => /* @__PURE__ */ jsxRuntime.jsx(Badge, { variant: "secondary", className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300", children: String(keyword) }, idx)) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsx(Separator, { className: "my-4" }),
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex gap-2 flex-wrap", children: isEditing ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  Button,
                  {
                    onClick: () => {
                      updateSuggestion(suggestion.id, { editedText });
                      setEditingId(null);
                    },
                    size: "sm",
                    className: "bg-green-600 hover:bg-green-700",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Save, { className: "h-4 w-4 mr-1" }),
                      "Spara redigering"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  Button,
                  {
                    onClick: () => {
                      setEditingId(null);
                      setEditedText("");
                    },
                    size: "sm",
                    variant: "outline",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4 mr-1" }),
                      "Avbryt"
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                /* @__PURE__ */ jsxRuntime.jsxs(
                  Button,
                  {
                    onClick: () => {
                      setEditingId(suggestion.id);
                      setEditedText(displayText);
                    },
                    disabled: suggestion.status === "applied",
                    size: "sm",
                    variant: "default",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Edit, { className: "h-4 w-4 mr-1" }),
                      "Redigera"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(
                  Button,
                  {
                    onClick: () => copyToClipboard(displayText, suggestion.id),
                    size: "sm",
                    variant: "secondary",
                    children: copySuccess === suggestion.id ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4 mr-1" }),
                      "Kopierad!"
                    ] }) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Copy, { className: "h-4 w-4 mr-1" }),
                      "Kopiera"
                    ] })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  Button,
                  {
                    onClick: () => updateSuggestion(suggestion.id, { status: "applied" }),
                    disabled: suggestion.status === "applied",
                    size: "sm",
                    className: "bg-green-600 hover:bg-green-700",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.Check, { className: "h-4 w-4 mr-1" }),
                      "Till\xE4mpa"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsxs(
                  Button,
                  {
                    onClick: () => updateSuggestion(suggestion.id, { status: "dismissed" }),
                    disabled: suggestion.status === "dismissed",
                    size: "sm",
                    variant: "destructive",
                    children: [
                      /* @__PURE__ */ jsxRuntime.jsx(lucideReact.X, { className: "h-4 w-4 mr-1" }),
                      "Avf\xE4rda"
                    ]
                  }
                )
              ] }) }),
              suggestion.applied_at && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
                "Till\xE4mpades: ",
                new Date(suggestion.applied_at).toLocaleDateString("sv-SE", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/-/g, "/")
              ] })
            ] }, suggestion.id);
          }) }) })
        ] }, sectionType);
      })
    ] }),
    !loading && suggestions.length === 0 && selectedUrl && /* @__PURE__ */ jsxRuntime.jsx(Card, { children: /* @__PURE__ */ jsxRuntime.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntime.jsx("i", { className: "bi bi-lightbulb text-6xl text-muted-foreground mb-4 d-block" }),
      /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-xl font-semibold mb-2", children: "Inga f\xF6rslag \xE4n" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-muted-foreground mb-6", children: "Generera textf\xF6rslag f\xF6r denna sida genom att klicka p\xE5 knappen ovan." })
    ] }) })
  ] });
}
function Dialog(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Root, __spreadValues({ "data-slot": "dialog" }, props));
}
function DialogTrigger(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Trigger, __spreadValues({ "data-slot": "dialog-trigger" }, props));
}
function DialogPortal(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Portal, __spreadValues({ "data-slot": "dialog-portal" }, props));
}
function DialogClose(_a) {
  var props = __objRest(_a, []);
  return /* @__PURE__ */ jsxRuntime.jsx(DialogPrimitive__namespace.Close, __spreadValues({ "data-slot": "dialog-close" }, props));
}
function DialogOverlay(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Overlay,
    __spreadValues({
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )
    }, props)
  );
}
function DialogContent(_a) {
  var _b = _a, {
    className,
    children,
    showCloseButton = true
  } = _b, props = __objRest(_b, [
    "className",
    "children",
    "showCloseButton"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsxRuntime.jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxRuntime.jsxs(
      DialogPrimitive__namespace.Content,
      __spreadProps(__spreadValues({
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )
      }, props), {
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntime.jsxs(
            DialogPrimitive__namespace.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsxRuntime.jsx(lucideReact.XIcon, {}),
                /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      })
    )
  ] });
}
function DialogHeader(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className)
    }, props)
  );
}
function DialogFooter(_a) {
  var _b = _a, { className } = _b, props = __objRest(_b, ["className"]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    __spreadValues({
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )
    }, props)
  );
}
function DialogTitle(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Title,
    __spreadValues({
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className)
    }, props)
  );
}
function DialogDescription(_a) {
  var _b = _a, {
    className
  } = _b, props = __objRest(_b, [
    "className"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    DialogPrimitive__namespace.Description,
    __spreadValues({
      "data-slot": "dialog-description",
      className: cn("text-muted-foreground text-sm", className)
    }, props)
  );
}
function Progress(_a) {
  var _b = _a, {
    className,
    value
  } = _b, props = __objRest(_b, [
    "className",
    "value"
  ]);
  return /* @__PURE__ */ jsxRuntime.jsx(
    ProgressPrimitive__namespace.Root,
    __spreadProps(__spreadValues({
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )
    }, props), {
      children: /* @__PURE__ */ jsxRuntime.jsx(
        ProgressPrimitive__namespace.Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    })
  );
}
var SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
var SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
var supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);
function createAnonClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return supabaseJs.createClient(url, anon);
}

// lib/db/operations.ts
async function createRun() {
  const { data, error } = await supabase.from("runs").insert({
    started_at: (/* @__PURE__ */ new Date()).toISOString(),
    status: "running"
  }).select("run_id").single();
  if (error) throw new Error(`Failed to create run: ${error.message}`);
  return data.run_id;
}
async function updateRun(runId, update) {
  const { error } = await supabase.from("runs").update(update).eq("run_id", runId);
  if (error) throw new Error(`Failed to update run: ${error.message}`);
}
async function getRecentRuns(limit = 10) {
  const { data, error } = await supabase.from("runs").select("*").order("started_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch runs: ${error.message}`);
  return data || [];
}
async function upsertPage(page) {
  const { error } = await supabase.from("pages").upsert(page, { onConflict: "url" });
  if (error) throw new Error(`Failed to upsert page: ${error.message}`);
}
async function updatePageMetrics(url, metrics) {
  const { error } = await supabase.from("pages").update(__spreadProps(__spreadValues({}, metrics), {
    last_seen_at: metrics.last_seen_at || (/* @__PURE__ */ new Date()).toISOString(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  })).eq("url", url);
  if (error) throw new Error(`Failed to update page metrics: ${error.message}`);
}
async function getAllPages() {
  const { data, error } = await supabase.from("pages").select("*").order("updated_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch pages: ${error.message}`);
  return data || [];
}
async function getPageByUrl(url) {
  const { data, error } = await supabase.from("pages").select("*").eq("url", url).single();
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch page: ${error.message}`);
  }
  return data;
}
async function getPagesWithLowScore(threshold = 50) {
  const { data, error } = await supabase.from("pages").select("*").lt("senaste_score", threshold).order("senaste_score", { ascending: true });
  if (error) throw new Error(`Failed to fetch low score pages: ${error.message}`);
  return data || [];
}
async function createAudit(audit) {
  const { data, error } = await supabase.from("audits").insert(audit).select("audit_id").single();
  if (error) {
    if (error.code === "23505") {
      throw new Error(`Audit already exists for URL in this run`);
    }
    throw new Error(`Failed to create audit: ${error.message}`);
  }
  return data.audit_id;
}
async function getAuditsByRun(runId) {
  const { data, error } = await supabase.from("audits").select("*").eq("run_id", runId).order("score", { ascending: true });
  if (error) throw new Error(`Failed to fetch audits: ${error.message}`);
  return data || [];
}
async function getAuditsByUrl(url, limit = 10) {
  const { data, error } = await supabase.from("audits").select("*").eq("url", url).order("created_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch audits for URL: ${error.message}`);
  return data || [];
}
async function getLatestAudits() {
  const { data, error } = await supabase.from("latest_audits").select("*").order("score", { ascending: true });
  if (error) throw new Error(`Failed to fetch latest audits: ${error.message}`);
  return data || [];
}
async function getWorstPagesWeek() {
  const { data, error } = await supabase.from("worst_pages_week").select("*").limit(20);
  if (error) throw new Error(`Failed to fetch worst pages: ${error.message}`);
  return data || [];
}
async function createSuggestion(suggestion) {
  const { data, error } = await supabase.from("suggestions").insert(suggestion).select("suggestion_id").single();
  if (error) throw new Error(`Failed to create suggestion: ${error.message}`);
  return data.suggestion_id;
}
async function updateSuggestionStatus(suggestionId, status) {
  const { error } = await supabase.from("suggestions").update({
    status,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("suggestion_id", suggestionId);
  if (error) throw new Error(`Failed to update suggestion: ${error.message}`);
}
async function getSuggestions(filters) {
  let query = supabase.from("suggestions").select("*").order("created_at", { ascending: false });
  if (filters == null ? void 0 : filters.status) {
    query = query.eq("status", filters.status);
  }
  if (filters == null ? void 0 : filters.impact) {
    query = query.eq("impact", filters.impact);
  }
  if (filters == null ? void 0 : filters.url) {
    query = query.eq("url", filters.url);
  }
  const { data, error } = await query;
  if (error) throw new Error(`Failed to fetch suggestions: ${error.message}`);
  return data || [];
}
async function getTopSuggestions() {
  const [high, medium, low] = await Promise.all([
    getSuggestions({ impact: "high", status: "pending" }),
    getSuggestions({ impact: "medium", status: "pending" }),
    getSuggestions({ impact: "low", status: "pending" })
  ]);
  return {
    high: high.slice(0, 5),
    medium: medium.slice(0, 5),
    low: low.slice(0, 5)
  };
}
async function upsertGSCDaily(data) {
  const { error } = await supabase.from("gsc_daily").upsert(data, { onConflict: "url,date" });
  if (error) throw new Error(`Failed to upsert GSC data: ${error.message}`);
}
async function batchInsertGSCDaily(data) {
  const { error } = await supabase.from("gsc_daily").upsert(data, { onConflict: "url,date" });
  if (error) throw new Error(`Failed to batch insert GSC data: ${error.message}`);
}
async function getGSCDataByUrl(url, days = 30) {
  const startDate = /* @__PURE__ */ new Date();
  startDate.setDate(startDate.getDate() - days);
  const { data, error } = await supabase.from("gsc_daily").select("*").eq("url", url).gte("date", startDate.toISOString().split("T")[0]).order("date", { ascending: false });
  if (error) throw new Error(`Failed to fetch GSC data: ${error.message}`);
  return data || [];
}
async function createAIAnalysis(analysis) {
  const { data, error } = await supabase.from("ai_analysis_history").insert(analysis).select("id").single();
  if (error) throw new Error(`Failed to create AI analysis: ${error.message}`);
  return data.id;
}
async function getAIAnalysesByPageId(pageId, limit = 10) {
  const { data, error } = await supabase.from("ai_analysis_history").select("*").eq("page_id", pageId).order("created_at", { ascending: false }).limit(limit);
  if (error) throw new Error(`Failed to fetch AI analyses: ${error.message}`);
  return data || [];
}
async function createTask(task) {
  const { data, error } = await supabase.from("seo_tasks").insert(task).select("id").single();
  if (error) throw new Error(`Failed to create task: ${error.message}`);
  return data.id;
}
async function updateTask(taskId, update) {
  const { error } = await supabase.from("seo_tasks").update(update).eq("id", taskId);
  if (error) throw new Error(`Failed to update task: ${error.message}`);
}
async function getTasksByPageId(pageId) {
  const { data, error } = await supabase.from("seo_tasks").select("*").eq("page_id", pageId).order("priority", { ascending: true }).order("created_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch tasks: ${error.message}`);
  return data || [];
}
async function getActiveTasksThisWeek() {
  const { data, error } = await supabase.from("this_week_priority_tasks").select("*");
  if (error) {
    console.warn("View this_week_priority_tasks not available, using fallback query:", error.message);
    const { data: fallbackData, error: fallbackError } = await supabase.from("seo_tasks").select("*").in("status", ["todo", "in_progress"]).order("priority", { ascending: true }).order("created_at", { ascending: false });
    if (fallbackError) {
      throw new Error(`Failed to fetch tasks: ${fallbackError.message}`);
    }
    return fallbackData || [];
  }
  return data || [];
}
async function getPendingAISuggestions() {
  const { data, error } = await supabase.from("pending_ai_suggestions").select("*");
  if (error) {
    console.warn("View pending_ai_suggestions not available, using fallback query:", error.message);
    const { data: fallbackData, error: fallbackError } = await supabase.from("suggestions").select("*").eq("ai_generated", true).eq("status", "pending").order("created_at", { ascending: false });
    if (fallbackError) {
      throw new Error(`Failed to fetch suggestions: ${fallbackError.message}`);
    }
    return fallbackData || [];
  }
  return data || [];
}
async function createContentVersion(version) {
  const { data, error } = await supabase.from("content_versions").insert(version).select("id").single();
  if (error) throw new Error(`Failed to create content version: ${error.message}`);
  return data.id;
}
async function getContentVersionsByPageId(pageId) {
  const { data, error } = await supabase.from("content_versions").select("*").eq("page_id", pageId).order("implemented_at", { ascending: false });
  if (error) throw new Error(`Failed to fetch content versions: ${error.message}`);
  return data || [];
}
async function refreshMaterializedViews() {
  const { error } = await supabase.rpc("refresh_materialized_views");
  if (error) throw new Error(`Failed to refresh views: ${error.message}`);
}
async function runRetentionCleanup() {
  const { data, error } = await supabase.rpc("run_retention_cleanup");
  if (error) throw new Error(`Failed to run retention cleanup: ${error.message}`);
  return data;
}
var openai = new OpenAI__default.default({
  apiKey: process.env.OPENAI_API_KEY || ""
});
async function analyzePageWithAI(input) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY saknas i environment variables");
  }
  const systemPrompt = `Du \xE4r en expert SEO-konsult som analyserar webbsidor och ger konkreta, prioriterade f\xF6rb\xE4ttringsf\xF6rslag.

Din uppgift:
1. Analysera sidans nuvarande SEO-status
2. Identifiera f\xF6rb\xE4ttringsm\xF6jligheter baserat p\xE5 GSC-data (klick, impressions, CTR, position)
3. Ge konkreta, implementerbara f\xF6rslag
4. Prioritera baserat p\xE5 f\xF6rv\xE4ntad effekt

Fokusera p\xE5:
- Title och meta description optimering f\xF6r h\xF6gre CTR
- Content-kvalitet och relevans
- Anv\xE4ndarintention och s\xF6kbeteende
- Teknisk SEO (om performance-data finns)
- Strukturerad data (FAQ, schema.org)

Svara alltid p\xE5 svenska med konkreta exempel.`;
  const userPrompt = buildAnalysisPrompt(input);
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    const parsed = JSON.parse(result);
    return parsed;
  } catch (error) {
    console.error("[OpenAI] Analysis error:", error);
    throw new Error(
      `AI-analys misslyckades: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
function buildAnalysisPrompt(input) {
  let prompt = `Analysera f\xF6ljande webbsida och ge konkreta SEO-f\xF6rb\xE4ttringar:

`;
  prompt += `URL: ${input.url}
`;
  prompt += `Spr\xE5k: ${input.language || "svenska"}

`;
  if (input.currentTitle) {
    prompt += `Nuvarande title: "${input.currentTitle}"
`;
  }
  if (input.currentMetaDescription) {
    prompt += `Nuvarande meta description: "${input.currentMetaDescription}"
`;
  }
  if (input.currentH1) {
    prompt += `Nuvarande H1: "${input.currentH1}"
`;
  }
  if (input.contentLength) {
    prompt += `Content-l\xE4ngd: ${input.contentLength} tecken
`;
  }
  prompt += "\n";
  if (input.gscData) {
    prompt += `Google Search Console data:
`;
    prompt += `- Klick: ${input.gscData.clicks}
`;
    prompt += `- Impressions: ${input.gscData.impressions}
`;
    prompt += `- CTR: ${(input.gscData.ctr * 100).toFixed(2)}%
`;
    prompt += `- Genomsnittlig position: ${input.gscData.position.toFixed(1)}

`;
    if (input.gscData.topQueries && input.gscData.topQueries.length > 0) {
      prompt += `Top queries:
`;
      input.gscData.topQueries.slice(0, 10).forEach((q, i) => {
        prompt += `${i + 1}. "${q.query}" - ${q.clicks} klick, pos ${q.position.toFixed(1)}, CTR ${(q.ctr * 100).toFixed(1)}%
`;
      });
      prompt += "\n";
    }
  }
  if (input.psiScore !== void 0) {
    prompt += `PageSpeed Insights:
`;
    prompt += `- Performance score: ${input.psiScore}/100
`;
    if (input.psiMetrics) {
      if (input.psiMetrics.lcp) prompt += `- LCP: ${input.psiMetrics.lcp}s
`;
      if (input.psiMetrics.fcp) prompt += `- FCP: ${input.psiMetrics.fcp}s
`;
      if (input.psiMetrics.cls) prompt += `- CLS: ${input.psiMetrics.cls}
`;
      if (input.psiMetrics.tbt) prompt += `- TBT: ${input.psiMetrics.tbt}ms
`;
    }
    prompt += "\n";
  }
  prompt += `Ge mig ett JSON-svar med f\xF6ljande struktur:
{
  "summary": "Kort sammanfattning av sidans SEO-status (2-3 meningar)",
  "score": 75,
  "suggestions": [
    {
      "type": "title",
      "priority": "high",
      "category": "On-page SEO",
      "suggestion": "Konkret f\xF6rslag",
      "reasoning": "Varf\xF6r detta \xE4r viktigt",
      "expectedImpact": "F\xF6rv\xE4ntad effekt (t.ex. '+15% CTR', 'B\xE4ttre ranking')",
      "implementation": "Hur man implementerar (valfritt)"
    }
  ],
  "titleSuggestions": ["F\xF6rslag 1", "F\xF6rslag 2", "F\xF6rslag 3"],
  "metaDescriptionSuggestions": ["F\xF6rslag 1", "F\xF6rslag 2"],
  "faqSuggestions": [
    {
      "question": "Vanlig fr\xE5ga baserad p\xE5 s\xF6kord",
      "answer": "Kort, informativt svar"
    }
  ],
  "contentOutline": ["Rubrik 1", "Rubrik 2", "Rubrik 3"],
  "keywords": {
    "primary": ["huvuds\xF6kord"],
    "secondary": ["relaterade s\xF6kord"],
    "longTail": ["long-tail varianter"]
  }
}

Prioritera f\xF6rslag baserat p\xE5:
1. GSC-data (l\xE5g CTR men m\xE5nga impressions = fokusera p\xE5 title/meta)
2. Position (n\xE4ra topp 10 = sm\xE5 \xE4ndringar kan ge stor effekt)
3. Performance (l\xE5ngsam sida = tekniska f\xF6rb\xE4ttringar viktiga)

Ge minst 5 konkreta suggestions.`;
  return prompt;
}
async function generateContentSuggestions(url, currentContent, targetKeywords) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY saknas i environment variables");
  }
  const prompt = `Analysera f\xF6ljande content och ge f\xF6rb\xE4ttringsf\xF6rslag f\xF6r SEO:

URL: ${url}
Target keywords: ${targetKeywords.join(", ")}

Nuvarande content (f\xF6rsta 500 tecken):
${currentContent.slice(0, 500)}

Ge mig ett JSON-svar med:
{
  "outline": ["F\xF6reslagen struktur med rubriker"],
  "sections": [
    {
      "heading": "H2-rubrik",
      "content": "F\xF6rslag p\xE5 textinneh\xE5ll (2-3 stycken)"
    }
  ],
  "internalLinkSuggestions": ["F\xF6rslag p\xE5 interna l\xE4nkar baserat p\xE5 keywords"]
}`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du \xE4r en SEO content-expert som optimerar text f\xF6r s\xF6kord och anv\xE4ndarupplevelse."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    return JSON.parse(result);
  } catch (error) {
    console.error("[OpenAI] Content generation error:", error);
    throw error;
  }
}
async function generateSchemaMarkup(pageType, pageData) {
  const prompt = `Generera schema.org JSON-LD markup f\xF6r f\xF6ljande:

Page type: ${pageType}
Data: ${JSON.stringify(pageData, null, 2)}

Ge endast valid JSON-LD enligt schema.org spec.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "Du \xE4r en expert p\xE5 strukturerad data och schema.org markup."
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
      response_format: { type: "json_object" }
    });
    const result = completion.choices[0].message.content;
    if (!result) {
      throw new Error("Ingen respons fr\xE5n OpenAI");
    }
    return JSON.parse(result);
  } catch (error) {
    console.error("[OpenAI] Schema generation error:", error);
    throw error;
  }
}
async function fetchUrl(options) {
  var _a, _b;
  const {
    url,
    timeout = 3e4,
    userAgent = "SEO-Agent/1.0 (+https://yoursite.com/bot)"
  } = options;
  try {
    const urlObj = new URL(url);
    if (!["http:", "https:"].includes(urlObj.protocol)) {
      return {
        success: false,
        url,
        error: "Only HTTP and HTTPS protocols are supported"
      };
    }
    const response = await axios3__default.default.get(url, {
      timeout,
      headers: {
        "User-Agent": userAgent,
        "Accept": "text/html,application/xhtml+xml"
      },
      maxRedirects: 5,
      validateStatus: (status) => status < 500
      // Acceptera alla statuskoder under 500
    });
    const contentType = response.headers["content-type"] || "";
    const isHtml = contentType.includes("text/html") || contentType.includes("application/xhtml");
    if (!isHtml) {
      return {
        success: false,
        url,
        statusCode: response.status,
        contentType,
        error: `Content-Type is not HTML: ${contentType}`
      };
    }
    return {
      success: true,
      url,
      html: response.data,
      statusCode: response.status,
      contentType,
      redirectUrl: ((_b = (_a = response.request) == null ? void 0 : _a.res) == null ? void 0 : _b.responseUrl) || url
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      const axiosError = error;
      if (axiosError.code === "ECONNABORTED") {
        return {
          success: false,
          url,
          error: `Request timeout after ${timeout}ms`
        };
      }
      if (axiosError.response) {
        return {
          success: false,
          url,
          statusCode: axiosError.response.status,
          error: `HTTP ${axiosError.response.status}: ${axiosError.response.statusText}`
        };
      }
      if (axiosError.request) {
        return {
          success: false,
          url,
          error: "No response received from server"
        };
      }
    }
    return {
      success: false,
      url,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}
async function fetchUrlBatch(urls, concurrency = 3) {
  const results = [];
  for (let i = 0; i < urls.length; i += concurrency) {
    const batch = urls.slice(i, i + concurrency);
    const batchResults = await Promise.all(
      batch.map((url) => fetchUrl({ url }))
    );
    results.push(...batchResults);
    if (i + concurrency < urls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1e3));
    }
  }
  return results;
}
async function readSitemap(sitemapUrl) {
  try {
    const fetchResult = await fetchUrl({ url: sitemapUrl });
    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        urls: [],
        totalUrls: 0,
        error: fetchResult.error || "Failed to fetch sitemap"
      };
    }
    const parser = new fastXmlParser.XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    const parsed = parser.parse(fetchResult.html);
    if (parsed.sitemapindex) {
      return await parseSitemapIndex(parsed.sitemapindex, sitemapUrl);
    }
    if (parsed.urlset) {
      return parseSitemapUrlset(parsed.urlset);
    }
    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: "Invalid sitemap format: missing urlset or sitemapindex"
    };
  } catch (error) {
    return {
      success: false,
      urls: [],
      totalUrls: 0,
      error: error instanceof Error ? error.message : "Unknown error parsing sitemap"
    };
  }
}
function parseSitemapUrlset(urlset) {
  const urls = [];
  const urlEntries = Array.isArray(urlset.url) ? urlset.url : [urlset.url];
  for (const entry of urlEntries) {
    if (!entry || !entry.loc) continue;
    urls.push({
      loc: entry.loc,
      lastmod: entry.lastmod,
      changefreq: entry.changefreq,
      priority: entry.priority ? parseFloat(entry.priority) : void 0
    });
  }
  return {
    success: true,
    urls,
    totalUrls: urls.length,
    isSitemapIndex: false
  };
}
async function parseSitemapIndex(sitemapindex, baseUrl) {
  const childSitemaps = [];
  const allUrls = [];
  const sitemapEntries = Array.isArray(sitemapindex.sitemap) ? sitemapindex.sitemap : [sitemapindex.sitemap];
  for (const entry of sitemapEntries) {
    if (entry && entry.loc) {
      childSitemaps.push(entry.loc);
    }
  }
  const sitemapsToFetch = childSitemaps.slice(0, 10);
  for (const childUrl of sitemapsToFetch) {
    try {
      const result = await readSitemap(childUrl);
      if (result.success) {
        allUrls.push(...result.urls);
      }
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching child sitemap ${childUrl}:`, error);
    }
  }
  return {
    success: true,
    urls: allUrls,
    totalUrls: allUrls.length,
    isSitemapIndex: true,
    childSitemaps
  };
}
async function findSitemapsInRobotsTxt(domain) {
  try {
    const robotsUrl = new URL("/robots.txt", domain).toString();
    const fetchResult = await fetchUrl({ url: robotsUrl });
    if (!fetchResult.success || !fetchResult.html) {
      return [];
    }
    const sitemaps = [];
    const lines = fetchResult.html.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith("sitemap:")) {
        const sitemapUrl = trimmed.substring(8).trim();
        if (sitemapUrl) {
          sitemaps.push(sitemapUrl);
        }
      }
    }
    return sitemaps;
  } catch (error) {
    console.error("Error reading robots.txt:", error);
    return [];
  }
}
async function discoverSitemap(domain) {
  const robotsSitemaps = await findSitemapsInRobotsTxt(domain);
  if (robotsSitemaps.length > 0) {
    return await readSitemap(robotsSitemaps[0]);
  }
  const commonPaths = [
    "/sitemap.xml",
    "/sitemap_index.xml",
    "/sitemap-index.xml",
    "/sitemap1.xml"
  ];
  for (const path of commonPaths) {
    try {
      const sitemapUrl = new URL(path, domain).toString();
      const result = await readSitemap(sitemapUrl);
      if (result.success && result.totalUrls > 0) {
        return result;
      }
    } catch (error) {
      continue;
    }
  }
  return {
    success: false,
    urls: [],
    totalUrls: 0,
    error: "Could not discover sitemap for domain"
  };
}
async function psiAudit(url, apiKey, strategy = "mobile") {
  try {
    const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
    apiUrl.searchParams.set("url", url);
    apiUrl.searchParams.set("key", apiKey);
    apiUrl.searchParams.set("strategy", strategy);
    apiUrl.searchParams.set("category", "performance");
    apiUrl.searchParams.set("category", "accessibility");
    apiUrl.searchParams.set("category", "best-practices");
    apiUrl.searchParams.set("category", "seo");
    const response = await axios3__default.default.get(apiUrl.toString(), {
      timeout: 6e4
      // 60 sekunder
    });
    const data = response.data;
    const vitals = extractCoreWebVitals(data);
    const lighthouse = extractLighthouseScores(data);
    const issues = extractIssues(data);
    return {
      success: true,
      url,
      vitals,
      lighthouse,
      issues,
      rawData: data,
      requestId: data.id
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          url,
          issues: [],
          error: `PSI API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`
        };
      }
      if (error.code === "ECONNABORTED") {
        return {
          success: false,
          url,
          issues: [],
          error: "PSI API timeout after 60 seconds"
        };
      }
    }
    return {
      success: false,
      url,
      issues: [],
      error: error instanceof Error ? error.message : "Unknown PSI error"
    };
  }
}
function extractCoreWebVitals(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  try {
    const metrics = (_a = data.loadingExperience) == null ? void 0 : _a.metrics;
    const labData = (_b = data.lighthouseResult) == null ? void 0 : _b.audits;
    if (!metrics && !labData) return void 0;
    const lcp = ((_c = metrics == null ? void 0 : metrics.LARGEST_CONTENTFUL_PAINT_MS) == null ? void 0 : _c.percentile) ? metrics.LARGEST_CONTENTFUL_PAINT_MS.percentile / 1e3 : ((_d = labData == null ? void 0 : labData["largest-contentful-paint"]) == null ? void 0 : _d.numericValue) ? labData["largest-contentful-paint"].numericValue / 1e3 : 0;
    const cls = ((_e = metrics == null ? void 0 : metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE) == null ? void 0 : _e.percentile) ? metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE.percentile / 100 : ((_f = labData == null ? void 0 : labData["cumulative-layout-shift"]) == null ? void 0 : _f.numericValue) || 0;
    const inp = ((_g = metrics == null ? void 0 : metrics.INTERACTION_TO_NEXT_PAINT) == null ? void 0 : _g.percentile) ? metrics.INTERACTION_TO_NEXT_PAINT.percentile : ((_h = labData == null ? void 0 : labData["interaction-to-next-paint"]) == null ? void 0 : _h.numericValue) || 0;
    const fcp = ((_i = labData == null ? void 0 : labData["first-contentful-paint"]) == null ? void 0 : _i.numericValue) ? labData["first-contentful-paint"].numericValue / 1e3 : void 0;
    const ttfb = ((_j = labData == null ? void 0 : labData["server-response-time"]) == null ? void 0 : _j.numericValue) || void 0;
    return {
      lcp: parseFloat(lcp.toFixed(2)),
      cls: parseFloat(cls.toFixed(4)),
      inp: parseFloat(inp.toFixed(2)),
      fcp: fcp ? parseFloat(fcp.toFixed(2)) : void 0,
      ttfb: ttfb ? parseFloat(ttfb.toFixed(2)) : void 0
    };
  } catch (error) {
    console.error("Error extracting Core Web Vitals:", error);
    return void 0;
  }
}
function extractLighthouseScores(data) {
  var _a, _b;
  try {
    const categories = (_a = data.lighthouseResult) == null ? void 0 : _a.categories;
    if (!categories) return void 0;
    return {
      performance: Math.round((((_b = categories.performance) == null ? void 0 : _b.score) || 0) * 100),
      accessibility: categories.accessibility ? Math.round(categories.accessibility.score * 100) : void 0,
      bestPractices: categories["best-practices"] ? Math.round(categories["best-practices"].score * 100) : void 0,
      seo: categories.seo ? Math.round(categories.seo.score * 100) : void 0
    };
  } catch (error) {
    console.error("Error extracting Lighthouse scores:", error);
    return void 0;
  }
}
function extractIssues(data) {
  var _a;
  const issues = [];
  try {
    const audits = (_a = data.lighthouseResult) == null ? void 0 : _a.audits;
    if (!audits) return issues;
    const importantAudits = [
      "largest-contentful-paint",
      "cumulative-layout-shift",
      "interaction-to-next-paint",
      "first-contentful-paint",
      "speed-index",
      "total-blocking-time",
      "server-response-time",
      "render-blocking-resources",
      "unminified-css",
      "unminified-javascript",
      "unused-css-rules",
      "unused-javascript",
      "modern-image-formats",
      "uses-optimized-images",
      "uses-text-compression",
      "uses-responsive-images"
    ];
    for (const auditKey of importantAudits) {
      const audit = audits[auditKey];
      if (!audit) continue;
      if (audit.score !== null && audit.score < 0.9) {
        issues.push({
          title: audit.title || auditKey,
          description: audit.description || "",
          score: audit.score,
          displayValue: audit.displayValue,
          impact: determineImpact(audit.score)
        });
      }
    }
    return issues;
  } catch (error) {
    console.error("Error extracting issues:", error);
    return issues;
  }
}
function determineImpact(score) {
  if (score >= 0.5) return "low";
  if (score >= 0.3) return "medium";
  return "high";
}
async function psiAuditBatch(urls, apiKey, strategy = "mobile", delayMs = 2e3) {
  var _a;
  const results = [];
  for (const url of urls) {
    try {
      const result = await psiAudit(url, apiKey, strategy);
      results.push(result);
      if (urls.indexOf(url) < urls.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
      if (!result.success && ((_a = result.error) == null ? void 0 : _a.includes("429"))) {
        console.log("Rate limit hit, waiting 10 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 1e4));
      }
    } catch (error) {
      results.push({
        success: false,
        url,
        issues: [],
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  }
  return results;
}
async function gscTopQueries(siteUrl, accessToken, startDate, endDate, rowLimit = 1e3) {
  try {
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;
    const requestBody = {
      startDate,
      endDate,
      dimensions: ["page", "query"],
      rowLimit,
      startRow: 0
    };
    const response = await axios3__default.default.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    });
    const rows = response.data.rows || [];
    const pageMap = /* @__PURE__ */ new Map();
    for (const row of rows) {
      const [page, query] = row.keys;
      const { clicks, impressions, ctr, position } = row;
      if (!pageMap.has(page)) {
        pageMap.set(page, {
          page,
          clicks: 0,
          impressions: 0,
          ctr: 0,
          position: 0,
          topQueries: []
        });
      }
      const pageData = pageMap.get(page);
      pageData.clicks += clicks;
      pageData.impressions += impressions;
      pageData.topQueries.push({
        query,
        clicks,
        impressions,
        ctr,
        position
      });
    }
    const data = Array.from(pageMap.values()).map((pageData) => {
      pageData.topQueries.sort((a, b) => b.clicks - a.clicks);
      const totalQueries = pageData.topQueries.length;
      pageData.ctr = pageData.clicks / pageData.impressions;
      pageData.position = pageData.topQueries.reduce((sum, q) => sum + q.position, 0) / totalQueries;
      return pageData;
    });
    data.sort((a, b) => b.clicks - a.clicks);
    return {
      success: true,
      siteUrl,
      data,
      totalRows: data.length,
      startDate,
      endDate
    };
  } catch (error) {
    if (axios3__default.default.isAxiosError(error)) {
      if (error.response) {
        return {
          success: false,
          siteUrl,
          data: [],
          totalRows: 0,
          startDate,
          endDate,
          error: `GSC API error: ${error.response.status} - ${JSON.stringify(
            error.response.data
          )}`
        };
      }
    }
    return {
      success: false,
      siteUrl,
      data: [],
      totalRows: 0,
      startDate,
      endDate,
      error: error instanceof Error ? error.message : "Unknown GSC error"
    };
  }
}
function findLowCtrPages(gscData, minPosition = 1, maxPosition = 15, ctrThreshold = 0.05) {
  return gscData.filter(
    (page) => page.position >= minPosition && page.position <= maxPosition && page.ctr < ctrThreshold && page.impressions > 10
    // Minst 10 impressions för att vara relevant
  );
}
async function refreshGSCToken(refreshToken, clientId, clientSecret) {
  try {
    const response = await axios3__default.default.post("https://oauth2.googleapis.com/token", {
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    });
    return response.data.access_token;
  } catch (error) {
    throw new Error(
      `Failed to refresh GSC token: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
async function gscPageData(siteUrl, pageUrl, accessToken, startDate, endDate) {
  try {
    const apiUrl = `https://searchconsole.googleapis.com/v1/sites/${encodeURIComponent(
      siteUrl
    )}/searchAnalytics/query`;
    const requestBody = {
      startDate,
      endDate,
      dimensions: ["query"],
      dimensionFilterGroups: [
        {
          filters: [
            {
              dimension: "page",
              expression: pageUrl,
              operator: "equals"
            }
          ]
        }
      ],
      rowLimit: 100
    };
    const response = await axios3__default.default.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      timeout: 3e4
    });
    const rows = response.data.rows || [];
    if (rows.length === 0) {
      return null;
    }
    const topQueries = rows.map((row) => ({
      query: row.keys[0],
      clicks: row.clicks,
      impressions: row.impressions,
      ctr: row.ctr,
      position: row.position
    }));
    const totalClicks = topQueries.reduce((sum, q) => sum + q.clicks, 0);
    const totalImpressions = topQueries.reduce((sum, q) => sum + q.impressions, 0);
    const avgPosition = topQueries.reduce((sum, q) => sum + q.position, 0) / topQueries.length;
    return {
      page: pageUrl,
      clicks: totalClicks,
      impressions: totalImpressions,
      ctr: totalClicks / totalImpressions,
      position: avgPosition,
      topQueries
    };
  } catch (error) {
    console.error("Error fetching GSC page data:", error);
    return null;
  }
}
function analyzeOnPage(html, url) {
  var _a, _b;
  const $ = cheerio2__namespace.load(html);
  const issues = [];
  const title = $("title").first().text().trim();
  const titleLength = title.length;
  if (!title) {
    issues.push({
      type: "title",
      severity: "high",
      message: "Missing title tag",
      recommendation: "Add a descriptive title tag (50-60 characters)"
    });
  } else if (titleLength < 30) {
    issues.push({
      type: "title",
      severity: "medium",
      message: "Title too short",
      current: `${titleLength} characters`,
      recommendation: "Title should be 50-60 characters for optimal display"
    });
  } else if (titleLength > 70) {
    issues.push({
      type: "title",
      severity: "medium",
      message: "Title too long",
      current: `${titleLength} characters`,
      recommendation: "Title should be 50-60 characters to avoid truncation"
    });
  }
  const metaDescription = ((_a = $('meta[name="description"]').attr("content")) == null ? void 0 : _a.trim()) || "";
  const metaDescriptionLength = metaDescription.length;
  if (!metaDescription) {
    issues.push({
      type: "meta-description",
      severity: "high",
      message: "Missing meta description",
      recommendation: "Add a compelling meta description (140-160 characters)"
    });
  } else if (metaDescriptionLength < 120) {
    issues.push({
      type: "meta-description",
      severity: "medium",
      message: "Meta description too short",
      current: `${metaDescriptionLength} characters`,
      recommendation: "Meta description should be 140-160 characters"
    });
  } else if (metaDescriptionLength > 170) {
    issues.push({
      type: "meta-description",
      severity: "low",
      message: "Meta description too long",
      current: `${metaDescriptionLength} characters`,
      recommendation: "Meta description should be 140-160 characters to avoid truncation"
    });
  }
  const h1Tags = [];
  $("h1").each((_, el) => {
    const text = $(el).text().trim();
    if (text) h1Tags.push(text);
  });
  const h1Count = h1Tags.length;
  if (h1Count === 0) {
    issues.push({
      type: "h1",
      severity: "high",
      message: "Missing H1 tag",
      recommendation: "Add exactly one H1 tag that matches page intent"
    });
  } else if (h1Count > 1) {
    issues.push({
      type: "h1",
      severity: "medium",
      message: "Multiple H1 tags found",
      current: `${h1Count} H1 tags`,
      recommendation: "Use only one H1 tag per page"
    });
  }
  const canonical = (_b = $('link[rel="canonical"]').attr("href")) == null ? void 0 : _b.trim();
  if (!canonical) {
    issues.push({
      type: "canonical",
      severity: "medium",
      message: "Missing canonical tag",
      recommendation: "Add a canonical tag to prevent duplicate content issues"
    });
  }
  let totalImages = 0;
  let imagesWithAlt = 0;
  let imagesWithoutAlt = 0;
  $("img").each((_, el) => {
    totalImages++;
    const alt = $(el).attr("alt");
    if (alt !== void 0 && alt.trim() !== "") {
      imagesWithAlt++;
    } else {
      imagesWithoutAlt++;
    }
  });
  const altCoverage = totalImages > 0 ? imagesWithAlt / totalImages * 100 : 100;
  if (altCoverage < 80 && totalImages > 0) {
    issues.push({
      type: "images",
      severity: altCoverage < 50 ? "high" : "medium",
      message: "Low alt text coverage",
      current: `${altCoverage.toFixed(0)}% coverage (${imagesWithAlt}/${totalImages} images)`,
      recommendation: "Add descriptive alt text to at least 80% of images"
    });
  }
  const score = calculateOnPageScore({
    titleLength,
    metaDescriptionLength,
    h1Count,
    hasCanonical: !!canonical,
    altCoverage
  });
  return {
    title,
    titleLength,
    metaDescription,
    metaDescriptionLength,
    h1Tags,
    h1Count,
    canonical,
    totalImages,
    imagesWithAlt,
    imagesWithoutAlt,
    altCoverage: parseFloat(altCoverage.toFixed(2)),
    issues,
    score
  };
}
function calculateOnPageScore(params) {
  let score = 100;
  if (params.titleLength === 0) {
    score -= 25;
  } else if (params.titleLength < 30 || params.titleLength > 70) {
    score -= 10;
  } else if (params.titleLength >= 50 && params.titleLength <= 60) {
    score += 0;
  } else {
    score -= 5;
  }
  if (params.metaDescriptionLength === 0) {
    score -= 20;
  } else if (params.metaDescriptionLength < 120 || params.metaDescriptionLength > 170) {
    score -= 10;
  } else if (params.metaDescriptionLength >= 140 && params.metaDescriptionLength <= 160) {
    score += 0;
  } else {
    score -= 5;
  }
  if (params.h1Count === 0) {
    score -= 20;
  } else if (params.h1Count === 1) {
    score += 0;
  } else {
    score -= 10;
  }
  if (!params.hasCanonical) {
    score -= 15;
  }
  if (params.altCoverage < 50) {
    score -= 20;
  } else if (params.altCoverage < 80) {
    score -= 10;
  }
  return Math.max(0, Math.min(100, score));
}
function generateOnPageSuggestions(result, url) {
  const suggestions = [];
  for (const issue of result.issues) {
    suggestions.push({
      action: `${issue.message}${issue.recommendation ? `: ${issue.recommendation}` : ""}`,
      impact: issue.severity
    });
  }
  return suggestions;
}

// lib/seo/scoring.ts
var DEFAULT_WEIGHTS = {
  onPage: 0.4,
  vitals: 0.5,
  gsc: 0.1
};
function calculateSEOScore(onPageResult, vitals, gscMetrics, weights = DEFAULT_WEIGHTS) {
  const issues = [];
  const onPageScore = onPageResult.score;
  for (const issue of onPageResult.issues) {
    issues.push({
      category: "on-page",
      severity: issue.severity,
      message: issue.message
    });
  }
  let vitalsScore = 100;
  if (vitals) {
    if (vitals.lcp > 4) {
      vitalsScore -= 30;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`
      });
    } else if (vitals.lcp > 2.5) {
      vitalsScore -= 15;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `LCP is ${vitals.lcp.toFixed(2)}s (should be under 2.5s)`
      });
    }
    if (vitals.cls > 0.25) {
      vitalsScore -= 30;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`
      });
    } else if (vitals.cls > 0.1) {
      vitalsScore -= 15;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `CLS is ${vitals.cls.toFixed(4)} (should be under 0.1)`
      });
    }
    if (vitals.inp > 500) {
      vitalsScore -= 20;
      issues.push({
        category: "vitals",
        severity: "high",
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`
      });
    } else if (vitals.inp > 200) {
      vitalsScore -= 10;
      issues.push({
        category: "vitals",
        severity: "medium",
        message: `INP is ${vitals.inp.toFixed(0)}ms (should be under 200ms)`
      });
    }
    vitalsScore = Math.max(0, vitalsScore);
  } else {
    vitalsScore = 50;
  }
  let gscScore = 100;
  if (gscMetrics && gscMetrics.impressions > 10) {
    const expectedCtr = calculateExpectedCtr(gscMetrics.position);
    const ctrRatio = gscMetrics.ctr / expectedCtr;
    if (ctrRatio < 0.5) {
      gscScore -= 40;
      issues.push({
        category: "gsc",
        severity: "high",
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (expected ~${(expectedCtr * 100).toFixed(2)}% for position ${gscMetrics.position.toFixed(1)})`
      });
    } else if (ctrRatio < 0.8) {
      gscScore -= 20;
      issues.push({
        category: "gsc",
        severity: "medium",
        message: `CTR is ${(gscMetrics.ctr * 100).toFixed(2)}% (below expected for position ${gscMetrics.position.toFixed(1)})`
      });
    }
    if (gscMetrics.position > 10) {
      gscScore -= 30;
    } else if (gscMetrics.position > 5) {
      gscScore -= 15;
    } else if (gscMetrics.position > 3) {
      gscScore -= 5;
    }
    gscScore = Math.max(0, gscScore);
  } else {
    gscScore = 50;
  }
  const total = Math.round(
    onPageScore * weights.onPage + vitalsScore * weights.vitals + gscScore * weights.gsc
  );
  return {
    total,
    onPageScore,
    vitalsScore,
    gscScore,
    issues
  };
}
function calculateExpectedCtr(position) {
  if (position <= 1) return 0.3;
  if (position <= 2) return 0.15;
  if (position <= 3) return 0.1;
  if (position <= 5) return 0.06;
  if (position <= 10) return 0.03;
  return 0.01;
}
function calculatePriority(currentScore, previousScore, vitals, daysSinceLastCheck) {
  let priority = 0;
  priority += (100 - currentScore) * 0.5;
  if (previousScore !== null) {
    const scoreDiff = currentScore - previousScore;
    if (scoreDiff < -10) {
      priority += 30;
    } else if (scoreDiff < 0) {
      priority += 15;
    } else if (scoreDiff > 10) {
      priority -= 10;
    }
  }
  if (vitals) {
    if (vitals.lcp > 4) priority += 20;
    if (vitals.cls > 0.25) priority += 20;
    if (vitals.inp > 500) priority += 15;
  }
  if (daysSinceLastCheck > 7) {
    priority += 10;
  } else if (daysSinceLastCheck > 14) {
    priority += 20;
  }
  return Math.max(0, priority);
}
function shouldFlagPage(score, vitals, scoreDiff) {
  if (scoreDiff !== null && scoreDiff < -10) {
    return true;
  }
  if (vitals && vitals.lcp > 2.5) {
    return true;
  }
  if (vitals && vitals.cls > 0.1) {
    return true;
  }
  if (vitals && vitals.inp > 200) {
    return true;
  }
  if (score < 40) {
    return true;
  }
  return false;
}

// lib/agent/core.ts
async function runAgent(config) {
  var _a, _b, _c, _d, _e, _f;
  const startTime = Date.now();
  const errors = [];
  const flaggedPages = [];
  console.log("[Agent] Starting SEO agent run...");
  const runId = await createRun();
  console.log(`[Agent] Created run ID: ${runId}`);
  try {
    console.log("[Agent] Fetching sitemap...");
    const sitemapResult = config.sitemapUrl ? await readSitemap(config.sitemapUrl) : await discoverSitemap(config.siteUrl);
    let urlsToProcess = [];
    if (!sitemapResult.success || sitemapResult.totalUrls === 0) {
      console.warn(`[Agent] \u26A0\uFE0F Sitemap not found: ${sitemapResult.error}`);
      console.log("[Agent] Falling back to checking only the site URL");
      urlsToProcess = [config.siteUrl];
    } else {
      console.log(`[Agent] Found ${sitemapResult.totalUrls} URLs in sitemap`);
      urlsToProcess = sitemapResult.urls.map((u) => u.loc);
    }
    for (const url of urlsToProcess) {
      try {
        await upsertPage({
          url,
          last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (error) {
        console.error(`Error upserting page ${url}:`, error);
      }
    }
    console.log("[Agent] Calculating page priorities...");
    const allPages = await getAllPages();
    const pagesToCheck = await selectPagesToCheck(
      allPages,
      config.maxPagesToCheck || 20,
      config.priorityThreshold
    );
    console.log(`[Agent] Selected ${pagesToCheck.length} pages to check`);
    let totalScore = 0;
    let successCount = 0;
    for (const page of pagesToCheck) {
      console.log(`[Agent] Checking ${page.url}...`);
      try {
        const result = await checkPage(page.url, config);
        if (result.success) {
          await createAudit({
            run_id: runId,
            url: page.url,
            score: result.score,
            lcp: ((_a = result.vitals) == null ? void 0 : _a.lcp) || null,
            cls: ((_b = result.vitals) == null ? void 0 : _b.cls) || null,
            inp: ((_c = result.vitals) == null ? void 0 : _c.inp) || null,
            issues: result.issues
          });
          await updatePageMetrics(page.url, {
            senaste_score: result.score,
            senaste_lcp: (_d = result.vitals) == null ? void 0 : _d.lcp,
            senaste_cls: (_e = result.vitals) == null ? void 0 : _e.cls,
            senaste_inp: (_f = result.vitals) == null ? void 0 : _f.inp,
            last_seen_at: (/* @__PURE__ */ new Date()).toISOString()
          });
          for (const suggestion of result.suggestions) {
            await createSuggestion({
              url: page.url,
              action: suggestion.action,
              impact: suggestion.impact,
              status: "pending"
            });
          }
          totalScore += result.score;
          successCount++;
          const scoreDiff = page.lastScore ? result.score - page.lastScore : null;
          if (shouldFlagPage(result.score, result.vitals, scoreDiff)) {
            flaggedPages.push(page.url);
            console.log(`[Agent] \u26A0\uFE0F  Flagged ${page.url} (score: ${result.score})`);
          }
        } else {
          errors.push(`${page.url}: ${result.error}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 2e3));
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : "Unknown error";
        errors.push(`${page.url}: ${errorMsg}`);
        console.error(`[Agent] Error checking ${page.url}:`, error);
      }
    }
    const avgScore = successCount > 0 ? totalScore / successCount : 0;
    await updateRun(runId, {
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      pages_checked: successCount,
      avg_score: avgScore,
      status: "completed"
    });
    console.log("[Agent] Refreshing materialized views...");
    await refreshMaterializedViews();
    const duration = (Date.now() - startTime) / 1e3;
    console.log("[Agent] \u2705 Run completed successfully");
    console.log(`[Agent] Checked ${successCount} pages in ${duration.toFixed(1)}s`);
    console.log(`[Agent] Average score: ${avgScore.toFixed(1)}`);
    return {
      runId,
      pagesChecked: successCount,
      avgScore,
      errors,
      flaggedPages,
      duration
    };
  } catch (error) {
    await updateRun(runId, {
      finished_at: (/* @__PURE__ */ new Date()).toISOString(),
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error"
    });
    throw error;
  }
}
async function selectPagesToCheck(allPages, maxPages, priorityThreshold) {
  const pagesToCheck = [];
  for (const page of allPages) {
    const previousAudits = await getAuditsByUrl(page.url, 2);
    const lastScore = previousAudits.length > 0 ? previousAudits[0].score : null;
    const prevScore = previousAudits.length > 1 ? previousAudits[1].score : null;
    const daysSinceLastCheck = page.last_seen_at ? (Date.now() - new Date(page.last_seen_at).getTime()) / (1e3 * 60 * 60 * 24) : 999;
    const priority = calculatePriority(
      page.senaste_score || 50,
      prevScore,
      {
        lcp: page.senaste_lcp || 0,
        cls: page.senaste_cls || 0,
        inp: page.senaste_inp || 0
      },
      daysSinceLastCheck
    );
    if (priorityThreshold && priority < priorityThreshold) {
      continue;
    }
    pagesToCheck.push({
      url: page.url,
      priority,
      lastScore,
      daysSinceLastCheck
    });
  }
  pagesToCheck.sort((a, b) => b.priority - a.priority);
  return pagesToCheck.slice(0, maxPages);
}
async function checkPage(url, config) {
  try {
    const fetchResult = await fetchUrl({ url });
    if (!fetchResult.success || !fetchResult.html) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: fetchResult.error || "Failed to fetch HTML"
      };
    }
    const onPageResult = analyzeOnPage(fetchResult.html, url);
    const psiResult = await psiAudit(url, config.psiApiKey, "mobile");
    if (!psiResult.success) {
      return {
        success: false,
        score: 0,
        issues: {},
        suggestions: [],
        error: psiResult.error || "PSI audit failed"
      };
    }
    let gscMetrics;
    if (config.gscAccessToken && config.gscSiteUrl) {
      try {
        const endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString().split("T")[0];
        const gscData = await gscPageData(
          config.gscSiteUrl,
          url,
          config.gscAccessToken,
          startDate,
          endDate
        );
        if (gscData && gscData.impressions > 10) {
          gscMetrics = {
            ctr: gscData.ctr,
            position: gscData.position,
            impressions: gscData.impressions
          };
        }
      } catch (error) {
        console.error("GSC error (non-fatal):", error);
      }
    }
    const scoreBreakdown = calculateSEOScore(
      onPageResult,
      psiResult.vitals,
      gscMetrics
    );
    const onPageSuggestions = generateOnPageSuggestions(onPageResult, url);
    const psiSuggestions = psiResult.issues.map((issue) => ({
      action: issue.title + ": " + issue.description,
      impact: issue.impact || "medium"
    }));
    const allSuggestions = [...onPageSuggestions, ...psiSuggestions];
    return {
      success: true,
      score: scoreBreakdown.total,
      vitals: psiResult.vitals,
      issues: {
        onPage: onPageResult.issues,
        psi: psiResult.issues,
        scoreBreakdown
      },
      suggestions: allSuggestions
    };
  } catch (error) {
    return {
      success: false,
      score: 0,
      issues: {},
      suggestions: [],
      error: error instanceof Error ? error.message : "Unknown error"
    };
  }
}
async function getPageAnalytics(propertyId, pagePath, startDate, endDate, credentials) {
  var _a, _b, _c, _d;
  try {
    const analyticsData = googleapis.google.analyticsdata("v1beta");
    const auth = credentials ? new googleapis.google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    }) : new googleapis.google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    });
    const authClient = await auth.getClient();
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" }
        ],
        dimensionFilter: {
          filter: {
            fieldName: "pagePath",
            stringFilter: {
              matchType: "EXACT",
              value: pagePath
            }
          }
        }
      },
      auth: authClient
    });
    const rows = response.data.rows;
    if (!rows || rows.length === 0) {
      return null;
    }
    const row = rows[0];
    const metricValues = row.metricValues || [];
    return {
      pageviews: parseInt(((_a = metricValues[0]) == null ? void 0 : _a.value) || "0"),
      uniquePageviews: parseInt(((_b = metricValues[1]) == null ? void 0 : _b.value) || "0"),
      avgTimeOnPage: parseFloat(((_c = metricValues[2]) == null ? void 0 : _c.value) || "0"),
      bounceRate: parseFloat(((_d = metricValues[3]) == null ? void 0 : _d.value) || "0"),
      exitRate: 0,
      // GA4 beräknar inte exitRate på samma sätt
      dateRange: { startDate, endDate }
    };
  } catch (error) {
    console.error("[Analytics] Error fetching page data:", error);
    return null;
  }
}
async function getTopPages(propertyId, startDate, endDate, limit = 50, credentials) {
  try {
    const analyticsData = googleapis.google.analyticsdata("v1beta");
    const auth = credentials ? new googleapis.google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    }) : new googleapis.google.auth.GoogleAuth({
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
    });
    const authClient = await auth.getClient();
    const response = await analyticsData.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: "pagePath" }],
        metrics: [
          { name: "screenPageViews" },
          { name: "sessions" },
          { name: "averageSessionDuration" },
          { name: "bounceRate" }
        ],
        orderBys: [
          {
            metric: {
              metricName: "screenPageViews"
            },
            desc: true
          }
        ],
        limit: limit.toString()
      },
      auth: authClient
    });
    const rows = response.data.rows || [];
    return rows.map((row) => {
      var _a, _b, _c, _d, _e;
      const dimensionValues = row.dimensionValues || [];
      const metricValues = row.metricValues || [];
      return {
        pagePath: ((_a = dimensionValues[0]) == null ? void 0 : _a.value) || "",
        pageviews: parseInt(((_b = metricValues[0]) == null ? void 0 : _b.value) || "0"),
        uniquePageviews: parseInt(((_c = metricValues[1]) == null ? void 0 : _c.value) || "0"),
        avgTimeOnPage: parseFloat(((_d = metricValues[2]) == null ? void 0 : _d.value) || "0"),
        bounceRate: parseFloat(((_e = metricValues[3]) == null ? void 0 : _e.value) || "0")
      };
    });
  } catch (error) {
    console.error("[Analytics] Error fetching top pages:", error);
    return [];
  }
}
function combineGSCAndAnalytics(gscData, analyticsData) {
  var _a;
  const combined = {
    clicks: gscData.clicks,
    impressions: gscData.impressions,
    ctr: gscData.ctr,
    position: gscData.position,
    topQueries: ((_a = gscData.topQueries) == null ? void 0 : _a.slice(0, 5)) || []
  };
  if (analyticsData) {
    combined.pageviews = analyticsData.pageviews;
    combined.avgTimeOnPage = analyticsData.avgTimeOnPage;
    combined.bounceRate = analyticsData.bounceRate;
    combined.searchVsDirectRatio = analyticsData.pageviews > 0 ? gscData.clicks / analyticsData.pageviews : 0;
    const timeScore = Math.min(analyticsData.avgTimeOnPage / 180, 1);
    const bounceScore = 1 - analyticsData.bounceRate / 100;
    combined.engagementScore = (timeScore + bounceScore) / 2;
  }
  return combined;
}
var STOP_WORDS = /* @__PURE__ */ new Set([
  "och",
  "i",
  "att",
  "det",
  "som",
  "en",
  "p\xE5",
  "\xE4r",
  "f\xF6r",
  "med",
  "till",
  "av",
  "om",
  "s\xE5",
  "den",
  "men",
  "ett",
  "har",
  "de",
  "var",
  "vad",
  "kan",
  "vi",
  "inte",
  "fr\xE5n",
  "ska",
  "eller",
  "n\xE4r",
  "han",
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she"
]);
function extractKeywords(text, topN = 10) {
  const words = text.toLowerCase().replace(/[^\w\såäöéèêëàâäüûùôöîï-]/g, " ").split(/\s+/).filter((word) => word.length > 3 && !STOP_WORDS.has(word));
  const frequency = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  const sorted = Object.entries(frequency).sort(([, a], [, b]) => b - a).slice(0, topN);
  return Object.fromEntries(sorted);
}
function calculateKeywordDensity(text, keywords) {
  const words = text.toLowerCase().split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;
  const density = {};
  keywords.forEach((keyword) => {
    const count = words.filter((w) => w.includes(keyword.toLowerCase())).length;
    density[keyword] = totalWords > 0 ? count / totalWords * 100 : 0;
  });
  return density;
}
function analyzeKeywords(text, targetKeywords = []) {
  const extractedKeywords = extractKeywords(text, 15);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const totalWords = words.length;
  const results = [];
  targetKeywords.forEach((keyword) => {
    const currentCount = extractedKeywords[keyword.toLowerCase()] || 0;
    const density = totalWords > 0 ? currentCount / totalWords * 100 : 0;
    let targetDensity = 1.5;
    let suggestedCount = Math.round(totalWords * (targetDensity / 100));
    let status = "suggested";
    if (density >= 0.5 && density <= 2.5) {
      status = "optimized";
    } else if (density > 2.5) {
      status = "over_used";
      suggestedCount = Math.round(totalWords * 0.02);
    } else {
      status = "under_used";
    }
    results.push({
      keyword,
      current_count: currentCount,
      suggested_count: suggestedCount,
      density,
      target_density: targetDensity,
      relevance_score: 85,
      // Detta kan förbättras med AI
      status
    });
  });
  return results;
}
function calculateReadability(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);
  const syllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
  if (sentences.length === 0 || words.length === 0) return 0;
  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;
  return Math.max(0, Math.min(100, score));
}
function countSyllables(word) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  const vowels = /[aeiouyåäö]/g;
  const matches = word.match(vowels);
  return matches ? matches.length : 1;
}
function getReadabilityLevel(score) {
  if (score >= 90) return "Mycket l\xE4tt";
  if (score >= 80) return "L\xE4tt";
  if (score >= 70) return "Ganska l\xE4tt";
  if (score >= 60) return "Standard";
  if (score >= 50) return "Ganska sv\xE5r";
  if (score >= 30) return "Sv\xE5r";
  return "Mycket sv\xE5r";
}
function generateTitleSuggestion(originalTitle, url, keywords) {
  var _a;
  const title = originalTitle || "";
  const length = title.length;
  if (length >= 50 && length <= 60 && keywords.some((k) => title.toLowerCase().includes(k.toLowerCase()))) {
    return null;
  }
  let suggestedTitle = title;
  let reason = "";
  let impact = "medium";
  let scoreImpact = 5;
  if (length === 0) {
    const pageName = ((_a = url.split("/").pop()) == null ? void 0 : _a.replace(/[-_]/g, " ")) || "Hem";
    suggestedTitle = `${keywords[0] || pageName} | Professional Services`;
    reason = "Title saknas helt. Skapad baserat p\xE5 URL och keywords.";
    impact = "high";
    scoreImpact = 20;
  } else if (length < 50) {
    const missingKeyword = keywords.find((k) => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${title} - ${missingKeyword}`;
    }
    reason = `Title \xE4r f\xF6r kort (${length} tecken). Optimalt \xE4r 50-60 tecken.`;
    impact = "medium";
    scoreImpact = 10;
  } else if (length > 60) {
    suggestedTitle = title.substring(0, 57) + "...";
    reason = `Title \xE4r f\xF6r l\xE5ng (${length} tecken). Trunkerad till 60 tecken.`;
    impact = "medium";
    scoreImpact = 8;
  } else {
    const missingKeyword = keywords.find((k) => !title.toLowerCase().includes(k.toLowerCase()));
    if (missingKeyword) {
      suggestedTitle = `${missingKeyword} | ${title}`.substring(0, 60);
      reason = "Title saknar huvudnyckelord. Lagt till f\xF6r b\xE4ttre ranking.";
      impact = "high";
      scoreImpact = 15;
    } else {
      return null;
    }
  }
  return {
    section_type: "title",
    section_identifier: "title",
    original_text: title,
    suggested_text: suggestedTitle,
    keywords: keywords.filter((k) => suggestedTitle.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedTitle, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: 100
    // Titles är enkla
  };
}
function generateMetaDescriptionSuggestion(originalDesc, pageContent, keywords) {
  const desc = originalDesc || "";
  const length = desc.length;
  if (length >= 140 && length <= 160 && keywords.some((k) => desc.toLowerCase().includes(k.toLowerCase())) && /läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
    return null;
  }
  let suggestedDesc = desc;
  let reason = "";
  let impact = "medium";
  let scoreImpact = 5;
  if (length === 0) {
    const firstParagraph = pageContent.split(".")[0] || "";
    const keywordPhrase = keywords.slice(0, 2).join(" och ");
    suggestedDesc = `Uppt\xE4ck ${keywordPhrase}. ${firstParagraph.substring(0, 100)}... L\xE4s mer h\xE4r!`;
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = "Meta description saknas. Skapad fr\xE5n sidinneh\xE5ll med keywords och CTA.";
    impact = "high";
    scoreImpact = 20;
  } else if (length < 140) {
    const missingKeywords = keywords.filter((k) => !desc.toLowerCase().includes(k.toLowerCase()));
    if (missingKeywords.length > 0) {
      suggestedDesc = `${desc} Inkluderar ${missingKeywords[0]}. L\xE4s mer!`;
    } else {
      suggestedDesc = `${desc} L\xE4s mer h\xE4r!`;
    }
    suggestedDesc = suggestedDesc.substring(0, 160);
    reason = `Meta description \xE4r f\xF6r kort (${length} tecken). Ut\xF6kad till 140-160 tecken med CTA.`;
    impact = "medium";
    scoreImpact = 12;
  } else if (length > 160) {
    keywords.find((k) => desc.toLowerCase().includes(k.toLowerCase())) || "";
    suggestedDesc = desc.substring(0, 145) + "... L\xE4s mer!";
    reason = `Meta description \xE4r f\xF6r l\xE5ng (${length} tecken). Kortad till 160 tecken.`;
    impact = "medium";
    scoreImpact = 8;
  } else {
    if (!/läs mer|kontakta|upptäck|läs|se|besök|köp/i.test(desc)) {
      suggestedDesc = desc.substring(0, 145) + " L\xE4s mer!";
      reason = "Lagt till call-to-action f\xF6r b\xE4ttre CTR.";
      impact = "low";
      scoreImpact = 5;
    }
  }
  return {
    section_type: "meta_description",
    section_identifier: 'meta[name="description"]',
    original_text: desc,
    suggested_text: suggestedDesc,
    keywords: keywords.filter((k) => suggestedDesc.toLowerCase().includes(k.toLowerCase())),
    keyword_density: calculateKeywordDensity(suggestedDesc, keywords),
    reason,
    impact,
    seo_score_impact: scoreImpact,
    readability_score: calculateReadability(suggestedDesc)
  };
}
function generateHeadingSuggestion(headingLevel, originalText, keywords, index) {
  const text = originalText.trim();
  if (headingLevel === "h1") {
    if (!keywords.some((k) => text.toLowerCase().includes(k.toLowerCase()))) {
      const suggestedText = `${keywords[0]}: ${text}`;
      return {
        section_type: "h1",
        section_identifier: `h1:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: suggestedText,
        keywords: [keywords[0]],
        keyword_density: calculateKeywordDensity(suggestedText, keywords),
        reason: "H1 saknar huvudnyckelord. Detta \xE4r kritiskt f\xF6r SEO.",
        impact: "high",
        seo_score_impact: 15,
        readability_score: calculateReadability(suggestedText)
      };
    }
  }
  if (text.length < 20) {
    const relevantKeyword = keywords.find((k) => !text.toLowerCase().includes(k.toLowerCase()));
    if (relevantKeyword) {
      return {
        section_type: headingLevel,
        section_identifier: `${headingLevel}:nth-of-type(${index + 1})`,
        original_text: text,
        suggested_text: `${text} - ${relevantKeyword}`,
        keywords: [relevantKeyword],
        keyword_density: calculateKeywordDensity(`${text} - ${relevantKeyword}`, keywords),
        reason: `${headingLevel.toUpperCase()} \xE4r f\xF6r kort. Lagt till nyckelord f\xF6r kontext.`,
        impact: "low",
        seo_score_impact: 3,
        readability_score: 90
      };
    }
  }
  return null;
}
async function analyzePageContent(html, url) {
  const $ = cheerio2__namespace.load(html);
  $("script, style, noscript").remove();
  const bodyText = $("body").text().trim();
  const words = bodyText.split(/\s+/).filter((w) => w.length > 0);
  const sentences = bodyText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const headingStructure = [];
  $("h1, h2, h3, h4, h5, h6").each((i, elem) => {
    headingStructure.push({
      level: elem.tagName,
      text: $(elem).text().trim(),
      index: i
    });
  });
  const paragraphCount = $("p").length;
  const topKeywords = extractKeywords(bodyText, 20);
  const keywordDensity = calculateKeywordDensity(bodyText, Object.keys(topKeywords).slice(0, 10));
  const readabilityScore = calculateReadability(bodyText);
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / Math.max(words.length, 1);
  let contentScore = 70;
  if (words.length < 300) contentScore -= 20;
  if (headingStructure.length === 0) contentScore -= 15;
  if (paragraphCount < 3) contentScore -= 10;
  if (readabilityScore < 50) contentScore -= 10;
  const improvementAreas = [];
  if (words.length < 300) improvementAreas.push("L\xE4gg till mer inneh\xE5ll (minst 300 ord)");
  if (headingStructure.length === 0) improvementAreas.push("L\xE4gg till rubriker (H1-H4)");
  if (paragraphCount < 3) improvementAreas.push("Dela upp text i fler paragrafer");
  if (readabilityScore < 50) improvementAreas.push("F\xF6renkla spr\xE5ket f\xF6r b\xE4ttre l\xE4sbarhet");
  if (avgSentenceLength > 25) improvementAreas.push("Korta ner meningarna");
  return {
    url,
    heading_structure: headingStructure,
    paragraph_count: paragraphCount,
    word_count: words.length,
    char_count: bodyText.length,
    readability_score: readabilityScore,
    avg_sentence_length: avgSentenceLength,
    avg_word_length: avgWordLength,
    top_keywords: topKeywords,
    keyword_density: keywordDensity,
    missing_keywords: [],
    // Detta kan förbättras med konkurrenssanalys
    sentiment_score: 0.5,
    // Neutral - kan förbättras med sentiment analysis
    tone: avgWordLength > 6 ? "professional" : "casual",
    content_score: Math.max(0, Math.min(100, contentScore)),
    improvement_areas: improvementAreas
  };
}
async function generateAllSuggestions(html, url, targetKeywords = []) {
  const $ = cheerio2__namespace.load(html);
  const suggestions = [];
  const bodyText = $("body").text();
  const keywords = targetKeywords.length > 0 ? targetKeywords : Object.keys(extractKeywords(bodyText, 5));
  const title = $("title").text();
  const titleSuggestion = generateTitleSuggestion(title, url, keywords);
  if (titleSuggestion) suggestions.push(titleSuggestion);
  const metaDesc = $('meta[name="description"]').attr("content") || null;
  const descSuggestion = generateMetaDescriptionSuggestion(metaDesc, bodyText, keywords);
  if (descSuggestion) suggestions.push(descSuggestion);
  $("h1").each((i, elem) => {
    const h1Suggestion = generateHeadingSuggestion("h1", $(elem).text(), keywords, i);
    if (h1Suggestion) suggestions.push(h1Suggestion);
  });
  $("h2").slice(0, 5).each((i, elem) => {
    const h2Suggestion = generateHeadingSuggestion("h2", $(elem).text(), keywords, i);
    if (h2Suggestion) suggestions.push(h2Suggestion);
  });
  $("h3").slice(0, 3).each((i, elem) => {
    const h3Suggestion = generateHeadingSuggestion("h3", $(elem).text(), keywords, i);
    if (h3Suggestion) suggestions.push(h3Suggestion);
  });
  return suggestions;
}
var FETCHSERP_API_URL = "https://www.fetchserp.com";
var FetchSERPClient = class {
  constructor(config) {
    this.client = axios3__default.default.create({
      baseURL: FETCHSERP_API_URL,
      headers: {
        "Authorization": `Bearer ${config.apiToken}`,
        "Content-Type": "application/json"
      }
    });
  }
  // ==================== SERP Endpoints ====================
  /**
   * Get structured SERP results
   */
  async getSERP(params) {
    const response = await this.client.get("/api/v1/serp", { params });
    return response.data;
  }
  /**
   * Get SERP results with full HTML
   */
  async getSERPHTML(params) {
    const response = await this.client.get("/api/v1/serp_html", { params });
    return response.data;
  }
  /**
   * Get SERP results with extracted text
   */
  async getSERPText(params) {
    const response = await this.client.get("/api/v1/serp_text", { params });
    return response.data;
  }
  /**
   * Get JavaScript-rendered SERP with AI Overview
   */
  async getSERPJS(params) {
    const response = await this.client.get("/api/v1/serp_js", { params });
    return response.data;
  }
  /**
   * Get AI Overview and AI Mode results
   */
  async getSERPAI(params) {
    const response = await this.client.get("/api/v1/serp_ai", { params });
    return response.data;
  }
  /**
   * Get cached US-only AI Mode results
   */
  async getSERPAIMode(params) {
    const response = await this.client.get("/api/v1/serp_ai_mode", { params });
    return response.data;
  }
  // ==================== Keyword Research Endpoints ====================
  /**
   * Get monthly search volume and competition metrics
   */
  async getKeywordsSearchVolume(params) {
    const response = await this.client.post("/api/v1/keywords_search_volume", params);
    return response.data;
  }
  /**
   * Get keyword suggestions with metrics
   */
  async getKeywordsSuggestions(params) {
    const response = await this.client.get("/api/v1/keywords_suggestions", { params });
    return response.data;
  }
  /**
   * Generate long-tail keyword variations
   */
  async getLongTailKeywords(params) {
    const response = await this.client.get("/api/v1/long_tail_keywords_generator", { params });
    return response.data;
  }
  // ==================== Domain Analysis Endpoints ====================
  /**
   * Get domain ranking for specific keywords
   */
  async getDomainRanking(params) {
    const response = await this.client.get("/api/v1/ranking", { params });
    return response.data;
  }
  /**
   * Get backlink data for a domain
   */
  async getBacklinks(params) {
    const response = await this.client.get("/api/v1/backlinks", { params });
    return response.data;
  }
  /**
   * Get DNS, WHOIS, and tech stack information
   */
  async getDomainInfo(params) {
    const response = await this.client.get("/api/v1/domain_infos", { params });
    return response.data;
  }
  /**
   * Extract emails from SERP results
   */
  async getDomainEmails(params) {
    const response = await this.client.get("/api/v1/domain_emails", { params });
    return response.data;
  }
  /**
   * Get Moz domain authority metrics
   */
  async getMozMetrics(params) {
    const response = await this.client.get("/api/v1/moz", { params });
    return response.data;
  }
  /**
   * Check page indexation status
   */
  async getPageIndexation(params) {
    const response = await this.client.get("/api/v1/page_indexation", { params });
    return response.data;
  }
  // ==================== Web Scraping Endpoints ====================
  /**
   * Get raw HTML without JavaScript
   */
  async scrape(params) {
    const response = await this.client.post("/api/v1/scrape", params);
    return response.data;
  }
  /**
   * Custom JavaScript extraction
   */
  async scrapeJS(params) {
    const response = await this.client.post("/api/v1/scrape_js", params);
    return response.data;
  }
  /**
   * JS extraction through proxy
   */
  async scrapeJSWithProxy(params) {
    const response = await this.client.post("/api/v1/scrape_js_with_proxy", params);
    return response.data;
  }
  /**
   * Crawl entire domain
   */
  async scrapeDomain(params) {
    const response = await this.client.post("/api/v1/scrape_domain", params);
    return response.data;
  }
  // ==================== Analysis Endpoints ====================
  /**
   * Technical & on-page SEO audit
   */
  async analyzeSEO(params) {
    const response = await this.client.post("/api/v1/web_page_seo_analysis", params);
    return response.data;
  }
  /**
   * AI-powered content analysis
   */
  async analyzeWithAI(params) {
    const response = await this.client.post("/api/v1/web_page_ai_analysis", params);
    return response.data;
  }
  // ==================== User Endpoints ====================
  /**
   * Get current user information
   */
  async getUser() {
    const response = await this.client.get("/api/v1/user");
    return response.data;
  }
};
var fetchSERPClient = null;
function getFetchSERPClient() {
  if (!fetchSERPClient) {
    const apiToken = process.env.FETCHSERP_API_TOKEN;
    if (!apiToken) {
      throw new Error("FETCHSERP_API_TOKEN is not defined in environment variables");
    }
    fetchSERPClient = new FetchSERPClient({ apiToken });
  }
  return fetchSERPClient;
}

exports.AIAnalysis = AIAnalysis;
exports.Alert = Alert;
exports.AlertDescription = AlertDescription;
exports.AlertTitle = AlertTitle;
exports.Badge = Badge;
exports.Button = Button;
exports.Card = Card;
exports.CardAction = CardAction;
exports.CardContent = CardContent;
exports.CardDescription = CardDescription;
exports.CardFooter = CardFooter;
exports.CardHeader = CardHeader;
exports.CardTitle = CardTitle;
exports.Dashboard = Dashboard;
exports.Dialog = Dialog;
exports.DialogClose = DialogClose;
exports.DialogContent = DialogContent;
exports.DialogDescription = DialogDescription;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DialogOverlay = DialogOverlay;
exports.DialogPortal = DialogPortal;
exports.DialogTitle = DialogTitle;
exports.DialogTrigger = DialogTrigger;
exports.ExportData = ExportData;
exports.FetchSERPClient = FetchSERPClient;
exports.Input = Input;
exports.Label = Label;
exports.Progress = Progress;
exports.RecentRuns = RecentRuns;
exports.RunAgent = RunAgent;
exports.SEOTasks = SEOTasks;
exports.ScoreOverview = ScoreOverview;
exports.ScrollArea = ScrollArea;
exports.ScrollBar = ScrollBar;
exports.Select = Select;
exports.SelectContent = SelectContent;
exports.SelectGroup = SelectGroup;
exports.SelectItem = SelectItem;
exports.SelectLabel = SelectLabel;
exports.SelectScrollDownButton = SelectScrollDownButton;
exports.SelectScrollUpButton = SelectScrollUpButton;
exports.SelectSeparator = SelectSeparator;
exports.SelectTrigger = SelectTrigger;
exports.SelectValue = SelectValue;
exports.Separator = Separator;
exports.Settings = Settings;
exports.Sidebar = Sidebar;
exports.Skeleton = Skeleton;
exports.SuggestionsList = SuggestionsList;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableCaption = TableCaption;
exports.TableCell = TableCell;
exports.TableFooter = TableFooter;
exports.TableHead = TableHead;
exports.TableHeader = TableHeader;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TabsContent = TabsContent;
exports.TabsList = TabsList;
exports.TabsTrigger = TabsTrigger;
exports.TextSuggestions = TextSuggestions;
exports.Textarea = Textarea;
exports.analyzeKeywords = analyzeKeywords;
exports.analyzeOnPage = analyzeOnPage;
exports.analyzePageContent = analyzePageContent;
exports.analyzePageWithAI = analyzePageWithAI;
exports.badgeVariants = badgeVariants;
exports.batchInsertGSCDaily = batchInsertGSCDaily;
exports.buttonVariants = buttonVariants;
exports.calculateKeywordDensity = calculateKeywordDensity;
exports.calculatePriority = calculatePriority;
exports.calculateReadability = calculateReadability;
exports.calculateSEOScore = calculateSEOScore;
exports.combineGSCAndAnalytics = combineGSCAndAnalytics;
exports.createAIAnalysis = createAIAnalysis;
exports.createAnonClient = createAnonClient;
exports.createAudit = createAudit;
exports.createContentVersion = createContentVersion;
exports.createRun = createRun;
exports.createSuggestion = createSuggestion;
exports.createTask = createTask;
exports.discoverSitemap = discoverSitemap;
exports.extractKeywords = extractKeywords;
exports.fetchUrl = fetchUrl;
exports.fetchUrlBatch = fetchUrlBatch;
exports.findLowCtrPages = findLowCtrPages;
exports.findSitemapsInRobotsTxt = findSitemapsInRobotsTxt;
exports.generateAllSuggestions = generateAllSuggestions;
exports.generateContentSuggestions = generateContentSuggestions;
exports.generateHeadingSuggestion = generateHeadingSuggestion;
exports.generateMetaDescriptionSuggestion = generateMetaDescriptionSuggestion;
exports.generateOnPageSuggestions = generateOnPageSuggestions;
exports.generateSchemaMarkup = generateSchemaMarkup;
exports.generateTitleSuggestion = generateTitleSuggestion;
exports.getAIAnalysesByPageId = getAIAnalysesByPageId;
exports.getActiveTasksThisWeek = getActiveTasksThisWeek;
exports.getAllPages = getAllPages;
exports.getAuditsByRun = getAuditsByRun;
exports.getAuditsByUrl = getAuditsByUrl;
exports.getContentVersionsByPageId = getContentVersionsByPageId;
exports.getFetchSERPClient = getFetchSERPClient;
exports.getGSCDataByUrl = getGSCDataByUrl;
exports.getLatestAudits = getLatestAudits;
exports.getPageAnalytics = getPageAnalytics;
exports.getPageByUrl = getPageByUrl;
exports.getPagesWithLowScore = getPagesWithLowScore;
exports.getPendingAISuggestions = getPendingAISuggestions;
exports.getReadabilityLevel = getReadabilityLevel;
exports.getRecentRuns = getRecentRuns;
exports.getSuggestions = getSuggestions;
exports.getTasksByPageId = getTasksByPageId;
exports.getTopPages = getTopPages;
exports.getTopSuggestions = getTopSuggestions;
exports.getWorstPagesWeek = getWorstPagesWeek;
exports.gscPageData = gscPageData;
exports.gscTopQueries = gscTopQueries;
exports.psiAudit = psiAudit;
exports.psiAuditBatch = psiAuditBatch;
exports.readSitemap = readSitemap;
exports.refreshGSCToken = refreshGSCToken;
exports.refreshMaterializedViews = refreshMaterializedViews;
exports.runAgent = runAgent;
exports.runRetentionCleanup = runRetentionCleanup;
exports.shouldFlagPage = shouldFlagPage;
exports.supabase = supabase;
exports.updatePageMetrics = updatePageMetrics;
exports.updateRun = updateRun;
exports.updateSuggestionStatus = updateSuggestionStatus;
exports.updateTask = updateTask;
exports.upsertGSCDaily = upsertGSCDaily;
exports.upsertPage = upsertPage;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map