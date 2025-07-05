import React, { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { toast } from "sonner";
import { tailwindColorPalette } from "@/lib/color-utils";
import { Button } from "./ui/button";

type Color = keyof typeof tailwindColorPalette | null;

const TailwindColorPicker = () => {
  const [selectedColor, setSelectedColor] = useState<Color>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: keyof typeof tailwindColorPalette) => {
    setSelectedColor(color);
    setCopiedColor(null);

    // Auto-scroll to the selected color palette
    setTimeout(() => {
      const selectedColorSection = document.querySelector(
        `[data-color-section="${color}"]`,
      );
      if (selectedColorSection) {
        selectedColorSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  };

  const handleColorCopy = (colorHex: string, colorName: string) => {
    navigator.clipboard.writeText(colorHex);
    setCopiedColor(colorName);
    toast.success(`Copied ${colorName} to clipboard!`);
  };

  const handleReset = () => {
    setSelectedColor(null);
    setCopiedColor(null);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      handleReset();
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full max-w-md mx-auto relative">
      <Button
        onClick={toggleDropdown}
        className="w-full px-4 py-2 text-left border border-border rounded-md bg-primary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-colors"
      >
        {selectedColor
          ? `${selectedColor}`
          : "Select from Tailwind color palettes"}
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-border">
            <span className="font-medium text-foreground">
              Tailwind Color Palette
            </span>
            <div className="flex items-center gap-2">
              <Button
                onClick={toggleDropdown}
                className="p-1 hover:bg-accent rounded bg-background"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Color Selection Grid */}
          <div className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(tailwindColorPalette).map(
                ([colorName, shades]) => (
                  <div
                    key={colorName}
                    onClick={() =>
                      handleColorSelect(
                        colorName as keyof typeof tailwindColorPalette,
                      )
                    }
                    className={`cursor-pointer p-3 rounded-lg border-2 transition-all hover:border-primary ${selectedColor === colorName
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-accent"
                      }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {/* Color preview circles */}
                      <div className="flex -space-x-1">
                        {Object.entries(shades)
                          .slice(0, 3)
                          .map(([shade, hex]) => (
                            <div
                              key={shade}
                              className="w-4 h-4 rounded-full border border-border shadow-sm"
                              style={{ backgroundColor: hex }}
                            />
                          ))}
                        {Object.keys(shades).length > 3 && (
                          <div
                            className="w-4 h-4 rounded-full border border-border shadow-sm flex items-center justify-center"
                            style={{
                              backgroundColor: Object.values(shades)[3],
                            }}
                          >
                            <span className="text-xs text-muted-foreground">
                              +
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {colorName}
                    </span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Selected Color Shades */}
          {selectedColor && (
            <div
              className="border-t border-gray-200 p-3"
              data-color-section={selectedColor}
            >
              <h4 className="font-medium mb-3 ">
                {selectedColor} shades (click a shade to copy)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {Object.entries(tailwindColorPalette[selectedColor]).map(
                  ([shade, hex]) => (
                    <div
                      key={shade}
                      className={`group relative border rounded-md cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-offset-2 hover:ring-ring/50 ${copiedColor === `${selectedColor}-${shade}`
                          ? "ring-2 ring-offset-2 ring-success"
                          : ""
                        }`}
                      style={{ backgroundColor: hex }}
                      onClick={() =>
                        handleColorCopy(hex, `${selectedColor}-${shade}`)
                      }
                    >
                      <div className="flex flex-col items-center justify-center p-3 h-20 text-center">
                        {/* Color circle */}
                        <div
                          className="w-6 h-6 rounded-full border-2 border-border shadow-sm mb-1"
                          style={{ backgroundColor: hex }}
                        />
                        <span className="text-xs font-medium text-card-foreground ">
                          {shade}
                        </span>
                        <span className="text-xs text-card-foreground ">
                          {hex}
                        </span>

                        {/* Copy indicator */}
                        <div className="absolute top-1 right-1">
                          {copiedColor === `${selectedColor}-${shade}` ? (
                            <Check className="w-3 h-3 text-foreground mix-blend-difference" />
                          ) : (
                            <Copy className="w-3 h-3 text-foreground mix-blend-difference opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TailwindColorPicker;
