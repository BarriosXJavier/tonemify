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

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-gradient-to-r from-background/95 via-background/98 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <Link
        href="https://github.com/BarriosXJavier/tonemify"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 right-0 group overflow-hidden h-16 hidden md:block"
        aria-label="View source on GitHub"
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 250 250"
          className="fill-foreground text-background transition-colors duration-300 hover:fill-primary"
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

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium mr-16">
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
            href="/contact"
            className="group relative flex items-center transition-all hover:text-foreground text-foreground/70 hover:scale-105"
          >
            Contact/About
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
                <span className="font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Tonemify
                </span>
              </div>
            </Link>
            <nav className="flex flex-col gap-4 text-lg">
              <Link
                href="/saved"
                className="group flex w-full items-center py-4 px-4 text-base font-medium rounded-xl transition-all hover:bg-primary/10 hover:translate-x-2"
              >
                <Save className="h-5 w-5 mr-4 transition-colors group-hover:text-primary" />
                <span>Saved Themes</span>
              </Link>
              <Link
                href="/glassmorphism"
                className="group flex w-full items-center py-4 px-4 text-base font-medium rounded-xl transition-all hover:bg-primary/10 hover:translate-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-4 transition-colors group-hover:text-primary"><path d="M21.17 16.83a1 1 0 0 0-1.17-1.17H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2.17a1 1 0 0 0-.83.17Z"/></svg>
                <span>Glassmorphism</span>
              </Link>
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center py-4 px-4 text-base font-medium rounded-xl transition-all hover:bg-primary/10 hover:translate-x-2"
              >
                <Github className="h-5 w-5 mr-4 transition-colors group-hover:text-primary" />
                <span>GitHub</span>
              </Link>
              <Link
                href="/contact"
                className="group flex w-full items-center py-4 px-4 text-base font-medium rounded-xl transition-all hover:bg-primary/10 hover:translate-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-4 transition-colors group-hover:text-primary"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                <span>Contact/About</span>
              </Link>
              <div className="h-px bg-border/50 my-2" />
              <Link
                href="https://www.buymeacoffee.com/barrios"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center py-4 px-4 text-base font-medium rounded-xl transition-all bg-primary/5 hover:bg-primary/15 hover:translate-x-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mr-4 transition-colors group-hover:text-primary"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>
                <span>Buy me a coffee</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

