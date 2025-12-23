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
        <Card className="p-12 text-center card-premium">
          <p className="text-muted-foreground">
            No applicants match your filter criteria
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {applicants.map((applicant) => (
            <Card
              key={applicant.applicationId}
              className="p-6 border hover:shadow-md hover:scale-102 transition-transform duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={applicant.profilePicture} />
                    <AvatarFallback className="bg-primary/10 text-yellow-400 text-xl">
                      {applicant.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 ">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-[#0f1f3d] dark:text-white">
                        {applicant.fullName}
                      </h3>
                      <Badge
                        variant={
                          lowerCase(applicant.status) === "approved"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {applicant.status}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <StarRating
                          rating={applicant.averageRate}
                          size="sm"
                          showValue
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{applicant.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-sm">
                      <div>
                        <span className="text-foreground font-medium">
                          {applicant.completedJobs}
                        </span>
                        <span className="text-muted-foreground">
                          {" "}
                          jobs completed
                        </span>
                      </div>
                      <div className="text-muted-foreground">
                        Applied {getDaysAgo(applicant.appliedDate)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <Link to="/applicant-details">
                    <Button
                      variant="outline"
                      className="w-full cursor-pointer p-5 border"
                    >
                      View Profile
                    </Button>
                  </Link>
                  {lowerCase(applicant.status) === "pending" && (
                    <>
                      <Button className="bg-primary hover:bg-primary/80 text-[#0f1f3d] cursor-pointer p-5">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="cursor-pointer text-white p-5"
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
