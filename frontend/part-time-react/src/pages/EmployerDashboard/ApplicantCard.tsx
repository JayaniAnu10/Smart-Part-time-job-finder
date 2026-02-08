import type { Applicants } from "@/hooks/useApplicants";
import { Card } from "../../components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { CheckCircle, MapPin, X } from "lucide-react";
import { getDaysAgo } from "./EmpJobPost";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { StarRating } from "../../components/common/StarRating";
import { lowerCase } from "@/pages/EmployerDashboard/JobApplicants";
import useUpdateApplicationStatus from "@/hooks/useUpdateApplicationStatus";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import AddRatingDialog from "@/components/ratings/AddRatingDialog";

interface Props {
  applicants: Applicants[];
}

const ApplicantCard = ({ applicants }: Props) => {
  const navigate = useNavigate();
  const [updating, setUpdating] = useState<{
    id: string;
    action: "approve" | "reject";
  } | null>(null);
  const statusMutation = useUpdateApplicationStatus();

  const [ratingApplicantId, setRatingApplicantId] = useState<string | null>(
    null
  );

  const handleApprove = async (id: string) => {
    setUpdating({ id, action: "approve" });
    try {
      await toast.promise(
        statusMutation.mutateAsync({ applicationId: id, status: "APPROVED" }),
        {
          loading: "Approving application...",
          success: "Application approved successfully!",
          error: "Failed to approve application",
        },
        { position: "top-center" }
      );
    } finally {
      setUpdating(null);
    }
  };

  const handleReject = async (id: string) => {
    setUpdating({ id, action: "reject" });
    try {
      await toast.promise(
        statusMutation.mutateAsync({ applicationId: id, status: "REJECTED" }),
        {
          loading: "Rejecting application...",
          success: "Application rejected successfully!",
          error: "Failed to reject application",
        },
        { position: "top-center" }
      );
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div>
      {applicants.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No applicants match your filter criteria
          </p>
        </Card>
      ) : (
        <div className="w-full space-y-4">
          {applicants.map((applicant) => (
            <Card
              key={applicant.applicationId}
              className="p-4 md:p-6 border hover:shadow-md hover:scale-102 transition-transform duration-300 w-full max-w-full"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                {/* Avatar + Info */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-1">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={applicant.profilePicture} />
                    <AvatarFallback className="bg-primary/10 text-yellow-400 text-xl">
                      {applicant.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-4 md:justify-start">
                      <h3 className="text-lg sm:text-xl font-semibold text-[#0f1f3d] dark:text-white">
                        {applicant.fullName}
                      </h3>
                      <Badge
                        className="w-23 py-0.5 flex items-center justify-center text-sm"
                        variant={
                          lowerCase(applicant.status) === "approved"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                      <StarRating
                        rating={applicant.averageRate}
                        size="sm"
                        showValue
                      />
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{applicant.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground mx-1 md:mx-0">
                      <div>
                        <span className="text-foreground font-medium">
                          {applicant.completedJobs}
                        </span>{" "}
                        jobs completed
                      </div>
                      <div>Applied {getDaysAgo(applicant.appliedDate)}</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto flex-wrap ">
                  <Button
                    onClick={() =>
                      navigate(`/seekerProfile/${applicant.jobSeekerId}`)
                    }
                    variant="outline"
                    className="w-full md:w-auto cursor-pointer md:p-5"
                  >
                    View Profile
                  </Button>

                  {lowerCase(applicant.status) === "approved" && (
                    <Button
                      onClick={() => setRatingApplicantId(applicant.jobSeekerId)}
                      className="w-full md:w-auto bg-yellow-400 text-secondary hover:bg-yellow-400 
                                 cursor-pointer transition-all duration-300 hover:scale-103 active:scale-97"
                    >
                      Rate
                    </Button>
                  )}

                  {lowerCase(applicant.status) === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApprove(applicant.applicationId)}
                        className="cursor-pointer"
                        disabled={
                          updating?.id === applicant.applicationId &&
                          updating?.action === "approve"
                        }
                      >
                        {updating?.id === applicant.applicationId &&
                        updating?.action === "approve" ? (
                          <Spinner className="size-6 mr-2" />
                        ) : (
                          <CheckCircle className="w-4 h-4 mr-2" />
                        )}
                        Approve
                      </Button>

                      <Button
                        onClick={() => handleReject(applicant.applicationId)}
                        variant="destructive"
                        className="text-white cursor-pointer"
                        disabled={
                          updating?.id === applicant.applicationId &&
                          updating?.action === "reject"
                        }
                      >
                        {updating?.id === applicant.applicationId &&
                        updating?.action === "reject" ? (
                          <Spinner className="size-6 mr-2" />
                        ) : (
                          <X className="w-4 h-4 mr-2" />
                        )}
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {ratingApplicantId && (
            <AddRatingDialog
              jobId={Number(ratingApplicantId)} 
              onClose={() => setRatingApplicantId(null)} 
            />
          )}

        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
