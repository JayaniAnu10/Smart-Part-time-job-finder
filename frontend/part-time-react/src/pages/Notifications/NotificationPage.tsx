import NotificationItem from "@/components/Notifications/NotificationItem";
import { useNotifications } from "@/hooks/useNotifications";
import { axiosInstance } from "@/services/apiClient";
import { Bell, CheckCheck, Loader2 } from "lucide-react";

const NotificationPage = () => {
  const { notifications, loading, error, refetch } = useNotifications();

  const handleMarkAllAsRead = async () => {
    try {
      await axiosInstance.put("/notifications/read-all");
      refetch();
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen w-full overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bell className="text-white" size={24} />
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Notifications
              </h1>
            </div>
            <p className="text-slate-500 text-lg ml-1">
              Stay updated with your latest job activities
            </p>
          </div>

          <button
            onClick={handleMarkAllAsRead}
            disabled={loading || notifications.length === 0}
            className="group flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-2xl hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCheck
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 className="animate-spin mb-4" size={40} />
              <p className="font-medium animate-pulse">
                Syncing your notifications...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center">
              <p className="text-red-600 font-medium">{error}</p>
              <button
                onClick={() => refetch()}
                className="mt-3 text-red-700 underline text-sm"
              >
                Try again
              </button>
            </div>
          )}

          {!loading && !error && notifications.length === 0 && (
            <div className="bg-white border border-dashed border-slate-300 p-12 rounded-3xl text-center">
              <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="text-slate-300" size={32} />
              </div>
              <h3 className="text-slate-900 font-bold text-xl">
                All caught up!
              </h3>
              <p className="text-slate-500 mt-1">
                No new notifications at the moment.
              </p>
            </div>
          )}

          {!loading &&
            !error &&
            notifications.map((note) => (
              <NotificationItem
                key={note.id}
                type="application"
                title="Update"
                description={note.message}
                time={new Date(note.createdAt).toLocaleString(undefined, {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                isNew={!note.read}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
