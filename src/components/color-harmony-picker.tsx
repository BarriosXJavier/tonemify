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
import {
  getHarmonyColors,
  generateThemeFromHarmony,
  harmonyMetadata,
  HarmonyType,
} from "@/lib/color-harmony";
import { ColorConfig } from "@/lib/types";
import { Palette } from "lucide-react";
import { toast } from "sonner";

interface ColorHarmonyPickerProps {
  currentHue: number;
  currentSaturation: number;
  currentLightness: number;
  activeMode: "light" | "dark";
  onApplyHarmony: (
    lightColors: Record<string, ColorConfig>,
    darkColors: Record<string, ColorConfig>
  ) => void;
}

export default function ColorHarmonyPicker({
  currentHue,
  currentSaturation,
  currentLightness,
  activeMode,
  onApplyHarmony,
}: ColorHarmonyPickerProps) {
  const [open, setOpen] = useState(false);
  const [selectedHarmony, setSelectedHarmony] =
    useState<HarmonyType>("complementary");

  const harmonyTypes: HarmonyType[] = [
    "complementary",
    "triadic",
    "analogous",
    "split-complementary",
    "tetradic",
  ];

  const harmonyColors = getHarmonyColors(currentHue, selectedHarmony);

  const handleApplyHarmony = () => {
    const lightTheme = generateThemeFromHarmony(
      harmonyColors,
      currentSaturation,
      currentLightness,
      false
    );
    const darkTheme = generateThemeFromHarmony(
      harmonyColors,
      currentSaturation,
      currentLightness,
      true
    );

    onApplyHarmony(lightTheme, darkTheme);
    setOpen(false);
    toast.success(
      `${harmonyMetadata[selectedHarmony].name} harmony applied!`
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span>Color Harmony</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Color Harmony Generator</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Harmony Type Selection */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Select Harmony Type</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {harmonyTypes.map((type) => {
                const meta = harmonyMetadata[type];
                const isSelected = selectedHarmony === type;
                return (
                  <button
                    key={type}
                    onClick={() => setSelectedHarmony(type)}
                    className={`
                      p-4 rounded-lg border-2 text-left transition-all
                      ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{meta.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{meta.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {meta.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Color Wheel Visualization */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Preview</h3>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  {/* Color Wheel */}
                  <div className="relative w-48 h-48">
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                      {/* Color wheel background */}
                      <defs>
                        <linearGradient
                          id="wheel-gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          {[0, 60, 120, 180, 240, 300, 360].map((hue) => (
                            <stop
                              key={hue}
                              offset={`${(hue / 360) * 100}%`}
                              stopColor={`hsl(${hue}, 70%, 50%)`}
                            />
                          ))}
                        </linearGradient>
                      </defs>

                      {/* Outer ring */}
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        stroke="url(#wheel-gradient)"
                        strokeWidth="20"
                        style={{
                          strokeDasharray: "502.4",
                          strokeDashoffset: "0",
                        }}
                      />

                      {/* Harmony color markers */}
                      {harmonyColors.map((color, index) => {
                        const angle = (color.hue - 90) * (Math.PI / 180);
                        const x = 100 + 80 * Math.cos(angle);
                        const y = 100 + 80 * Math.sin(angle);
                        const isBase = color.label === "Base";

                        return (
                          <g key={index}>
                            <circle
                              cx={x}
                              cy={y}
                              r={isBase ? 12 : 8}
                              fill={`hsl(${color.hue}, ${currentSaturation}%, ${currentLightness}%)`}
                              stroke="white"
                              strokeWidth="3"
                            />
                            {isBase && (
                              <circle
                                cx={x}
                                cy={y}
                                r={16}
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                              />
                            )}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Color Swatches */}
                  <div className="flex flex-wrap gap-3 justify-center">
                    {harmonyColors.map((color, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center gap-2"
                      >
                        <div
                          className="w-16 h-16 rounded-lg border-2 border-border shadow-sm"
                          style={{
                            backgroundColor: `hsl(${color.hue}, ${currentSaturation}%, ${currentLightness}%)`,
                          }}
                        />
                        <Badge variant="outline" className="text-xs">
                          {color.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {Math.round(color.hue)}°
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apply Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApplyHarmony}>
              Apply {harmonyMetadata[selectedHarmony].name} Harmony
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
