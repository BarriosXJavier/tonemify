"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy, Trash, Pencil } from "lucide-react";
import Link from "next/link";

const SavedThemesPage = () => {
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});

  useEffect(() => {
    const themes = Object.keys(localStorage).reduce((acc, key) => {
      if (key.startsWith("theme-")) {
        acc[key] = localStorage.getItem(key) || "";
      }
      return acc;
    }, {} as Record<string, string>);
    setSavedThemes(themes);
  }, []);

  const parseThemeColors = (css: string) => {
    const colors: Record<string, string> = {};
    const colorRegex = /--([a-zA-Z0-9-]+):\s*([0-9.]+\s+[0-9.]+s*%\s*[0-9.]+%)/g;
    const lightSectionRegex = /:root\s*{([^}]*)}/s;

    const lightSectionMatch = css.match(lightSectionRegex);
    if (lightSectionMatch) {
      let match;
      while ((match = colorRegex.exec(lightSectionMatch[1])) !== null) {
        const [, name, value] = match;
        colors[name] = `hsl(${value.replace(/\s+/g, ", ")})`;
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
    toast.success(`Theme "${name.replace("theme-", "")}" deleted successfully!`);
  };

  const copyTheme = (css: string) => {
    navigator.clipboard.writeText(css);
    toast.success("Theme CSS copied to clipboard!");
  };

  const editTheme = (name: string) => {
    const themeCSS = localStorage.getItem(name);
    if (themeCSS) {
      navigator.clipboard.writeText(themeCSS);
      toast.info("Theme CSS copied! Paste it in the generator to edit.");
      window.location.href = "/";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-mono">Saved Themes</h1>
        <Button asChild>
          <Link href="/">Create New Theme</Link>
        </Button>
      </div>

      {Object.keys(savedThemes).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Object.entries(savedThemes).map(([name, css]) => {
            const themeName = name.replace("theme-", "");
            const colors = parseThemeColors(css);
            const previewColors = [
              colors.primary || "#ccc",
              colors.secondary || "#aaa",
              colors.card || "#eee",
              colors.background || "#fff",
              colors.foreground || "#000",
            ];

            return (
              <Card key={name} className="flex flex-col overflow-hidden">
                <CardHeader>
                  <CardTitle className="truncate font-mono">{themeName}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex h-20 w-full rounded-lg overflow-hidden">
                    {previewColors.map((color, index) => (
                      <div
                        key={index}
                        className="w-1/5 h-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 bg-muted/50 p-2">
                  <Button variant="ghost" size="icon" onClick={() => copyTheme(css)} title="Copy CSS">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => editTheme(name)} title="Edit in Generator">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => deleteTheme(name)} title="Delete Theme">
                    <Trash className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold text-muted-foreground">No Saved Themes Yet</h2>
          <p className="text-muted-foreground mt-2">Go create some awesome themes!</p>
          <Button asChild className="mt-4">
            <Link href="/">Theme Generator</Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SavedThemesPage;