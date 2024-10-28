"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, RefreshCcw, Save, Clipboard } from "lucide-react";
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
import { Input } from "@/components/ui/input"; // Ensure this import is present


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
  const [pasteInput, setPasteInput] = useState<string>("");
  const [isPasteDialogOpen, setIsPasteDialogOpen] = useState(false);
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});
  const [themeName, setThemeName] = useState<string>("");

  // Add a new state for the input value
  const [themeInput, setThemeInput] = useState<string>("");

  const [isViewSavedThemesOpen, setIsViewSavedThemesOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false); // State for dialog visibility

  useEffect(() => {
    const selectedThemeName = localStorage.getItem('selectedTheme');
    if (selectedThemeName) {
      const themeCSS = localStorage.getItem(selectedThemeName);
      if (themeCSS) {
        setPasteInput(themeCSS);
        setThemeName(selectedThemeName); 
        handlePasteTheme(themeCSS);
      }
    }
  }, []);

  const handlePasteTheme = () => {
    try {
      const parsedColors: Record<string, ColorConfig> = {};
      const regex = /--([\w-]+):\s*([\d-]+)\s+([\d]+)%\s+([\d]+)%/g;

      // Match the :root and .dark selectors
      const matches = pasteInput.match(/:root\s*{([^}]*)}/);
      const darkMatches = pasteInput.match(/\.dark\s*{([^}]*)}/);

      const addColorsFromMatch = (colorString: string) => {
        let match;
        while ((match = regex.exec(colorString)) !== null) {
          const name = match[1];
          const hue = parseInt(match[2], 10);
          const saturation = parseInt(match[3], 10);
          const lightness = parseInt(match[4], 10);
          parsedColors[name] = { hue, saturation, lightness, alpha: 1 }; // Default alpha
        }
      };

      if (matches) {
        const rootColors = matches[1];
        addColorsFromMatch(rootColors);
      }

      if (darkMatches) {
        const darkColors = darkMatches[1];
        addColorsFromMatch(darkColors);
      }

      
      const expectedColors = [
        "background",
        "foreground",
        "primary",
        "primary-foreground",
        "secondary",
        "secondary-foreground",
        "accent",
        "accent-foreground",
        "card",
        "card-foreground",
        "popover",
        "popover-foreground",
        "muted",
        "muted-foreground",
        "destructive",
        "destructive-foreground",
        "border",
        "input",
        "ring",
      ];

      expectedColors.forEach((color) => {
        if (!parsedColors[color]) {
          parsedColors[color] = {
            hue: 0,
            saturation: 0,
            lightness: 0,
            alpha: 1,
          };
        }
      });

      setColors(parsedColors);
      updateCSSVariables(parsedColors);
      toast.success("Theme updated successfully!");
    } catch (error) {
      console.error("Invalid theme format", error);
      toast.error("Failed to parse theme. Please check the format.");
    } finally {
      setIsPasteDialogOpen(false);
      setPasteInput("");
    }
  };

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
    const name = themeInput; // Use the input value
    if (name) {
      const themeCSS = generateThemeCSS();
      localStorage.setItem(name, themeCSS); 
      setSavedThemes((prev) => ({ ...prev, [name]: themeCSS }));
      toast.success("Theme saved successfully!");
      setThemeInput(""); // Clear the input after saving
      setIsSaveDialogOpen(false); // Close the dialog
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
              className="mb-2 sm:mb-0"
            >
              <Clipboard className="w-4 h-4 mr-2" /> {/* Icon for Paste */}
              Paste CSS Theme
            </Button>
            <Button variant="outline" onClick={resetToDefault} className="mb-2 sm:mb-0">
              <RefreshCcw className="w-4 h-4 mr-2" /> {/* Icon for Reset */}
              Reset
            </Button>
            <Button variant="outline" onClick={() => setIsSaveDialogOpen(true)} className="mb-2 sm:mb-0">
              <Save className="w-4 h-4 mr-2" /> {/* Icon for Save */}
              Save
            </Button>
            <Button variant="outline" onClick={copyTheme} className="mb-2 sm:mb-0">
              <Copy className="w-4 h-4 mr-2" /> {/* Icon for Copy */}
              Copy Theme CSS
            </Button>
            <Button variant="outline">
              <Link href="/saved">View Saved</Link>
            </Button>
          </div>
          {/* Paste Theme Dialog */}
          <Dialog open={isPasteDialogOpen} onOpenChange={setIsPasteDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Paste CSS Theme</DialogTitle>
              </DialogHeader>
              <textarea
                value={pasteInput}
                onChange={(e) => setPasteInput(e.target.value)}
                className="w-full h-60 border rounded p-2" // Increased height for better visibility
                placeholder="Paste your CSS theme here..."
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={handlePasteTheme}>
                  Done
                </Button>
                <Button variant="outline" onClick={() => setIsPasteDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogContent>
          </Dialog>

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
                <strong>{name}</strong>: {css}
              </li>
            ))}
          </ul>
          <Button onClick={() => setIsViewSavedThemesOpen(false)}>Close</Button>
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
          <Button variant="outline" onClick={saveTheme}>
            Save
          </Button>
          <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
