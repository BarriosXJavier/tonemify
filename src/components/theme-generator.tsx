
"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, RefreshCcw, Save, Clipboard, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ColorControls } from "@/components/color-controls";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import { Checkbox } from "@/components/ui/checkbox";

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

function hslToHex(h: number, s: number, l: number, a: number): string {
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

export default function ThemeGenerator() {
  const [colors, setColors] = useState<Record<string, ColorConfig>>(defaultColors);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [pasteInput, setPasteInput] = useState<string>("");
  const [isPasteDialogOpen, setIsPasteDialogOpen] = useState(false);
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});
  const [themeInput, setThemeInput] = useState<string>("");
  const [isViewSavedThemesOpen, setIsViewSavedThemesOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [includeAlpha, setIncludeAlpha] = useState<boolean>(false);
  const { setTheme } = useTheme();
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const selectedThemeName = localStorage.getItem("selectedTheme");
    if (selectedThemeName) {
      const themeCSS = localStorage.getItem(selectedThemeName);
      if (themeCSS) {
        setPasteInput(themeCSS);
        handlePasteTheme(themeCSS);
      }
    }
  }, []);

  const handlePasteTheme = (input?: string) => {
    try {
      const parsedColors: Record<string, ColorConfig> = {};
      const parsedDarkColors: Record<string, ColorConfig> = {};
      const variableRegex = /--([\w-]+):\s*(.+?);/g;
  
      const inputString = input || pasteInput;
  
      const matches = inputString.match(/:root\s*{([^}]*)}/s);
      const darkMatches = inputString.match(/\.dark\s*{([^}]*)}/s);
  
      const addColorsFromMatch = (colorString: string, target: Record<string, ColorConfig>) => {
        let match;
        while ((match = variableRegex.exec(colorString)) !== null) {
          const name = match[1];
          const value = match[2].trim();
          let hue = 0,
            saturation = 0,
            lightness = 0,
            alpha = 1;
  
          const hslMatch = value.match(
            /^hsl\(\s*([\d.-]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*\)$/
          );
          const hslaMatch = value.match(
            /^hsla\(\s*([\d.-]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*,\s*([\d.]+%?)\s*\)$/
          );
          const hslValuesMatch = value.match(
            /^([\d.-]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*\/\s*([\d.]+%?))?$/
          );
  
          if (hslMatch) {
            hue = parseFloat(hslMatch[1]);
            saturation = parseFloat(hslMatch[2]);
            lightness = parseFloat(hslMatch[3]);
            alpha = 1;
          } else if (hslaMatch) {
            hue = parseFloat(hslaMatch[1]);
            saturation = parseFloat(hslaMatch[2]);
            lightness = parseFloat(hslaMatch[3]);
            alpha = hslaMatch[4].endsWith("%")
              ? parseFloat(hslaMatch[4]) / 100
              : parseFloat(hslaMatch[4]);
          } else if (hslValuesMatch) {
            hue = parseFloat(hslValuesMatch[1]);
            saturation = parseFloat(hslValuesMatch[2]);
            lightness = parseFloat(hslValuesMatch[3]);
            if (hslValuesMatch[4]) {
              alpha = hslValuesMatch[4].endsWith("%")
                ? parseFloat(hslValuesMatch[4]) / 100
                : parseFloat(hslValuesMatch[4]);
            } else {
              alpha = 1;
            }
          } else {
            toast.error(`Invalid color format for ${name}`);
            continue;
          }
  
          target[name] = { hue, saturation, lightness, alpha };
        }
      };
  
      if (matches) {
        addColorsFromMatch(matches[1], parsedColors);
      }
      if (darkMatches) {
        addColorsFromMatch(darkMatches[1], parsedDarkColors);
      }
  
      const expectedColors = Object.keys(defaultColors);
  
      const isValidTheme = expectedColors.every((color) => parsedColors[color] && parsedDarkColors[color]);
  
      if (isValidTheme) {
        setColors(parsedColors);
        updateCSSVariables(parsedColors, ':root');
        updateCSSVariables(parsedDarkColors, '.dark');
        toast.success("Theme updated successfully!");
      } else {
        toast.error("Parsed theme is missing some colors. Theme remains unchanged.");
      }
    } catch (error) {
      console.error("Invalid theme format", error);
      toast.error("Failed to parse theme. Please check the format.");
    } finally {
      setIsPasteDialogOpen(false);
      setPasteInput("");
    }
  };
  
  const updateCSSVariables = (themeColors: Record<string, ColorConfig>, selector: string): void => {
    const root = document.documentElement;
  
    Object.entries(themeColors).forEach(([name, config]) => {
      root.style.setProperty(
        `--${name}`,
        `${config.hue} ${config.saturation}% ${config.lightness}%${
          includeAlpha && config.alpha < 1 ? ` / ${config.alpha * 100}%` : ""
        }`,
        selector
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
    const formatColor = (config: ColorConfig): string => {
      if (includeAlpha && config.alpha < 1) {
        return `hsla(${config.hue}, ${config.saturation}%, ${config.lightness}%, ${config.alpha})`;
      } else {
        return `hsl(${config.hue}, ${config.saturation}%, ${config.lightness}%)`;
      }
    };

    const cssVariables = Object.entries(colors)
      .map(([name, config]) => `  --${name}: ${formatColor(config)};`)
      .join("\n");

    return `:root {\n${cssVariables}\n}\n\n.dark {\n${cssVariables}\n}`;
  };

  const copyTheme = (): void => {
    const themeCSS = generateThemeCSS();
    navigator.clipboard.writeText(themeCSS);
    toast.success("Theme CSS copied to clipboard!");
  };

  const resetToDefault = (): void => {
    if (JSON.stringify(colors) === JSON.stringify(defaultColors)) {
      toast.info("Theme is already default!");
    } else {
      setColors(defaultColors);
      updateCSSVariables(defaultColors);
      toast.success("Theme reset to default!");
    }
  };

  const saveTheme = (): void => {
    const name = themeInput;
    if (name) {
      const themeCSS = generateThemeCSS();
      localStorage.setItem(name, themeCSS);
      setSavedThemes((prev) => ({ ...prev, [name]: themeCSS }));
      toast.success("Theme saved successfully!");
      setThemeInput("");
      setIsSaveDialogOpen(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4 items-center justify-center">
            <Button
              variant="outline"
              onClick={() => setIsPasteDialogOpen(true)}
              className="mb-2 sm:mb-0 flex items-center"
            >
              <Clipboard className="w-4 h-4 mr-2 mx-auto" />
            </Button>
            <Button
              variant="outline"
              onClick={resetToDefault}
              className="mb-2 sm:mb-0 flex items-center"
            >
              <RefreshCcw className="w-4 h-4 mr-2 mx-auto" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsSaveDialogOpen(true)}
              className="mb-2 sm:mb-0 flex items-center"
            >
              <Save className="w-4 h-4 mr-2 mx-auto" />
            </Button>
            <Button
              variant="outline"
              onClick={copyTheme}
              className="mb-2 sm:mb-0 bg-secondary text-secondary-foreground flex items-center"
            >
              <Copy className="w-4 h-4 mr-2 mx-auto" />
            </Button>
            <Button
              variant="outline"
              className="mb-2 sm:mb-0 flex items-center"
              onClick={() => setIsViewSavedThemesOpen(true)}
            >
              View Saved
            </Button>

            <Button
              onClick={() => {
                setTheme("light");
                setActiveMode("light");
              }}
              className="rounded-lg mb-2 sm:mb-0 flex items-center"
            >
              <Sun className="h-4 w-4 mr-2 mx-auto" />
            </Button>
            <Button
              onClick={() => {
                setTheme("dark");
                setActiveMode("dark");
              }}
              className="rounded-lg mb-2 sm:mb-0 flex items-center"
            >
              <Moon className="h-4 w-4 mr-2 mx-auto" />
            </Button>
          </div>
          {/* Paste Theme Dialog */}
          <Dialog open={isPasteDialogOpen} onOpenChange={setIsPasteDialogOpen}>
            <DialogContent className="bg-background/60">
              <DialogHeader>
                <DialogTitle>Paste CSS Theme</DialogTitle>
              </DialogHeader>
              <textarea
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                className="w-full h-60 border rounded p-2"
                placeholder="Paste your CSS theme..."
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={() => handlePasteTheme()}>
                  Done
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsPasteDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Save Theme Dialog */}
          <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter a cool theme name</DialogTitle>
              </DialogHeader>
              <Input
                value={themeInput}
                onChange={(e) => setThemeInput(e.target.value)}
                placeholder="Enter a cool theme name"
                className="mb-4"
              />
              <div className="flex items-center mb-4">
                <Checkbox
                  checked={includeAlpha}
                  onCheckedChange={(checked) =>
                    setIncludeAlpha(checked as boolean)
                  }
                  id="includeAlpha"
                />
                <label htmlFor="includeAlpha" className="ml-2">
                  Include the alpha channel (opacity)?
                </label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={saveTheme}>
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsSaveDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* View Saved Themes Dialog */}
          <Dialog
            open={isViewSavedThemesOpen}
            onOpenChange={setIsViewSavedThemesOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Saved Themes</DialogTitle>
              </DialogHeader>
              <ul>
                {Object.entries(savedThemes).map(([name, css]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <pre className="bg-gray-100 p-2 rounded">
                      {css}
                    </pre>
                  </li>
                ))}
              </ul>
              <Button onClick={() => setIsViewSavedThemesOpen(false)}>
                Close
              </Button>
            </DialogContent>
          </Dialog>

          {/* Color Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(colors).map(([name, config]) => {
              const hexColor = hslToHex(
                config.hue,
                config.saturation,
                config.lightness,
                config.alpha
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
                      backgroundColor: `hsl(${config.hue}, ${config.saturation}%, ${config.lightness}%${
                        includeAlpha && config.alpha < 1
                          ? ` / ${config.alpha * 100}%`
                          : ""
                      })`,
                    }}
                  />
                  <div className="relative p-4 space-y-2">
                    <div
                      className="w-full h-8 rounded shadow-sm"
                      style={{
                        backgroundColor: `hsl(${config.hue}, ${config.saturation}%, ${config.lightness}%${
                          includeAlpha && config.alpha < 1
                            ? ` / ${config.alpha * 100}%`
                            : ""
                        })`,
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="text-xs text-muted-foreground font-mono">
                        {hexColor}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Color Control Dialog */}
      <Dialog
        open={activeColor !== null}
        onOpenChange={(open) => !open && setActiveColor(null)}
      >
        <DialogContent className="">
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