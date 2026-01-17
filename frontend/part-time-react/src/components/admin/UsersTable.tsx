import { Button } from "@/components/ui/button";
import { useAdminUsers } from "@/hooks/useAdminUsers";

export default function UsersTable() {
  const { users, loading, error } = useAdminUsers();

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-left bg-muted [&_th]:!text-secondary dark:[&_th]:!text-primary">
          <tr>
            <th className="p-4">User</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Joined</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="[&_td]:!text-secondary dark:[&_td]:!text-primary">
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-4">{user.name}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.role}</td>
              <td className="p-4">{user.createdAt}</td>
              <td className="p-4 text-right">
                <Button size="sm" variant="outline">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
