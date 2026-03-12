import dynamic from "next/dynamic";
import Hero from "@/components/hero";

const ThemeGenerator = dynamic(
  () => import("@/components/theme-generator"),
  { 
    loading: () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading theme generator...</div>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="container mx-auto px-4 pt-24">
      <Hero />
      <div id="theme-generator" className="my-16 scroll-mt-24">
        <ThemeGenerator />
      </div>
    </main>
  );
}
