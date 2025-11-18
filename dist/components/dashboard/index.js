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

exports.AIAnalysis = AIAnalysis;
exports.Dashboard = Dashboard;
exports.ExportData = ExportData;
exports.RecentRuns = RecentRuns;
exports.RunAgent = RunAgent;
exports.SEOTasks = SEOTasks;
exports.ScoreOverview = ScoreOverview;
exports.Settings = Settings;
exports.Sidebar = Sidebar;
exports.SuggestionsList = SuggestionsList;
exports.TextSuggestions = TextSuggestions;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map