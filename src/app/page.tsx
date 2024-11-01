import Faqs from "@/components/faqs";
import FeaturesSection from "@/components/features";
import Hero from "@/components/hero";
import MockDashboard from "@/components/mock-dashboard";

import ThemeGenerator from "@/components/theme-generator";


export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <Faqs />
      <FeaturesSection />
      <MockDashboard />
     
    </main>
  );
}
