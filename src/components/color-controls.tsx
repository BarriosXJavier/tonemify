import React, { useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/color-picker";

interface ColorConfig {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;
}

interface ColorControlsProps {
  color: ColorConfig;
  onChange: (property: keyof ColorConfig, value: number) => void;
  onHexChange: (hex: string) => void;
}

export function ColorControls({
  color,
  onChange,
  onHexChange,
}: ColorControlsProps) {
  // ... (keeping the conversion functions the same)
  const hslToHex = (h: number, s: number, l: number, a: number): string => {
    h = ((h % 360) + 360) % 360;
    s = Math.min(Math.max(s, 0), 100);
    l = Math.min(Math.max(l, 0), 100);
    a = Math.min(Math.max(a, 0), 1);
    l /= 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color =
        l -
        a *
          (s / 100) *
          Math.min(l, 1 - l) *
          Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}${Math.round(a * 255)
      .toString(16)
      .padStart(2, "0")}`;
  };

  const hexToHSL = (hex: string) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let a = hex.length === 8 ? parseInt(hex.substring(6, 8), 16) / 255 : 1;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h *= 60;
    }

    return {
      hue: Math.round(h),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100),
      alpha: Math.round(a * 100),
    };
  };

  useEffect(() => {
    if (color.alpha === 0) {
      onChange("alpha", 100);
    }
  }, [color.alpha, onChange]);

  const currentColorHex = hslToHex(
    color.hue,
    color.saturation,
    color.lightness,
    color.alpha / 100
  );

  const currentColor = `hsla(${color.hue}, ${color.saturation}%, ${
    color.lightness
  }%, ${color.alpha / 100})`;

  return (
    <div className="flex h-full w-full items-center justify-center p-4  max-md:w-3/4">
      <div className="w-full max-w-md space-y-6 rounded-lg">
        <div className="space-y-4">
          <div
            className="h-8 w-full rounded-lg transition-colors duration-200"
            style={{ backgroundColor: currentColor }}
          />

          <div className="space-y-2">
            <Label className="text-sm font-medium">Color Picker</Label>
            <ColorPicker
              color={currentColorHex}
              onChange={(hex) => {
                const hsl = hexToHSL(hex);
                onChange("hue", hsl.hue);
                onChange("saturation", hsl.saturation);
                onChange("lightness", hsl.lightness);
                onChange("alpha", hsl.alpha);
                onHexChange(hex);
              }}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Hue</Label>
              <span className="text-xs text-muted-foreground">
                {color.hue}°
              </span>
            </div>
            <Slider
              value={[color.hue]}
              min={0}
              max={360}
              step={1}
              onValueChange={([value]) => {
                onChange("hue", value);
                onHexChange(
                  hslToHex(
                    value,
                    color.saturation,
                    color.lightness,
                    color.alpha / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsl(0, ${color.saturation}%, ${color.lightness}%),
                  hsl(60, ${color.saturation}%, ${color.lightness}%),
                  hsl(120, ${color.saturation}%, ${color.lightness}%),
                  hsl(180, ${color.saturation}%, ${color.lightness}%),
                  hsl(240, ${color.saturation}%, ${color.lightness}%),
                  hsl(300, ${color.saturation}%, ${color.lightness}%),
                  hsl(360, ${color.saturation}%, ${color.lightness}%))`,
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Saturation</Label>
              <span className="text-xs text-muted-foreground">
                {color.saturation}%
              </span>
            </div>
            <Slider
              value={[color.saturation]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => {
                onChange("saturation", value);
                onHexChange(
                  hslToHex(color.hue, value, color.lightness, color.alpha / 100)
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsla(${color.hue}, 0%, ${color.lightness}%, ${
                  color.alpha / 100
                }),
                  hsla(${color.hue}, 100%, ${color.lightness}%, ${
                  color.alpha / 100
                }))`,
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Lightness</Label>
              <span className="text-xs text-muted-foreground">
                {color.lightness}%
              </span>
            </div>
            <Slider
              value={[color.lightness]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => {
                onChange("lightness", value);
                onHexChange(
                  hslToHex(
                    color.hue,
                    color.saturation,
                    value,
                    color.alpha / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsla(${color.hue}, ${color.saturation}%, 0%, ${
                  color.alpha / 100
                }),
                  hsla(${color.hue}, ${color.saturation}%, 50%, ${
                  color.alpha / 100
                }),
                  hsla(${color.hue}, ${color.saturation}%, 100%, ${
                  color.alpha / 100
                }))`,
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Alpha</Label>
              <span className="text-xs text-muted-foreground">
                {color.alpha}%
              </span>
            </div>
            <Slider
              value={[color.alpha]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => {
                onChange("alpha", value);
                onHexChange(
                  hslToHex(
                    color.hue,
                    color.saturation,
                    color.lightness,
                    value / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, 0),
                  hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, 1))`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorControls;
