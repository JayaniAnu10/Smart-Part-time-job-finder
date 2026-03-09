import UsersTable from "@/components/admin/UsersTable";
import AdminSidebar from "@/components/adminDashboard/AdminSidebar";

export default function ManageUsers() {
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
            Manage Users
          </h1>
          <p className="text-secondary/70 dark:text-primary/70">
            View and manage all platform users
          </p>
        </div>

        <UsersTable />

      </main>
    </div>
  );
}