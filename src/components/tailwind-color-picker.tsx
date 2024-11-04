import React, { useState } from "react";
import { tailwindColorPalette } from "../lib/colorUtils";
import { CheckIcon, CopyIcon, XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

type Color = keyof typeof tailwindColorPalette | null;

const TailwindColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<Color>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const { toast } = useToast();

  const handleColorSelect = (color: keyof typeof tailwindColorPalette) => {
    setSelectedColor(color);
    setCopiedColor(null);
  };

  const handleColorCopy = (colorHex: string, colorName: string) => {
    navigator.clipboard.writeText(colorHex);
    setCopiedColor(colorName);
    toast({
      title: "Color Copied",
      description: `Copied ${colorName} to clipboard!`,
    });
  };

  const handleReset = () => {
    setSelectedColor(null);
    setCopiedColor(null);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full">
            {selectedColor
              ? `${selectedColor}`
              : "Select from Tailwind color palettes"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full max-h-96 overflow-y-auto">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Tailwind Color Palette</span>
            {selectedColor && (
              <Button variant="ghost" onClick={handleReset}>
                <XIcon className="w-4 h-4" />
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {Object.keys(tailwindColorPalette).map((color) => (
            <DropdownMenuItem
              key={color}
              onClick={() =>
                handleColorSelect(color as keyof typeof tailwindColorPalette)
              }
            >
              <span>{color}</span>
            </DropdownMenuItem>
          ))}
          {selectedColor && (
            <>
              <DropdownMenuSeparator />
              <div className="p-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(tailwindColorPalette[selectedColor]).map(
                  ([shade, hex]) => (
                    <div
                      key={shade}
                      className={`border rounded-md cursor-pointer transition-all duration-200 ease-in-out hover:ring-2 hover:ring-offset-2 hover:ring-gray-400 dark:hover:ring-gray-600 ${
                        copiedColor === `${selectedColor}-${shade}`
                          ? "ring-2 ring-offset-2 ring-green-500 dark:ring-green-400"
                          : ""
                      }`}
                      style={{ backgroundColor: hex }}
                      onClick={() =>
                        handleColorCopy(hex, `${selectedColor}-${shade}`)
                      }
                    >
                      <div className="flex items-center justify-between p-4 h-32">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white dark:text-black">
                            {selectedColor}-{shade}
                          </span>
                          <span className="text-xs text-white dark:text-black">
                            {hex}
                          </span>
                        </div>
                        {copiedColor === `${selectedColor}-${shade}` ? (
                          <CheckIcon className="w-4 h-4 text-white dark:text-black" />
                        ) : (
                          <CopyIcon className="w-4 h-4 text-white dark:text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out" />
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Toaster />
    </div>
  );
};

export default TailwindColorPicker;
