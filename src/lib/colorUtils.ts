import { ColorConfig } from "./types";

export function hexToHSL(hex: string) {
  hex = hex.replace("#", "");

  const hasAlpha = hex.length === 8; // 8 characters for #RRGGBBAA
  let alpha = 1;

  if (hasAlpha) {
    alpha = parseInt(hex.substring(6, 8), 16) / 255;
  }

  let r = parseInt(hex.substring(0, 2), 16) / 255;
  let g = parseInt(hex.substring(2, 4), 16) / 255;
  let b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

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
    alpha: alpha,
  };
}

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


