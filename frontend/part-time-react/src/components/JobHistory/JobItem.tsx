
import { Briefcase, Calendar, CircleDollarSign } from 'lucide-react';
import type { Job } from '../../pages/JobHistory/JobHistory';


interface JobItemProps {
  job: Job;
  onAddRating: () => void;
}

const JobItem = ({ job, onAddRating }: JobItemProps) => (
  <div className="p-6 hover:bg-slate-50 transition-colors flex flex-col gap-5">
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-1">
        <h4 className="text-[24px] font-semibold tracking-tight text-slate-900 dark:text-white">
          {job.title}
        </h4>
        <p className="text-[16px] font-normal text-slate-500 dark:text-slate-400">
          {job.company}
        </p>
      </div>

      <span
        className="px-4 py-1.5 rounded-full text-[12px] font-bold
                       bg-[#e0e7ff] text-[#4338ca] 
                       dark:bg-white/10 dark:text-slate-300 dark:border dark:border-white/10"
      >
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
        <CircleDollarSign
          size={18}
          className="text-[#fbbd23]"
          strokeWidth={2.2}
        />
        <span className="font-normal">LKR {job.earnings.toLocaleString()}</span>
      </div>

      <span className="font-normal ml-auto text-slate-400 dark:text-slate-500/50">
        No ratings yet
      </span>
    </div>

    <div className="flex gap-4">
      <button
        className="px-6 py-2 border border-slate-300 rounded-lg text-[13.5px] font-bold text-slate-700 
                       hover:bg-[#ffc107] hover:border-[#ffc107] hover:text-black 
                       transition-all duration-300 shadow-sm"
      >
        View Details
      </button>
      
      
      <button onClick={onAddRating}
              className="px-6 py-2 text-secondary bg-[#ffc107] hover:bg-[#ffb300] rounded-lg text-[13.5px] font-bold 
                         shadow-sm transition-all duration-300 hover:scale-103 active:scale-97 cursor-pointer">
        Rate Employer
      </button>
    </div>
  </div>
);

export default JobItem;
