import Faqs from "@/components/faqs";
import FeaturesSection from "@/components/features";
import Hero from "@/components/hero";
import ThemeGenerator from "@/components/theme-generator";
import TonemifyDashboard from "../components/mock-dashboard";

export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <Faqs />
      <FeaturesSection />

      <TonemifyDashboard />
    </main>
  );
}
