export interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha?: number;
}

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
