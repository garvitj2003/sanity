import HeroSection from "../components/HeroSection";
import { Dashboard } from "../components/Dash";
import FeatureSection from "../components/FeatureSection/FeatureSection";
import FaqSection from "../components/FaqSection";

export default async function Home() {
  return (
    <main className="">
      <HeroSection />
      <Dashboard />
      <div id="feature-section">
        <FeatureSection />
      </div>
      <div id="faq-section">
        <FaqSection />
      </div>
    </main>
  );
}
