"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { PalettePreview } from "@/components/PalettePreview";
import { ExportPanel } from "@/components/ExportPanel";
import { SavedPalettes } from "@/components/SavedPalettes";
import {
  Share2,
  Sparkles,
  Download,
  BookMarked,
  Palette as PaletteIcon,
} from "lucide-react";
import {
  generateRandomPalette,
  generate60_30_10_Palette,
} from "@/lib/colorUtils";
import { motion } from "framer-motion";

export default function Home() {
  const [baseColor, setBaseColor] = useState("#6366F1FF");
  const [palette, setPalette] = useState(generate60_30_10_Palette(baseColor));
  const [savedPalettes, setSavedPalettes] = useState<string[][]>([]);

  const handleRandomPalette = () => {
    const newPalette = generateRandomPalette();
    setPalette(newPalette);
  };

  const handleSavePalette = () => {
    setSavedPalettes((prev) => [...prev, palette]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-secondary">
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 max-w-3xl mx-auto"
          >
            <div className="inline-block p-3 rounded-2xl bg-primary/10 mb-4">
              <PaletteIcon className="w-8 h-8" />
            </div>
            <h1 className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-600 to-pink-500">
              Tonemify
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create stunning color palettes with the 60-30-10 rule. Perfect for
              modern web design and branding projects.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <Tabs defaultValue="custom" className="space-y-6">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="custom">Custom Palette</TabsTrigger>
                <TabsTrigger value="random">Random Palette</TabsTrigger>
              </TabsList>

              <TabsContent value="custom" className="space-y-4">
                <ColorPicker
                  color={baseColor}
                  onChange={(color) => {
                    setBaseColor(color);
                    setPalette(generate60_30_10_Palette(color));
                  }}
                />
              </TabsContent>

              <TabsContent value="random" className="space-y-4">
                <Button
                  onClick={handleRandomPalette}
                  className="w-full"
                  size="lg"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Random Palette
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6">
              <Palette colors={palette} />
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSavePalette} variant="secondary">
                <BookMarked className="mr-2 h-4 w-4" />
                Save Palette
              </Button>
              <Button variant="secondary">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="secondary">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </Card>

          <div className="space-y-8">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Live Preview</h2>
              <PalettePreview palette={palette} />
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Export Formats</h2>
              <ExportPanel palette={palette} />
            </Card>
          </div>
        </div>

        <Card className="mt-8 p-6">
          <h2 className="text-2xl font-semibold mb-4">Saved Palettes</h2>
          <SavedPalettes palettes={savedPalettes} />
        </Card>
      </div>
    </main>
  );
}
