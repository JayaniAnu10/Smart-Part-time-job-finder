import React from 'react';

interface ValueCardProps {
  title: string;
  description: string;
  icon: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
    <div className="text-yellow-500 text-3xl mb-3">{icon}</div>
    <h3 className="font-bold text-blue-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-xs leading-relaxed">{description}</p>
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
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-8 font-sans">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, index) => (
          <ValueCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Values;