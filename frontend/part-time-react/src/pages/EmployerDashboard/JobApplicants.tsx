import { RatingFilter } from "@/components/common/RatingFilter";
import ApplicantCard from "@/pages/EmployerDashboard/ApplicantCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import useApplicants from "@/hooks/useApplicants";
import { ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const lowerCase = (s: string) => s.toLowerCase();

const JobApplicants = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const { jobId } = useParams<{ jobId: string }>();
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useApplicants(jobId!, { page });
  const applicants = data?.applicants.content ?? [];
  const totalPages = data?.applicants.totalPages ?? 1;

  if (isError) return <div>Error loading stats</div>;
  if (isLoading) return <Spinner />;

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesRating =
      selectedRating === null || applicant.averageRate >= selectedRating;
    const matchesStatus =
      statusFilter === "all" || lowerCase(applicant.status) === statusFilter;
    return matchesStatus && matchesRating;
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
      {filteredApplicants.length > 0 ? (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between">
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
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="cursor-pointer hover:bg-yellow-400 hover:text-[#0f1f3d]"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2 " />
                  Filter by Rating
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Applicants</SheetTitle>
                  <SheetDescription>
                    Filter applicants by their rating score
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <RatingFilter
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                  />
                </div>
              </SheetContent>
            </Sheet>
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
        </>
      ) : (
        <div className="border-2 p-6 rounded-xl text-center text-muted-foreground dark:text-gray-400">
          <p className="text-xl font-medium">No applicants yet</p>
          <p className="text-md mt-2">
            Once someone applies, you'll see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobApplicants;
