import React from 'react';
import { Briefcase, CheckCircle, Star, Info } from 'lucide-react';

interface NotificationProps {
  type: 'application' | 'completed' | 'badge' | 'reminder';
  title: string;
  description: string;
  time: string;
  isNew?: boolean;
}

const NotificationItem: React.FC<NotificationProps> = ({ type, title, description, time, isNew }) => {
  
  const getIcon = () => {
    switch (type) {
      case 'application': return <Briefcase size={20} strokeWidth={2.5} className="text-amber-600" />;
      case 'completed': return <CheckCircle size={20} strokeWidth={2.5} className="text-emerald-600" />;
      case 'badge': return <Star size={20} strokeWidth={2.5} className="text-indigo-600" />;
      case 'reminder': return <Info size={20} strokeWidth={2.5} className="text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'application': return 'bg-amber-100';
      case 'completed': return 'bg-emerald-100';
      case 'badge': return 'bg-indigo-100';
      case 'reminder': return 'bg-blue-100';
    }
  };

  return (
    <div className={`
      group relative flex items-start p-5 mb-4 border rounded-2xl transition-all duration-300
      ${isNew 
        ? 'bg-white border-blue-100 shadow-sm ring-1 ring-blue-50' 
        : 'bg-gray-50/30 border-gray-100 hover:bg-white'}
      hover:shadow-lg hover:-translate-y-0.5 cursor-pointer
    `}>
      {isNew && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-[10px] font-bold text-blue-700 tracking-wider uppercase">New</span>
        </div>
      )}

      <div className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-300 ${getIconBg()}`}>
        {getIcon()}
      </div>

      <div className="ml-4 flex-1 pr-12">
        <h3 className="font-semibold text-gray-900 text-base leading-snug group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mt-1 leading-relaxed line-clamp-2">
          {description}
        </p>
        <div className="flex items-center mt-3 space-x-2">
          <span className="text-gray-400 text-xs font-medium tracking-tight">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;