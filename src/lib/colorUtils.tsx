export function hexToHSLA(hex: string): [number, number, number, number] {
  // Remove # if present
  hex = hex.replace(/^#/, "");

  let r = parseInt(hex.slice(0, 2), 16) / 255;
  let g = parseInt(hex.slice(2, 4), 16) / 255;
  let b = parseInt(hex.slice(4, 6), 16) / 255;
  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

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

  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100),
    Math.round(a * 100) / 100,
  ];
}

export function HSLAToHex(
  h: number,
  s: number,
  l: number,
  a: number = 1,
): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);
  const alpha = Math.round(a * 255);

  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}${a < 1 ? toHex(alpha) : ""}`;
}

export function generate60_30_10_Palette(baseColor: string): string[] {
  const [h, s, l, a] = hexToHSLA(baseColor);

  // 60% - Primary (base color)
  const primary = baseColor;

  // 30% - Secondary (complementary hue, adjusted saturation)
  const secondary = HSLAToHex(
    (h + 180) % 360,
    Math.min(s * 0.8, 100),
    Math.min(l * 1.2, 100),
    a,
  );

  // 10% - Accent (triadic harmony)
  const accent = HSLAToHex(
    (h + 120) % 360,
    Math.min(s * 1.2, 100),
    Math.min(l * 0.8, 100),
    a,
  );

  // Neutral color for text and borders
  const neutral = HSLAToHex(h, Math.min(s * 0.3, 100), 20, a);

  return [primary, secondary, accent, neutral];
}

export function generateRandomPalette(): string[] {
  const h = Math.random() * 360;
  const s = 50 + Math.random() * 30; // 50-80%
  const l = 40 + Math.random() * 20; // 40-60%
  const a = 0.8 + Math.random() * 0.2; // 0.8-1.0

  const baseColor = HSLAToHex(h, s, l, a);
  return generate60_30_10_Palette(baseColor);
}

export function getRGBA(hex: string): string {
  hex = hex.replace(/^#/, "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const a = hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
