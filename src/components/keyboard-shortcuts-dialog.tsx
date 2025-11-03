"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KeyboardShortcut, formatShortcut } from "@/lib/keyboard-shortcuts";
import { Keyboard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface KeyboardShortcutsDialogProps {
  shortcuts: KeyboardShortcut[];
}

export default function KeyboardShortcutsDialog({
  shortcuts,
}: KeyboardShortcutsDialogProps) {
  const [open, setOpen] = useState(false);

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce((acc, shortcut) => {
    const category = getCategory(shortcut.description);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(shortcut);
    return acc;
  }, {} as Record<string, KeyboardShortcut[]>);

  function getCategory(description: string): string {
    if (description.toLowerCase().includes("undo") || description.toLowerCase().includes("redo")) {
      return "History";
    }
    if (description.toLowerCase().includes("copy") || description.toLowerCase().includes("save")) {
      return "Actions";
    }
    if (description.toLowerCase().includes("theme") || description.toLowerCase().includes("random")) {
      return "Theme";
    }
    if (description.toLowerCase().includes("mode") || description.toLowerCase().includes("switch")) {
      return "View";
    }
    return "General";
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105">
          <Keyboard className="w-4 h-4 mr-1" />
          <span>Shortcuts</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{category}</h3>
              <div className="space-y-2">
                {categoryShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground">
                      {shortcut.description}
                    </span>
                    <Badge variant="secondary" className="font-mono text-xs">
                      {formatShortcut(shortcut)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t text-xs text-muted-foreground">
          <p>💡 Tip: Shortcuts work when not typing in text fields</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
