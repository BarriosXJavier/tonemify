"use client";
import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state before mounting
  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 rounded-full transition-colors"
      >
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle mode</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative w-10 h-10 rounded-full transition-colors duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Sun
            className={`h-5 w-5 absolute transition-transform duration-300 
              ${
                resolvedTheme === "dark"
                  ? "scale-0 rotate-90"
                  : "scale-100 rotate-0"
              }`}
          />
          <Moon
            className={`h-5 w-5 absolute transition-transform duration-300 
              ${
                resolvedTheme === "dark"
                  ? "scale-100 rotate-0"
                  : "scale-0 rotate-90"
              }`}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 cursor-pointer"
          data-state={theme === "light" ? "active" : ""}
        >
          <Sun className="h-4 w-4" />
          <span>Light</span>
          {theme === "light" && (
            <span className="ml-auto text-[10px] font-medium opacity-60">
              active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 cursor-pointer"
          data-state={theme === "dark" ? "active" : ""}
        >
          <Moon className="h-4 w-4" />
          <span>Dark</span>
          {theme === "dark" && (
            <span className="ml-auto text-[10px] font-medium opacity-60">
              active
            </span>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 cursor-pointer"
          data-state={theme === "system" ? "active" : ""}
        >
          <Monitor className="h-4 w-4" />
          <span>System</span>
          {theme === "system" && (
            <span className="ml-auto text-[10px] font-medium opacity-60">
              active
            </span>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
