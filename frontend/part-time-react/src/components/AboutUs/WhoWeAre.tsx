import React from 'react';

const WhoWeAre: React.FC = () => {
  return (
    <section className="bg-card text-foreground p-12 rounded-xl shadow-sm border border-border transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-secondary dark:text-primary">Who We Are</h2>
      <div className="space-y-6 opacity-90 leading-relaxed text-[17px]">
        <p>
          DayBee.lk is a modern job-matching platform designed specifically for the Sri Lankan market. We understand the unique challenges of finding flexible, part-time work and aim to bridge the gap between employers seeking reliable workers and individuals looking for flexible employment opportunities.
        </p>
        <p>
          Founded with the vision of making work more accessible and flexible, we leverage technology to create a trusted ecosystem where opportunities meet talent efficiently and transparently.
        </p>
      </div>
    </section>
  );
};

export default WhoWeAre;