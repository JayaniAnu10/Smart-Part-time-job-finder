import AdminSidebar from "@/components/adminDashboard/AdminSidebar";
import StatsSection from "@/components/adminDashboard/StatsSection";
import RecentActivities from "@/components/adminDashboard/RecentActivities";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="w-72 shrink-0">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-8 pt-24">

        <div>
          <h1 className="text-4xl font-bold text-secondary dark:text-primary">
            Admin Dashboard
          </h1>
          <p className="text-secondary/80 dark:text-primary/80">
            System overview and management
          </p>
        </div>

        <StatsSection />
        <RecentActivities />
      </main>
    </div>
  );
}
