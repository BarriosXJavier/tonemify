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
  background: { hue: 305, saturation: 33, lightness: 99, alpha: 1 },
  foreground: { hue: 305, saturation: 50, lightness: 0, alpha: 1 },
  primary: { hue: 305, saturation: 18, lightness: 71, alpha: 1 },
  "primary-foreground": { hue: 305, saturation: 18, lightness: 11, alpha: 1 },
  secondary: { hue: 275, saturation: 18, lightness: 71, alpha: 1 },
  "secondary-foreground": { hue: 275, saturation: 18, lightness: 11, alpha: 1 },
  accent: { hue: 335, saturation: 18, lightness: 71, alpha: 1 },
  "accent-foreground": { hue: 335, saturation: 18, lightness: 11, alpha: 1 },
  card: { hue: 305, saturation: 33, lightness: 99, alpha: 1 },
  "card-foreground": { hue: 305, saturation: 50, lightness: 0, alpha: 1 },
  popover: { hue: 305, saturation: 33, lightness: 99, alpha: 1 },
  "popover-foreground": { hue: 305, saturation: 50, lightness: 0, alpha: 1 },
  muted: { hue: 275, saturation: 28, lightness: 93, alpha: 1 },
  "muted-foreground": { hue: 275, saturation: 7, lightness: 28, alpha: 1 },
  destructive: { hue: 21, saturation: 83, lightness: 23, alpha: 1 },
  "destructive-foreground": {
    hue: 21,
    saturation: 83,
    lightness: 83,
    alpha: 1,
  },
  border: { hue: 305, saturation: 13, lightness: 93, alpha: 1 },
  input: { hue: 305, saturation: 13, lightness: 93, alpha: 1 },
  ring: { hue: 305, saturation: 18, lightness: 71, alpha: 1 },
  "chart-1": { hue: 200, saturation: 50, lightness: 50, alpha: 1 },
  "chart-2": { hue: 220, saturation: 50, lightness: 50, alpha: 1 },
  "chart-3": { hue: 240, saturation: 50, lightness: 50, alpha: 1 },
  "chart-4": { hue: 260, saturation: 50, lightness: 50, alpha: 1 },
  "chart-5": { hue: 280, saturation: 50, lightness: 50, alpha: 1 },
};

export const defaultsDark: Record<string, ColorConfig> = {
  background: { hue: 305, saturation: 33, lightness: 10, alpha: 1 },
  foreground: { hue: 305, saturation: 50, lightness: 100, alpha: 1 },
  primary: { hue: 305, saturation: 18, lightness: 60, alpha: 1 },
  "primary-foreground": { hue: 305, saturation: 18, lightness: 90, alpha: 1 },
  secondary: { hue: 275, saturation: 18, lightness: 60, alpha: 1 },
  "secondary-foreground": { hue: 275, saturation: 18, lightness: 90, alpha: 1 },
  accent: { hue: 335, saturation: 18, lightness: 60, alpha: 1 },
  "accent-foreground": { hue: 335, saturation: 18, lightness: 90, alpha: 1 },
  card: { hue: 305, saturation: 33, lightness: 10, alpha: 1 },
  "card-foreground": { hue: 305, saturation: 50, lightness: 100, alpha: 1 },
  popover: { hue: 305, saturation: 33, lightness: 10, alpha: 1 },
  "popover-foreground": { hue: 305, saturation: 50, lightness: 100, alpha: 1 },
  muted: { hue: 275, saturation: 28, lightness: 20, alpha: 1 },
  "muted-foreground": { hue: 275, saturation: 7, lightness: 80, alpha: 1 },
  destructive: { hue: 21, saturation: 83, lightness: 50, alpha: 1 },
  "destructive-foreground": {
    hue: 21,
    saturation: 83,
    lightness: 90,
    alpha: 1,
  },
  border: { hue: 305, saturation: 13, lightness: 20, alpha: 1 },
  input: { hue: 305, saturation: 13, lightness: 20, alpha: 1 },
  ring: { hue: 305, saturation: 18, lightness: 60, alpha: 1 },
  "chart-1": { hue: 200, saturation: 50, lightness: 40, alpha: 1 },
  "chart-2": { hue: 220, saturation: 50, lightness: 40, alpha: 1 },
  "chart-3": { hue: 240, saturation: 50, lightness: 40, alpha: 1 },
  "chart-4": { hue: 260, saturation: 50, lightness: 40, alpha: 1 },
  "chart-5": { hue: 280, saturation: 50, lightness: 40, alpha: 1 },
};


