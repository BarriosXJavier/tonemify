"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Copy, RefreshCcw, Save, Clipboard, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { hslToHex } from "@/lib/colorUtils";
import { defaults } from "@/lib/colorUtils";
import { ColorConfig } from "@/lib/types";

export default function ThemeGenerator() {
  // State Management
  const [colors, setColors] = useState<Record<string, ColorConfig>>(defaults);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [pasteInput, setPasteInput] = useState("");
  const [dialogState, setDialogState] = useState({
    paste: false,
    save: false,
    viewSaved: false,
  });
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});
  const [themeInput, setThemeInput] = useState("");
  const [includeAlpha, setIncludeAlpha] = useState(false);
  const { setTheme } = useTheme();
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");

  // Load saved theme on mount
  useEffect(() => {
    const selectedTheme = localStorage.getItem("selectedTheme");
    if (selectedTheme) {
      const themeCSS = localStorage.getItem(selectedTheme);
      if (themeCSS) {
        handlePasteTheme(themeCSS);
      }
    }

    // Load all saved themes
    const themes: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key !== "selectedTheme") {
        const value = localStorage.getItem(key);
        if (value) themes[key] = value;
      }
    }
    setSavedThemes(themes);
  }, []);

  const handlePasteTheme = (input?: string) => {
    try {
      const parsedColors: Record<string, ColorConfig> = {};
      const parsedDarkColors: Record<string, ColorConfig> = {};
      const failedVariables: string[] = [];
      const inputString = input || pasteInput;

      // Regex patterns
      const variableRegex =
        /--([a-zA-Z0-9-]+):\s*((?:hsl|hsla)\([^)]+\)|[\d.]+\s+[\d.]+%\s+[\d.]+%(?:\s*\/\s*[\d.]+%?)?);/g;
      const rootSection = inputString.match(/:root\s*{([^}]*)}/s);
      const darkSection = inputString.match(/\.dark\s*{([^}]*)}/s);

      const parseColorValue = (value: string): ColorConfig | null => {
        const hslRegex =
          /^(?:hsl|hsla)\(\s*([\d.-]+)\s*,?\s*([\d.]+)%\s*,?\s*([\d.]+)%\s*(?:,\s*([\d.]+%?))?\s*\)$/;
        const spaceRegex =
          /^([\d.-]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*\/\s*([\d.]+%?))?$/;

        const match = value.match(hslRegex) || value.match(spaceRegex);
        if (!match) return null;

        return {
          hue: parseFloat(match[1]),
          saturation: parseFloat(match[2]),
          lightness: parseFloat(match[3]),
          alpha: match[4]
            ? match[4].endsWith("%")
              ? parseFloat(match[4]) / 100
              : parseFloat(match[4])
            : 1,
        };
      };

      const parseSection = (
        section: string,
        target: Record<string, ColorConfig>
      ) => {
        let match;
        while ((match = variableRegex.exec(section)) !== null) {
          const [, name, value] = match;
          if (!defaults[name]) continue; // Skip unknown variables
          const colorConfig = parseColorValue(value.trim());
          if (colorConfig) {
            target[name] = colorConfig;
          } else {
            failedVariables.push(name);
          }
        }
      };

      if (rootSection) parseSection(rootSection[1], parsedColors);
      if (darkSection) parseSection(darkSection[1], parsedDarkColors);

      const finalColors = { ...defaults, ...parsedColors };
      setColors(finalColors);
      updateCSSVariables(finalColors, ":root");

      if (darkSection) {
        const finalDarkColors = { ...defaults, ...parsedDarkColors };
        updateCSSVariables(finalDarkColors, ".dark");
      }

      if (failedVariables.length > 0) {
        toast.error(
          `Failed to parse the following variables: ${failedVariables.join(
            ", "
          )}. Others were updated successfully.`
        );
      } else {
        toast.success("Theme updated successfully!");
      }
    } catch (error) {
      console.error("Theme parsing error:", error);
      toast.error("Failed to parse theme. Please check the format.");
    } finally {
      setDialogState((prev) => ({ ...prev, paste: false }));
      setPasteInput("");
    }
  };

  const updateCSSVariables = (
    themeColors: Record<string, ColorConfig>,
    selector: string
  ): void => {
    const style =
      selector === ":root"
        ? document.documentElement.style
        : document.documentElement.style;
    Object.entries(themeColors).forEach(([name, config]) => {
      const value = `${config.hue} ${config.saturation}% ${config.lightness}%${
        includeAlpha && config.alpha < 1 ? ` / ${config.alpha * 100}%` : ""
      }`;
      style.setProperty(`--${name}`, value);
    });
  };

  const updateColor = (
    colorName: string,
    property: keyof ColorConfig,
    value: number
  ): void => {
    setColors((prev) => {
      const newColors = {
        ...prev,
        [colorName]: { ...prev[colorName], [property]: value },
      };
      updateCSSVariables(newColors, activeMode === "dark" ? ".dark" : ":root");
      return newColors;
    });
  };

  const generateThemeCSS = (): string => {
    const formatColor = ({
      hue,
      saturation,
      lightness,
      alpha,
    }: ColorConfig): string => {
      return includeAlpha && alpha < 1
        ? `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`
        : `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };

    const cssVariables = Object.entries(colors)
      .map(([name, config]) => `  --${name}: ${formatColor(config)};`)
      .join("\n");

    return `:root {\n${cssVariables}\n}\n\n.dark {\n${cssVariables}\n}`;
  };

  const actions = {
    copyTheme: () => {
      navigator.clipboard.writeText(generateThemeCSS());
      toast.success("Theme CSS copied to clipboard!");
    },

    resetToDefault: () => {
      if (JSON.stringify(colors) === JSON.stringify(defaults)) {
        toast.info("Theme is already at default!");
        return;
      }
      setColors(defaults);
      updateCSSVariables(defaults, activeMode === "dark" ? ".dark" : ":root");
      toast.success("Theme reset to default!");
    },

    saveTheme: () => {
      if (!themeInput.trim()) {
        toast.error("Please enter a theme name");
        return;
      }
      const css = generateThemeCSS();
      localStorage.setItem(themeInput, css);
      setSavedThemes((prev) => ({ ...prev, [themeInput]: css }));
      localStorage.setItem("selectedTheme", themeInput);
      toast.success("Theme saved successfully!");
      setThemeInput("");
      setDialogState((prev) => ({ ...prev, save: false }));
    },

    switchTheme: (mode: "light" | "dark") => {
      setTheme(mode);
      setActiveMode(mode);
      updateCSSVariables(colors, mode === "dark" ? ".dark" : ":root");
    },
  };

  return (
    <div className="min-h-screen font-mono">
      <div className="container max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {/* Control Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, paste: true }))
              }
              className="flex items-center"
            >
              <Clipboard className="w-4 h-4 mr-2" />
              Paste
            </Button>
            <Button
              variant="outline"
              onClick={actions.resetToDefault}
              className="flex items-center"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, save: true }))
              }
              className="flex items-center"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button
              variant="outline"
              onClick={actions.copyTheme}
              className="flex items-center bg-secondary text-secondary-foreground"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, viewSaved: true }))
              }
              className="flex items-center"
            >
              View Saved
            </Button>
            <Button
              onClick={() => actions.switchTheme("light")}
              className="flex items-center"
              variant={activeMode === "light" ? "default" : "outline"}
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </Button>
            <Button
              onClick={() => actions.switchTheme("dark")}
              className="flex items-center"
              variant={activeMode === "dark" ? "default" : "outline"}
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </Button>
          </div>

          {/* Color Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(colors).map(([name, config]) => (
              <Card
                key={name}
                className="group relative overflow-hidden hover:ring-2 hover:ring-primary/50 transition-all cursor-pointer"
                onClick={() => setActiveColor(name)}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundColor: `hsl(${config.hue}, ${
                      config.saturation
                    }%, ${config.lightness}%${
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
                      backgroundColor: `hsl(${config.hue}, ${
                        config.saturation
                      }%, ${config.lightness}%${
                        includeAlpha && config.alpha < 1
                          ? ` / ${config.alpha * 100}%`
                          : ""
                      })`,
                    }}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {hslToHex(
                        config.hue,
                        config.saturation,
                        config.lightness,
                        config.alpha
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dialogs */}
      {/* Paste Dialog */}
      <Dialog
        open={dialogState.paste}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, paste: open }))
        }
      >
        <DialogContent className="bg-background/60">
          <DialogHeader>
            <DialogTitle>Paste CSS Theme</DialogTitle>
          </DialogHeader>
          <textarea
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            className="w-full h-60 border rounded p-2"
            placeholder={`Paste your CSS theme...

Expected format:
:root {
  --color-name: hsl(255, 81%, 95%);
  /* ... */
}
.dark {
  --color-name: hsla(255, 50%, 10%, 0.9);
  /* ... */
}`}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => handlePasteTheme()}>
              Apply
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, paste: false }))
              }
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Save Dialog */}
      <Dialog
        open={dialogState.save}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, save: open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Theme</DialogTitle>
          </DialogHeader>
          <Input
            value={themeInput}
            onChange={(e) => setThemeInput(e.target.value)}
            placeholder="Enter theme name"
            className="mb-4"
          />
          <div className="flex items-center mb-4">
            <Checkbox
              checked={includeAlpha}
              onCheckedChange={(checked) => setIncludeAlpha(checked as boolean)}
              id="includeAlpha"
            />
            <label htmlFor="includeAlpha" className="ml-2">
              Include alpha channel
            </label>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={actions.saveTheme}>
              Save
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, save: false }))
              }
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Saved Themes Dialog */}
      <Dialog
        open={dialogState.viewSaved}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, viewSaved: open }))
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Saved Themes</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            {Object.entries(savedThemes).length === 0 ? (
              <p className="text-center text-muted-foreground">
                No saved themes yet
              </p>
            ) : (
              <ul className="space-y-4">
                {Object.entries(savedThemes).map(([name, css]) => (
                  <li key={name} className="border rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <strong>{name}</strong>
                      <div className="space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            handlePasteTheme(css);
                            setDialogState((prev) => ({
                              ...prev,
                              viewSaved: false,
                            }));
                          }}
                        >
                          Apply
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            localStorage.removeItem(name);
                            setSavedThemes((prev) => {
                              const { [name]: _, ...rest } = prev;
                              return rest;
                            });
                            toast.success(`Theme "${name}" deleted`);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                      {css}
                    </pre>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, viewSaved: false }))
              }
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Color Control Dialog */}
      <Dialog
        open={activeColor !== null}
        onOpenChange={(open) => !open && setActiveColor(null)}
      >
        <DialogContent>
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
