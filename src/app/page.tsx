import Faqs from "@/components/faqs";
import Hero from "@/components/hero";
import MockDashboard from "@/components/mock-dashboard";
import ShadcnComponentsDemo from "@/components/preview-container";

import ThemeGenerator from "@/components/theme-generator";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <ShadcnComponentsDemo />
      <MockDashboard />
      <Faqs />
    </main>
  );
}
