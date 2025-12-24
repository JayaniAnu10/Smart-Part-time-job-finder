import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-[var(--primary)] rounded-xl p-10 text-center shadow-md">
      <h2 className="text-2xl font-bold text-[var(--secondary)] mb-3">Join Our Growing Community</h2>
      <p className="text-[var(--secondary)] opacity-80 mb-10 text-sm max-w-2xl mx-auto font-medium">
        Whether you're looking for flexible work opportunities or seeking reliable workers for your business, DayBee.lk is here to help you succeed.
      </p>
      <div className="grid grid-cols-3 gap-4 border-t border-[var(--secondary)]/10 pt-10">
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-black text-[var(--secondary)] tracking-tight">2,800+</p>
          <p className="text-[10px] font-bold text-[var(--secondary)] opacity-70 uppercase tracking-widest">Active Users</p>
        </div>
        <div className="flex flex-col gap-1 border-x border-[var(--secondary)]/10">
          <p className="text-3xl font-black text-[var(--secondary)] tracking-tight">350+</p>
          <p className="text-[10px] font-bold text-[var(--secondary)] opacity-70 uppercase tracking-widest">Daily Jobs</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-3xl font-black text-[var(--secondary)] tracking-tight">98%</p>
          <p className="text-[10px] font-bold text-[var(--secondary)] opacity-70 uppercase tracking-widest">Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;