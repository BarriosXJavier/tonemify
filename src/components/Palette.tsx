"use client";

import { motion } from "framer-motion";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PaletteProps {
  colors: string[];
}

export function Palette({ colors }: PaletteProps) {
  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color} to clipboard`);
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {colors.map((color, index) => (
        <motion.div
          key={color}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div
            className="h-24 rounded-lg shadow-lg transition-transform group-hover:scale-105"
            style={{ backgroundColor: color }}
          />
          <Button
            variant="secondary"
            size="sm"
            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => copyToClipboard(color)}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <p className="text-sm text-center mt-2 font-mono">{color}</p>
        </motion.div>
      ))}
    </div>
  );
}
