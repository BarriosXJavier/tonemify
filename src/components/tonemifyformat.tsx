"use client";

import { hexToHSL, rgbToHSL } from "@/lib/colorUtils";

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






