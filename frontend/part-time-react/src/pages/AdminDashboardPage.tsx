import AdminSidebar from "@/components/adminDashboard/AdminSidebar";
import StatsSection from "@/components/adminDashboard/StatsSection";
import RecentActivities from "@/components/adminDashboard/RecentActivities";
import { motion } from "framer-motion";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      {/* Sidebar - Fixed width with subtle border */}
      <div className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800/50 hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-10 space-y-10 pt-24 lg:pt-12 relative overflow-hidden">
        
        {/* Background Ambient Glow (Dark Mode Only) */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] pointer-events-none hidden dark:block" />

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Admin <span className="text-secondary dark:text-[#fbbf24]">Dashboard</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="h-1 w-8 bg-secondary dark:bg-[#fbbf24] rounded-full" />
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              System overview and real-time management
            </p>
          </div>
        </motion.div>

        {/* Stats Section Wrapper */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10"
        >
          <StatsSection />
        </motion.section>

        {/* Recent Activities Wrapper */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#0f172a]/40 backdrop-blur-md rounded-[2.5rem] border border-slate-200 dark:border-slate-800/50 p-1 shadow-sm dark:shadow-2xl"
        >
          <RecentActivities />
        </motion.section>
      </main>
    </div>
  );
}