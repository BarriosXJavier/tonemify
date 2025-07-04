"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark" | "system";
  attribute?: "class" | "data-theme";
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  attribute = "class",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      attribute={attribute}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}
