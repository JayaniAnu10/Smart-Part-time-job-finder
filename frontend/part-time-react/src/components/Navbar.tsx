import React from 'react';
import { Search, Globe, Moon, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="bg-yellow-500 p-2 rounded-lg">
             <span className="text-white font-bold text-xl">D</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">DayBee<span className="text-yellow-500">.lk</span></span>
        </div>

        {/* Menu Links - Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#" className="text-yellow-600 border-b-2 border-yellow-500 pb-1">Find Jobs</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Post Job</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">AI Chatbot</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">Nearby Map</a>
          <a href="#" className="hover:text-yellow-500 transition-colors">About</a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-2 text-gray-500 text-sm font-medium border-r pr-5">
            <Globe size={18} />
            <span>English</span>
          </div>
          <button className="text-gray-500 hover:text-yellow-500">
            <Moon size={20} />
          </button>
          <button className="text-gray-700 font-bold text-sm hover:text-yellow-500">Login</button>
          <button className="bg-yellow-500 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-yellow-200 hover:bg-yellow-600 transition-all">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;