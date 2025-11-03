"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { themePresets, getAllTags, ThemePreset } from "@/lib/theme-presets";
import { ColorConfig } from "@/lib/types";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ThemePresetsPickerProps {
  activeMode: "light" | "dark";
  onApplyPreset: (
    lightColors: Record<string, ColorConfig>,
    darkColors: Record<string, ColorConfig>,
    presetName: string
  ) => void;
}

export default function ThemePresetsPicker({
  activeMode,
  onApplyPreset,
}: ThemePresetsPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("all");

  const allTags = getAllTags();
  const filteredPresets =
    selectedTag === "all"
      ? themePresets
      : themePresets.filter((preset) => preset.tags.includes(selectedTag));

  const handleApplyPreset = (preset: ThemePreset) => {
    onApplyPreset(preset.light, preset.dark, preset.name);
    setOpen(false);
    toast.success(`${preset.name} theme applied!`);
  };

  const getPresetColors = (preset: ThemePreset): string[] => {
    const colors = activeMode === "light" ? preset.light : preset.dark;
    return [
      `hsl(${colors.background.hue}, ${colors.background.saturation}%, ${colors.background.lightness}%)`,
      `hsl(${colors.primary.hue}, ${colors.primary.saturation}%, ${colors.primary.lightness}%)`,
      `hsl(${colors.secondary.hue}, ${colors.secondary.saturation}%, ${colors.secondary.lightness}%)`,
      `hsl(${colors.accent.hue}, ${colors.accent.saturation}%, ${colors.accent.lightness}%)`,
      `hsl(${colors.foreground.hue}, ${colors.foreground.saturation}%, ${colors.foreground.lightness}%)`,
    ];
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center gap-2 h-full w-full">
          <Sparkles className="w-4 h-4" />
          <span>Theme Presets</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Popular Theme Presets</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tag Filters */}
          <Tabs value={selectedTag} onValueChange={setSelectedTag}>
            <TabsList className="flex flex-wrap h-auto">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              {allTags.map((tag) => (
                <TabsTrigger key={tag} value={tag} className="text-xs capitalize">
                  {tag}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPresets.map((preset) => {
              const previewColors = getPresetColors(preset);
              return (
                <Card
                  key={preset.id}
                  className="hover:border-primary/50 transition-all cursor-pointer group"
                  onClick={() => handleApplyPreset(preset)}
                >
                  <CardContent className="p-4 space-y-3">
                    {/* Header */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-base">{preset.name}</h3>
                        <div className="flex flex-wrap gap-1">
                          {preset.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs capitalize"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {preset.description}
                      </p>
                      {preset.author && (
                        <p className="text-xs text-muted-foreground">
                          by {preset.author}
                        </p>
                      )}
                    </div>

                    {/* Color Preview */}
                    <div className="flex h-16 w-full rounded-lg overflow-hidden border-2 border-border">
                      {previewColors.map((color, index) => (
                        <div
                          key={index}
                          className="flex-1 h-full transition-transform group-hover:scale-105"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>

                    {/* Apply Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyPreset(preset);
                      }}
                    >
                      Apply Theme
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {filteredPresets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No presets found for this tag
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
