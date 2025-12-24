import React from 'react';
import Hero_about from '../../components/AboutUs/Hero_about';
import WhoWeAre from '../../components/AboutUs/WhoWeAre';
import Values from '../../components/AboutUs/Values';
import Stats from '../../components/AboutUs/Stats';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero_about />
      <div className="max-w-4xl mx-auto px-4 py-16 flex flex-col gap-16">
        <WhoWeAre />
        <Values />
        <Stats />
      </div>
    </div>
  );
};

export default AboutPage;