import NavBar from "../components/NavBar";
import HeroSection from "@/components/home/HeroSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";



const HomePage = () => {
  return (
    <div className="relative pt-16">

      <NavBar />
      <HeroSection />
      <WhyChooseSection />
        
    </div>
  );
};

export default HomePage;
