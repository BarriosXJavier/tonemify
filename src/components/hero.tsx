import Link from "next/link";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section className="text-center space-y-6 mt-20 mb-12 p-4 rounded-lg">
      <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
        Instantly create stunning color palettes & more
      </h1>
      <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
        Visually design, customize, and export production-ready shadcn themes.
        Less tweaking, more shipping.
      </p>
      <div className="flex justify-center">
        <Link href="#theme-generator">
          <Button size="lg" className="text-lg">
            Start Creating
          </Button>
        </Link>
      </div>
    </section>
  );
};
export default Hero;

