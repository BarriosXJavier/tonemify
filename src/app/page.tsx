import Faqs from "@/components/faqs";
import Hero from "@/components/hero";
import ShadcnComponentsDemo from "@/components/preview-container";

import ThemeGenerator from "@/components/theme-generator";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <ShadcnComponentsDemo />
      <Faqs />
    </main>
  );
}
