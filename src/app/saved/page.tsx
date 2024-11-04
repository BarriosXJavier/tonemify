"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const SavedThemesPage = () => {
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});

  useEffect(() => {
    const themes = Object.keys(localStorage).filter(
      (key) => key !== "savedTheme"
    );
    const themesData = themes.reduce((acc, key) => {
      acc[key] = localStorage.getItem(key) || "";
      return acc;
    }, {} as Record<string, string>);
    setSavedThemes(themesData);
  }, []);

  const deleteTheme = (name: string) => {
    localStorage.removeItem(name);
    setSavedThemes((prev) => {
      const newThemes = { ...prev };
      delete newThemes[name];
      return newThemes;
    });
    toast.success(`${name} theme deleted successfully!`);
  };

  const copyTheme = (css: string) => {
    navigator.clipboard.writeText(css);
    toast.success(
      "Theme copied! Paste it into the Theme Generator for editing."
    );
  };

  const editTheme = (name: string) => {
    const themeCSS = localStorage.getItem(name);
    if (themeCSS) {
      navigator.clipboard.writeText(themeCSS);
      toast.success(
        "Theme copied! Paste it into the Theme Generator for editing."
      );
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4 font-mono">Saved Themes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {Object.entries(savedThemes).map(([name, css]) => (
          <Card key={name} className="p-4 flex flex-col items-center">
            <h2 className="font-semibold mb-2">{name}</h2>
            <div
              style={{ backgroundColor: css, width: "100%", height: "50px" }}
              className="mb-2"
            ></div>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => copyTheme(css)}
                className="w-full sm:w-auto"
              >
                Copy
              </Button>
              <Button
                variant="outline"
                onClick={() => editTheme(name)}
                className="w-full sm:w-auto"
              >
                Edit
              </Button>
              <Button
                variant="outline"
                onClick={() => deleteTheme(name)}
                className="w-full sm:w-auto"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedThemesPage;
