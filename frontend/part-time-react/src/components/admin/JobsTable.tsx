import type { AdminJob } from "@/hooks/useAdminJobs";


type Props = {
  jobs: AdminJob[];
};

export default function JobsTable({ jobs }: Props) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-left bg-muted [&_th]:!text-secondary dark:[&_th]:!text-primary">
          <tr>
            <th className="p-4">Job Title</th>
            <th className="p-4">Company</th>
            <th className="p-4">Location</th>
            <th className="p-4">Status</th>
            <th className="p-4">Posted</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="p-6 text-center text-muted-foreground"
              >
                No jobs found
              </td>
            </tr>
          )}

          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="p-4">{job.title}</td>
              <td className="p-4">{job.company}</td>
              <td className="p-4">{job.location}</td>
              <td className="p-4">{job.status}</td>
              <td className="p-4">
                {job.postedDate !== "N/A"
                  ? new Date(job.postedDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="p-4 text-right text-muted-foreground">
                —
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
