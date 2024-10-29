"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({ color, onChange, className }: ColorPickerProps) {
  const [inputColor, setInputColor] = useState(color);
  const [isValidColor, setIsValidColor] = useState(true);
  const colorInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputColor(color);
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setInputColor(newColor);
    if (/^#[0-9A-F]{6}$/i.test(newColor)) {
      setIsValidColor(true);
      onChange(newColor);
    } else {
      setIsValidColor(false);
    }
  };

  const openColorPicker = () => {
    colorInputRef.current?.click();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        onClick={openColorPicker}
        style={{ backgroundColor: inputColor }}
        className="h-10 w-10 cursor-pointer rounded border border-input"
        aria-label="Select color"
      />
      <Input
        type="color"
        value={inputColor}
        ref={colorInputRef}
        onChange={(e) => handleColorChange(e.target.value)}
        className="hidden"
      />
      <Input
        type="text"
        value={inputColor}
        onChange={(e) => handleColorChange(e.target.value)}
        className={cn(
          "h-10 w-28 rounded-md border px-3 py-2 text-sm bg-white text-black",
          isValidColor ? "border-input" : "border-red-500"
        )}
        placeholder="#FFFFFF"
        aria-label="Enter hex color"
      />
    </div>
  );
}
