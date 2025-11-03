import Hero from "@/components/hero";
import ThemeGenerator from "@/components/theme-generator";

export default function Home() {
  return (
    <main className="container mx-auto px-4 pt-20">
      <Hero />
      <div id="theme-generator" className="my-16 scroll-mt-20">
        <ThemeGenerator />
      </div>
    </main>
  );
}
