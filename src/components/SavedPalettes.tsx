"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedPalettesProps {
  palettes: string[][];
}

export function SavedPalettes({ palettes }: SavedPalettesProps) {
  if (palettes.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        No saved palettes yet. Start by saving your first palette!
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px]">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {palettes.map((palette, index) => (
          <div
            key={index}
            className="space-y-2 p-4 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex gap-2">
              {palette.map((color) => (
                <div
                  key={color}
                  className="w-full h-12 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex gap-1 flex-wrap">
              {palette.map((color) => (
                <code key={color} className="text-xs">
                  {color}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
