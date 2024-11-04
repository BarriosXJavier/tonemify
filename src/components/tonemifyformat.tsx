"use client";

import { hexToHSL } from "@/lib/colorUtils";

interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export const convertColorToHSLFormat = (color: string): string | null => {
  const hslFunctionRegex =
    /^(?:hsl|hsla)\(\s*([\d.-]+)(?:deg)?\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?))?\s*\)$/i;
  const rgbFunctionRegex =
    /^(?:rgb|rgba)\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?))?\s*\)$/i;
  const hexRegex = /^#?([a-fA-F0-9]{3,8})$/i;

  let match;
  if ((match = color.match(hslFunctionRegex))) {
    return `--primary: ${parseFloat(match[1])} ${parseFloat(
      match[2]
    )}% ${parseFloat(match[3])}%;`;
  } else if ((match = color.match(rgbFunctionRegex))) {
    const r = parseFloat(match[1]);
    const g = parseFloat(match[2]);
    const b = parseFloat(match[3]);
    const hsl = rgbToHSL(r, g, b);
    return `--primary: ${hsl.hue} ${hsl.saturation}% ${hsl.lightness}%;`;
  } else if ((match = color.match(hexRegex))) {
    const hsl = hexToHSL(color);
    return `--primary: ${hsl.hue} ${hsl.saturation}% ${hsl.lightness}%;`;
  } else {
    return null;
  }
};

const rgbToHSL = (r: number, g: number, b: number): ColorConfig => {
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
