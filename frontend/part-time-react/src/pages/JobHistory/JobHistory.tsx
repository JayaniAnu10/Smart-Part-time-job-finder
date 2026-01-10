import { Briefcase, CircleDollarSign, Star } from 'lucide-react'; 
import StatsCard from "@/components/JobHistory/StatsCard";
import JobItem from "@/components/JobHistory/JobItem";
import FooterSection from '../../components/FooterSection';

const dummyJobs = [
  { id: "1", title: "Delivery Driver", company: "ABC Logistics Ltd.", date: "Nov 19, 2024", duration: "8 hours", earnings: 2800, status: "Completed" },
  { id: "2", title: "Warehouse Helper", company: "StoreMart", date: "Nov 18, 2024", duration: "6 hours", earnings: 2100, status: "Completed" },
  { id: "3", title: "Sales Assistant", company: "Fashion Point", date: "Nov 17, 2024", duration: "8 hours", earnings: 1800, status: "Completed" }
];

const JobHistory = () => {
  return (
    /* Light mode background එක ආපහු #f8fafc කළා */
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-[#f8fafc] dark:bg-[#020419]">
      <div className="flex-grow pt-12 pb-20">
        <div className="max-w-6xl mx-auto px-12">
          
          {/* Title එකට light mode එකේදී slate-900 පාට දුන්නා */}
          <h1 className="text-[36px] font-[900] mb-10 tracking-tight leading-none text-slate-900 dark:text-white">
            Job History
          </h1>
          
          {/* Stats Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <StatsCard label="Jobs Completed" value="3" icon={Briefcase} />
            <StatsCard label="Total Earnings" value="LKR 6,700" icon={CircleDollarSign} />
            <StatsCard label="Average Rating" value="0.0" icon={Star} />
          </div>

          {/* Main Container Card: Light mode එකේ සුදු පාටයි */}
          <div className="bg-white dark:bg-[#0f192e] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden mb-10">
            
            {/* Header section inside the main card */}
            <div className="p-8 border-b border-slate-100 dark:border-white/10 flex justify-between items-center bg-white dark:bg-[#0f192e]">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Completed Jobs</h2>
              
              {/* Export History - ඔයා ඉල්ලපු yellow hover එක light mode එකට දැම්මා */}
              <button className="px-6 py-2 border border-slate-300 dark:border-white/10 rounded-lg text-sm font-bold transition-all
                                 text-slate-600 dark:text-slate-400 
                                 hover:bg-[#ffc107] hover:border-[#ffc107] hover:text-black
                                 dark:hover:bg-[#fbbd23] dark:hover:text-black">
                Export History
              </button>
            </div>
            
            {/* Jobs List: Light mode divider එක slate-100 */}
            <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/10">
              {dummyJobs.map(job => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default JobHistory;