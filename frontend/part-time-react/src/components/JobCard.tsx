import React from 'react';

import { MapPin, DollarSign, Clock } from 'lucide-react';

interface JobProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  time: string;
  category: string;
  isUrgent?: boolean;
}

const JobCard: React.FC<JobProps> = ({ title, company, location, salary, time, category, isUrgent }) => {
  return (
    <div className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-2">
          {isUrgent && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
              🔥 Urgent
            </span>
          )}
          <span className="bg-blue-50 text-blue-600 text-xs font-medium px-2 py-1 rounded">
            {category}
          </span>
        </div>
        <button className="text-gray-400 hover:text-yellow-500">
           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
        </button>
      </div>

      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      <p className="text-gray-500 mb-4">{company}</p>

      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-yellow-500" /> {location}
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-yellow-500" /> {salary}
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-yellow-500" /> {time}
        </div>
      </div>

      <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 rounded-lg transition-colors">
        View Details
      </button>
    </div>
  );
};

export default JobCard;