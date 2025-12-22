import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-500 p-1.5 rounded-md">
               <span className="text-white font-bold text-lg">D</span>
            </div>
            <span className="text-xl font-bold">DayBee.lk</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Sri Lanka's premier part-time job platform. Find flexible work opportunities near you.
          </p>
          <div className="flex gap-4 text-gray-400">
             <Facebook size={20} className="hover:text-blue-600 cursor-pointer" />
             <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
             <Instagram size={20} className="hover:text-pink-600 cursor-pointer" />
             <Linkedin size={20} className="hover:text-blue-700 cursor-pointer" />
          </div>
        </div>

        {/* Links Sections */}
        <div>
          <h4 className="font-bold mb-6 text-gray-800">For Job Seekers</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li className="hover:text-yellow-500 cursor-pointer">Browse Jobs</li>
            <li className="hover:text-yellow-500 cursor-pointer">My Dashboard</li>
            <li className="hover:text-yellow-500 cursor-pointer">My Profile</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-gray-800">For Employers</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li className="hover:text-yellow-500 cursor-pointer">Post a Job</li>
            <li className="hover:text-yellow-500 cursor-pointer">Employer Dashboard</li>
            <li className="hover:text-yellow-500 cursor-pointer">Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-gray-800">Company</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li className="hover:text-yellow-500 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-500 cursor-pointer">Contact</li>
            <li className="hover:text-yellow-500 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>
      </div>
      
      <div className="text-center pt-8 border-t border-gray-50 text-xs text-gray-400">
        © 2024 DayBee.lk - All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;