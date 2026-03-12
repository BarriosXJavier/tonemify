"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, Save, Github } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import KeyboardShortcutsDialog from "./keyboard-shortcuts-dialog";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { KeyboardShortcut, getModifierKey } from "@/lib/keyboard-shortcuts";
import { useMemo } from "react";

export default function Navbar() {
  // Keyboard shortcuts configuration (no actions in navbar, just for display)
  const modifierKey = getModifierKey();
  const shortcuts: KeyboardShortcut[] = useMemo(() => [
    {
      key: "c",
      [modifierKey]: true,
      description: "Copy theme CSS",
      action: () => {},
    },
    {
      key: "s",
      [modifierKey]: true,
      description: "Save theme",
      action: () => {},
    },
    {
      key: "r",
      [modifierKey]: true,
      description: "Generate random theme",
      action: () => {},
    },
    {
      key: "l",
      [modifierKey]: true,
      description: "Switch to light mode",
      action: () => {},
    },
    {
      key: "d",
      [modifierKey]: true,
      description: "Switch to dark mode",
      action: () => {},
    },
  ], [modifierKey]);

  // Register empty shortcuts (actual shortcuts registered in ThemeGenerator)
  useKeyboardShortcuts([]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      {/* Clean navbar with subtle border */}
      <div className="mx-4 mt-4 rounded-xl border border-border/40 bg-background/80 backdrop-blur-md shadow-sm transition-all duration-300">
        <Link
          href="https://github.com/BarriosXJavier/tonemify"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-0 right-0 group overflow-hidden h-14 hidden md:block rounded-tr-xl"
          aria-label="View source on GitHub"
        >
          <svg
            width="56"
            height="56"
            viewBox="0 0 250 250"
            className="fill-muted-foreground/50 text-background transition-all duration-300 hover:fill-primary"
            aria-hidden="true"
          >
            <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
            <path
              d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
              fill="currentColor"
              className="group-hover:animate-[wave_0.56s_ease-in-out]"
            />
            <path
              d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
              fill="currentColor"
            />
          </svg>
        </Link>
        <div className="container flex h-14 items-center justify-between px-6">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex items-center space-x-2 text-foreground">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  id="diamond"
                  className="text-primary-foreground"
                >
                  <path
                    fill="currentColor"
                    d="M0 6h4l3 8.6L0 6zM16 6h-4l-3 8.6L16 6zM8 15 5 6h6l-3 9zM4 5H0l2-3 2 3zM16 5h-4l2-3 2 3zM10 5H6l2-3 2 3zM3.34 2H7L5 5 3.34 2zM9 2h4l-2 3-2-3z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-lg tracking-tight transition-colors duration-200 group-hover:text-primary">Tonemify</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium mr-14">
            <KeyboardShortcutsDialog shortcuts={shortcuts} />
            
            <Link
              href="/saved"
              className="relative px-3 py-1.5 rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-accent"
            >
              Saved
            </Link>
            <Link
              href="/glassmorphism"
              className="relative px-3 py-1.5 rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-accent"
            >
              Glassmorphism
            </Link>

            <Link
              href="/contact"
              className="relative px-3 py-1.5 rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-accent"
            >
              Contact/About
            </Link>

            <Link
              href="https://buymeacoffee.com/barrios"
              target="_blank"
              rel="noopener noreferrer"
              className="relative ml-1 px-3 py-1.5 rounded-md text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-accent"
            >
              Buy me a coffee
            </Link>
          </nav>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="pr-0 border-l border-border bg-background"
            >
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
              </VisuallyHidden>
              <Link href="/" className="flex items-center space-x-2 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      id="diamond"
                      className="text-primary-foreground"
                    >
                      <path
                        fill="currentColor"
                        d="M0 6h4l3 8.6L0 6zM16 6h-4l-3 8.6L16 6zM8 15 5 6h6l-3 9zM4 5H0l2-3 2 3zM16 5h-4l2-3 2 3zM10 5H6l2-3 2 3zM3.34 2H7L5 5 3.34 2zM9 2h4l-2 3-2-3z"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-semibold text-lg">
                    Tonemify
                  </span>
                </div>
              </Link>
              <nav className="flex flex-col gap-1">
                <Link
                  href="/saved"
                  className="group flex w-full items-center py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-accent"
                >
                  <Save className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground" />
                  <span>Saved Themes</span>
                </Link>
                <Link
                  href="/glassmorphism"
                  className="group flex w-full items-center py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground"><path d="M21.17 16.83a1 1 0 0 0-1.17-1.17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2.17a1 1 0 0 0-.83.17Z"/></svg>
                  <span>Glassmorphism</span>
                </Link>
                <Link
                  href="https://github.com/BarriosXJavier/tonemify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-accent"
                >
                  <Github className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground" />
                  <span>GitHub</span>
                </Link>
                <Link
                  href="/contact"
                  className="group flex w-full items-center py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  <span>Contact/About</span>
                </Link>
                <div className="h-px bg-border my-2" />
                <Link
                  href="https://www.buymeacoffee.com/barrios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center py-2.5 px-3 text-sm font-medium rounded-md transition-colors duration-200 hover:bg-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-3 text-muted-foreground group-hover:text-foreground"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>
                  <span>Buy me a coffee</span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

