import NotificationItem from "@/components/Notifications/NotificationItem";

const NotificationPage = () => {
  const notifications = [
    { type: 'application', title: 'Application Accepted', description: 'Your application for Delivery Driver at ABC Logistics has been accepted!', time: '2 hours ago', isNew: true },
    { type: 'completed', title: 'Job Completed', description: "You've successfully completed the Sales Assistant job. Payment processed.", time: '1 day ago', isNew: true },
    { type: 'badge', title: 'New Badge Earned', description: "Congratulations! You've earned the 'Reliable Worker' badge.", time: '2 days ago' },
    { type: 'reminder', title: 'Reminder: Job Tomorrow', description: 'You have a confirmed job tomorrow at 9:00 AM. Don\'t forget!', time: '3 days ago' },
  ];

  return (
    
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      
     
      <div className="max-w-4xl mx-auto px-4 py-12">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Notifications</h1>
            <p className="text-slate-500 mt-2 text-lg">Stay updated with your job activities</p>
          </div>
          <button className="text-slate-600 border-2 font-medium border-slate-200 bg-white px-6 py-2.5 rounded-xl hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all shadow-sm">
            Mark All as Read
          </button>
        </div>
        
        {/* Notifications List */}
        <div className="space-y-5">
          {notifications.map((note, index) => (
            <NotificationItem key={index} {...note} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default NotificationPage;