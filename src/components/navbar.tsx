"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Menu, Gem, X } from "lucide-react";
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
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SupportDropdown from "./support";

interface NavigationLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
  isComponent?: boolean;
  component?: React.ReactNode;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks: NavigationLink[] = [
    { href: "/features", label: "Features" },
    { href: "/contact", label: "Contact" },
    {
      href: "https://github.com/BarriosXJavier/tonemify",
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
    },
    {
      href: "#",
      label: "Support",
      isComponent: true,
      component: <SupportDropdown />,
    },
  ];

  const renderDesktopLink = ({
    href,
    label,
    icon,
    isComponent,
    component,
  }: NavigationLink) => {
    if (isComponent && component) {
      return <NavigationMenuItem key={href}>{component}</NavigationMenuItem>;
    }

    return (
      <NavigationMenuItem key={href}>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink
            className={`${navigationMenuTriggerStyle()} group relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-accent/10 hover:backdrop-blur-sm`}
          >
            <span className="flex items-center gap-2">
              {icon}
              {label}
            </span>
            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  };

  const renderMobileLink = ({
    href,
    label,
    icon,
    isComponent,
    component,
  }: NavigationLink) => {
    if (isComponent && component) {
      return (
        <div key={href} className="w-full">
          {component}
        </div>
      );
    }

    return (
      <Link
        key={href}
        href={href}
        className="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 hover:bg-accent/10 hover:backdrop-blur-sm active:scale-95"
        onClick={() => setIsOpen(false)}
      >
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-2xl bg-background/60 border-b border-border/20 shadow-lg shadow-black/5">
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80 backdrop-blur-2xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center gap-2 group" href="/">
            <div className="relative">
              <Gem className="h-6 w-6 text-foreground transition-transform duration-200 group-hover:rotate-12" />
              <div className="absolute inset-0 h-6 w-6 bg-foreground/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Tonemify
            </span>
          </Link>

          <nav className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-1">
                {navigationLinks.map(renderDesktopLink)}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-full hover:bg-accent/10 transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 border-l border-border/20 backdrop-blur-2xl bg-background/70 shadow-2xl"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center justify-between pt-4 pb-6">
                <div className="flex items-center gap-2">
                  <Gem className="h-5 w-5" />
                  <span className="font-semibold">Menu</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex flex-col gap-2">
                {navigationLinks.map(renderMobileLink)}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
