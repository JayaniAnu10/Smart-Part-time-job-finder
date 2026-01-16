import { Eye } from "lucide-react";
import { useState } from "react";

import type { AdminJob } from "@/hooks/useAdminJobs";
import ViewJobModal from "./ViewJobMOdal";

interface Props {
  jobs: AdminJob[];
}

export default function JobsTable({ jobs }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left bg-muted">
            <tr>
              <th className="p-4">Job Title</th>
              <th className="p-4">Company</th>
              <th className="p-4">Status</th>
              <th className="p-4">Posted</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-4 font-medium">{job.title}</td>
                <td className="p-4">{job.company}</td>
                <td className="p-4">{job.status}</td>
                <td className="p-4">{job.postedDate}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <Eye size={16} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ViewJobModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
