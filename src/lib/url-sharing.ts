import { ColorConfig } from "./types";

/**
 * Encode theme colors to a compact URL-safe string
 */
export function encodeThemeToURL(
  lightColors: Record<string, ColorConfig>,
  darkColors: Record<string, ColorConfig>
): string {
  try {
    // Create a compact representation
    const compactTheme = {
      l: compressColors(lightColors),
      d: compressColors(darkColors),
    };

    // Convert to JSON and encode
    const json = JSON.stringify(compactTheme);
    const encoded = btoa(json);
    
    // Make URL-safe
    return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  } catch (error) {
    console.error("Failed to encode theme:", error);
    return "";
  }
}

/**
 * Decode theme colors from URL string
 */
export function decodeThemeFromURL(
  encoded: string
): {
  light: Record<string, ColorConfig>;
  dark: Record<string, ColorConfig>;
} | null {
  try {
    // Restore URL-safe characters
    const base64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    
    // Add padding if needed
    const padded = base64 + "==".substring(0, (4 - (base64.length % 4)) % 4);
    
    // Decode
    const json = atob(padded);
    const compactTheme = JSON.parse(json);

    return {
      light: decompressColors(compactTheme.l),
      dark: decompressColors(compactTheme.d),
    };
  } catch (error) {
    console.error("Failed to decode theme:", error);
    return null;
  }
}

/**
 * Compress colors to a more compact format
 */
function compressColors(
  colors: Record<string, ColorConfig>
): Record<string, number[]> {
  const compressed: Record<string, number[]> = {};
  
  for (const [key, config] of Object.entries(colors)) {
    // Store as [hue, saturation, lightness, alpha]
    // Round to 1 decimal to save space
    compressed[key] = [
      Math.round(config.hue * 10) / 10,
      Math.round(config.saturation * 10) / 10,
      Math.round(config.lightness * 10) / 10,
      Math.round((config.alpha ?? 1) * 100) / 100,
    ];
  }
  
  return compressed;
}

/**
 * Decompress colors back to ColorConfig format
 */
function decompressColors(
  compressed: Record<string, number[]>
): Record<string, ColorConfig> {
  const colors: Record<string, ColorConfig> = {};
  
  for (const [key, values] of Object.entries(compressed)) {
    colors[key] = {
      hue: values[0],
      saturation: values[1],
      lightness: values[2],
      alpha: values[3] ?? 1,
    };
  }
  
  return colors;
}

/**
 * Generate a shareable URL with theme encoded
 */
export function generateShareableURL(
  lightColors: Record<string, ColorConfig>,
  darkColors: Record<string, ColorConfig>,
  baseURL?: string
): string {
  const encoded = encodeThemeToURL(lightColors, darkColors);
  const base = baseURL || window.location.origin;
  return `${base}/?theme=${encoded}`;
}

/**
 * Extract theme from current URL
 */
export function getThemeFromURL(): {
  light: Record<string, ColorConfig>;
  dark: Record<string, ColorConfig>;
} | null {
  if (typeof window === "undefined") return null;
  
  const params = new URLSearchParams(window.location.search);
  const themeParam = params.get("theme");
  
  if (!themeParam) return null;
  
  return decodeThemeFromURL(themeParam);
}

/**
 * Copy shareable URL to clipboard
 */
export async function copyShareableURL(
  lightColors: Record<string, ColorConfig>,
  darkColors: Record<string, ColorConfig>
): Promise<boolean> {
  try {
    const url = generateShareableURL(lightColors, darkColors);
    await navigator.clipboard.writeText(url);
    return true;
  } catch (error) {
    console.error("Failed to copy URL:", error);
    return false;
  }
}

/**
 * Update URL with theme (without page reload)
 */
export function updateURLWithTheme(
  lightColors: Record<string, ColorConfig>,
  darkColors: Record<string, ColorConfig>
): void {
  if (typeof window === "undefined") return;
  
  const encoded = encodeThemeToURL(lightColors, darkColors);
  const url = new URL(window.location.href);
  url.searchParams.set("theme", encoded);
  
  window.history.replaceState({}, "", url.toString());
}

/**
 * Clear theme from URL
 */
export function clearThemeFromURL(): void {
  if (typeof window === "undefined") return;
  
  const url = new URL(window.location.href);
  url.searchParams.delete("theme");
  
  window.history.replaceState({}, "", url.toString());
}
