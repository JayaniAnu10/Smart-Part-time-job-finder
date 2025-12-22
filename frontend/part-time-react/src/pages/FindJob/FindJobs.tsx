import React, { useState, useMemo } from 'react';
import Navbar from '../../components/navBar/NavBar'; 
import JobCard from '../../components/JobCard';
import SidebarFilter from '../../components/SidebarFilter';
import RecommendedJobs from '../../components/RecommendedJobs';
import FooterSection from '../../components/FooterSection';
import { Search, MapPin, ChevronDown } from 'lucide-react';

const FindJobs: React.FC = () => {
  // 1. States හදාගන්න
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample Data (ඔයාගේ කලින් තිබුණු data ටිකමයි)
  const allJobs = [
    { id: '1', title: 'Delivery Driver', company: 'QuickFood Delivery', location: 'Colombo 7', salary: 'Rs 2,000/day', time: '8:00 AM - 5:00 PM', category: 'Delivery & Logistics', isUrgent: true },
    { id: '2', title: 'Math Tutor', company: 'Learn Zone', location: 'Nugegoda', salary: 'Rs 2,500/hour', time: 'Flexible', category: 'Tutoring', isUrgent: false },
    { id: '3', title: 'Tech Support Assistant', company: 'Digital Solutions', location: 'Colombo 3', salary: 'Rs 2,200/day', time: '9:00 AM - 5:00 PM', category: 'Tech Support', isUrgent: true },
    { id: '4', title: 'Retail Sales Assistant', company: 'Fashion Hub', location: 'Kandy City', salary: 'Rs 1,500/day', time: '9:00 AM - 8:00 PM', category: 'Retail', isUrgent: false },
    { id: '5', title: 'Waiter/Waitress', company: 'The Riverside Restaurant', location: 'Mount Lavinia', salary: 'Rs 1,800/day', time: '5:00 PM - 11:00 PM', category: 'Food Service', isUrgent: false },
    { id: '6', title: 'Event Staff', company: 'Party Planners LK', location: 'Galle Face', salary: 'Rs 3,000/day', time: 'Variable', category: 'Events', isUrgent: true }
  ];

  // 2. Filter Logic (useMemo එකෙන් performance වැඩි වෙනවා)
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      const matchesCategory = selectedCategory === "All Categories" || job.category === selectedCategory;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.company.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allJobs]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Navbar />

      {/* 1. Hero Section & Search Bar */}
      <section className="bg-card py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
              Find Your Next <span className="text-primary">Opportunity</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl mb-12 font-medium">
              Browse {filteredJobs.length} matching jobs across Sri Lanka
            </p>
          </div>

          {/* Search Bar UI - Using index.css variables */}
          <div className="flex flex-wrap items-center bg-card border border-border shadow-xl rounded-xl p-2 md:p-3 gap-2">
            <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 md:border-r border-border">
              <Search size={20} className="text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Job title, keywords..." 
                className="w-full py-3 bg-transparent outline-none" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex-1 min-w-[200px] hidden md:flex items-center gap-2 px-3 border-r border-border">
              <MapPin size={20} className="text-muted-foreground" />
              <input type="text" placeholder="Location..." className="w-full py-3 bg-transparent outline-none" />
            </div>

            <div className="flex-1 min-w-[150px] px-3 hidden lg:flex items-center justify-between text-muted-foreground">
              <span className="text-sm font-semibold">{selectedCategory}</span>
              <ChevronDown size={18} />
            </div>

            <button className="bg-primary text-primary-foreground p-4 rounded-lg hover:opacity-90 transition-all shadow-md">
              <Search size={22} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Recommended Jobs */}
      <section className="max-w-7xl mx-auto px-4 mt-12 w-full">
        <RecommendedJobs />
      </section>

      {/* 3. Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filter */}
          <aside className="w-full lg:w-[300px] flex-shrink-0">
            <SidebarFilter 
              selectedCategory={selectedCategory} 
              onCategoryChange={setSelectedCategory} 
            />
          </aside>

          {/* Job Results Area */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 px-1">
              <p className="text-muted-foreground text-sm font-medium">
                Showing <span className="text-foreground font-bold">{filteredJobs.length}</span> jobs found
              </p>
            </div>

            {/* Grid of Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-card rounded-xl border-2 border-dashed border-border">
                   <p className="text-muted-foreground font-medium text-lg">No jobs found matching your criteria.</p>
                   <button 
                    onClick={() => {setSelectedCategory('All Categories'); setSearchQuery('')}}
                    className="mt-4 text-primary font-bold hover:underline transition-all"
                   >
                     Clear all filters
                   </button>
                </div>
              )}
            </div>

            <div className="mt-16 text-center py-8 border-t border-border">
               <p className="text-muted-foreground text-sm font-medium italic opacity-60">End of results</p>
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
};

export default FindJobs;