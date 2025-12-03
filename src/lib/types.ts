export interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
}

export interface OKLCHConfig {
  l: number; // Lightness (0-1 or 0-100)
  c: number; // Chroma (0-0.4 typically)
  h: number; // Hue (0-360)
  alpha?: number;
}

export type ColorFormat = 'hsl' | 'oklch';

export type ColorInputFormat = "auto" | "hex" | "rgb" | "hsl" | "oklch";

export interface ThemeColors {
  [key: string]: ColorConfig;
}

// export type ColorConfigOrChartColors =
//   | ColorConfig
//   | {
//       line: ColorConfig;
//       area: ColorConfig;
//       bar: ColorConfig;
//       pie: ColorConfig[];
//       scatter: ColorConfig;
//     };
