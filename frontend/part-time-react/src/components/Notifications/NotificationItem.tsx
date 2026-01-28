
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
      case 'application': return <Briefcase className="text-yellow-400" />;
      case 'completed': return <CheckCircle className="text-yellow-400" />;
      case 'badge': return <Star className="text-blue-900" />;
      case 'reminder': return <Info className="text-blue-900" />;
    }
  };

  return (
    <div className="flex items-start p-6 mb-4 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md  transition-shadow">
      <div className={`p-3 rounded-2xl mr-4 ${type === 'application' || type === 'completed' ? 'bg-orange-50' : 'bg-blue-50'}`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
          {isNew && (
            <span className="bg-yellow-400 text-xs font-bold px-2 py-1 rounded-full uppercase">New</span>
          )}
        </div>
        <p className="text-gray-600 my-1">{description}</p>
        <span className="text-gray-400 text-sm">{time}</span>
      </div>
    </div>
  );
};

export default NotificationItem;