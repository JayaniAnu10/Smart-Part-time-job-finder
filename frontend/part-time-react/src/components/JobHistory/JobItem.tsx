interface Job {
  id: string;
  title: string;
  company: string;
  date: string;
  duration: string;
  earnings: number;
  status: string;
}

const JobItem = ({ job }: { job: Job }) => (
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
                       hover:bg-[#ffc107] hover:border-[#ffc107] hover:text-black 
                       transition-all duration-300 shadow-sm">
        View Details
      </button>
      
      
      <button className="px-6 py-2 bg-[#ffc107] hover:bg-[#ffb300] rounded-lg text-[13.5px] font-bold text-black shadow-sm transition-all">
        Rate Employer
      </button>
    </div>
  </div>
);

export default JobItem;