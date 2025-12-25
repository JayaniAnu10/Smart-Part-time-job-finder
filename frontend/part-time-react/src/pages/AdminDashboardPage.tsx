import StatsSection from "@/components/adminDashboard/StatsSection";
import RecentActivities from "@/components/adminDashboard/RecentActivities";
import QuickActions from "@/components/adminDashboard/QuickActions";

export default function AdminDashboardPage() {
  return (
    <div className="relative pt-16 min-h-screen bg-background p-3 space-y-8">
      
      {/* Header */}
      <div className="px-16">
        <h1 className="text-5xl font-bold text-secondary dark:text-primary">Admin Dashboard</h1>
        <p className="text-secondary/80 dark:text-primary/80">
          System overview and management
        </p>
      </div>

      <div className="px-16 space-y-8 pb-16">
        {/* Stats section */}
        <StatsSection />

        {/* Bottom section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-cols-[1.3fr_1fr] gap-6">
          
          <RecentActivities />
          <QuickActions />
        </div>
      </div>
     
      
    </div>
  );
}
