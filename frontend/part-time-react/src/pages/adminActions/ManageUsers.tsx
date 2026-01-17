
import UsersTable from "@/components/admin/UsersTable";

export default function ManageUsers() {
  return (
    <div className="p-12 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">Manage Users</h1>
        <p className="text-secondary/70 dark:text-primary/70">
          View and manage all platform users
        </p>
      </div>

      

      <UsersTable />

    </div>
  );
}
