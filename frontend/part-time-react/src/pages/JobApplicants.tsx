import ApplicantCard from "@/components/EmpDashboard/ApplicantCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useApplicants from "@/hooks/useApplicants";
import { useState } from "react";

const JobApplicants = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const jobId = "0f8cde51-063a-40b1-89e0-d73942e3ea6e";
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useApplicants(jobId, { page, pageSize });
  const applicants = data?.content ?? [];
  const lowerCase = (s: string) => s.toLowerCase();

  if (isError) return <div>Error loading stats</div>;
  if (isLoading) return <Spinner />;

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesStatus =
      statusFilter === "all" || lowerCase(applicant.status) === statusFilter;
    return matchesStatus;
  });

  const pendingCount = applicants.filter(
    (a) => lowerCase(a.status) === "pending"
  ).length;
  const approvedCount = applicants.filter(
    (a) => lowerCase(a.status) === "approved"
  ).length;
  const rejectedCount = applicants.filter(
    (a) => lowerCase(a.status) === "rejected"
  ).length;

  return (
    <div className="mx-8 my-12 md:mx-20 flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl text-[#0f1f3d] font-bold dark:text-white ">
          Job Applicants
        </h1>
        <span className="text-muted-foreground">
          Manage your job postings and applicants
        </span>
      </div>

      <div className="flex gap-5">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          className="cursor-pointer"
        >
          All ({applicants.length})
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => setStatusFilter("pending")}
          className="cursor-pointer"
        >
          Pending ({pendingCount})
        </Button>
        <Button
          variant={statusFilter === "approved" ? "default" : "outline"}
          onClick={() => setStatusFilter("approved")}
          className="cursor-pointer"
        >
          Approved ({approvedCount})
        </Button>
        <Button
          variant={statusFilter === "rejected" ? "default" : "outline"}
          onClick={() => setStatusFilter("rejected")}
          className="cursor-pointer"
        >
          Rejected ({rejectedCount})
        </Button>
      </div>
      <ApplicantCard applicants={filteredApplicants} />
      <div>
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className=""
        >
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </div>
    </div>
  );
};

export default JobApplicants;
