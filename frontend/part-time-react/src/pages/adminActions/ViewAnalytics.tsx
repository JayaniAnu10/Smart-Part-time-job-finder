import StatCard from "@/components/admin/analytics/StatCard";
import UserGrowthChart from "@/components/admin/analytics/UserGrowthChart";
import JobsByCategory from "@/components/admin/analytics/JobsByCategory";
import JobsByLocation from "@/components/admin/analytics/JobsByLocation";

import { Briefcase, Users, TrendingUp } from "lucide-react";

export default function ViewAnalytics() {
  return (
    <div className="p-12 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">View Analytics</h1>
        <p className="text-secondary/70 dark:text-primary/70">
          Platform statistics and insights
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard title="Total Jobs" value={0} icon={Briefcase} bgColor="bg-yellow-400/20" iconColor="text-yellow-500" />
        <StatCard title="Total Users" value={0} icon={Users} bgColor="bg-purple-400/20" iconColor="text-purple-500" />
        <StatCard title="Total Applications" value={0} icon={TrendingUp} bgColor="bg-green-400/20" iconColor="text-green-500" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <JobsByCategory />
        <UserGrowthChart />
      </div>
    
      <JobsByLocation />
   
      
    </div>
  );
}
