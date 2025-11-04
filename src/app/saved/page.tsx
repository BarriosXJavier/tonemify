"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Copy, Trash, Palette, Sparkles, Package } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SavedThemesPage = () => {
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});

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
  }, []);

  const parseThemeColors = (css: string) => {
    const colors: Record<string, { value: string; hsl: string }> = {};

    // Try to parse both HSL and OKLCH formats
    const hslRegex =
      /--([a-zA-Z0-9-]+):\s*([0-9.]+)\s+([0-9.]+)%\s+([0-9.]+)%/g;
    const oklchRegex =
      /--([a-zA-Z0-9-]+):\s*oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/g;
    const lightSectionRegex = /:root\s*{([^}]*)}/s;

    const lightSectionMatch = css.match(lightSectionRegex);
    if (lightSectionMatch) {
      const content = lightSectionMatch[1];

      // Parse HSL format
      let match;
      while ((match = hslRegex.exec(content)) !== null) {
        const [, name, h, s, l] = match;
        colors[name] = {
          value: `${h} ${s}% ${l}%`,
          hsl: `hsl(${h}, ${s}%, ${l}%)`,
        };
      }

      // Parse OKLCH format - convert to HSL for preview
      while ((match = oklchRegex.exec(content)) !== null) {
        const [, name] = match;
        // For preview, we'll just show a placeholder color
        colors[name] = {
          value: match[0],
          hsl: `oklch(${match[2]} ${match[3]} ${match[4]})`,
        };
      }
    }
    return colors;
  };

  const deleteTheme = (name: string) => {
    localStorage.removeItem(name);
    setSavedThemes((prev) => {
      const newThemes = { ...prev };
      delete newThemes[name];
      return newThemes;
    });
    toast.success(`Theme "${name.replace("theme-", "")}" deleted!`);
  };

  const copyTheme = (css: string, themeName: string) => {
    navigator.clipboard.writeText(css);
    toast.success(`"${themeName}" CSS copied to clipboard!`);
  };

  const applyTheme = (name: string, themeName: string) => {
    const themeCSS = localStorage.getItem(name);
    if (themeCSS) {
      // Store the theme to be applied in the generator
      localStorage.setItem("theme-to-apply", themeCSS);
      toast.success(`Redirecting to apply "${themeName}"...`);
      // Navigate to the theme generator
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 sm:py-12 mt-16 sm:mt-20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Saved Themes
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              {Object.keys(savedThemes).length} theme
              {Object.keys(savedThemes).length !== 1 ? "s" : ""} in your
              collection
            </p>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Create New Theme
            </Link>
          </Button>
        </div>

        {Object.keys(savedThemes).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(savedThemes).map(([name, css]) => {
              const themeName = name.replace("theme-", "");
              const colors = parseThemeColors(css);

              const mainColors = [
                { name: "Primary", color: colors.primary?.hsl || "#8b5cf6" },
                {
                  name: "Secondary",
                  color: colors.secondary?.hsl || "#06b6d4",
                },
                { name: "Accent", color: colors.accent?.hsl || "#f59e0b" },
                {
                  name: "Background",
                  color: colors.background?.hsl || "#ffffff",
                },
                {
                  name: "Foreground",
                  color: colors.foreground?.hsl || "#000000",
                },
                {
                  name: "Destructive",
                  color: colors.destructive?.hsl || "#ef4444",
                },
              ];

              const isOKLCH = css.includes("oklch(");

              return (
                <Card
                  key={name}
                  className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col overflow-hidden border-2"
                >
                  <CardHeader className="space-y-2 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="truncate text-lg font-semibold flex items-center gap-2">
                        <Palette className="h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="truncate">{themeName}</span>
                      </CardTitle>
                      {isOKLCH && (
                        <Badge
                          variant="secondary"
                          className="text-xs flex-shrink-0"
                        >
                          OKLCH
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-xs">
                      Click to preview colors
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-grow space-y-4 pb-4">
                    {/* Main Color Strip */}
                    <div className="relative h-20 w-full rounded-lg overflow-hidden shadow-inner ring-1 ring-black/5">
                      <div className="flex h-full">
                        {mainColors.slice(0, 6).map((item, index) => (
                          <div
                            key={index}
                            className="flex-1 transition-all hover:flex-[1.5] group/color relative"
                            style={{ backgroundColor: item.color }}
                            title={item.name}
                          >
                            <div className="absolute inset-0 bg-black/0 group-hover/color:bg-black/10 transition-colors flex items-center justify-center">
                              <span className="text-xs font-medium text-white opacity-0 group-hover/color:opacity-100 transition-opacity drop-shadow-lg">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Color Details Grid */}
                    <div className="grid grid-cols-3 gap-2">
                      {mainColors.slice(0, 3).map((item, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center gap-1.5"
                        >
                          <div
                            className="w-full h-12 rounded-md shadow-sm border border-black/10"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-xs text-muted-foreground truncate w-full text-center">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Package className="h-3 w-3" />
                        <span>{Object.keys(colors).length} colors</span>
                      </div>
                      <div className="h-3 w-px bg-border" />
                      <span>{isOKLCH ? "Perceptual" : "Standard"}</span>
                    </div>
                  </CardContent>

                  {/* Actions */}
                  <div className="bg-muted/50 p-3 border-t space-y-2">
                    <div className="flex gap-2">
                      <Button
                        onClick={() => applyTheme(name, themeName)}
                        className="flex-1 gap-2"
                        size="sm"
                      >
                        <Palette className="h-4 w-4" />
                        Apply Theme
                      </Button>
                      <Button
                        onClick={() => copyTheme(css, themeName)}
                        variant="secondary"
                        className="flex-1 gap-2"
                        size="sm"
                      >
                        <Copy className="h-4 w-4" />
                        Copy CSS
                      </Button>
                    </div>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full text-destructive hover:text-destructive hover:bg-destructive/10 gap-2"
                        >
                          <Trash className="h-4 w-4" />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Delete &quot;{themeName}&quot;?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your theme.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteTheme(name)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 sm:py-32">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center">
                <Palette className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  No Saved Themes Yet
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base">
                  Start creating beautiful themes and save them here for quick
                  access
                </p>
              </div>
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Sparkles className="h-4 w-4" />
                  Create Your First Theme
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedThemesPage;

