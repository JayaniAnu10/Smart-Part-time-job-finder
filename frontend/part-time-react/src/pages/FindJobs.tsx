import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import JobCard from '../components/JobCard';
import SidebarFilter from '../components/SidebarFilter';
import RecommendedJobs from '../components/RecommendedJobs';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const FindJobs: React.FC = () => {
  // Sample Data (ඔයාගේ Design එකේ තියෙන විදිහටම)
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
    {
      id: '5',
      title: 'Waiter/Waitress',
      company: 'The Riverside Restaurant',
      location: 'Mount Lavinia',
      salary: 'Rs 1,800/day',
      time: '5:00 PM - 11:00 PM',
      category: 'Food Service',
      isUrgent: false,
    },
    {
      id: '6',
      title: 'Event Staff',
      company: 'Party Planners LK',
      location: 'Galle Face',
      salary: 'Rs 3,000/day',
      time: 'Variable',
      category: 'Events',
      isUrgent: true,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* 1. Hero Section & Search Bar */}
      <section className="bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Find Your Next <span className="text-yellow-500">Opportunity</span>
          </h1>
          <p className="text-gray-500 text-lg mb-10 font-medium">
            Browse {jobs.length} part-time jobs across Sri Lanka
          </p>

          {/* Search Bar UI */}
          <div className="flex flex-wrap items-center bg-white border border-gray-200 shadow-xl shadow-blue-100/40 rounded-2xl p-2 md:p-3 gap-2">
            <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 border-r border-gray-100">
              <Search size={20} className="text-blue-500" />
              <input type="text" placeholder="Job title, keywords..." className="w-full py-2 outline-none text-gray-700" />
            </div>
            <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 border-r border-gray-100 hidden md:flex">
              <MapPin size={20} className="text-blue-500" />
              <input type="text" placeholder="Location..." className="w-full py-2 outline-none text-gray-700" />
            </div>
            <div className="flex-1 min-w-[150px] px-3 flex items-center justify-between text-gray-400 hidden lg:flex">
              <span>All Categories</span>
              <ChevronDown size={18} />
            </div>
            <button className="bg-yellow-500 text-white p-4 rounded-xl hover:bg-yellow-600 transition-all shadow-md">
              <Search size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Page Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filter Component */}
          <aside className="w-full lg:w-[280px] flex-shrink-0">
            <SidebarFilter />
          </aside>

          {/* Job Results Area */}
          <div className="flex-1">
            
            {/* AI Recommendations */}
            <RecommendedJobs />

            {/* Sorting Header */}
            <div className="flex justify-between items-center mb-6 px-1">
              <p className="text-gray-500 text-sm">
                Showing <span className="text-slate-900 font-bold">{jobs.length}</span> of {jobs.length} jobs
              </p>
              <div className="flex items-center gap-3">
                <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-semibold text-gray-600">
                  Newest First <ChevronDown size={16} />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 bg-yellow-500 text-white rounded-lg">⊞</button>
                  <button className="p-2 bg-white border border-gray-200 text-gray-400 rounded-lg hover:bg-gray-50">☰</button>
                </div>
              </div>
            </div>

            {/* Grid of Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>

            {/* Bottom Info */}
            <div className="mt-12 text-center py-6 border-t border-gray-100">
               <p className="text-gray-400 text-sm font-medium">Showing {jobs.length} of {jobs.length} jobs</p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindJobs;