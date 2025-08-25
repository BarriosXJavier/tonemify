import Hero from "@/components/hero";
import ThemeGenerator from "@/components/theme-generator";

export default function Home() {
  return (
    <main className="container mx-auto px-4">
      <Hero />
      <div id="theme-generator" className="my-16 scroll-mt-20">
        <h2 className="text-3xl font-bold text-center mb-8">
          Create Your Color Palette
        </h2>
        <ThemeGenerator />
      </div>
    </main>
  );
}
