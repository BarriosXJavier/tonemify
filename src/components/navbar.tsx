import Link from "next/link";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MenuIcon, Github, Coffee, Diamond, Heart } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo - Always on the left */}
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

        {/* Desktop Navigation - Right side */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="https://github.com/BarriosXJavier/tonemify"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center transition-all hover:text-foreground  hover:scale-105"
          >
            <Github className="h-5 w-5 transition-colors group-hover:text-primary" />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="/contact"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            <div className="h-5 w-5 mr-2 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center transition-transform group-hover:scale-110">
              <div className="h-2 w-2 bg-primary-foreground rounded-full"></div>
            </div>
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all group-hover:w-full"></span>
          </Link>

          <Link
            href="https://buymeacoffee.com/barrios"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            <div className="relative mr-2">
              <Coffee className="h-5 w-5 transition-colors group-hover:text-primary" />
              <Heart className="absolute -top-1 -right-1 h-3 w-3 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            Buy me a coffee
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/60 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Mobile Menu Trigger - Right side */}
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
                <div className="h-5 w-5 mr-3 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <div className="h-2 w-2 bg-primary-foreground rounded-full"></div>
                </div>
                Contact
              </Link>
              <Link
                href="https://www.buymeacoffee.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center py-3 px-3 text-lg font-semibold rounded-lg transition-all hover:bg-muted/50 hover:translate-x-1"
              >
                <div className="relative mr-3">
                  <Coffee className="h-5 w-5 transition-colors group-hover:text-primary" />
                  <Heart className="absolute -top-1 -right-1 h-3 w-3 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                Buy me a coffee
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
