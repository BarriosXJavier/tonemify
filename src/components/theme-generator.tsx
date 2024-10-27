"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColorControls } from "@/components/color-controls";

interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

const defaultColors: Record<string, ColorConfig> = {
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
};


function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default function ThemeGenerator() {
  const [colors, setColors] =
    useState<Record<string, ColorConfig>>(defaultColors);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const themeParam = searchParams.get("theme");
    if (themeParam) {
      try {
        const decodedTheme: Record<string, ColorConfig> = JSON.parse(
          atob(themeParam)
        );
        setColors(decodedTheme);
        updateCSSVariables(decodedTheme);
      } catch (e) {
        console.error("Invalid theme parameter");
      }
    }
  }, []);

  const updateCSSVariables = (
    themeColors: Record<string, ColorConfig>
  ): void => {
    const root = document.documentElement;
    Object.entries(themeColors).forEach(([name, config]) => {
      root.style.setProperty(
        `--${name}`,
        `hsla(${config.hue}, ${config.saturation}%, ${config.lightness}%, ${config.alpha})`
      );
    });
  };

  const updateColor = (
    colorName: string,
    property: keyof ColorConfig,
    value: number
  ): void => {
    setColors((prevColors) => {
      const newColors = {
        ...prevColors,
        [colorName]: {
          ...prevColors[colorName],
          [property]: value,
        },
      };
      updateCSSVariables(newColors);
      return newColors;
    });
  };

  const generateThemeCSS = (): string => {
    return `@layer base {
  :root {
    ${Object.entries(colors)
      .map(
        ([name, config]) =>
          `--${name}: ${config.hue} ${config.saturation}% ${config.lightness}% ${config.alpha};`
      )
      .join("\n    ")}
  }
}`;
  };

  const copyTheme = (): void => {
    const themeCSS = generateThemeCSS();
    navigator.clipboard.writeText(themeCSS);
    toast.success("Theme CSS copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <header className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">Tonemify</h1>
          <p className="text-sm text-muted-foreground">
            Stop tweaking, Start shipping!
          </p>
        </header>

        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(colors).map(([name, config]) => {
              const hexColor = hslToHex(
                config.hue,
                config.saturation,
                config.lightness
              );
              return (
                <Card
                  key={name}
                  className="group relative overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
                  onClick={() => setActiveColor(name)}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundColor: `hsl(${config.hue} ${config.saturation}% ${config.lightness}%)`,
                    }}
                  />
                  <div className="relative p-4 space-y-2">
                    <div
                      className="w-full h-8 rounded shadow-sm"
                      style={{
                        backgroundColor: `hsl(${config.hue} ${config.saturation}% ${config.lightness}%)`,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium capitalize">
                        {name}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {hexColor}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Button variant="outline" className="w-full" onClick={copyTheme}>
            <Copy className="w-4 h-4 mr-2" />
            Copy Theme CSS
          </Button>
        </div>
      </div>

      <Dialog
        open={activeColor !== null}
        onOpenChange={(open) => !open && setActiveColor(null)}
      >
        <DialogContent className="bg-black text-white  dark:bg-white dark:text-black">
          <DialogHeader>
            <DialogTitle className="capitalize">{activeColor}</DialogTitle>
          </DialogHeader>
          {activeColor && (
            <ColorControls
              color={colors[activeColor]}
              onChange={(property, value) =>
                updateColor(activeColor, property, value)
              }
              onHexChange={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
