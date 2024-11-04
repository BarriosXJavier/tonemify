"use client";

import { useState } from "react";
import Link from "next/link";
import { Coffee, Github, MenuIcon, X } from "lucide-react";
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
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between bg-background dark:bg-dark-background border-b border-border dark:border-dark-border font-mono">
      {/* Logo and Brand Name */}
      <Link className="flex items-center justify-center" href="/">
        <Gem className="h-6 w-6 text-foreground dark:text-dark-foreground" />
        <span className="ml-1 text-xl sm:text-2xl font-bold text-foreground dark:text-dark-foreground">
          TonemifyLabs
        </span>
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
                  <Coffee className="h-5 w-5 mr-2 text-foreground dark:text-dark-foreground" />
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
                  <Github className="h-5 w-5 mr-2 text-foreground dark:text-dark-foreground" />
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
            <Button variant="ghost" size="lg" className="h-12 w-12">
              <MenuIcon
                className="text-primary dark:text-dark-foreground"
                size="lg"
              />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] sm:w-[300px] bg-background dark:bg-dark-background"
          >
            <SheetHeader className="flex justify-between items-center">
              <SheetTitle className="text-lg font-bold sr-only">
                Menu
              </SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="lg" className="p-4 bg-secondary rounded-full">
                  <X size="lg" />
                </Button>
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col space-y-6 mt-8 font-mono">
              <Link
                href="/contact"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary dark:hover:text-dark-primary"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="https://www.buymeacoffee.com/barrios"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary dark:hover:text-dark-primary"
                onClick={() => setIsOpen(false)}
              >
                <Coffee className="h-6 w-6 text-foreground dark:text-dark-foreground" />
                <span>Buy Me a Coffee</span>
              </Link>
              <Link
                href="https://github.com/BarriosXJavier/tonemify"
                className="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary dark:hover:text-dark-primary"
                onClick={() => setIsOpen(false)}
              >
                <Github className="h-6 w-6 text-foreground dark:text-dark-foreground" />
                <span>GitHub</span>
              </Link>
              <div className="pt-4">
                <ModeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
