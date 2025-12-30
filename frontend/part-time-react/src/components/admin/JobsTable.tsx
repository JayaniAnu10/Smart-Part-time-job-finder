export default function UsersTable() {
  return (
    <div className="border rounded-xl overflow-hidden ">
      <table className="w-full text-sm">
        <thead className="text-left bg-muted [&_th]:!text-secondary dark:[&_th]:!text-primary">
          <tr >
            <th className="p-4">Job Title</th>
            <th className="p-4">Company</th>
            <th className="p-4">Location</th>
            <th className="p-4">Status</th>
            <th className="p-4">Posted</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        
      </table>
    </div>
  );
}
