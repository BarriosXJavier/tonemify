import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, Github, Coffee, Diamond, Heart, Save } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 group text-foreground">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                id="diamond"
              >
                <path
                  fill="currentColor"
                  d="M0 6h4l3 8.6L0 6zM16 6h-4l-3 8.6L16 6zM8 15 5 6h6l-3 9zM4 5H0l2-3 2 3zM16 5h-4l2-3 2 3zM10 5H6l2-3 2 3zM3.34 2H7L5 5 3.34 2zM9 2h4l-2 3-2-3z"
                ></path>
              </svg>
            </div>
            <span className="font-bold text-xl">Tonemify</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/saved"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            Saved
          </Link>
          <Link
            href="/glassmorphism"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            Glassmorphism
          </Link>
          <Link
            href="https://github.com/BarriosXJavier/tonemify"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center transition-all hover:text-foreground  hover:scale-105"
          >
            <Github className="h-5 w-5 transition-colors group-hover:text-primary" />
          </Link>

          <Link
            href="/contact"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            Contact
          </Link>

          <Link
            href="https://buymeacoffee.com/barrios"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            Buy me a coffee
          </Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="group px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <MenuIcon className="h-6 w-6 transition-transform group-hover:scale-110" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="pr-0 bg-gradient-to-br from-background to-muted/20"
          >
            <VisuallyHidden>
              <SheetTitle>Navigation Menu</SheetTitle>
            </VisuallyHidden>
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <Diamond className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Tonemify
                </span>
              </div>
            </Link>
            <nav className="flex flex-col gap-3 text-lg">
              <Link
                href="/saved"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover:translate-x-1"
              >
                <Save className="h-5 w-5 mr-3 transition-colors group-hover:text-primary" />
                Saved
              </Link>
              <Link
                href="/glassmorphism"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover:translate-x-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-3 transition-colors group-hover:text-primary"><path d="M21.17 16.83a1 1 0 0 0-1.17-1.17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2.17a1 1 0 0 0-.83.17Z"/></svg>
                Glassmorphism
              </Link>
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover:translate-x-1"
              >
                <Github className="h-5 w-5 mr-3 transition-colors group-hover:text-primary" />
                GitHub
              </Link>
              <Link
                href="/contact"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover:translate-x-1"
              >
                Contact
              </Link>
              <Link
                href="https://www.buymeacoffee.com/barrios"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover.translate-x-1"
              >
                Buy me a coffee
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

