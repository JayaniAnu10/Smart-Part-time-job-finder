import React from 'react';

const SidebarFilter: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800">
        <span className="text-yellow-500 text-xl">≡</span> Filter Jobs
      </h3>

      {/* Category Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xs">🏷️</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Category</p>
          </div>
          <span className="text-gray-400 text-[10px]">▲</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All Categories", "Delivery & Logistics", "Food Service", "Retail", "Events", "Tutoring", "Tech Support"].map((cat) => (
            <button 
              key={cat} 
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                cat === "All Categories" 
                ? "bg-yellow-500 text-white shadow-md shadow-yellow-100" 
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Job Type Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-xs">💼</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Job Type</p>
          </div>
          <span className="text-gray-400 text-[10px]">▲</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All Types", "Part-Time", "Full-Time", "Contract", "Freelance"].map((type) => (
            <button key={type} className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-[11px] font-bold hover:bg-blue-100">
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-xs">📍</span>
          <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Location</p>
          <span className="ml-auto text-gray-400 text-[10px]">▲</span>
        </div>
        <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-yellow-500">
          <option>All Locations</option>
          <option>Colombo</option>
          <option>Kandy</option>
        </select>
      </div>

      {/* Salary Range Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500 text-xs">💰</span>
          <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider">Salary Range</p>
          <span className="ml-auto text-gray-400 text-[10px]">▲</span>
        </div>
        <input type="range" className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
        <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold uppercase">
          <span>Rs 0</span>
          <span>Rs 10,000</span>
        </div>
      </div>

      {/* Date Posted Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4 bg-blue-50/50 p-2 rounded-lg border border-blue-100">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500 text-sm">📅</span>
            <p className="font-bold text-[11px] text-slate-700 uppercase tracking-wider">Date Posted</p>
          </div>
          <span className="text-gray-400 text-[10px]">▲</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Any Time", "Last Hour", "Last 24 Hours", "Last 7 Days", "Last 30 Days"].map((date) => (
            <button 
              key={date} 
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                date === "Any Time" 
                ? "bg-yellow-500 text-white shadow-sm" 
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              }`}
            >
              {date}
            </button>
          ))}
        </div>
      </div>

      {/* Footer info */}
      <div className="pt-4 border-t border-gray-100 text-center">
         <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight">
           Showing <span className="text-slate-800">6</span> of 6 jobs
         </p>
      </div>
    </div>
  );
};

export default SidebarFilter;