import React from 'react';

interface StatsCardProps {
  icon: React.ElementType; 
  label: string;
  value: string | number;
}

const StatsCard = ({ icon: Icon, label, value }: any) => (
  <div className="p-10 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-4 cursor-pointer
                  bg-white border-slate-100 hover:shadow-md hover:-translate-y-1
                  dark:bg-[#0f192e] dark:border-white/5 dark:hover:bg-white/[0.02]">
    
    <div className="flex items-center justify-between">
      {Icon && <Icon size={32} className="text-[#fbbd23]" strokeWidth={2} />}
    </div>

    <div>
      <span className="text-4xl font-bold block leading-tight tracking-tighter text-slate-900 dark:text-white">
        {value}
      </span>
      <span className="text-[15px] font-medium mt-1 block uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </div>
  </div>
);

export default StatsCard;