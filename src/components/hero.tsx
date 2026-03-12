import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative text-center space-y-6 mt-20 mb-12 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground">
        Design your shadcn theme
      </h1>

      <p className="text-lg text-muted-foreground max-w-xl mx-auto">
        Customize colors, spacing, and radii. Export ready-to-use CSS variables.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link href="#theme-generator">
          <Button size="lg" className="text-base px-6 py-5">
            <span className="flex items-center gap-2">
              Start designing
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </Link>
        <Link href="/saved">
          <Button variant="outline" size="lg" className="text-base px-6 py-5">
            Saved themes
          </Button>
        </Link>
      </div>
    </section>
  );
};
export default Hero;
