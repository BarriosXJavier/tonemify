import { ColorConfig } from "./types";

export type HarmonyType =
  | "complementary"
  | "triadic"
  | "analogous"
  | "split-complementary"
  | "tetradic";

export interface HarmonyColor {
  hue: number;
  label: string;
}

/**
 * Normalize hue to 0-360 range
 */
function normalizeHue(hue: number): number {
  return ((hue % 360) + 360) % 360;
}

/**
 * Generate complementary color (opposite on color wheel)
 */
export function getComplementary(hue: number): HarmonyColor[] {
  const baseHue = normalizeHue(hue);
  return [
    { hue: baseHue, label: "Base" },
    { hue: normalizeHue(baseHue + 180), label: "Complementary" },
  ];
}

/**
 * Generate triadic colors (3 colors equally spaced - 120° apart)
 */
export function getTriadic(hue: number): HarmonyColor[] {
  const baseHue = normalizeHue(hue);
  return [
    { hue: baseHue, label: "Base" },
    { hue: normalizeHue(baseHue + 120), label: "Triadic 1" },
    { hue: normalizeHue(baseHue + 240), label: "Triadic 2" },
  ];
}

/**
 * Generate analogous colors (adjacent colors - 30° apart)
 */
export function getAnalogous(hue: number): HarmonyColor[] {
  const baseHue = normalizeHue(hue);
  return [
    { hue: normalizeHue(baseHue - 30), label: "Analogous -30°" },
    { hue: baseHue, label: "Base" },
    { hue: normalizeHue(baseHue + 30), label: "Analogous +30°" },
  ];
}

/**
 * Generate split-complementary colors (base + 2 colors adjacent to complement)
 */
export function getSplitComplementary(hue: number): HarmonyColor[] {
  const baseHue = normalizeHue(hue);
  const complement = normalizeHue(baseHue + 180);
  return [
    { hue: baseHue, label: "Base" },
    { hue: normalizeHue(complement - 30), label: "Split 1" },
    { hue: normalizeHue(complement + 30), label: "Split 2" },
  ];
}

/**
 * Generate tetradic/square colors (4 colors equally spaced - 90° apart)
 */
export function getTetradic(hue: number): HarmonyColor[] {
  const baseHue = normalizeHue(hue);
  return [
    { hue: baseHue, label: "Base" },
    { hue: normalizeHue(baseHue + 90), label: "Tetradic 1" },
    { hue: normalizeHue(baseHue + 180), label: "Tetradic 2" },
    { hue: normalizeHue(baseHue + 270), label: "Tetradic 3" },
  ];
}

/**
 * Get harmony colors based on type
 */
export function getHarmonyColors(
  hue: number,
  type: HarmonyType
): HarmonyColor[] {
  switch (type) {
    case "complementary":
      return getComplementary(hue);
    case "triadic":
      return getTriadic(hue);
    case "analogous":
      return getAnalogous(hue);
    case "split-complementary":
      return getSplitComplementary(hue);
    case "tetradic":
      return getTetradic(hue);
    default:
      return [{ hue, label: "Base" }];
  }
}

/**
 * Generate a theme from harmony colors
 * Uses the first harmony color as primary and distributes others across the theme
 */
export function generateThemeFromHarmony(
  harmonyColors: HarmonyColor[],
  baseSaturation: number = 70,
  baseLightness: number = 50,
  isDarkMode: boolean = false
): Record<string, ColorConfig> {
  const [primary, ...secondaryColors] = harmonyColors;

  // Use first color as primary
  const primaryHue = primary.hue;

  // Distribute other harmony colors
  const accentHue = secondaryColors[0]?.hue ?? primaryHue + 30;
  const secondaryHue = secondaryColors[1]?.hue ?? primaryHue - 30;
  const mutedHue = secondaryColors[2]?.hue ?? primaryHue + 15;

  return {
    background: {
      hue: primaryHue,
      saturation: isDarkMode ? 50 : 92,
      lightness: isDarkMode ? 10 : 95,
      alpha: 1,
    },
    foreground: {
      hue: primaryHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 10,
      alpha: 1,
    },
    primary: {
      hue: primaryHue,
      saturation: baseSaturation,
      lightness: baseLightness,
      alpha: 1,
    },
    "primary-foreground": {
      hue: 0,
      saturation: 0,
      lightness: 100,
      alpha: 1,
    },
    secondary: {
      hue: secondaryHue,
      saturation: isDarkMode ? 30 : 30,
      lightness: isDarkMode ? 20 : 70,
      alpha: 1,
    },
    "secondary-foreground": {
      hue: 0,
      saturation: 0,
      lightness: isDarkMode ? 100 : 0,
      alpha: 1,
    },
    accent: {
      hue: accentHue,
      saturation: 30,
      lightness: isDarkMode ? 25 : 80,
      alpha: 1,
    },
    "accent-foreground": {
      hue: primaryHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 15,
      alpha: 1,
    },
    card: {
      hue: primaryHue,
      saturation: isDarkMode ? 50 : 50,
      lightness: isDarkMode ? 10 : 90,
      alpha: 1,
    },
    "card-foreground": {
      hue: primaryHue,
      saturation: 5,
      lightness: isDarkMode ? 90 : 15,
      alpha: 1,
    },
    popover: {
      hue: primaryHue,
      saturation: isDarkMode ? 50 : 92,
      lightness: isDarkMode ? 5 : 95,
      alpha: 1,
    },
    "popover-foreground": {
      hue: primaryHue,
      saturation: isDarkMode ? 5 : 95,
      lightness: isDarkMode ? 90 : 10,
      alpha: 1,
    },
    muted: {
      hue: mutedHue,
      saturation: 30,
      lightness: isDarkMode ? 25 : 85,
      alpha: 1,
    },
    "muted-foreground": {
      hue: primaryHue,
      saturation: 5,
      lightness: isDarkMode ? 60 : 40,
      alpha: 1,
    },
    destructive: {
      hue: 0,
      saturation: 92,
      lightness: 50,
      alpha: 1,
    },
    "destructive-foreground": {
      hue: 0,
      saturation: 5,
      lightness: 90,
      alpha: 1,
    },
    border: {
      hue: primaryHue,
      saturation: 30,
      lightness: isDarkMode ? 50 : 60,
      alpha: 1,
    },
    input: {
      hue: primaryHue,
      saturation: 30,
      lightness: isDarkMode ? 18 : 50,
      alpha: 1,
    },
    ring: {
      hue: primaryHue,
      saturation: baseSaturation,
      lightness: baseLightness,
      alpha: 1,
    },
    success: {
      hue: 120,
      saturation: 60,
      lightness: isDarkMode ? 40 : 50,
      alpha: 1,
    },
    "success-foreground": {
      hue: 120,
      saturation: 20,
      lightness: isDarkMode ? 80 : 90,
      alpha: 1,
    },
    warning: {
      hue: 45,
      saturation: 100,
      lightness: isDarkMode ? 40 : 50,
      alpha: 1,
    },
    "warning-foreground": {
      hue: 45,
      saturation: 100,
      lightness: isDarkMode ? 30 : 20,
      alpha: 1,
    },
    info: {
      hue: 210,
      saturation: 100,
      lightness: isDarkMode ? 40 : 50,
      alpha: 1,
    },
    "info-foreground": {
      hue: 210,
      saturation: 100,
      lightness: isDarkMode ? 80 : 90,
      alpha: 1,
    },
    "chart-1": { hue: primaryHue, saturation: 85, lightness: 55, alpha: 1 },
    "chart-2": { hue: accentHue, saturation: 80, lightness: 50, alpha: 1 },
    "chart-3": { hue: secondaryHue, saturation: 83, lightness: 52, alpha: 1 },
    "chart-4": { hue: mutedHue, saturation: 82, lightness: 51, alpha: 1 },
    "chart-5": {
      hue: normalizeHue(primaryHue + 180),
      saturation: 81,
      lightness: 49,
      alpha: 1,
    },
  };
}

/**
 * Harmony type metadata
 */
export const harmonyMetadata: Record<
  HarmonyType,
  { name: string; description: string; icon: string }
> = {
  complementary: {
    name: "Complementary",
    description: "Opposite colors create high contrast",
    icon: "⚖️",
  },
  triadic: {
    name: "Triadic",
    description: "Three colors equally spaced for vibrant harmony",
    icon: "🔺",
  },
  analogous: {
    name: "Analogous",
    description: "Adjacent colors for smooth, cohesive palettes",
    icon: "〰️",
  },
  "split-complementary": {
    name: "Split Complementary",
    description: "Softer alternative to complementary",
    icon: "⚡",
  },
  tetradic: {
    name: "Tetradic",
    description: "Four colors for rich, complex schemes",
    icon: "◼️",
  },
};
