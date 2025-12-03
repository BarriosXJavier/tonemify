"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  Copy,
  RefreshCcw,
  Save,
  Clipboard,
  Moon,
  Sun,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { convertColor, rgbToHSL, hslToOKLCH, oklchToCSS, oklchToHSL, parseOKLCH, parseToHSL } from "@/lib/color-utils";
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
import { hslToHex } from "@/lib/color-utils";
import { defaults, defaultsDark } from "@/lib/color-utils";
import { ColorConfig, ColorFormat } from "@/lib/types";
import { generateThemeColorsFromPrimary } from "@/lib/color-utils";
import { hexToHSL } from "@/lib/color-utils";
import TailwindColorPicker from "./tailwind-color-picker";
import ThemePreview from "./theme-preview";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcut, getModifierKey } from "@/lib/keyboard-shortcuts";
import ColorHarmonyPicker from "./color-harmony-picker";
import ThemePresetsPicker from "./theme-presets-picker";
import ShareThemeDialog from "./share-theme-dialog";
import AccessibilityChecker from "./accessibility-checker";
import { getThemeFromURL } from "@/lib/url-sharing";

interface ThemeHistoryEntry {
  light: Record<string, ColorConfig>;
  dark: Record<string, ColorConfig>;
}

export default function ThemeGenerator() {
  const [colorsLight, setColorsLight] =
    useState<Record<string, ColorConfig>>(defaults);
  const [colorsDark, setColorsDark] =
    useState<Record<string, ColorConfig>>(defaultsDark);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [pasteInput, setPasteInput] = useState("");
  const [pasteInputFormat, setPasteInputFormat] = useState<"auto" | "hex" | "rgb" | "hsl" | "oklch">("auto");
  const [dialogState, setDialogState] = useState({
    paste: false,
    save: false,
  });
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});
  const [themeInput, setThemeInput] = useState("");
  const [includeAlpha, setIncludeAlpha] = useState(false);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hsl");
  const { setTheme } = useTheme();
  const [activeMode, setActiveMode] = useState<"light" | "dark">("light");
  const [convertDialogOpen, setConvertDialogOpen] = useState(false);
  const [colorInput, setColorInput] = useState("");
  const [inputFormat, setInputFormat] = useState<"hex" | "rgb" | "hsl" | "oklch">("hex");
  const [selectedFormat, setSelectedFormat] = useState<
    "hex" | "rgb" | "rgba" | "hsl" | "hsla"
  >("hex");
  const [convertedColor, setConvertedColor] = useState<string | null>(null);
  const [themeHistory, setThemeHistory] = useState<ThemeHistoryEntry[]>([
    { light: defaults, dark: defaultsDark },
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const maxHistorySize = 50;
  const [showPreview, setShowPreview] = useState(false);

  const handleConvert = () => {
    const trimmedInput = colorInput.trim();
    
    const parsed = parseToHSL(trimmedInput, inputFormat);
    if (!parsed) {
      toast.error(`Invalid ${inputFormat.toUpperCase()} color format. Please check your input.`);
      setConvertedColor(null);
      return;
    }
    
    // Convert HSL to the desired output format
    const hslString = `hsl(${parsed.hue}, ${parsed.saturation}%, ${parsed.lightness}%)`;
    const result = convertColor(hslString, selectedFormat);
    if (result) {
      setConvertedColor(result);
      toast.success("Color converted successfully!");
    } else {
      toast.error("Conversion failed. Please try again.");
      setConvertedColor(null);
    }
  };

  const handleCopy = () => {
    if (convertedColor) {
      navigator.clipboard.writeText(convertedColor);
      toast.success("Converted color copied to clipboard!");
    } else {
      toast.error("No converted color to copy.");
    }
  };

  useEffect(() => {
    const themes = Object.keys(localStorage).reduce(
      (acc, key) => {
        if (key.startsWith("theme-")) {
          acc[key] = localStorage.getItem(key) || "";
        }
        return acc;
      },
      {} as Record<string, string>,
    );
    setSavedThemes(themes);

    // Check for theme to apply from /saved page
    const themeToApply = localStorage.getItem("theme-to-apply");
    if (themeToApply) {
      localStorage.removeItem("theme-to-apply");
      handlePasteTheme(themeToApply);
      toast.success("Theme applied from saved collection!");
    } else {
      // Load theme from URL if present (only on mount)
      const urlTheme = getThemeFromURL();
      if (urlTheme) {
        setColorsLight(urlTheme.light);
        setColorsDark(urlTheme.dark);
        const initialMode =
          activeMode === "light" ? urlTheme.light : urlTheme.dark;
        updateCSSVariables(initialMode);
        setThemeHistory([{ light: urlTheme.light, dark: urlTheme.dark }]);
        setHistoryIndex(0);
        toast.success("Theme loaded from URL!");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidColor = (config: ColorConfig): boolean => {
    return (
      !isNaN(config.hue) &&
      !isNaN(config.saturation) &&
      !isNaN(config.lightness) &&
      !isNaN(config.alpha ?? 1)
    );
  };

  const handlePasteTheme = (input?: string) => {
    try {
      const parsedColorsLight: Record<string, ColorConfig | string> = {};
      const parsedColorsDark: Record<string, ColorConfig | string> = {};
      const failedVariables: string[] = [];
      const inputString = input || pasteInput;

      const variableRegex = /--([a-zA-Z0-9-]+):\s*([^;]+);/g;

      const lightSectionRegex = /:root\s*{([^}]*)}/s;
      const darkSectionRegex = /\.dark\s*{([^}]*)}/s;

      const lightSectionMatch = inputString.match(lightSectionRegex);
      const darkSectionMatch = inputString.match(darkSectionRegex);

      const isFullTheme = lightSectionMatch || darkSectionMatch;
      
      // If not a full theme AND format is "auto", that's an error
      if (!isFullTheme && pasteInputFormat === "auto") {
        toast.error("Please select a color format (HEX, RGB, HSL, or OKLCH) for single color input");
        return;
      }
      
      // If not a full theme, it's a single color - use the selected format
      if (!isFullTheme) {
        const trimmedInput = inputString.trim();
        
        const parsedColor = parseToHSL(trimmedInput, pasteInputFormat);
        if (!parsedColor) {
          toast.error(`Invalid ${pasteInputFormat.toUpperCase()} color format. Please check your input.`);
          return;
        }
        
        // Generate theme from this single color
        const generatedColorsLight = generateThemeColorsFromPrimary(
          parsedColor.hue,
          parsedColor.saturation,
          parsedColor.lightness,
          false
        );
        const generatedColorsDark = generateThemeColorsFromPrimary(
          parsedColor.hue,
          parsedColor.saturation,
          parsedColor.lightness,
          true
        );
        
        addToHistory(generatedColorsLight, generatedColorsDark);
        setColorsLight(generatedColorsLight);
        setColorsDark(generatedColorsDark);
        updateCSSVariables(
          activeMode === "light" ? generatedColorsLight : generatedColorsDark
        );
        setDialogState((prev) => ({ ...prev, paste: false }));
        toast.success("Theme generated from color!");
        return;
      }

      // For full CSS themes (pasteInputFormat === "auto"), parse variables with auto-detection
      const parseColorValue = (value: string): ColorConfig | string | null => {
        value = value.trim();
        
        // Check for radius values first (not colors)
        const radiusRegex = /^([\d.]+)rem$/i;
        const radiusMatch = value.match(radiusRegex);
        if (radiusMatch) {
          return `${parseFloat(radiusMatch[1])}rem`;
        }
        
        // For CSS theme variables, use auto-detection (they typically have % signs)
        const parsedColor = parseToHSL(value, "auto");
        if (parsedColor) {
          return parsedColor;
        }
        
        return null;
      };

      const parseSection = (
        section: string,
        target: Record<string, ColorConfig | string>,
      ) => {
        let match;
        while ((match = variableRegex.exec(section)) !== null) {
          const [, name, value] = match;
          const parsedValue = parseColorValue(value.trim());
          if (parsedValue) {
            target[name] = parsedValue;
          } else {
            failedVariables.push(name);
          }
        }
      };

      if (lightSectionMatch) {
        parseSection(lightSectionMatch[1], parsedColorsLight);
      }

      if (darkSectionMatch) {
        parseSection(darkSectionMatch[1], parsedColorsDark);
      }

      let baseHue: number | undefined;
      let baseSaturation: number | undefined;
      let baseLightness: number | undefined;

      if (parsedColorsLight["primary"]) {
        const primaryColor = parsedColorsLight["primary"] as ColorConfig;
        baseHue = primaryColor.hue;
        baseSaturation = primaryColor.saturation;
        baseLightness = primaryColor.lightness;
      } else if (parsedColorsDark["primary"]) {
        const primaryColor = parsedColorsDark["primary"] as ColorConfig;
        baseHue = primaryColor.hue;
        baseSaturation = primaryColor.saturation;
        baseLightness = primaryColor.lightness;
      }

      if (!baseHue) {
        const parsedColor = parseColorValue(inputString);
        if (parsedColor && typeof parsedColor !== "string") {
          baseHue = parsedColor.hue;
          baseSaturation = parsedColor.saturation;
          baseLightness = parsedColor.lightness;
        }
      }

      if (
        baseHue !== undefined &&
        baseSaturation !== undefined &&
        baseLightness !== undefined
      ) {
        const generatedColorsLight = generateThemeColorsFromPrimary(
          baseHue,
          baseSaturation,
          baseLightness,
          false,
        );
        Object.keys(generatedColorsLight).forEach((key) => {
          if (!parsedColorsLight[key]) {
            parsedColorsLight[key] =
              generatedColorsLight[key as keyof typeof generatedColorsLight];
          }
        });

        const generatedColorsDark = generateThemeColorsFromPrimary(
          baseHue,
          baseSaturation,
          baseLightness,
          true,
        );
        Object.keys(generatedColorsDark).forEach((key) => {
          if (!parsedColorsDark[key]) {
            parsedColorsDark[key as keyof typeof generatedColorsDark] =
              generatedColorsDark[key as keyof typeof generatedColorsDark];
          }
        });
      }

      if (
        Object.keys(parsedColorsLight).length === 0 &&
        Object.keys(parsedColorsDark).length === 0
      ) {
        toast.error("No valid colors found in the pasted theme.");
      } else {
        if (Object.keys(parsedColorsLight).length > 0) {
          const finalColorsLight = { ...colorsLight, ...parsedColorsLight };
          const filteredColorsLight = Object.fromEntries(
            Object.entries(finalColorsLight).filter(
              ([, value]) => typeof value !== "string",
            ),
          ) as Record<string, ColorConfig>;
          setColorsLight(filteredColorsLight);
          if (activeMode === "light") {
            updateCSSVariables(finalColorsLight);
          }
        }

        if (Object.keys(parsedColorsDark).length > 0) {
          const finalColorsDark = { ...colorsDark, ...parsedColorsDark };
          const filteredColorsDark = Object.fromEntries(
            Object.entries(finalColorsDark).filter(
              ([, value]) => typeof value !== "string",
            ),
          ) as Record<string, ColorConfig>;
          setColorsDark(filteredColorsDark);
          if (activeMode === "dark") {
            updateCSSVariables(finalColorsDark);
          }
        }

        // Add pasted theme to history
        const finalLight =
          Object.keys(parsedColorsLight).length > 0
            ? (Object.fromEntries(
                Object.entries({ ...colorsLight, ...parsedColorsLight }).filter(
                  ([, value]) => typeof value !== "string",
                ),
              ) as Record<string, ColorConfig>)
            : colorsLight;

        const finalDark =
          Object.keys(parsedColorsDark).length > 0
            ? (Object.fromEntries(
                Object.entries({ ...colorsDark, ...parsedColorsDark }).filter(
                  ([, value]) => typeof value !== "string",
                ),
              ) as Record<string, ColorConfig>)
            : colorsDark;

        addToHistory(finalLight, finalDark);

        if (failedVariables.length > 0) {
          toast.error(
            `Failed to parse the following variables: ${failedVariables.join(
              ", ",
            )}. Others were updated successfully.`,
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

  const radiusValues = ["0", "0.3rem", "0.5rem", "0.75rem", "1rem"];
  const [selectedRadius, setSelectedRadius] = useState<string>("0.5rem");

  const handleRadiusChange = (radius: string) => {
    setSelectedRadius(radius);
    document.documentElement.style.setProperty("--radius", radius);
  };

  const updateCSSVariables = (
    themeColors: Record<string, ColorConfig | string>,
  ): void => {
    const style = document.documentElement.style;
    Object.entries(themeColors).forEach(([name, config]) => {
      if (name === "radius") {
        style.setProperty(`--${name}`, config as string);
      } else {
        const { hue, saturation, lightness } = config as ColorConfig;
        style.setProperty(`--${name}`, `${hue} ${saturation}% ${lightness}%`);
      }
    });
  };

  const addToHistory = (
    lightColors: Record<string, ColorConfig>,
    darkColors: Record<string, ColorConfig>,
  ) => {
    setHistoryIndex((currentIndex) => {
      setThemeHistory((prev) => {
        // Remove any future history if we're not at the end
        const newHistory = prev.slice(0, currentIndex + 1);
        newHistory.push({ light: lightColors, dark: darkColors });

        if (newHistory.length > maxHistorySize) {
          newHistory.shift();
          return newHistory;
        }

        return newHistory;
      });

      const projectedLength = Math.min(currentIndex + 2, maxHistorySize);
      return projectedLength - 1;
    });
  };

  const navigateHistory = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? Math.max(0, historyIndex - 1)
        : Math.min(themeHistory.length - 1, historyIndex + 1);

    if (newIndex !== historyIndex) {
      setHistoryIndex(newIndex);
      const entry = themeHistory[newIndex];

      if (entry && entry.light && entry.dark) {
        setColorsLight(entry.light);
        setColorsDark(entry.dark);
        updateCSSVariables(activeMode === "light" ? entry.light : entry.dark);
        toast.success(
          `Navigated to theme ${newIndex + 1} of ${themeHistory.length}`,
        );
      }
    }
  };

  const updateColor = (
    colorName: string,
    property: keyof ColorConfig,
    value: string | number,
  ): void => {
    // Ensure value is a number for numeric properties
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (activeMode === "light") {
      setColorsLight((prev) => {
        const newColors = {
          ...prev,
          [colorName]: { ...prev[colorName], [property]: numericValue },
        };
        updateCSSVariables(newColors);
        return newColors;
      });
    } else {
      setColorsDark((prev) => {
        const newColors = {
          ...prev,
          [colorName]: { ...prev[colorName], [property]: numericValue },
        };
        updateCSSVariables(newColors);
        return newColors;
      });
    }
  };

  const generateThemeCSS = (): string => {
    const formatColor = (config: ColorConfig): string => {
      if (colorFormat === 'oklch') {
        const oklchColor = hslToOKLCH(config);
        return oklchToCSS(oklchColor);
      }
      // Round HSL values to 1 decimal place for cleaner output
      const h = Math.round(config.hue * 10) / 10;
      const s = Math.round(config.saturation * 10) / 10;
      const l = Math.round(config.lightness * 10) / 10;
      return `${h} ${s}% ${l}%`;
    };

    const lightVariables = Object.entries(colorsLight)
      .map(([name, config]) => `    --${name}: ${formatColor(config)};`)
      .join("\n");

    const darkVariables = Object.entries(colorsDark)
      .map(([name, config]) => `    --${name}: ${formatColor(config)};`)
      .join("\n");

    return `:root {\n    --radius: ${selectedRadius};\n${lightVariables}\n  }\n\n  .dark {\n${darkVariables}\n  }`;
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

    generateRandomTheme: () => {
      const randomHue = Math.floor(Math.random() * 360);
      const randomSaturation = Math.floor(Math.random() * 100);
      const randomLightness = Math.floor(Math.random() * 100);
      const newColorsLight = generateThemeColorsFromPrimary(
        randomHue,
        randomSaturation,
        randomLightness,
        false,
      );
      const newColorsDark = generateThemeColorsFromPrimary(
        randomHue,
        randomSaturation,
        randomLightness,
        true,
      );
      addToHistory(newColorsLight, newColorsDark);
      setColorsLight(newColorsLight);
      setColorsDark(newColorsDark);
      updateCSSVariables(
        activeMode === "light" ? newColorsLight : newColorsDark,
      );
      toast.success("Random theme generated!");
    },

    applyHarmony: (
      lightColors: Record<string, ColorConfig>,
      darkColors: Record<string, ColorConfig>,
    ) => {
      addToHistory(lightColors, darkColors);
      setColorsLight(lightColors);
      setColorsDark(darkColors);
      updateCSSVariables(activeMode === "light" ? lightColors : darkColors);
    },

    applyPreset: (
      lightColors: Record<string, ColorConfig>,
      darkColors: Record<string, ColorConfig>,
      presetName: string,
    ) => {
      addToHistory(lightColors, darkColors);
      setColorsLight(lightColors);
      setColorsDark(darkColors);
      updateCSSVariables(activeMode === "light" ? lightColors : darkColors);
    },
  };

  // Keyboard shortcuts configuration
  const modifierKey = getModifierKey();
  const shortcuts: KeyboardShortcut[] = useMemo(
    () => [
      {
        key: "c",
        [modifierKey]: true,
        description: "Copy theme CSS",
        action: actions.copyTheme,
      },
      {
        key: "s",
        [modifierKey]: true,
        description: "Save theme",
        action: () => setDialogState((prev) => ({ ...prev, save: true })),
      },
      {
        key: "r",
        [modifierKey]: true,
        description: "Generate random theme",
        action: actions.generateRandomTheme,
      },
      {
        key: "l",
        [modifierKey]: true,
        description: "Switch to light mode",
        action: () => actions.switchTheme("light"),
      },
      {
        key: "d",
        [modifierKey]: true,
        description: "Switch to dark mode",
        action: () => actions.switchTheme("dark"),
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
    ],
    [modifierKey],
  );

  useKeyboardShortcuts(shortcuts);

  const currentColors = activeMode === "light" ? colorsLight : colorsDark;

  const scrollToPreview = () => {
    setShowPreview(true);
    setTimeout(() => {
      const previewElement = document.getElementById("theme-preview-section");
      if (previewElement) {
        previewElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div className="font-mono">
      <div className="">
        {!showPreview && (
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-3 w-full px-2 sm:px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 items-stretch">
              <div className="flex flex-row gap-1.5 sm:gap-2 items-center justify-center border border-border rounded-lg p-1.5 sm:p-2 bg-muted/30 min-h-[60px]">
                <Button
                  variant="ghost"
                  onClick={() => navigateHistory("prev")}
                  disabled={historyIndex === 0}
                  className="h-8 sm:h-9 px-1.5 sm:px-2 md:px-3 flex items-center justify-center gap-0.5 sm:gap-1 text-xs flex-shrink-0"
                  title="Previous Theme"
                >
                  ← <span className="hidden xs:inline">prev</span>
                </Button>
                <div className="hidden xs:block h-6 w-px bg-border" />
                <div className="flex flex-col items-center gap-0.5 sm:gap-1 flex-1 min-w-0">
                  <Button
                    variant="ghost"
                    onClick={actions.generateRandomTheme}
                    className="flex items-center justify-center gap-1 sm:gap-2 h-8 sm:h-9 px-1.5 sm:px-2 md:px-3 bg-secondary hover:bg-secondary/80 whitespace-nowrap text-xs w-full"
                    title="Generate Random Theme"
                  >
                    <span className="hidden xs:inline">🎲</span> Random Theme
                  </Button>
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
                    {historyIndex + 1}/{themeHistory.length}
                  </span>
                </div>
                <div className="hidden xs:block h-6 w-px bg-border" />
                <Button
                  variant="ghost"
                  onClick={() => navigateHistory("next")}
                  disabled={historyIndex === themeHistory.length - 1}
                  className="h-8 sm:h-9 px-1.5 sm:px-2 md:px-3 flex items-center justify-center gap-0.5 sm:gap-1 text-xs flex-shrink-0"
                  title="Next Theme"
                >
                  <span className="hidden xs:inline">next</span> →
                </Button>
              </div>

              {/* Theme Presets */}
              <ThemePresetsPicker
                activeMode={activeMode}
                onApplyPresetAction={actions.applyPreset}
              />

              {/* Preview Button */}
              <Button
                variant="outline"
                onClick={scrollToPreview}
                className="flex items-center justify-center gap-2 h-full min-h-[60px] bg-muted/30 hover:bg-muted/50 text-sm sm:text-base"
                title="View Theme Preview"
              >
                <span className="text-lg sm:text-xl">👁️</span>
                Preview
              </Button>
            </div>
            {/* Tailwind Color Picker - Full Width */}
            <TailwindColorPicker />

            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-2">
              <Button
                variant="outline"
                onClick={() =>
                  setDialogState((prev) => ({ ...prev, paste: true }))
                }
                className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 text-xs sm:text-sm px-2 sm:px-4"
                title="Import Theme"
              >
                <Clipboard className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Import theme/color</span>
              </Button>

              <Button
                variant="outline"
                onClick={() => setConvertDialogOpen(true)}
                className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 text-xs sm:text-sm px-2 sm:px-4"
                title="Convert Color Format"
              >
                <span className="truncate">Convert Color</span>
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  setDialogState((prev) => ({ ...prev, save: true }))
                }
                className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 text-xs sm:text-sm px-2 sm:px-4"
                title="Save Theme"
              >
                <Save className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Save theme</span>
              </Button>

              <Button
                variant="outline"
                onClick={actions.copyTheme}
                className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 text-xs sm:text-sm px-2 sm:px-4"
                title="Copy Theme CSS"
              >
                <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="truncate">Copy theme</span>
              </Button>
            </div>

            {/* Mode & Radius Controls */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-3 items-stretch">
              {/* Light/Dark Mode Toggle */}
              <div className="flex gap-2 border border-border rounded-lg p-2 bg-muted/30 min-h-[60px]">
                <Button
                  onClick={() => actions.switchTheme("light")}
                  className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm ${
                    activeMode === "light"
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                  variant="outline"
                  title="Light Mode"
                >
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground flex-shrink-0" />
                  <span className="truncate">Light</span>
                  {activeMode === "light" && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500" />
                  )}
                </Button>
                <Button
                  onClick={() => actions.switchTheme("dark")}
                  className={`relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-9 sm:h-10 text-xs sm:text-sm ${
                    activeMode === "dark"
                      ? "bg-primary text-white"
                      : "text-primary"
                  }`}
                  variant="outline"
                  title="Dark Mode"
                >
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground flex-shrink-0" />
                  <span className="truncate">Dark</span>
                  {activeMode === "dark" && (
                    <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500" />
                  )}
                </Button>
              </div>

              {/* Color Format Toggle */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 border border-border rounded-lg p-2 bg-muted/30 min-h-[60px]">
                <div className="flex gap-1">
                  <Button
                    variant={colorFormat === "hsl" ? "default" : "ghost"}
                    onClick={() => setColorFormat("hsl")}
                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs"
                    title="HSL format (Hue Saturation Lightness)"
                  >
                    HSL
                  </Button>
                  <Button
                    variant={colorFormat === "oklch" ? "default" : "ghost"}
                    onClick={() => {
                      setColorFormat("oklch");
                      toast.success("OKLCH: Perceptually uniform colors!");
                    }}
                    className="h-8 sm:h-9 px-2 sm:px-3 text-xs"
                    title="OKLCH format (Oklab) - Perceptually uniform"
                  >
                    OKLCH
                  </Button>
                </div>
              </div>

              {/* Border Radius Selector */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 border border-border rounded-lg p-2 bg-muted/30 min-h-[60px]">
                <div className="flex gap-1 flex-wrap justify-center">
                  {radiusValues.map((radius) => (
                    <Button
                      key={radius}
                      variant={selectedRadius === radius ? "default" : "ghost"}
                      onClick={() => handleRadiusChange(radius)}
                      className="h-8 sm:h-9 px-1.5 sm:px-2 text-xs min-w-[40px]"
                      title={`Border radius: ${radius}`}
                    >
                      {radius}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 sm:gap-3">
              <Button
                variant="outline"
                asChild
                className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 text-xs sm:text-sm"
                title="View Saved Themes"
              >
                <Link href="/saved">
                  <span className="truncate">View Saved</span>
                </Link>
              </Button>

              <ShareThemeDialog
                lightColors={colorsLight}
                darkColors={colorsDark}
              />
            </div>

            <Button
              variant="destructive"
              onClick={actions.resetToDefault}
              className="flex items-center justify-center gap-1.5 sm:gap-2 h-11 sm:h-12 w-full text-xs sm:text-sm"
              title="Reset to Default"
            >
              <RefreshCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Reset</span>
            </Button>
          </div>

          <Dialog open={convertDialogOpen} onOpenChange={setConvertDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Convert Color</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Input Format</label>
                  <select
                    value={inputFormat}
                    onChange={(e) =>
                      setInputFormat(
                        e.target.value as "hex" | "rgb" | "hsl" | "oklch"
                      )
                    }
                    className="w-full p-2 border rounded bg-background"
                  >
                    <option value="hex">HEX (e.g., #F54927 or F54927)</option>
                    <option value="rgb">RGB (e.g., 245, 73, 39)</option>
                    <option value="hsl">HSL (e.g., 10, 91, 56)</option>
                    <option value="oklch">OKLCH (e.g., 0.65, 0.21, 33)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Color Value</label>
                  <Input
                    type="text"
                    value={colorInput}
                    onChange={(e) => setColorInput(e.target.value)}
                    placeholder={
                      inputFormat === "hex" ? "#F54927" :
                      inputFormat === "rgb" ? "245, 73, 39" :
                      inputFormat === "hsl" ? "10, 91, 56" :
                      "0.65, 0.21, 33"
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Convert To</label>
                  <select
                    value={selectedFormat}
                    onChange={(e) =>
                      setSelectedFormat(
                        e.target.value as "hex" | "rgb" | "rgba" | "hsl" | "hsla",
                      )
                    }
                    className="w-full p-2 border rounded bg-background"
                  >
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="rgba">RGBA</option>
                    <option value="hsl">HSL</option>
                    <option value="hsla">HSLA</option>
                    <option value="custom">Custom (--primary: h s% l%;)</option>
                  </select>
                </div>
                {convertedColor && (
                  <div className="p-3 border rounded bg-muted">
                    <div className="text-sm font-medium mb-1">Result:</div>
                    <div className="font-mono text-sm break-all">{convertedColor}</div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleConvert}>
                    Convert
                  </Button>
                  <Button variant="outline" onClick={handleCopy} disabled={!convertedColor}>
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setConvertDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          {themeHistory.length > 1 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-foreground">
                  Recent Themes ({themeHistory.length})
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setThemeHistory([themeHistory[historyIndex]]);
                    setHistoryIndex(0);
                    toast.success("History cleared!");
                  }}
                  className="text-xs h-7"
                >
                  Clear History
                </Button>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 scroll-smooth">
                {themeHistory.map((entry, index) => {
                  const isActive = index === historyIndex;
                  const colors =
                    activeMode === "light" ? entry.light : entry.dark;

                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setHistoryIndex(index);
                        setColorsLight(entry.light);
                        setColorsDark(entry.dark);
                        updateCSSVariables(
                          activeMode === "light" ? entry.light : entry.dark,
                        );
                        toast.success(`Loaded theme ${index + 1}`);
                      }}
                      className={`
                        flex-shrink-0 
                        rounded-lg 
                        border-2 
                        transition-all 
                        duration-200 
                        hover:scale-105
                        ${isActive ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"}
                      `}
                      title={`Theme ${index + 1}${isActive ? " (Active)" : ""}`}
                    >
                      <div className="w-32 h-20 rounded-md overflow-hidden p-2 flex flex-col gap-1">
                        <div className="flex gap-1 h-1/3">
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.background?.hue ?? 0}, ${colors.background?.saturation ?? 0}%, ${colors.background?.lightness ?? 0}%)`,
                            }}
                          />
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.foreground?.hue ?? 0}, ${colors.foreground?.saturation ?? 0}%, ${colors.foreground?.lightness ?? 0}%)`,
                            }}
                          />
                        </div>
                        <div className="flex gap-1 h-1/3">
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.primary?.hue ?? 0}, ${colors.primary?.saturation ?? 0}%, ${colors.primary?.lightness ?? 0}%)`,
                            }}
                          />
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.secondary?.hue ?? 0}, ${colors.secondary?.saturation ?? 0}%, ${colors.secondary?.lightness ?? 0}%)`,
                            }}
                          />
                        </div>
                        <div className="flex gap-1 h-1/3">
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.accent?.hue ?? 0}, ${colors.accent?.saturation ?? 0}%, ${colors.accent?.lightness ?? 0}%)`,
                            }}
                          />
                          <div
                            className="flex-1 rounded-sm"
                            style={{
                              backgroundColor: `hsl(${colors.muted?.hue ?? 0}, ${colors.muted?.saturation ?? 0}%, ${colors.muted?.lightness ?? 0}%)`,
                            }}
                          />
                        </div>
                      </div>
                      {isActive && (
                        <div className="text-[10px] text-center pb-1 font-medium text-primary">
                          Active
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex flex-col items-center space-y-2">
            <p className="text-foreground">
              You can click on a color to adjust
            </p>
            <ArrowDown className="animate-bounce" />
          </div>
          {/* Color Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {Object.entries(currentColors).map(([name, config]) => {
              const validColor = isValidColor(config);
              const alpha = config.alpha ?? 1;
              const backgroundColor = validColor
                ? `hsl(${config.hue}, ${config.saturation}%, ${
                    config.lightness
                  }%${includeAlpha && alpha < 1 ? ` / ${alpha * 100}%` : ""})`
                : "transparent";

              // Generate display value based on current format
              let displayValue = "N/A";
              if (validColor) {
                if (colorFormat === 'oklch') {
                  const oklchColor = hslToOKLCH(config);
                  const l = Math.round(oklchColor.l * 1000) / 100000;
                  const c = Math.round(oklchColor.c * 1000) / 1000;
                  const h = Math.round(oklchColor.h * 100) / 100;
                  displayValue = alpha < 1 
                    ? `${l} ${c} ${h} / ${Math.round(alpha * 100)}%`
                    : `${l} ${c} ${h}`;
                } else {
                  // HSL format
                  const hueRounded = Math.round(config.hue * 10) / 10;
                  const satRounded = Math.round(config.saturation * 10) / 10;
                  const lightRounded = Math.round(config.lightness * 10) / 10;
                  displayValue = `${hueRounded} ${satRounded}% ${lightRounded}%`;
                }
              }

              // Determine text color based on background lightness
              const textColor =
                config.lightness > 50 ? "text-black" : "text-white";

              return (
                <Card
                  key={name}
                  className={`
          p-2 
          flex 
          flex-col 
          items-center 
          justify-center 
          ${textColor}
          transition-all 
          duration-400 
          ease-in-out
          hover:scale-110 
          hover:shadow-xl 
          cursor-pointer
          active:scale-100
        `}
                  style={{ backgroundColor }}
                  onClick={() => setActiveColor(name)}
                >
                  <div className="text-center">
                    <p className="text-sm font-medium">{name}</p>
                    <p className="text-xs font-bold">{displayValue}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
        )}
        <div className="lg:col-span-3" id="theme-preview-section">
          <div className="sticky top-24">
            <ThemePreview 
              showPreview={showPreview}
              onContinueEditing={() => setShowPreview(false)}
            />
          </div>
        </div>
      </div>

      {/* Paste Dialog */}
      <Dialog
        open={dialogState.paste}
        onOpenChange={(open) =>
          setDialogState((prev) => ({ ...prev, paste: open }))
        }
      >
        <DialogContent className="bg-background/60 p-4 sm:p-6 md:p-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <DialogHeader>
            <DialogTitle>Import Theme/Color</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Content Type</label>
              <select
                value={pasteInputFormat}
                onChange={(e) =>
                  setPasteInputFormat(
                    e.target.value as "auto" | "hex" | "rgb" | "hsl" | "oklch"
                  )
                }
                className="w-full p-2 border rounded bg-background"
              >
                <option value="auto">Full CSS Theme (auto-detect colors)</option>
                <option value="hex">Single Color - HEX (e.g., #F54927)</option>
                <option value="rgb">Single Color - RGB (e.g., 245, 73, 39)</option>
                <option value="hsl">Single Color - HSL (e.g., 10, 91, 56)</option>
                <option value="oklch">Single Color - OKLCH (e.g., 0.65, 0.21, 33)</option>
              </select>
            </div>
            <textarea
              value={pasteInput}
              onChange={(e) => setPasteInput(e.target.value)}
              className="w-full h-40 sm:h-48 md:h-60 border rounded p-2 text-black dark:text-white"
              placeholder={
                pasteInputFormat === "auto" 
                  ? "Paste your full shadcn CSS theme here...\n\nExample:\n:root {\n  --primary: 10 91% 56%;\n  --secondary: 200 98% 39%;\n}"
                  : pasteInputFormat === "hex"
                  ? "#F54927 or F54927"
                  : pasteInputFormat === "rgb"
                  ? "245, 73, 39"
                  : pasteInputFormat === "hsl"
                  ? "10, 91, 56"
                  : "0.65, 0.21, 33"
              }
            />
            <div className="text-xs text-muted-foreground space-y-1">
              <p className="font-medium">
                {pasteInputFormat === "auto" 
                  ? "Full Theme Mode: Paste complete CSS with :root { } and .dark { }"
                  : "Single Color Mode: A full theme will be generated from this color"
                }
              </p>
            </div>
          </div>
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
