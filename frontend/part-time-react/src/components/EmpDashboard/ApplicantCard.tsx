import type { Applicants } from "@/hooks/useApplicants";
import { Card } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CheckCircle, MapPin, X } from "lucide-react";
import { getDaysAgo } from "./EmpJobPost";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { StarRating } from "../common/StarRating";
import { lowerCase } from "@/pages/JobApplicants";

interface Props {
  applicants: Applicants[];
}

const ApplicantCard = ({ applicants }: Props) => {
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
                  <Link to="/applicant-details" className="w-full">
                    <Button
                      variant="outline"
                      className="w-full md:w-auto cursor-pointer md:p-5"
                    >
                      View Profile
                    </Button>
                  </Link>

                  {lowerCase(applicant.status) === "pending" && (
                    <>
                      <Button className="w-full md:w-auto bg-primary hover:bg-primary/80 text-[#0f1f3d] cursor-pointer md:p-5">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="w-full md:w-auto text-white cursor-pointer md:p-5"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantCard;
