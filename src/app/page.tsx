import Hero from "@/components/hero";
import PreviewPage from "@/components/preview";
import ThemeGenerator from "@/components/theme-generator";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <PreviewPage />
    </main>
  );
}
