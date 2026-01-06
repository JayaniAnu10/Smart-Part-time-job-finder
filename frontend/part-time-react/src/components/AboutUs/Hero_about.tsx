import React from "react";

const Hero_about: React.FC = () => {
  return (
    // bg-secondary (index.css එකේ තියෙන පාට) පාවිච්චි කළා
    <section className="bg-secondary py-16 text-center transition-colors duration-300">
      <h1 className="text-6xl font-bold tracking-tight mb-4 text-primary">
        About DayBee.lk
      </h1>
      <p className="text-xl text-slate-400 font-medium tracking-wide">
        Sri Lanka's Premier Part-Time Job Platform
      </p>
    </section>
  );
};

export default Hero_about;