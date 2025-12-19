import NavBar from "../components/NavBar";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import BrowseByCategorySection from "@/components/home/BrowseByCategorySection";



const HomePage = () => {
  return (
    <div className="relative pt-16">

      <NavBar />
      <HeroSection />
      <WhyChooseSection />
      <BrowseByCategorySection />
        
    </div>
  );
};

export default HomePage;
