import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-[#fbbd23] rounded-xl p-14 text-center shadow-lg transition-colors duration-300">
      <h2 className="text-4xl font-bold text-[#0f1f3d] mb-4">Join Our Growing Community</h2>
      <p className="text-[#0f1f3d]/80 mb-12 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
        Whether you're looking for flexible work opportunities or seeking reliable workers for your business, DayBee.lk is here to help you succeed.
      </p>
      <div className="grid grid-cols-3 gap-6 border-t border-[#0f1f3d]/20 pt-12">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-black text-[#0f1f3d] tracking-tight">2,800+</p>
          <p className="text-sm font-bold text-[#0f1f3d] opacity-70 uppercase tracking-widest">Active Users</p>
        </div>
        <div className="flex flex-col gap-2 border-x border-[#0f1f3d]/20">
          <p className="text-5xl font-black text-[#0f1f3d] tracking-tight">350+</p>
          <p className="text-sm font-bold text-[#0f1f3d] opacity-70 uppercase tracking-widest">Daily Jobs</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-black text-[#0f1f3d] tracking-tight">98%</p>
          <p className="text-sm font-bold text-[#0f1f3d] opacity-70 uppercase tracking-widest">Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;