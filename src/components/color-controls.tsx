import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ColorPicker } from "@/components/color-picker";
import { ColorConfig } from "@/lib/types";

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
  const hslToHex = (h: number, s: number, l: number, a: number): string => {
    h = ((h % 360) + 360) % 360; // Ensure hue is between 0-359
    s = Math.min(Math.max(s, 0), 100); // Saturation between 0-100
    l = Math.min(Math.max(l, 0), 100); // Lightness between 0-100
    a = Math.min(Math.max(a, 0), 1); // Alpha between 0-1
    l /= 100;
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color =
        l -
        (a * (s / 100) * Math.min(l, 1 - l)) *
          Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}${Math.round(a * 255).toString(16).padStart(2, "0")}`;
  };

  const hexToHSL = (hex: string) => {
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let a = 1; // Default alpha value

    // Check for alpha channel in hex (e.g., #RRGGBBAA)
    if (hex.length === 8) {
      a = parseInt(hex.substring(6, 8), 16) / 255;
    }

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0,
      s = 0,
      l = (max + min) / 2;

    if (max !== min) {
      const delta = max - min;
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      switch (max) {
        case r:
          h = (g - b) / delta + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / delta + 2;
          break;
        case b:
          h = (r - g) / delta + 4;
          break;
      }
      h *= 60;
    }

    return {
      hue: Math.round(h),
      saturation: Math.round(s * 100),
      lightness: Math.round(l * 100),
      alpha: Math.round(a * 100), // Return alpha as a percentage
    };
  };

  const currentColorHex = hslToHex(
    color.hue,
    color.saturation,
    color.lightness,
    color.alpha / 100 // Use alpha from color config
  );

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Color Picker</Label>
        <ColorPicker
          color={currentColorHex}
          onChange={(hex) => {
            const { hue, saturation, lightness, alpha } = hexToHSL(hex);
            onChange("hue", hue);
            onChange("saturation", saturation);
            onChange("lightness", lightness);
            onChange("alpha", alpha); // Update alpha
            onHexChange(hex);
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Hue</Label>
        <Slider
          value={[color.hue]}
          min={0}
          max={360}
          step={1}
          onValueChange={([value]) => {
            onChange("hue", value);
            onHexChange(
              hslToHex(value, color.saturation, color.lightness, color.alpha / 100)
            );
          }}
          className="h-2 rounded-full"
          style={{
            backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Saturation</Label>
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
          className="h-2 rounded-full"
          style={{
            backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Lightness</Label>
        <Slider
          value={[color.lightness]}
          min={0}
          max={100}
          step={1}
          onValueChange={([value]) => {
            onChange("lightness", value);
            onHexChange(
              hslToHex(color.hue, color.saturation, value, color.alpha / 100)
            );
          }}
          className="h-2 rounded-full"
          style={{
            backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)`,
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Alpha</Label>
        <Slider
          value={[color.alpha]}
          min={0}
          max={100}
          step={1}
          onValueChange={([value]) => {
            onChange("alpha", value);
            onHexChange(
              hslToHex(color.hue, color.saturation, color.lightness, value / 100)
            );
          }}
          className="h-2 rounded-full"
          style={{
            backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%, ${color.alpha / 100})`,
          }}
        />
      </div>
    </div>
  );
}
