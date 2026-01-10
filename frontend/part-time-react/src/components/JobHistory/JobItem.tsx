import { Calendar, Briefcase, CircleDollarSign, Star } from 'lucide-react';

const JobItem = ({ job }: { job: any }) => (
  /* Light mode: bg-white | Dark mode: bg-[#0f192e] */
  <div className="p-10 rounded-2xl border-2 transition-all duration-300 flex flex-col gap-6 cursor-pointer
                  bg-white border-slate-100 hover:bg-slate-100 
                  dark:bg-[#0f192e] dark:border-white/5 dark:hover:bg-white/[0.03] dark:hover:shadow-md">
    
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <h4 className="text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">{job.title}</h4>
        <p className="text-[16px] font-normal text-slate-500 dark:text-slate-400">{job.company}</p>
      </div>
      
      <span className="px-4 py-1.5 rounded-full text-[12px] font-bold
                       bg-[#e0e7ff] text-[#4338ca] 
                       dark:bg-white/10 dark:text-slate-300 dark:border dark:border-white/10">
        {job.status}
      </span>
    </div>
    
    <div className="flex flex-row flex-wrap items-center gap-x-12 gap-y-4 text-[15.5px]">
      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
        <Calendar size={18} className="text-[#fbbd23]" strokeWidth={2.2} />
        <span className="font-normal">{job.date}</span>
      </div>

      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
        <Briefcase size={18} className="text-[#fbbd23]" strokeWidth={2.2} />
        <span className="font-normal">{job.duration}</span>
      </div>

      <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400">
        <CircleDollarSign size={18} className="text-[#fbbd23]" strokeWidth={2.2} />
        <span className="font-normal">LKR {job.earnings.toLocaleString()}</span>
      </div>

      <span className="font-normal ml-auto text-slate-400 dark:text-slate-500/50">No ratings yet</span>
    </div>

    <div className="flex gap-4 mt-2">
      {/* View Details Button - Dark mode hover effect එක update කළා */}
      <button className="px-6 py-3 border rounded-xl text-[14px] transition-all shadow-sm
                         border-slate-200 text-slate-700 hover:bg-white
                         dark:border-white/10 dark:text-white 
                         dark:hover:bg-[#fbbd23] dark:hover:text-[#020419] dark:hover:border-[#fbbd23]">
        View Details
      </button>
      
      <button className="px-6 py-3 bg-[#fbbd23] hover:bg-[#f59e0b] rounded-xl text-[14px] text-[#020419] shadow-sm transition-all flex items-center gap-2">
        <Star size={17} />
        Rate Employer
      </button>
    </div>
  </div>
);

export default JobItem;