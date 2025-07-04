import Faqs from "@/components/faqs";
import Hero from "@/components/hero";

import ThemeGenerator from "@/components/theme-generator";
import ThemeShowcase from "@/components/theme-showcase";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <ThemeShowcase />
      <Faqs />
    </main>
  );
}
