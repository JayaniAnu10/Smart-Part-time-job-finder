import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import BrowseByCategorySection from "@/components/home/BrowseByCategorySection";
import RatingsSection from "@/components/home/RatingsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CTASection from "@/components/home/CTASection";
const HomePage = () => {
  return (
    <div className="relative pt-6">
      <HeroSection />
      <WhyChooseSection />
      <BrowseByCategorySection />
      <RatingsSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
