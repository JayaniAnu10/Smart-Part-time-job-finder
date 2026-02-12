import NotificationItem from "@/components/Notifications/NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationPage = () => {
  const { notifications, loading, error } = useNotifications();

  return (
    <div className="bg-gray-50 min-h-screen w-full overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
              Notifications
            </h1>
            <p className="text-slate-500 mt-2 text-lg">
              Stay updated with your job activities
            </p>
          </div>

          <button className="text-slate-600 border-2 font-medium border-slate-200 bg-white px-6 py-2.5 rounded-xl hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all shadow-sm">
            Mark All as Read
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-5">

          {loading && (
            <p className="text-slate-500">Loading notifications...</p>
          )}

          {error && (
            <p className="text-red-500">{error}</p>
          )}

          {!loading && !error && notifications.length === 0 && (
            <p className="text-slate-400">No notifications yet.</p>
          )}

          {!loading &&
            !error &&
            notifications.map((note) => (
              <NotificationItem
                key={note.id}
                type="application"
                title="Notification"
                description={note.message}
                time={new Date(note.createdAt).toLocaleString()}
                isNew={!note.read}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
