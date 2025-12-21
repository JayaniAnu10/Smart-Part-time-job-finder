import NavBar from "../components/NavBar";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import BrowseByCategorySection from "@/components/home/BrowseByCategorySection";
import RatingsSection from "@/components/home/RatingsSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import CTASection from "@/components/home/CTASection";
import FooterSection from "@/components/FooterSection";

const HomePage = () => {
  return (
    <div className="relative pt-16">

      <NavBar />
      <HeroSection />
      <WhyChooseSection />
      <BrowseByCategorySection />
      <RatingsSection />
      <HowItWorksSection/>
      <CTASection />
      <FooterSection/>
        
    </div>
  );
};

export default HomePage;
