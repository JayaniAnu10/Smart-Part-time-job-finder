import React, { useState } from 'react';

// Props සඳහා Interface එකක් එක් කළා
interface SidebarFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const SidebarFilter: React.FC<SidebarFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);
  const [isLocationOpen, setIsLocationOpen] = useState(true);
  const [isSalaryOpen, setIsSalaryOpen] = useState(true);
  const [isDateOpen, setIsDateOpen] = useState(true);

  const categories = ["All Categories", "Delivery & Logistics", "Food Service", "Retail", "Events", "Tutoring", "Tech Support"];

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-800 border-b pb-4">
        <span className="text-yellow-500 text-xl">≡</span> Filter Jobs
      </h3>

      {/* --- Category Section --- */}
      <div className="mb-8">
        <div onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex justify-between items-center mb-4 cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-50 p-1 rounded-md text-yellow-500 text-xs">🏷️</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Category</p>
          </div>
          <span className={`text-gray-400 text-[10px] transition-transform duration-300 ${isCategoryOpen ? 'rotate-0' : 'rotate-180'}`}>▲</span>
        </div>
        {isCategoryOpen && (
          <div className="flex flex-wrap gap-2 transition-all duration-300 overflow-hidden">
            {categories.map((cat) => (
              <button 
                key={cat} 
                onClick={() => onCategoryChange(cat)} // Click කරද්දී state එක මාරු කරනවා
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${
                  selectedCategory === cat 
                  ? "bg-yellow-500 text-white shadow-md shadow-yellow-200" 
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- Job Type Section (දැනට UI එක පමණයි) --- */}
      <div className="mb-8">
        <div onClick={() => setIsJobTypeOpen(!isJobTypeOpen)} className="flex justify-between items-center mb-4 cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-50 p-1 rounded-md text-yellow-500 text-xs">💼</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Job Type</p>
          </div>
          <span className={`text-gray-400 text-[10px] transition-transform ${isJobTypeOpen ? 'rotate-0' : 'rotate-180'}`}>▲</span>
        </div>
        {isJobTypeOpen && (
          <div className="flex flex-wrap gap-2">
            {["All Types", "Part-Time", "Full-Time", "Contract", "Freelance"].map((type) => (
              <button key={type} className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all ${type === "All Types" ? "bg-yellow-500 text-white" : "bg-blue-50 text-blue-600 hover:bg-blue-100"}`}>
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- Location Section --- */}
      <div className="mb-8">
        <div onClick={() => setIsLocationOpen(!isLocationOpen)} className="flex justify-between items-center mb-4 cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-50 p-1 rounded-md text-yellow-500 text-xs">📍</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Location</p>
          </div>
          <span className={`text-gray-400 text-[10px] transition-transform ${isLocationOpen ? 'rotate-0' : 'rotate-180'}`}>▲</span>
        </div>
        {isLocationOpen && (
          <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-yellow-500">
            <option>All Locations</option>
            <option>Colombo</option>
            <option>Kandy</option>
          </select>
        )}
      </div>

      {/* --- Salary Range Section --- */}
      <div className="mb-8">
        <div onClick={() => setIsSalaryOpen(!isSalaryOpen)} className="flex justify-between items-center mb-4 cursor-pointer group">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-50 p-1 rounded-md text-yellow-500 text-xs">💰</span>
            <p className="font-bold text-[11px] text-gray-500 uppercase tracking-wider group-hover:text-yellow-600 transition-colors">Salary Range</p>
          </div>
          <span className={`text-gray-400 text-[10px] transition-transform ${isSalaryOpen ? 'rotate-0' : 'rotate-180'}`}>▲</span>
        </div>
        {isSalaryOpen && (
          <>
            <input type="range" className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
            <div className="flex justify-between text-[11px] text-gray-400 mt-2 font-bold uppercase">
              <span>Rs 0</span>
              <span>Rs 10,000</span>
            </div>
          </>
        )}
      </div>

      {/* Footer info inside sidebar */}
      <div className="pt-4 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-[11px] font-medium uppercase">
          DayBee.lk Filters
        </p>
      </div>
    </div>
  );
};

export default SidebarFilter;