import { ColorConfig } from "./types";
import { hslToRGB } from "./color-utils";

/**
 * WCAG compliance levels
 */
export type WCAGLevel = "AA" | "AAA";
export type WCAGSize = "normal" | "large";

/**
 * Contrast ratio result
 */
export interface ContrastResult {
  ratio: number;
  passAA: boolean;
  passAAA: boolean;
  score: "fail" | "aa" | "aaa";
  recommendation?: string;
}

/**
 * Calculate relative luminance of an RGB color
 * https://www.w3.org/TR/WCAG20-TECHS/G17.html
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG20-TECHS/G18.html
 */
export function calculateContrastRatio(
  color1: ColorConfig,
  color2: ColorConfig
): number {
  const rgb1 = hslToRGB(color1);
  const rgb2 = hslToRGB(color2);

  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 */
export function checkWCAGCompliance(
  contrastRatio: number,
  size: WCAGSize = "normal"
): ContrastResult {
  // WCAG 2.0 minimum contrast ratios:
  // Normal text: AA = 4.5:1, AAA = 7:1
  // Large text (18pt+): AA = 3:1, AAA = 4.5:1
  const aaThreshold = size === "large" ? 3 : 4.5;
  const aaaThreshold = size === "large" ? 4.5 : 7;

  const passAA = contrastRatio >= aaThreshold;
  const passAAA = contrastRatio >= aaaThreshold;

  let score: "fail" | "aa" | "aaa";
  let recommendation: string | undefined;

  if (passAAA) {
    score = "aaa";
  } else if (passAA) {
    score = "aa";
    recommendation = `Consider increasing contrast to ${aaaThreshold.toFixed(1)}:1 for AAA compliance`;
  } else {
    score = "fail";
    recommendation = `Increase contrast to at least ${aaThreshold.toFixed(1)}:1 for AA compliance`;
  }

  return {
    ratio: Math.round(contrastRatio * 100) / 100,
    passAA,
    passAAA,
    score,
    recommendation,
  };
}

/**
 * Check all critical color combinations in a theme
 */
export interface AccessibilityReport {
  background_foreground: ContrastResult;
  primary_primaryForeground: ContrastResult;
  secondary_secondaryForeground: ContrastResult;
  card_cardForeground: ContrastResult;
  muted_mutedForeground: ContrastResult;
  destructive_destructiveForeground: ContrastResult;
  overallScore: "excellent" | "good" | "needs-improvement" | "poor";
  passPercentage: number;
}

/**
 * Generate accessibility report for theme
 */
export function generateAccessibilityReport(
  colors: Record<string, ColorConfig>
): AccessibilityReport {
  const checks = [
    {
      key: "background_foreground",
      bg: colors.background,
      fg: colors.foreground,
    },
    {
      key: "primary_primaryForeground",
      bg: colors.primary,
      fg: colors["primary-foreground"],
    },
    {
      key: "secondary_secondaryForeground",
      bg: colors.secondary,
      fg: colors["secondary-foreground"],
    },
    {
      key: "card_cardForeground",
      bg: colors.card,
      fg: colors["card-foreground"],
    },
    {
      key: "muted_mutedForeground",
      bg: colors.muted,
      fg: colors["muted-foreground"],
    },
    {
      key: "destructive_destructiveForeground",
      bg: colors.destructive,
      fg: colors["destructive-foreground"],
    },
  ];

  const results: Record<string, ContrastResult> = {};
  let aaaCount = 0;
  let aaCount = 0;

  for (const check of checks) {
    if (!check.bg || !check.fg) continue;
    
    const ratio = calculateContrastRatio(check.bg, check.fg);
    const result = checkWCAGCompliance(ratio);
    results[check.key] = result;

    if (result.passAAA) aaaCount++;
    else if (result.passAA) aaCount++;
  }

  const totalChecks = checks.length;
  const passCount = aaaCount + aaCount;
  const passPercentage = Math.round((passCount / totalChecks) * 100);

  let overallScore: "excellent" | "good" | "needs-improvement" | "poor";
  if (aaaCount === totalChecks) {
    overallScore = "excellent";
  } else if (passPercentage >= 80) {
    overallScore = "good";
  } else if (passPercentage >= 50) {
    overallScore = "needs-improvement";
  } else {
    overallScore = "poor";
  }

  return {
    background_foreground: results.background_foreground,
    primary_primaryForeground: results.primary_primaryForeground,
    secondary_secondaryForeground: results.secondary_secondaryForeground,
    card_cardForeground: results.card_cardForeground,
    muted_mutedForeground: results.muted_mutedForeground,
    destructive_destructiveForeground: results.destructive_destructiveForeground,
    overallScore,
    passPercentage,
  };
}

/**
 * Suggest color adjustments to improve contrast
 */
export function suggestContrastImprovement(
  background: ColorConfig,
  foreground: ColorConfig,
  targetRatio: number = 4.5
): ColorConfig {
  // Simple strategy: adjust foreground lightness
  const currentRatio = calculateContrastRatio(background, foreground);
  
  if (currentRatio >= targetRatio) {
    return foreground; // Already meets target
  }

  // Try adjusting lightness
  const adjustedForeground = { ...foreground };
  const step = background.lightness > 50 ? -5 : 5; // Darker bg = lighter fg

  for (let i = 0; i < 20; i++) {
    adjustedForeground.lightness += step;
    adjustedForeground.lightness = Math.max(0, Math.min(100, adjustedForeground.lightness));
    
    const newRatio = calculateContrastRatio(background, adjustedForeground);
    if (newRatio >= targetRatio) {
      return adjustedForeground;
    }
  }

  return adjustedForeground; // Return best attempt
}

/**
 * Get color name for display
 */
export function getColorPairName(key: string): {
  background: string;
  foreground: string;
} {
  const pairs: Record<string, { background: string; foreground: string }> = {
    background_foreground: { background: "Background", foreground: "Foreground" },
    primary_primaryForeground: { background: "Primary", foreground: "Primary Text" },
    secondary_secondaryForeground: { background: "Secondary", foreground: "Secondary Text" },
    card_cardForeground: { background: "Card", foreground: "Card Text" },
    muted_mutedForeground: { background: "Muted", foreground: "Muted Text" },
    destructive_destructiveForeground: { background: "Destructive", foreground: "Destructive Text" },
  };

  return pairs[key] || { background: "Unknown", foreground: "Unknown" };
}
