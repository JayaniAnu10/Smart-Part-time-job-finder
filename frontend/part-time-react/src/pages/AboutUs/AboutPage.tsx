import React from 'react';
import Hero_about from '../../components/AboutUs/Hero_about';
import WhoWeAre from '../../components/AboutUs/WhoWeAre';
import Values from '../../components/AboutUs/Values';
import Stats from '../../components/AboutUs/Stats';  

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Hero_about />
      
      {/* using gap-12 ,can change the gap between WhoWeAre & Values sections.
      */}
     <div className="max-w-7xl mx-auto px-8 py-16 flex flex-col gap-12">
        <WhoWeAre />
        <Values />
        <Stats />
      </div>
    </div>
  );
};

export default AboutPage;