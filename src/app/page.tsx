import Faqs from "@/components/faqs";
import FeaturesSection from "@/components/features";
import Hero from "@/components/hero";
import PreviewPage from "@/components/preview";
import ThemeGenerator from "@/components/theme-generator";


export default function Home() {
  return (
    <main>
      <Hero />
      <ThemeGenerator />
      <Faqs />
      <FeaturesSection /> 
      <PreviewPage />
    </main>
  );
}
