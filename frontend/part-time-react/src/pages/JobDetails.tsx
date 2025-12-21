import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Clock, DollarSign, Calendar, Users, Share2, Bookmark, ArrowLeft } from 'lucide-react';

const JobDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-10 w-full">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={18} /> Back to Jobs
        </button>

        {/* Job Header Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Delivery Driver</h1>
              <p className="text-blue-600 font-bold">ABC Logistics Ltd.</p>
            </div>
            <div className="flex gap-3">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-xs font-bold uppercase flex items-center">Active</span>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Bookmark size={18} className="text-gray-400" /></button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"><Share2 size={18} className="text-gray-400" /></button>
            </div>
          </div>

          {/* Key Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 border-t border-gray-50 pt-6">
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <MapPin size={18} className="text-yellow-500" /> Colombo 03, Sri Lanka
            </div>
            <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
              <DollarSign size={18} className="text-yellow-500" /> LKR 2,500 - 3,000 / day
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Clock size={18} className="text-yellow-500" /> 8:00 AM - 5:00 PM
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Calendar size={18} className="text-yellow-500" /> Posted 2 days ago
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <Users size={18} className="text-yellow-500" /> 15 Applicants
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-yellow-500 pl-3">Job Description</h3>
            <p className="text-gray-600 leading-relaxed">
              We are looking for a reliable and punctual delivery driver to join our team. 
              You will be responsible for delivering packages to customers across Colombo area. 
              Valid driving license and knowledge of Colombo routes required.
            </p>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-yellow-500 pl-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
              <li>Valid driving license (motorcycle or vehicle)</li>
              <li>Good knowledge of Colombo area</li>
              <li>Punctual and reliable</li>
              <li>Basic smartphone skills</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-slate-900 mb-4 border-l-4 border-yellow-500 pl-3">Benefits</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
              <li>Daily payment</li>
              <li>Fuel allowance provided</li>
              <li>Flexible schedule</li>
              <li>Performance bonuses</li>
            </ul>
          </div>

          <button className="w-full bg-yellow-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 shadow-lg shadow-yellow-100 transition-all">
            Apply Now
          </button>
        </div>

        {/* Employer Rating */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="text-yellow-500">⭐ Employer Rating</div>
            <div className="text-2xl font-bold text-slate-900">4.8</div>
            <div className="flex text-yellow-400">★★★★★</div>
            <div className="text-xs text-gray-400">Based on 127 reviews</div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;