import StatusFilter from "@/components/admin/Statusfilter";
import JobsTable from "@/components/admin/JobsTable";

export default function ModerateJobPosts() {
  return (
    <div className="p-12 space-y-6">
   
      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">Moderate Job Posts</h1>
        <p className="text-secondary/70 dark:text-primary/70">
          Review and approve job listings
        </p>
      </div>

      <StatusFilter />

      <JobsTable />

    </div>
  );
}
