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
    l /= 100;
    const aHex = Math.round(a * 255).toString(16).padStart(2, "0");
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const color = l - (s / 100) * Math.min(l, 1 - l) * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}${aHex}`;
  };

  const hexToHsl = (hex: string): [number, number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const a = parseInt(hex.slice(7, 9), 16) / 255 || 1;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100), a];
  };

  const currentColorHex = hslToHex(color.hue, color.saturation, color.lightness, color.alpha);

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;

    let r = 0, g = 0, b = 0;
    if (h < 60) {
      r = c; g = x; b = 0;
    } else if (h < 120) {
      r = x; g = c; b = 0;
    } else if (h < 180) {
      r = 0; g = c; b = x;
    } else if (h < 240) {
      r = 0; g = x; b = c;
    } else if (h < 300) {
      r = x; g = 0; b = c;
    } else {
      r = c; g = 0; b = x;
    }

    return [(r + m) * 255, (g + m) * 255, (b + m) * 255];
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Color Picker</Label>
        <ColorPicker
          color={currentColorHex}
          onChange={(hex) => {
            const [h, s, l, a] = hexToHsl(hex);
            onChange("hue", h);
            onChange("saturation", s);
            onChange("lightness", l);
            onChange("alpha", a);
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
            onHexChange(hslToHex(value, color.saturation, color.lightness, color.alpha));
          }}
          className="h-2 rounded-full"
          style={{ backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)` }}
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
            onHexChange(hslToHex(color.hue, value, color.lightness, color.alpha));
          }}
          className="h-2 rounded-full"
          style={{ backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)` }}
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
            onHexChange(hslToHex(color.hue, color.saturation, value, color.alpha));
          }}
          className="h-2 rounded-full"
          style={{ backgroundColor: `hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)` }}
        />
      </div>
      <div className="space-y-2">
        <Label>Alpha</Label>
        <Slider
          value={[color.alpha]}
          min={0}
          max={1}
          step={0.01}
          onValueChange={([value]) => {
            onChange("alpha", value);
          }}
          className="h-2 rounded-full"
          style={{ backgroundColor: `rgba(${hslToRgb(color.hue, color.saturation, color.lightness).join(',')}, ${color.alpha})` }}
        />
      </div>
    </div>
  );
}
