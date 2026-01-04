import StatsCard from "@/components/JobHistory/StatsCard";
import JobItem from "@/components/JobHistory/JobItem";
import FooterSection from "@/components/FooterSection"; // imported footer

const dummyJobs = [
  { id: "1", title: "Delivery Driver", company: "ABC Logistics Ltd.", date: "Nov 19, 2024", duration: "8 hours", earnings: 2800, status: "Completed" },
  { id: "2", title: "Warehouse Helper", company: "StoreMart", date: "Nov 18, 2024", duration: "6 hours", earnings: 2100, status: "Completed" },
  { id: "3", title: "Sales Assistant", company: "Fashion Point", date: "Nov 17, 2024", duration: "8 hours", earnings: 1800, status: "Completed" }
];

export const JobHistory = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
     
      <div className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          
          {/*  Page Title */}
          <h1 className="text-[36px] font-[900] mb-10 text-slate-900 tracking-tight leading-none">
            Job History
          </h1>
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <StatsCard label="Jobs Completed" value="3" />
            <StatsCard label="Total Earnings" value="LKR 6,700" />
            <StatsCard label="Average Rating" value="0.0" />
          </div>

          {/* Jobs Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-10">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-800">Completed Jobs</h2>
              
              {/* yellow hover button */}
              <button className="px-6 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-600 
                               hover:bg-[#ffc107] hover:border-[#ffc107] hover:text-black 
                               transition-all duration-300 shadow-sm">
                Export History
              </button>
            </div>
            
            <div className="flex flex-col divide-y divide-slate-100">
              {dummyJobs.map(job => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
};

export default JobHistory;