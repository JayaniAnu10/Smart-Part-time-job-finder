import StatCard from "@/components/admin/analytics/StatCard";
import UserGrowthChart from "@/components/admin/analytics/UserGrowthChart";
import JobsByCategory from "@/components/admin/analytics/JobsByCategory";
import JobsByLocation from "@/components/admin/analytics/JobsByLocation";

import { Briefcase, Users, TrendingUp } from "lucide-react";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import AdminSidebar from "@/components/adminDashboard/AdminSidebar";

export default function ViewAnalytics() {
  const { overview } = useAdminAnalytics();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* Sidebar */}
      <div className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800/50 hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-12 space-y-6">

        <div>
          <h1 className="text-3xl font-bold text-secondary dark:text-primary">
            View Analytics
          </h1>
          <p className="text-secondary/70 dark:text-primary/70">
            Platform statistics and insights
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard
            title="Total Jobs"
            value={overview?.totalJobs ?? 0}
            icon={Briefcase}
            bgColor="bg-yellow-400/20"
            iconColor="text-yellow-500"
          />

          <StatCard
            title="Total Users"
            value={overview?.totalUsers ?? 0}
            icon={Users}
            bgColor="bg-purple-400/20"
            iconColor="text-purple-500"
          />

          <StatCard
            title="Total Applications"
            value={overview?.totalApplications ?? 0}
            icon={TrendingUp}
            bgColor="bg-green-400/20"
            iconColor="text-green-500"
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2">
          <JobsByCategory />
          <UserGrowthChart />
        </div>

        <JobsByLocation />

      </main>
    </div>
  );
}