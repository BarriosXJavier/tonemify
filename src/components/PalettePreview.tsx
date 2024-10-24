"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getRGBA } from "@/lib/colorUtils";
import { LayoutGrid, Menu, Search, User } from "lucide-react";

interface PalettePreviewProps {
  palette: string[];
}

export function PalettePreview({ palette }: PalettePreviewProps) {
  const [primary, secondary, accent, neutral] = palette;

  return (
    <div className="rounded-lg overflow-hidden border shadow-xl">
      {/* Navbar */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: getRGBA(primary) }}
      >
        <div className="flex items-center gap-6">
          <h3 style={{ color: getRGBA(neutral) }} className="font-bold text-xl">
            Preview
          </h3>
          <nav className="hidden md:flex gap-4">
            {["Products", "Features", "Pricing"].map((item) => (
              <a
                key={item}
                href="#"
                style={{ color: getRGBA(secondary) }}
                className="hover:opacity-80 transition-opacity"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            style={{ color: getRGBA(secondary) }}
          >
            <Search className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            style={{ color: getRGBA(secondary) }}
          >
            <User className="h-5 w-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="md:hidden"
            style={{ color: getRGBA(secondary) }}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="p-8 relative"
        style={{ backgroundColor: getRGBA(secondary) }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.2) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <h2
            className="text-3xl font-bold"
            style={{ color: getRGBA(neutral) }}
          >
            Design with Confidence
          </h2>
          <p style={{ color: getRGBA(primary) }}>
            Create stunning interfaces with our professionally curated color
            palettes.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              style={{
                backgroundColor: getRGBA(accent),
                color: getRGBA(secondary),
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              style={{
                borderColor: getRGBA(primary),
                color: getRGBA(primary),
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div
        className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        style={{ backgroundColor: getRGBA(primary) }}
      >
        {[
          { title: "Responsive", icon: LayoutGrid },
          { title: "Customizable", icon: User },
          { title: "Modern", icon: Search },
        ].map(({ title, icon: Icon }) => (
          <Card
            key={title}
            className="p-4"
            style={{
              backgroundColor: getRGBA(secondary),
              color: getRGBA(neutral),
            }}
          >
            <Icon className="h-6 w-6 mb-2" />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm opacity-80">
              Built with the latest design principles in mind.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
