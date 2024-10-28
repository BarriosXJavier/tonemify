"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, Github } from "lucide-react";
import { ModeToggle } from "./theme-switch";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between bg-background border-b border-gray-100 dark:border-gray-700 font-mono">
      {/* Logo and Brand Name */}
      <Link className="flex items-center justify-center" href="/">
        <Gem className="h-6 w-6 text-blue-950 dark:text-gray-300" />
        <span className="ml-1 text-xl sm:text-2xl font-bold">TonemifyLabs</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/contact" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://buymeacoffee.com/barrios"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Coffee className="h-5 w-5 mr-2" />
                  <span className="hidden xl:inline">Buy Me a Coffee</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                legacyBehavior
                passHref
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Github className="h-5 w-5 mr-2" />
                  <span className="hidden xl:inline">GitHub</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col space-y-6 mt-8 font-mono">
              <Link
                href="#contact"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="https://www.buymeacoffee.com/barrios"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <Coffee className="h-6 w-6" />
                <span>Buy Me a Coffee</span>
              </Link>
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <Github className="h-6 w-6" />
                <span>GitHub</span>
              </Link>
              <div className="pt-4">
                <ModeToggle />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
