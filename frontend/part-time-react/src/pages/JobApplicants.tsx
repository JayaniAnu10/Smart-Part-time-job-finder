import ApplicantCard from "@/components/EmpDashboard/ApplicantCard";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useApplicants from "@/hooks/useApplicants";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";

export const lowerCase = (s: string) => s.toLowerCase();

const JobApplicants = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const jobId = "0f8cde51-063a-40b1-89e0-d73942e3ea6e";
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useApplicants(jobId, { page });
  const applicants = data?.applicants.content ?? [];
  const totalPages = data?.applicants.totalPages ?? 1;

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
    <div className="mx-4 sm:mx-6 md:mx-20 my-12 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0f1f3d] dark:text-white">
          Job Applicants
        </h1>
        <span className="text-muted-foreground/90 text-lg sm:text-xl">
          {data?.title}
        </span>
      </div>

      <div className="flex flex-wrap gap-3 sm:gap-5">
        <Button
          className="cursor-pointer"
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
        >
          All ({applicants.length})
        </Button>
        <Button
          className="cursor-pointer"
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => setStatusFilter("pending")}
        >
          Pending ({pendingCount})
        </Button>
        <Button
          className="cursor-pointer"
          variant={statusFilter === "approved" ? "default" : "outline"}
          onClick={() => setStatusFilter("approved")}
        >
          Approved ({approvedCount})
        </Button>
        <Button
          className="cursor-pointer"
          variant={statusFilter === "rejected" ? "default" : "outline"}
          onClick={() => setStatusFilter("rejected")}
        >
          Rejected ({rejectedCount})
        </Button>
      </div>

      <ApplicantCard applicants={filteredApplicants} />

      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <Button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          size="lg"
        >
          <ArrowLeft />
          Previous
        </Button>
        <Button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          size="lg"
        >
          Next
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default JobApplicants;
