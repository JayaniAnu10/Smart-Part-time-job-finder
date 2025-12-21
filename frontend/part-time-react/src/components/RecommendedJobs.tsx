import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const RecommendedJobs: React.FC = () => {
  const navigate = useNavigate();

  const recommendations = [
    {
      id: 'r1',
      title: 'Delivery Driver',
      company: 'QuickFood Delivery',
      location: 'Colombo 7',
      salary: 'Rs 2,000/day',
      isUrgent: true,
    },
    {
      id: 'r2',
      title: 'Tech Support Assistant',
      company: 'Digital Solutions',
      location: 'Colombo 3',
      salary: 'Rs 2,200/day',
      isUrgent: true,
    },
    {
      id: 'r3',
      title: 'Math Tutor',
      company: 'Learn Zone',
      location: 'Nugegoda',
      salary: 'Rs 2,500/hour',
      isUrgent: false,
    }
  ];

  return (
    <div className="bg-yellow-50/50 border border-yellow-100 rounded-2xl p-6 mb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-yellow-500 p-1.5 rounded-lg">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">AI Recommended for You</h2>
          <p className="text-xs text-gray-500">Based on your profile and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((job) => (
          <div key={job.id} className="bg-white border border-yellow-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-l-yellow-500">
            <div className="flex gap-2 mb-3">
              <button 
  onClick={() => navigate('/job-details')} 
  className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase hover:bg-yellow-200 transition-colors"
>
  Match
</button>
              {job.isUrgent && (
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  Urgent
                </span>
              )}
            </div>
            <h4 className="font-bold text-gray-800 text-sm mb-1">{job.title}</h4>
            <div className="text-[11px] text-gray-500 space-y-1">
              <p className="flex items-center gap-1">🏢 {job.company}</p>
              <p className="flex items-center gap-1">📍 {job.location}</p>
              <p className="font-semibold text-yellow-600">💰 {job.salary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;