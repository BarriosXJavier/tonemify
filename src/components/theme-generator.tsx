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
import { defaults, defaultsDark } from "@/lib/colorUtils";
import { ColorConfig } from "@/lib/types";
import { generateThemeColorsFromPrimary } from "@/lib/colorUtils";
import { hexToHSL } from "@/lib/colorUtils";

export default function ThemeGenerator() {
  const [colorsLight, setColorsLight] =
    useState<Record<string, ColorConfig>>(defaults);
  const [colorsDark, setColorsDark] =
    useState<Record<string, ColorConfig>>(defaultsDark);
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

  useEffect(() => {
    const themes = Object.keys(localStorage).reduce((acc, key) => {
      if (key.startsWith("theme-")) {
        acc[key] = localStorage.getItem(key) || "";
      }
      return acc;
    }, {} as Record<string, string>);
    setSavedThemes(themes);
  }, []);

  const isValidColor = (config: ColorConfig): boolean => {
    return (
      !isNaN(config.hue) &&
      !isNaN(config.saturation) &&
      !isNaN(config.lightness) &&
      !isNaN(config.alpha)
    );
  };


 const handlePasteTheme = (input?: string) => {
   try {
     const parsedColorsLight: Record<string, ColorConfig> = {};
     const parsedColorsDark: Record<string, ColorConfig> = {};
     const failedVariables: string[] = [];
     const inputString = input || pasteInput;

     const variableRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;

     const lightSectionRegex = /:root\s*{([^}]*)}/s;
     const darkSectionRegex = /\.dark\s*{([^}]*)}/s;

     const lightSectionMatch = inputString.match(lightSectionRegex);
     const darkSectionMatch = inputString.match(darkSectionRegex);

     const parseColorValue = (value: string): ColorConfig | null => {
       const hslRegex =
         /^(?:hsl|hsla)\(\s*([\d.-]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+%?))?\s*\)$/;
       const spaceRegex =
         /^([\d.-]+)\s+([\d.]+)%\s+([\d.]+)%(?:\s*\/\s*([\d.]+%?))?$/;
       const hexRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

       let match;
       if ((match = value.match(hslRegex) || value.match(spaceRegex))) {
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
       } else if ((match = value.match(hexRegex))) {
         // Convert hex to HSL here
         const hsl = hexToHSL(value);
         return hsl;
       } else {
         return null;
       }
     };

     const parseSection = (
       section: string,
       target: Record<string, ColorConfig>
     ) => {
       let match;
       while ((match = variableRegex.exec(section)) !== null) {
         const [, name, value] = match;
         if (!defaults[name]) continue;
         const colorConfig = parseColorValue(value.trim());
         if (colorConfig) {
           target[name] = colorConfig;
         } else {
           failedVariables.push(name);
         }
       }
     };

     if (lightSectionMatch) {
       parseSection(lightSectionMatch[1], parsedColorsLight);
     } else {
       // If no light section, parse entire input for light mode
       parseSection(inputString, parsedColorsLight);
     }

     if (darkSectionMatch) {
       parseSection(darkSectionMatch[1], parsedColorsDark);
     }

     const applyGeneratedColors = (
       parsedColors: Record<string, ColorConfig>,
       mode: "light" | "dark"
     ) => {
       if (parsedColors["primary"]) {
         const baseHue = parsedColors["primary"].hue;
         const isDarkMode = mode === "dark";
         const generatedColors = generateThemeColorsFromPrimary(baseHue, isDarkMode);

         Object.keys(generatedColors).forEach((key) => {
           if (!parsedColors[key]) {
             parsedColors[key] = generatedColors[key];
           }
         });
       }
     };

     applyGeneratedColors(parsedColorsLight, "light");
     applyGeneratedColors(parsedColorsDark, "dark");

     // Generate dark mode colors if only light mode colors are provided
     if (
       Object.keys(parsedColorsDark).length === 0 &&
       Object.keys(parsedColorsLight).length > 0
     ) {
       const baseHue = parsedColorsLight["primary"]?.hue;
       if (baseHue !== undefined) {
         const generatedColorsDark = generateThemeColorsFromPrimary(baseHue, true);
         Object.keys(generatedColorsDark).forEach((key) => {
           if (!parsedColorsDark[key]) {
             parsedColorsDark[key] = generatedColorsDark[key];
           }
         });
       }
     }

     if (
       Object.keys(parsedColorsLight).length === 0 &&
       Object.keys(parsedColorsDark).length === 0
     ) {
       toast.error("No valid colors found in the pasted theme.");
     } else {
       if (Object.keys(parsedColorsLight).length > 0) {
         const finalColorsLight = { ...colorsLight, ...parsedColorsLight };
         setColorsLight(finalColorsLight);
         if (activeMode === "light") {
           updateCSSVariables(finalColorsLight);
         }
       }

       if (Object.keys(parsedColorsDark).length > 0) {
         const finalColorsDark = { ...colorsDark, ...parsedColorsDark };
         setColorsDark(finalColorsDark);
         if (activeMode === "dark") {
           updateCSSVariables(finalColorsDark);
         }
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
    themeColors: Record<string, ColorConfig>
  ): void => {
    const style = document.documentElement.style;
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
    if (activeMode === "light") {
      setColorsLight((prev) => {
        const newColors = {
          ...prev,
          [colorName]: { ...prev[colorName], [property]: value },
        };
        updateCSSVariables(newColors);
        return newColors;
      });
    } else {
      setColorsDark((prev) => {
        const newColors = {
          ...prev,
          [colorName]: { ...prev[colorName], [property]: value },
        };
        updateCSSVariables(newColors);
        return newColors;
      });
    }
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

    const lightVariables = Object.entries(colorsLight)
      .map(([name, config]) => `  --${name}: ${formatColor(config)};`)
      .join("\n");

    const darkVariables = Object.entries(colorsDark)
      .map(([name, config]) => `  --${name}: ${formatColor(config)};`)
      .join("\n");

    return `:root {\n${lightVariables}\n}\n\n.dark {\n${darkVariables}\n}`;
  };

  const actions = {
    copyTheme: () => {
      navigator.clipboard.writeText(generateThemeCSS());
      toast.success("Theme CSS copied to clipboard!");
    },

    resetToDefault: () => {
      if (
        JSON.stringify(colorsLight) === JSON.stringify(defaults) &&
        JSON.stringify(colorsDark) === JSON.stringify(defaultsDark)
      ) {
        toast.info("Theme is already at default!");
        return;
      }
      setColorsLight(defaults);
      setColorsDark(defaultsDark);
      updateCSSVariables(activeMode === "light" ? defaults : defaultsDark);
      toast.success("Theme reset to default!");
    },

    saveTheme: () => {
      if (!themeInput.trim()) {
        toast.error("Please enter a theme name");
        return;
      }
      const css = generateThemeCSS();
      const themeKey = `theme-${themeInput.trim()}`;
      localStorage.setItem(themeKey, css);
      setSavedThemes((prev) => ({ ...prev, [themeKey]: css }));
      toast.success("Theme saved successfully!");
      setThemeInput("");
      setDialogState((prev) => ({ ...prev, save: false }));
    },

    switchTheme: (mode: "light" | "dark") => {
      setTheme(mode);
      setActiveMode(mode);
      updateCSSVariables(mode === "light" ? colorsLight : colorsDark);
    },
  };

  const currentColors = activeMode === "light" ? colorsLight : colorsDark;

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
              className="flex items-center text-primary"
              title="Paste Theme"
            >
              <Clipboard className="w-4 h-4 mr-2" />
            </Button>
            <Button
              variant="outline"
              onClick={actions.resetToDefault}
              className="flex items-center text-primary"
              title="Reset Theme"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, save: true }))
              }
              className="flex items-center text-primary"
              title="Save Theme"
            >
              <Save className="w-4 h-4 mr-2" />
            </Button>
            <Button
              variant="outline"
              onClick={actions.copyTheme}
              className="flex items-center text-primary"
              title="Copy Theme"
            >
              <Copy className="w-4 h-4 mr-2" />
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                setDialogState((prev) => ({ ...prev, viewSaved: true }))
              }
              className="flex items-center text-primary"
              title="View Saved Themes"
            >
              View Saved
            </Button>
            <div className="flex gap-2">
              <Button
                onClick={() => actions.switchTheme("light")}
                className={`relative flex items-center min-w-[100px] justify-start ${
                  activeMode === "light"
                    ? "bg-primary text-white"
                    : "text-primary"
                }`}
                variant="outline"
                title="Light Mode"
              >
                <Sun className="w-4 h-4 mr-2" />
                {activeMode === "light" && (
                  <span className="absolute right-2 top-0.5 text-[10px] font-medium opacity-80">
                    active
                  </span>
                )}
              </Button>
              <Button
                onClick={() => actions.switchTheme("dark")}
                className={`relative flex items-center min-w-[100px] justify-start ${
                  activeMode === "dark"
                    ? "bg-primary text-white"
                    : "text-primary"
                }`}
                variant="outline"
                title="Dark Mode"
              >
                <Moon className="w-4 h-4 mr-2" />
                {activeMode === "dark" && (
                  <span className="absolute right-2 top-0.5 text-[10px] font-medium opacity-80">
                    active
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Color Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(currentColors).map(([name, config]) => {
              const validColor = isValidColor(config);
              const backgroundColor = validColor
                ? `hsl(${config.hue}, ${config.saturation}%, ${
                    config.lightness
                  }%${
                    includeAlpha && config.alpha < 1
                      ? ` / ${config.alpha * 100}%`
                      : ""
                  })`
                : "transparent";

              const hexValue = validColor
                ? hslToHex(
                    config.hue,
                    config.saturation,
                    config.lightness,
                    config.alpha
                  )
                : "N/A";

              // Determine text color based on background lightness
              const textColor =
                config.lightness > 50 ? "text-black" : "text-white";

              return (
                <Card
                  key={name}
                  className={`
                p-4 
                flex 
                flex-col 
                items-center 
                justify-center 
                ${textColor}
                transition-all 
                duration-300 
                ease-in-out
                hover:scale-105 
                hover:shadow-xl 
                cursor-pointer
                active:scale-95
              `}
                  style={{ backgroundColor }}
                  onClick={() => setActiveColor(name)}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs font-bold">{hexValue}</p>
                  </div>
                </Card>
              );
            })}
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
        <DialogContent className="bg-background/60 p-4 sm:p-6 md:p-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <DialogHeader>
            <DialogTitle>Paste Theme</DialogTitle>
          </DialogHeader>
          <textarea
            value={pasteInput}
            onChange={(e) => setPasteInput(e.target.value)}
            className="w-full h-40 sm:h-48 md:h-60 border rounded p-2 text-black dark:text-white"
            placeholder={`Paste your CSS theme...

Expected format:
:root {
  --color-name: hsl(255, 81%, 95%);
  /* other classes */
}
.dark {
  --color-name: hsla(255, 50%, 10%, 0.9);
  /* other classes */
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
                    <pre className="bg-background text-primary dark:text-foreground p-2 rounded text-xs overflow-x-auto">
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
            <DialogTitle className="capitalize">{activeColor!}</DialogTitle>
          </DialogHeader>
          {activeColor && (
            <ColorControls
              color={{
                ...currentColors[activeColor!],
                alpha: currentColors[activeColor!].alpha ?? 1,
              }}
              onChange={(property, value) =>
                updateColor(activeColor!, property, value)
              }
              onHexChange={() => {}}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
