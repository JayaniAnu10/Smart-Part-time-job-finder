import React from 'react';

const SidebarFilter: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        <span className="text-yellow-500 text-xl">≡</span> Filter Jobs
      </h3>

      {/* Category Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-sm text-gray-700 uppercase tracking-wider">Category</p>
          <span className="text-gray-400 text-xs">▲</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All Categories", "Delivery & Logistics", "Food Service", "Retail", "Events", "Tutoring", "Tech Support"].map((cat) => (
            <button 
              key={cat} 
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                cat === "All Categories" 
                ? "bg-yellow-500 text-white shadow-md shadow-yellow-200" 
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
          <p className="font-bold text-sm text-gray-700 uppercase tracking-wider">Job Type</p>
          <span className="text-gray-400 text-xs">▲</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {["All Types", "Part-Time", "Full-Time", "Contract", "Freelance"].map((type) => (
            <button key={type} className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-gray-200">
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-8">
        <p className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-4">Location</p>
        <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-yellow-500 transition-all">
          <option>All Locations</option>
          <option>Colombo</option>
          <option>Kandy</option>
          <option>Galle</option>
        </select>
      </div>

      {/* Salary Range Section */}
      <div className="mb-8">
        <p className="font-bold text-sm text-gray-700 uppercase tracking-wider mb-4">Salary Range</p>
        <input type="range" className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-500" />
        <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
          <span>Rs 0</span>
          <span>Rs 10,000</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;