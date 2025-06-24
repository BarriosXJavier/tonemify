"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, MenuIcon, Gem } from "lucide-react";
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
      icon: <Github className="h-5 w-5 mr-2" />,
    },
    {
      href: "#",
      label: "Support project",
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
            className={`${navigationMenuTriggerStyle()} transition-colors duration-300 ease-in-out hover:bg-accent hover:text-accent-foreground`}
          >
            {icon}
            <span className={icon ? "hidden xl:inline" : undefined}>
              {label}
            </span>
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
        className="flex items-center space-x-3 text-xl font-medium border-b border-border py-2 transition-colors duration-200 ease-in-out text-foreground hover:text-accent-foreground hover:bg-accent"
        onClick={() => setIsOpen(false)}
      >
        {icon && <span className="inline-block">{icon}</span>}
        <span>{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between border-b border-border">
      <Link className="flex items-center justify-center" href="/">
        <Gem className="h-6 w-6 text-foreground" />
        <span className="ml-1 text-xl sm:text-2xl font-bold text-foreground">
          Tonemify
        </span>
      </Link>

      <div className="hidden lg:flex items-center space-x-4">
        <NavigationMenu>
          <NavigationMenuList>
            {navigationLinks.map(renderDesktopLink)}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="lg"
              className="h-12 w-12 bg-primary border border-border"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] sm:w-[300px] bg-background"
          >
            <SheetHeader>
              <SheetTitle className="text-lg font-bold text-foreground sr-only">
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col space-y-6 mt-8 font-mono text-lg">
              {navigationLinks.map(renderMobileLink)}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
