import React from 'react';

const Stats: React.FC = () => {
  return (
    <section className="bg-[#ffc107] rounded-xl p-8 text-center shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Join Our Growing Community</h2>
      <p className="text-blue-900/70 mb-8 text-sm max-w-2xl mx-auto">
        Whether you're looking for flexible work opportunities or seeking reliable workers for your business, DayBee.lk is here to help you succeed.
      </p>
      <div className="grid grid-cols-3 gap-4 border-t border-yellow-600/20 pt-8">
        <div>
          <p className="text-2xl font-black text-blue-900">2,800+</p>
          <p className="text-xs font-bold text-blue-800 uppercase">Active Users</p>
        </div>
        <div className="border-x border-yellow-600/20">
          <p className="text-2xl font-black text-blue-900">350+</p>
          <p className="text-xs font-bold text-blue-800 uppercase">Daily Jobs</p>
        </div>
        <div>
          <p className="text-2xl font-black text-blue-900">98%</p>
          <p className="text-xs font-bold text-blue-800 uppercase">Satisfaction</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;