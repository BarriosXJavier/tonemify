"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";


const SavedThemesPage = () => {
  const [savedThemes, setSavedThemes] = useState<Record<string, string>>({});


  useEffect(() => {
    const themes = Object.keys(localStorage).filter(key => key !== "savedTheme");
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
    toast.success("Theme copied! Paste it into the Theme Generator for editing.");
  };

  const editTheme = (name: string) => {
    const themeCSS = localStorage.getItem(name);
    if (themeCSS) {
      navigator.clipboard.writeText(themeCSS); // Copy the theme CSS to clipboard
      toast.success("Theme copied! Paste it into the Theme Generator for editing."); // Notify the user
      window.location.href = '/'; // Redirect to the home page
    }
  };

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-4 font-mono">Saved Themes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(savedThemes).map(([name, css]) => (
          <Card key={name} className="p-4">
            <h2 className="font-semibold">{name}</h2>
            <div style={{ backgroundColor: css, width: '100%', height: '50px' }}></div>
            <Button variant="outline" onClick={() => copyTheme(css)}>
              Copy
            </Button>
            <Button variant="outline" onClick={() => editTheme(name)}>
              Edit
            </Button>
            <Button variant="outline" onClick={() => deleteTheme(name)}>
              Delete
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SavedThemesPage;
