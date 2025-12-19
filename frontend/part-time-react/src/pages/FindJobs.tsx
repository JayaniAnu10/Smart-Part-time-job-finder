import React from 'react';
import JobCard from '../components/JobCard';
import SidebarFilter from '../components/SidebarFilter'; // Sidebar එක import කරගත්තා

const FindJobs: React.FC = () => {
  // අපේ Sample Data ටික (Design එකේ තියෙන විදිහටම)
  const jobs = [
    {
      id: '1',
      title: 'Delivery Driver',
      company: 'QuickFood Delivery',
      location: 'Colombo 7',
      salary: 'Rs 2,000/day',
      time: '8:00 AM - 5:00 PM',
      category: 'Delivery & Logistics',
      isUrgent: true,
    },
    {
      id: '2',
      title: 'Math Tutor',
      company: 'Learn Zone',
      location: 'Nugegoda',
      salary: 'Rs 2,500/hour',
      time: 'Flexible',
      category: 'Tutoring',
      isUrgent: false,
    },
    {
      id: '3',
      title: 'Tech Support Assistant',
      company: 'Digital Solutions',
      location: 'Colombo 3',
      salary: 'Rs 2,200/day',
      time: '9:00 AM - 5:00 PM',
      category: 'Tech Support',
      isUrgent: true,
    },
    {
      id: '4',
      title: 'Retail Sales Assistant',
      company: 'Fashion Hub',
      location: 'Kandy City',
      salary: 'Rs 1,500/day',
      time: '9:00 AM - 8:00 PM',
      category: 'Retail',
      isUrgent: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 1. Hero Section (Search Bar එක තියෙන කොටස - පස්සේ Component එකක් කරමු) */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E293B]">
          Find Your Next <span className="text-yellow-500">Opportunity</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg">Browse {jobs.length} part-time jobs across Sri Lanka</p>
        
        {/* Search Bar Placeholder */}
        <div className="mt-8 flex flex-wrap gap-3 p-3 bg-white shadow-xl shadow-blue-100/50 rounded-2xl border border-gray-100">
           <input type="text" placeholder="Job title, keywords..." className="flex-1 p-3 outline-none border-r border-gray-100" />
           <input type="text" placeholder="Location..." className="flex-1 p-3 outline-none border-r border-gray-100" />
           <select className="p-3 bg-white outline-none text-gray-400">
              <option>All Categories</option>
           </select>
           <button className="bg-yellow-500 text-white p-3 px-6 rounded-xl hover:bg-yellow-600 transition-all">
             🔍
           </button>
        </div>
      </div>

      {/* 2. Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Section - 1/4 width */}
          <aside className="w-full lg:w-1/4">
            <SidebarFilter />
          </aside>

          {/* Job Listings Section - 3/4 width */}
          <main className="w-full lg:w-3/4">
            {/* Sorting Header */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600 font-medium">Showing <span className="text-black font-bold">{jobs.length}</span> of {jobs.length} jobs</p>
              <div className="flex gap-2">
                 <select className="bg-white border border-gray-200 p-2 rounded-lg text-sm outline-none">
                    <option>Newest First</option>
                 </select>
              </div>
            </div>

            {/* Grid of Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {jobs.map((job) => (
                <JobCard 
                  key={job.id}
                  {...job} // Spread operator එකෙන් ඔක්කොම props ටික ලේසියෙන්ම යවනවා
                />
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default FindJobs;