import type { Job } from '../../pages/JobHistory/JobHistory';


interface JobItemProps {
  job: Job;
  onAddRating: () => void;
}

const JobItem = ({ job, onAddRating }: JobItemProps) => (
  <div className="p-6 hover:bg-slate-50 transition-colors flex flex-col gap-5">
    <div className="flex justify-between items-start">
      <div>
        <h4 className="text-[19px] font-bold text-[#1e3a8a]">{job.title}</h4>
        <p className="text-slate-500 text-[15px] font-medium">{job.company}</p>
      </div>
      {/* Completed Tag */}
      <span className="bg-[#dee9ff] text-[#1e3a8a] px-4 py-1 rounded-full text-[13px] font-bold">
        {job.status}
      </span>
    </div>
    
    <div className="flex flex-wrap gap-x-12 gap-y-3 text-[14.5px] text-slate-600 font-semibold">
      <span>📅 {job.date}</span>
      <span className="text-slate-500 font-medium">🕒 {job.duration}</span>
      <span className="text-slate-900 font-extrabold">LKR {job.earnings.toLocaleString()}</span>
      <span className="text-slate-400 font-normal italic">No ratings yet</span>
    </div>

    <div className="flex gap-4">
      
      <button className="px-6 py-2 border border-slate-300 rounded-lg text-[13.5px] font-bold text-slate-700 
                       hover:bg-[#ffc107] hover:border-[#ffc107]  
                       transition-all duration-300 shadow-sm">
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