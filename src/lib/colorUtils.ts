import { ColorConfig } from "./types";

export function hexToHSL(hex: string) {
  hex = hex.replace("#", "");

  const hasAlpha = hex.length === 8; // 8 characters for #RRGGBBAA
  let alpha = 1;

  if (hasAlpha) {
    alpha = parseInt(hex.substring(6, 8), 16) / 255;
  }

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }
    h *= 60;
  }

  return {
    hue: Math.round(h),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
    alpha: alpha ?? 1,
  };
}

export const rgbToHSL = (r: number, g: number, b: number): ColorConfig => {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    lightness: Math.round(l * 100),
    alpha: 1,
  };
};


export function hslToHex(h: number, s: number, l: number, a: number): string {
  h = ((h % 360) + 360) % 360; // Ensure hue is between 0-359
  s = Math.min(Math.max(s, 0), 100);
  l = Math.min(Math.max(l, 0), 100);
  a = Math.min(Math.max(a, 0), 1);
  l /= 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color =
      l -
      a *
        (s / 100) *
        Math.min(l, 1 - l) *
        Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hslToRGB = ({ hue, saturation, lightness, alpha }: ColorConfig) => {
  const s = saturation / 100;
  const l = lightness / 100;
  const k = (n: number) => (n + hue / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4)),
  };
};

export const parseToHSL = (color: string): ColorConfig | null => {
  const hslFunctionRegex =
    /^(?:hsl|hsla)\(\s*([\d.-]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?))?\s*\)$/i;
  const rgbFunctionRegex =
    /^(?:rgb|rgba)\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?))?\s*\)$/i;
  const hexRegex = /^#?([a-fA-F0-9]{3,8})$/i;

  let match;
  if ((match = color.match(hslFunctionRegex))) {
    return {
      hue: parseFloat(match[1]),
      saturation: parseFloat(match[2]),
      lightness: parseFloat(match[3]),
      alpha: match[4]
        ? match[4].endsWith("%")
          ? parseFloat(match[4]) / 100
          : parseFloat(match[4])
        : 1,
    };
  } else if ((match = color.match(rgbFunctionRegex))) {
    const r = parseFloat(match[1]);
    const g = parseFloat(match[2]);
    const b = parseFloat(match[3]);
    return rgbToHSL(r, g, b);
  } else if ((match = color.match(hexRegex))) {
    return hexToHSL(color);
  } else {
    return null;
  }
};

export const convertColor = (
  color: string,
  outputFormat: "hex" | "rgb" | "rgba" | "hsl" | "hsla"
): string | null => {
  const hsl = parseToHSL(color);
  if (!hsl) return null;

  switch (outputFormat) {
    case "hex":
      return hslToHex(hsl.hue, hsl.saturation, hsl.lightness, hsl.alpha ?? 1);
    case "rgb":
      const { r, g, b } = hslToRGB(hsl);
      return `rgb(${r}, ${g}, ${b})`;
    case "rgba":
      const rgba = hslToRGB(hsl);
      return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${hsl.alpha})`;
    case "hsl":
      return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
    case "hsla":
      return `hsla(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%, ${hsl.alpha})`;
    default:
      return null;
  }
};




export const defaults: Record<string, ColorConfig> = {
  background: { hue: 26, saturation: 88, lightness: 95, alpha: 1 },
  foreground: { hue: 26, saturation: 5, lightness: 10, alpha: 1 },
  primary: { hue: 26, saturation: 95, lightness: 44, alpha: 1 },
  "primary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  secondary: { hue: 26, saturation: 30, lightness: 70, alpha: 1 },
  "secondary-foreground": { hue: 0, saturation: 0, lightness: 0, alpha: 1 },
  accent: { hue: -12, saturation: 30, lightness: 80, alpha: 1 },
  "accent-foreground": { hue: 26, saturation: 5, lightness: 15, alpha: 1 },
  card: { hue: 26, saturation: 50, lightness: 90, alpha: 1 },
  "card-foreground": { hue: 26, saturation: 5, lightness: 15, alpha: 1 },
  popover: { hue: 26, saturation: 88, lightness: 95, alpha: 1 },
  "popover-foreground": { hue: 26, saturation: 95, lightness: 10, alpha: 1 },
  muted: { hue: -12, saturation: 30, lightness: 85, alpha: 1 },
  "muted-foreground": { hue: 26, saturation: 5, lightness: 35, alpha: 1 },
  destructive: { hue: 0, saturation: 88, lightness: 30, alpha: 1 },
  "destructive-foreground": { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  border: { hue: 26, saturation: 30, lightness: 50, alpha: 1 },
  input: { hue: 26, saturation: 30, lightness: 29, alpha: 1 },
  ring: { hue: 26, saturation: 95, lightness: 44, alpha: 1 },
  "chart-1": { hue: 26, saturation: 95, lightness: 44, alpha: 1 }, // Primary
  "chart-2": { hue: -12, saturation: 70, lightness: 45, alpha: 1 }, // Darker accent for visibility
  "chart-3": { hue: 26, saturation: 70, lightness: 35, alpha: 1 }, // Darker warm tone
  "chart-4": { hue: 38, saturation: 95, lightness: 40, alpha: 1 }, // Darker gold
  "chart-5": { hue: 14, saturation: 95, lightness: 40, alpha: 1 }, // Darker terracotta
};

export const defaultsDark: Record<string, ColorConfig> = {
  background: { hue: 26, saturation: 50, lightness: 10, alpha: 1 },
  foreground: { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  primary: { hue: 26, saturation: 95, lightness: 44, alpha: 1 },
  "primary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  secondary: { hue: 26, saturation: 30, lightness: 20, alpha: 1 },
  "secondary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  accent: { hue: -12, saturation: 30, lightness: 25, alpha: 1 },
  "accent-foreground": { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  card: { hue: 26, saturation: 50, lightness: 10, alpha: 1 },
  "card-foreground": { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  popover: { hue: 26, saturation: 50, lightness: 5, alpha: 1 },
  "popover-foreground": { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  muted: { hue: -12, saturation: 30, lightness: 25, alpha: 1 },
  "muted-foreground": { hue: 26, saturation: 5, lightness: 60, alpha: 1 },
  destructive: { hue: 0, saturation: 88, lightness: 30, alpha: 1 },
  "destructive-foreground": { hue: 26, saturation: 5, lightness: 90, alpha: 1 },
  border: { hue: 26, saturation: 30, lightness: 29, alpha: 1 },
  input: { hue: 26, saturation: 30, lightness: 29, alpha: 1 },
  ring: { hue: 26, saturation: 95, lightness: 44, alpha: 1 },
  "chart-1": { hue: 26, saturation: 95, lightness: 44, alpha: 1 }, // Primary
  "chart-2": { hue: -12, saturation: 30, lightness: 25, alpha: 1 }, // Accent
  "chart-3": { hue: 26, saturation: 30, lightness: 20, alpha: 1 }, // Secondary
  "chart-4": { hue: 38, saturation: 95, lightness: 44, alpha: 1 }, // Warm gold variation
  "chart-5": { hue: 14, saturation: 95, lightness: 44, alpha: 1 }, // Warm terracotta variation
};

export const generateThemeColorsFromPrimary = (
  baseHue: number,
  isDarkMode: boolean
): Record<string, ColorConfig> => {
  const offsetHue = (baseHue - 38 + 360) % 360;

  return {
    background: {
      hue: baseHue,
      saturation: isDarkMode ? 50 : 92,
      lightness: isDarkMode ? 10 : 95,
      alpha: 1,
    },
    foreground: {
      hue: baseHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 10,
      alpha: 1,
    },
    card: {
      hue: baseHue,
      saturation: 50,
      lightness: isDarkMode ? 10 : 90,
      alpha: 1,
    },
    "card-foreground": {
      hue: baseHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 15,
      alpha: 1,
    },
    popover: {
      hue: baseHue,
      saturation: isDarkMode ? 50 : 92,
      lightness: isDarkMode ? 5 : 95,
      alpha: 1,
    },
    "popover-foreground": {
      hue: baseHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 10,
      alpha: 1,
    },
    primary: {
      hue: baseHue,
      saturation: 86,
      lightness: 27,
      alpha: 1,
    },
    "primary-foreground": {
      hue: 0,
      saturation: 0,
      lightness: 100,
      alpha: 1,
    },
    secondary: {
      hue: baseHue,
      saturation: 30,
      lightness: isDarkMode ? 20 : 70,
      alpha: 1,
    },
    "secondary-foreground": {
      hue: 0,
      saturation: 0,
      lightness: isDarkMode ? 100 : 0,
      alpha: 1,
    },
    muted: {
      hue: offsetHue,
      saturation: 30,
      lightness: isDarkMode ? 25 : 85,
      alpha: 1,
    },
    "muted-foreground": {
      hue: baseHue,
      saturation: 5,
      lightness: isDarkMode ? 60 : 36,
      alpha: 1,
    },
    accent: {
      hue: offsetHue,
      saturation: 30,
      lightness: isDarkMode ? 25 : 80,
      alpha: 1,
    },
    "accent-foreground": {
      hue: baseHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 15,
      alpha: 1,
    },
    destructive: {
      hue: 0,
      saturation: 92,
      lightness: 36,
      alpha: 1,
    },
    "destructive-foreground": {
      hue: baseHue,
      saturation: 5,
      lightness: 90,
      alpha: 1,
    },
    border: {
      hue: baseHue,
      saturation: 30,
      lightness: isDarkMode ? 36 : 50,
      alpha: 1,
    },
    input: {
      hue: baseHue,
      saturation: 30,
      lightness: 36,
      alpha: 1,
    },
    ring: {
      hue: baseHue,
      saturation: 86,
      lightness: 27,
      alpha: 1,
    },
  };
};


export const tailwindColorPalette = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
};

export const generateChartColorsFromPrimary = (
  baseHue: number,
  isDarkMode: boolean
): Record<string, ColorConfig> => {
  const chartColors: Record<string, ColorConfig> = {};
  const lightness = isDarkMode ? 30 : 70;
  const saturation = 80;

  for (let i = 0; i < 5; i++) {
    chartColors[`chartColor${i + 1}`] = {
      hue: (baseHue + i * 30) % 360,
      saturation: saturation,
      lightness: lightness,
      alpha: 1,
    };
  }

  return chartColors;
};