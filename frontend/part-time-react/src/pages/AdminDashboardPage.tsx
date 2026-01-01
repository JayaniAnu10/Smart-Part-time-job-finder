import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import StatsSection from "@/components/adminDashboard/StatsSection";
import RecentActivities from "@/components/adminDashboard/RecentActivities";
import AdminSidebar from "@/components/adminDashboard/AdminSidebar";

export default function AdminDashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
      
        {/* Sidebar */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="ml-180 p-6 space-y-8">
          <SidebarTrigger className="lg:hidden mb-4" />

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
    </SidebarProvider>
  );
}
