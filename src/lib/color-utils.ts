import { ColorConfig, OKLCHConfig } from "./types";
import { formatHsl, formatCss, oklch, hsl, formatHex } from "culori";

export function hexToHSL(hex: string) {
  hex = hex.replace("#", "");

  const hasAlpha = hex.length === 8;
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
    h /= 6;
  }

  return {
    hue: h * 360,
    saturation: s * 100,
    lightness: l * 100,
    alpha: alpha,
  };
}

export const rgbToHSL = (r: number, g: number, b: number): ColorConfig => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    if (max === r) {
      h = (g - b) / delta + (g < b ? 6 : 0);
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }

    h /= 6;
  }

  return {
    hue: h * 360,
    saturation: s * 100,
    lightness: l * 100,
    alpha: 1,
  };
};

export function hslToHex(
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number = 1
): string {
  const { r, g, b } = hslToRGB({ hue, saturation, lightness, alpha });

  const toHex = (x: number) => {
    const hex = Math.round(x).toString(16).padStart(2, "0");
    return hex;
  };

  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  if (alpha < 1) {
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `${hex}${alphaHex}`;
  }
  return hex;
}

export const hslToRGB = ({
  hue,
  saturation,
  lightness,
}: ColorConfig): { r: number; g: number; b: number } => {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l * 255; // Achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3) * 255;
    g = hue2rgb(p, q, h) * 255;
    b = hue2rgb(p, q, h - 1 / 3) * 255;
  }

  return { r, g, b };
};

export function parseToHSL(color: string): {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
} | null {
  const hslFunctionRegex =
    /^(?:hsl|hsla)\(\s*([\d.-]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?))?\s*\)$/i;
  const hslSpaceRegex =
    /^([\d.-]+)(?:deg)?\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.]+%?))?$/i;
  const hexRegex = /^#?([a-fA-F0-9]{3,8})$/i;
  const rgbFunctionRegex =
    /^(?:rgb|rgba)\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?))?\s*\)$/i;

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
  } else if ((match = color.match(hslSpaceRegex))) {
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
  } else if ((match = color.match(hexRegex))) {
    return hexToHSL(color);
  } else if ((match = color.match(rgbFunctionRegex))) {
    const r = parseFloat(match[1]);
    const g = parseFloat(match[2]);
    const b = parseFloat(match[3]);
    const alpha = match[4]
      ? match[4].endsWith("%")
        ? parseFloat(match[4]) / 100
        : parseFloat(match[4])
      : 1;
    return { ...rgbToHSL(r, g, b), alpha };
  } else {
    return null;
  }
}

export function convertColor(
  color: string,
  outputFormat: "hex" | "rgb" | "rgba" | "hsl" | "hsla" | "custom"
): string | null {
  const hsl = parseToHSL(color);
  if (!hsl) return null;

  switch (outputFormat) {
    case "hex":
      return hslToHex(hsl.hue, hsl.saturation, hsl.lightness, hsl.alpha);
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
    case "custom":
      return (hsl.alpha ?? 1) < 1
        ? `--primary: ${hsl.hue} ${hsl.saturation}% ${hsl.lightness}% ${hsl.alpha};`
        : `--primary: ${hsl.hue} ${hsl.saturation}% ${hsl.lightness}%;`;
    default:
      return null;
  }
}

export function getCSSVariable(varName: string): string {
  const computedStyle = getComputedStyle(document.documentElement);
  return computedStyle.getPropertyValue(varName).trim();
}

export const defaults: Record<string, ColorConfig> = {
  background: { hue: 303, saturation: 92, lightness: 95, alpha: 1 },
  foreground: { hue: 303, saturation: 5, lightness: 10, alpha: 1 },
  primary: { hue: 303, saturation: 88, lightness: 40, alpha: 1 },
  "primary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  secondary: { hue: 303, saturation: 30, lightness: 70, alpha: 1 },
  "secondary-foreground": { hue: 0, saturation: 0, lightness: 0, alpha: 1 },
  accent: { hue: 265, saturation: 30, lightness: 80, alpha: 1 },
  "accent-foreground": { hue: 303, saturation: 5, lightness: 15, alpha: 1 },
  card: { hue: 303, saturation: 50, lightness: 90, alpha: 1 },
  "card-foreground": { hue: 303, saturation: 5, lightness: 15, alpha: 1 },
  popover: { hue: 303, saturation: 92, lightness: 95, alpha: 1 },
  "popover-foreground": { hue: 303, saturation: 95, lightness: 10, alpha: 1 },
  muted: { hue: 265, saturation: 30, lightness: 85, alpha: 1 },
  "muted-foreground": { hue: 303, saturation: 5, lightness: 40, alpha: 1 },
  destructive: { hue: 0, saturation: 92, lightness: 50, alpha: 1 },
  "destructive-foreground": {
    hue: 303,
    saturation: 5,
    lightness: 90,
    alpha: 1,
  },
  border: { hue: 303, saturation: 30, lightness: 60, alpha: 1 },
  input: { hue: 303, saturation: 30, lightness: 50, alpha: 1 },
  ring: { hue: 303, saturation: 88, lightness: 40, alpha: 1 },

  success: { hue: 120, saturation: 60, lightness: 50, alpha: 1 },
  "success-foreground": { hue: 120, saturation: 20, lightness: 90, alpha: 1 },
  warning: { hue: 45, saturation: 100, lightness: 50, alpha: 1 },
  "warning-foreground": { hue: 45, saturation: 100, lightness: 20, alpha: 1 },
  info: { hue: 200, saturation: 100, lightness: 50, alpha: 1 },
  "info-foreground": { hue: 200, saturation: 100, lightness: 90, alpha: 1 },

  // Slight variations for chart colors
  "chart-1": { hue: 303, saturation: 85, lightness: 45, alpha: 1 }, // Slightly less saturated primary
  "chart-2": { hue: 265, saturation: 40, lightness: 75, alpha: 1 }, // Slightly more saturated accent
  "chart-3": { hue: 310, saturation: 88, lightness: 35, alpha: 1 }, // Variant of primary with hue shift
  "chart-4": { hue: 64, saturation: 80, lightness: 40, alpha: 1 }, // Slightly lighter complementary
  "chart-5": { hue: 305, saturation: 85, lightness: 40, alpha: 1 }, // Adjusted offset with hue change
  
  // Sidebar colors (light mode)
  sidebar: { hue: 0, saturation: 0, lightness: 98.5, alpha: 1 },
  "sidebar-foreground": { hue: 0, saturation: 0, lightness: 14.5, alpha: 1 },
  "sidebar-primary": { hue: 0, saturation: 0, lightness: 20.5, alpha: 1 },
  "sidebar-primary-foreground": { hue: 0, saturation: 0, lightness: 98.5, alpha: 1 },
  "sidebar-accent": { hue: 0, saturation: 0, lightness: 97, alpha: 1 },
  "sidebar-accent-foreground": { hue: 0, saturation: 0, lightness: 20.5, alpha: 1 },
  "sidebar-border": { hue: 0, saturation: 0, lightness: 92.2, alpha: 1 },
  "sidebar-ring": { hue: 0, saturation: 0, lightness: 70.8, alpha: 1 },
};

export const defaultsDark: Record<string, ColorConfig> = {
  background: { hue: 303, saturation: 50, lightness: 10, alpha: 1 },
  foreground: { hue: 303, saturation: 5, lightness: 90, alpha: 1 },
  primary: { hue: 303, saturation: 88, lightness: 40, alpha: 1 },
  "primary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  secondary: { hue: 303, saturation: 30, lightness: 20, alpha: 1 },
  "secondary-foreground": { hue: 0, saturation: 0, lightness: 100, alpha: 1 },
  accent: { hue: 265, saturation: 30, lightness: 25, alpha: 1 },
  "accent-foreground": { hue: 303, saturation: 5, lightness: 90, alpha: 1 },
  card: { hue: 303, saturation: 50, lightness: 10, alpha: 1 },
  "card-foreground": { hue: 303, saturation: 5, lightness: 90, alpha: 1 },
  popover: { hue: 303, saturation: 50, lightness: 5, alpha: 1 },
  "popover-foreground": { hue: 303, saturation: 5, lightness: 90, alpha: 1 },
  muted: { hue: 265, saturation: 30, lightness: 25, alpha: 1 },
  "muted-foreground": { hue: 303, saturation: 5, lightness: 60, alpha: 1 },
  destructive: { hue: 0, saturation: 92, lightness: 50, alpha: 1 },
  "destructive-foreground": {
    hue: 303,
    saturation: 5,
    lightness: 90,
    alpha: 1,
  },
  border: { hue: 303, saturation: 30, lightness: 50, alpha: 1 },
  input: { hue: 303, saturation: 30, lightness: 50, alpha: 1 },
  ring: { hue: 303, saturation: 88, lightness: 40, alpha: 1 },

  success: { hue: 120, saturation: 60, lightness: 40, alpha: 1 },
  "success-foreground": { hue: 120, saturation: 20, lightness: 80, alpha: 1 },
  warning: { hue: 45, saturation: 100, lightness: 40, alpha: 1 },
  "warning-foreground": { hue: 45, saturation: 100, lightness: 30, alpha: 1 },
  info: { hue: 200, saturation: 100, lightness: 40, alpha: 1 },
  "info-foreground": { hue: 200, saturation: 100, lightness: 80, alpha: 1 },

  "chart-1": { hue: 303, saturation: 85, lightness: 45, alpha: 1 }, // Slightly less saturated primary
  "chart-2": { hue: 265, saturation: 40, lightness: 75, alpha: 1 }, // Slightly more saturated accent
  "chart-3": { hue: 310, saturation: 88, lightness: 35, alpha: 1 }, // Variant of primary with hue shift
  "chart-4": { hue: 64, saturation: 80, lightness: 40, alpha: 1 }, // Slightly lighter complementary
  "chart-5": { hue: 305, saturation: 85, lightness: 40, alpha: 1 }, // Adjusted offset with hue change
  
  // Sidebar colors (dark mode)
  sidebar: { hue: 0, saturation: 0, lightness: 20.5, alpha: 1 },
  "sidebar-foreground": { hue: 0, saturation: 0, lightness: 98.5, alpha: 1 },
  "sidebar-primary": { hue: 264.376, saturation: 24.3, lightness: 48.8, alpha: 1 },
  "sidebar-primary-foreground": { hue: 0, saturation: 0, lightness: 98.5, alpha: 1 },
  "sidebar-accent": { hue: 0, saturation: 0, lightness: 26.9, alpha: 1 },
  "sidebar-accent-foreground": { hue: 0, saturation: 0, lightness: 98.5, alpha: 1 },
  "sidebar-border": { hue: 0, saturation: 0, lightness: 100, alpha: 0.1 },
  "sidebar-ring": { hue: 0, saturation: 0, lightness: 43.9, alpha: 1 },
};

export const createColor = (
  baseHue: number,
  saturation: number,
  lightness: number,
  alpha: number = 1
): ColorConfig => ({
  hue: baseHue,
  saturation,
  lightness,
  alpha,
});

export const generateThemeColorsFromPrimary = (
  baseHue: number,
  baseSaturation: number,
  baseLightness: number,
  isDarkMode: boolean
) => {
  const normalizedHue = ((baseHue % 360) + 360) % 360;

  // Primary and Destructive colors are constant in light and dark modes
  const primaryColor = createColor(
    normalizedHue,
    baseSaturation,
    baseLightness
  );
  const primaryForegroundColor = createColor(normalizedHue, 0, 100);
  const destructiveColor = createColor(
    0,
    Math.min(100, baseSaturation + 20),
    50
  );
  const destructiveForegroundColor = createColor(0, 5, 90);
  const inputColor = createColor(normalizedHue, 30, 18); 

  const mutedColor = createColor(
    normalizedHue - 30,
    baseSaturation,
    Math.min(100, baseLightness + 10)
  );

  const accentColor = createColor(
    normalizedHue - 30,
    Math.min(100, baseSaturation + 20), 
    Math.max(0, baseLightness - 15) 
  );

  return {
    background: createColor(normalizedHue, 69, isDarkMode ? 3 : 95),
    foreground: createColor(normalizedHue, 5, isDarkMode ? 90 : 10),
    border: createColor(normalizedHue, 30, isDarkMode ? 18 : 50),
    ring: primaryColor, // Matches primary, constant across modes
    input: inputColor,
    card: createColor(normalizedHue, 50, isDarkMode ? 10 : 90),
    "card-foreground": createColor(normalizedHue, 5, isDarkMode ? 90 : 13),
    popover: createColor(normalizedHue, 69, isDarkMode ? 5 : 95),
    "popover-foreground": createColor(normalizedHue, 5, isDarkMode ? 90 : 10),
    primary: primaryColor,
    "primary-foreground": primaryForegroundColor,
    secondary: createColor(normalizedHue + 30, baseSaturation, baseLightness),
    "secondary-foreground": createColor(
      normalizedHue + 30,
      baseSaturation,
      isDarkMode ? 90 : 10
    ),
    accent: accentColor,
    "accent-foreground": createColor(
      normalizedHue + 60,
      baseSaturation,
      isDarkMode ? 90 : 13
    ),
    muted: mutedColor,
    "muted-foreground": createColor(
      normalizedHue - 30,
      baseSaturation,
      isDarkMode ? 60 : 35
    ),
    destructive: destructiveColor,
    "destructive-foreground": destructiveForegroundColor,
    success: createColor(
      120,
      Math.min(100, baseSaturation + 10),
      isDarkMode ? 40 : 50
    ),
    "success-foreground": createColor(
      120,
      Math.max(20, baseSaturation - 40),
      isDarkMode ? 80 : 90
    ),
    warning: createColor(45, 100, isDarkMode ? 40 : 50),
    "warning-foreground": createColor(45, 100, isDarkMode ? 30 : 20),
    info: createColor(210, 100, isDarkMode ? 40 : 50),
    "info-foreground": createColor(210, 100, isDarkMode ? 80 : 90),
    "chart-1": createColor(normalizedHue, 85, 55),
    "chart-2": createColor(normalizedHue + 15, 80, 50),
    "chart-3": createColor(normalizedHue + 3, 83, 52),
    "chart-4": createColor(normalizedHue + 7, 82, 51),
    "chart-5": createColor(normalizedHue + 12, 81, 49),
    // Sidebar colors - Subtle theme integration
    sidebar: createColor(normalizedHue, 5, isDarkMode ? 18 : 96),
    "sidebar-foreground": createColor(normalizedHue, 5, isDarkMode ? 92 : 12),
    "sidebar-primary": createColor(normalizedHue, isDarkMode ? 70 : 15, isDarkMode ? 45 : 25),
    "sidebar-primary-foreground": createColor(normalizedHue, 5, isDarkMode ? 95 : 95),
    "sidebar-accent": createColor(normalizedHue, isDarkMode ? 10 : 8, isDarkMode ? 25 : 94),
    "sidebar-accent-foreground": createColor(normalizedHue, 5, isDarkMode ? 92 : 18),
    "sidebar-border": createColor(normalizedHue, 10, isDarkMode ? 22 : 88, isDarkMode ? 0.15 : 1),
    "sidebar-ring": createColor(normalizedHue, 20, isDarkMode ? 40 : 65),
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

// ============================================================================
// OKLCH Color Space Support
// ============================================================================

/**
 * Convert HSL ColorConfig to OKLCH format
 */
export function hslToOKLCH(config: ColorConfig): OKLCHConfig {
  const hslColor = {
    mode: "hsl" as const,
    h: config.hue,
    s: config.saturation / 100,
    l: config.lightness / 100,
    alpha: config.alpha ?? 1,
  };

  const oklchColor = oklch(hslColor);

  return {
    l: (oklchColor.l ?? 0) * 100, // Convert to 0-100 range for consistency
    c: oklchColor.c ?? 0,
    h: oklchColor.h ?? 0,
    alpha: oklchColor.alpha ?? 1,
  };
}

/**
 * Convert OKLCH to HSL ColorConfig
 */
export function oklchToHSL(config: OKLCHConfig): ColorConfig {
  const oklchColor = {
    mode: "oklch" as const,
    l: config.l / 100, // Convert back to 0-1 range
    c: config.c,
    h: config.h,
    alpha: config.alpha ?? 1,
  };

  const hslColor = hsl(oklchColor);

  return {
    hue: hslColor.h ?? 0,
    saturation: (hslColor.s ?? 0) * 100,
    lightness: (hslColor.l ?? 0) * 100,
    alpha: hslColor.alpha ?? 1,
  };
}

/**
 * Format OKLCH config as CSS variable value
 */
export function formatOKLCHForCSS(config: OKLCHConfig): string {
  const l = (config.l / 100).toFixed(4); // 0-1 range
  const c = config.c.toFixed(4);
  const h = config.h.toFixed(2);
  
  return `${l} ${c} ${h}`;
}

/**
 * Format OKLCH config as full CSS color
 */
export function oklchToCSS(config: OKLCHConfig): string {
  const l = (config.l / 100).toFixed(4);
  const c = config.c.toFixed(4);
  const h = config.h.toFixed(2);
  const alpha = config.alpha ?? 1;
  
  if (alpha < 1) {
    return `oklch(${l} ${c} ${h} / ${alpha})`;
  }
  return `oklch(${l} ${c} ${h})`;
}

/**
 * Parse OKLCH string to OKLCHConfig
 */
export function parseOKLCH(oklchString: string): OKLCHConfig | null {
  const oklchRegex = /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/i;
  const match = oklchString.trim().match(oklchRegex);
  
  if (!match) return null;
  
  return {
    l: parseFloat(match[1]) * 100, // Convert to 0-100 range
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
    alpha: match[4] ? parseFloat(match[4]) : 1,
  };
}

/**
 * Convert hex to OKLCH
 */
export function hexToOKLCH(hex: string): OKLCHConfig {
  const hslColor = hexToHSL(hex);
  return hslToOKLCH(hslColor);
}

/**
 * Convert OKLCH to hex
 */
export function oklchToHex(config: OKLCHConfig): string {
  const oklchColor = {
    mode: "oklch" as const,
    l: config.l / 100,
    c: config.c,
    h: config.h,
    alpha: config.alpha ?? 1,
  };

  return formatHex(oklchColor);
}
