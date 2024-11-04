import React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/color-picker";
import { hslToHex } from "@/lib/colorUtils";
import { hexToHSL } from "@/lib/colorUtils";

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
  const currentColorHex = hslToHex(
    color.hue,
    color.saturation,
    color.lightness,
    (100 - color.alpha) / 100
  );

  const currentColor = `hsla(${color.hue}, ${color.saturation}%, ${
    color.lightness
  }%, ${(100 - color.alpha) / 100})`;

  const getHueGradient = () => {
    const stops = [];
    for (let i = 0; i <= 360; i += 60) {
      stops.push(`hsl(${i}, ${color.saturation}%, ${color.lightness}%)`);
    }
    return stops.join(", ");
  };

  return (
    <div className="flex h-full w-full items-center justify-center p-4 max-md:w-3/4 overflow-auto">
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
                onChange("alpha", 100 - hsl.alpha * 100);
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
                    (100 - color.alpha) / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, ${getHueGradient()})`,
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
                  hslToHex(
                    color.hue,
                    value,
                    color.lightness,
                    (100 - color.alpha) / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsl(${color.hue}, 0%, ${color.lightness}%),
                  hsl(${color.hue}, 50%, ${color.lightness}%),
                  hsl(${color.hue}, 100%, ${color.lightness}%))`,
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
                    (100 - color.alpha) / 100
                  )
                );
              }}
              className="h-2 w-full rounded-full"
              style={{
                background: `linear-gradient(to right, 
                  hsl(${color.hue}, ${color.saturation}%, 0%),
                  hsl(${color.hue}, ${color.saturation}%, 50%),
                  hsl(${color.hue}, ${color.saturation}%, 100%))`,
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Opacity</Label>
              <span className="text-xs text-muted-foreground">
                {100 - color.alpha}%
              </span>
            </div>
            <Slider
              value={[100 - color.alpha]}
              min={0}
              max={100}
              step={1}
              onValueChange={([value]) => {
                onChange("alpha", 100 - value);
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
                  hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, 0.5),
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
