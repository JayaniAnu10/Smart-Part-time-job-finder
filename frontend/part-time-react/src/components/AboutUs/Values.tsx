import React from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <div className="bg-card p-10 rounded-xl border border-border/50 dark:border-blue-900/30 shadow-sm 
                  transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl 
                  hover:border-primary cursor-default group">
    <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="font-bold text-secondary dark:text-white text-2xl mb-3">{title}</h3>
    <p className="text-foreground/70 dark:text-slate-400 text-base leading-relaxed">{description}</p>
  </div>
);

const Values: React.FC = () => {
  const data = [
    { title: "Our Mission", icon: "🎯", description: "To connect Sri Lankan job seekers with part-time opportunities that match their skills and schedules." },
    { title: "Community First", icon: "👥", description: "Building a trusted platform where employers and workers can connect seamlessly." },
    { title: "Quality Standards", icon: "🏅", description: "Maintaining high standards for job postings and user verification for everyone's safety." },
    { title: "Growth Together", icon: "📈", description: "Supporting both businesses and individuals to grow and succeed together." }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-secondary dark:text-white text-center mb-12">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {data.map((item, index) => (
          <ValueCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Values;