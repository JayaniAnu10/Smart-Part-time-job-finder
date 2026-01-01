import { Button } from "@/components/ui/button";

export default function UsersTable() {
  return (
    <div className="border rounded-xl overflow-hidden ">
      <table className="w-full text-sm">
        <thead className="text-left bg-muted [&_th]:!text-secondary dark:[&_th]:!text-primary">
          <tr >
            <th className="p-4">User</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Joined</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="text-left [&_td]:!text-secondary dark:[&_td]:!text-primary" >
          <tr className="border-t">
            <td className="p-4">John Doe</td>
            <td className="p-4">john@gmail.com</td>
            <td className="p-4">Employer</td>
            <td className="p-4">2024-01-10</td>
            <td className="p-4 text-right">
              <Button size="sm" variant="outline" className="hover:bg-yellow-400">View</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
