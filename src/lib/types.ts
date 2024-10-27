export interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

export interface ThemeColors {
  [key: string]: ColorConfig;
}
