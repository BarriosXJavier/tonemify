"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { hexToHSLA, HSLAToHex } from "@/lib/colorUtils";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [h, s, l, a] = hexToHSLA(color);

  const handleHueChange = (value: number[]) => {
    onChange(HSLAToHex(value[0], s, l, a));
  };

  const handleSaturationChange = (value: number[]) => {
    onChange(HSLAToHex(h, value[0], l, a));
  };

  const handleLightnessChange = (value: number[]) => {
    onChange(HSLAToHex(h, s, value[0], a));
  };

  const handleAlphaChange = (value: number[]) => {
    onChange(HSLAToHex(h, s, l, value[0] / 100));
  };

  return (
    <div className="space-y-6">
      <div
        className="w-full h-32 rounded-lg transition-colors shadow-lg"
        style={{ backgroundColor: color }}
      />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Hue</Label>
          <Slider
            min={0}
            max={360}
            step={1}
            value={[h]}
            onValueChange={handleHueChange}
            className="[&_[role=slider]]:bg-[var(--slider-thumb)]"
            style={
              {
                "--slider-thumb": HSLAToHex(h, 100, 50, 1),
                background: `linear-gradient(to right, 
                hsl(0, ${s}%, ${l}%),
                hsl(60, ${s}%, ${l}%),
                hsl(120, ${s}%, ${l}%),
                hsl(180, ${s}%, ${l}%),
                hsl(240, ${s}%, ${l}%),
                hsl(300, ${s}%, ${l}%),
                hsl(360, ${s}%, ${l}%))`,
              } as any
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Saturation</Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[s]}
            onValueChange={handleSaturationChange}
            className="[&_[role=slider]]:bg-[var(--slider-thumb)]"
            style={
              {
                "--slider-thumb": HSLAToHex(h, s, 50, 1),
                background: `linear-gradient(to right, 
                hsl(${h}, 0%, ${l}%),
                hsl(${h}, 100%, ${l}%))`,
              } as any
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Lightness</Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[l]}
            onValueChange={handleLightnessChange}
            className="[&_[role=slider]]:bg-[var(--slider-thumb)]"
            style={
              {
                "--slider-thumb": HSLAToHex(h, s, l, 1),
                background: `linear-gradient(to right, 
                hsl(${h}, ${s}%, 0%),
                hsl(${h}, ${s}%, 50%),
                hsl(${h}, ${s}%, 100%))`,
              } as any
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Opacity</Label>
          <Slider
            min={0}
            max={100}
            step={1}
            value={[a * 100]}
            onValueChange={handleAlphaChange}
            className="[&_[role=slider]]:bg-[var(--slider-thumb)]"
            style={
              {
                "--slider-thumb": HSLAToHex(h, s, l, a),
                background: `linear-gradient(to right, 
                transparent,
                ${HSLAToHex(h, s, l, 1)})`,
              } as any
            }
          />
        </div>
      </div>
    </div>
  );
}
