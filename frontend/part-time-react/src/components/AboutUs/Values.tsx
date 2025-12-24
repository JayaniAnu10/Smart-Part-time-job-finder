import React from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <div className="bg-[var(--card)] p-8 rounded-lg border border-[var(--border)] shadow-sm transition-all duration-300 ease-in-out 
                  hover:-translate-y-2 hover:shadow-xl hover:border-[var(--primary)] cursor-default group">
    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
    <h3 className="font-bold text-[var(--secondary)] text-lg mb-2">{title}</h3>
    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed">{description}</p>
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
    <section className="py-10">
      <h2 className="text-2xl font-bold text-[var(--secondary)] text-center mb-10">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.map((item, index) => (
          <ValueCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Values;