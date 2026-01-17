import { Eye } from "lucide-react";
import { useState } from "react";
import type { AdminJob } from "@/hooks/useAdminJobs";
import ViewJobModal from "./ViewJobModal";

interface Props {
  jobs: AdminJob[];
  refetch: () => void;
}

export default function JobsTable({ jobs, refetch }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<AdminJob | null>(null);

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
              <tr
                key={job.id}
                className="border-t hover:bg-muted/40 transition"
              >
                <td className="p-4 font-medium">{job.title}</td>
                <td className="p-4">{job.company}</td>

                {/* STATUS PILL – MATCHES MODAL BUTTON COLORS */}
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        job.status === "ACTIVE"
                          ? "bg-green-500/10 text-green-600 border border-green-500/30"
                          : "bg-red-500/10 text-red-600 border border-red-500/30"
                      }
                    `}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="p-4">{job.postedDate}</td>

                <td className="p-4 text-right">
                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                               bg-yellow-400 text-black font-semibold text-sm
                               hover:bg-yellow-500 transition-all duration-200 shadow-sm"
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ViewJobModal
        open={open}
        job={selectedJob}
        onClose={() => {
          setOpen(false);
          setSelectedJob(null);
        }}
        onActionSuccess={refetch}
      />
    </>
  );
}
