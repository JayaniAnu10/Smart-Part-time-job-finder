import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  ArrowLeft,
  Phone,
  Star,
  CheckCircle,
  Map,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useUpcomingJobDetails from "@/hooks/useUpcomingJobDetails";
import { useAuthStore } from "@/store/AuthStore";
import { Spinner } from "@/components/ui/spinner";
import { dateFormater } from "@/utils/dateFormater";

const UpcomingJobDetails = () => {
  const { applicationId } = useParams<{ applicationId: string }>();
  const user = useAuthStore((s) => s.user);

  const { data, isLoading, isError } = useUpcomingJobDetails(
    applicationId!,
    user?.id!,
    {
      enabled: !!applicationId && !!user?.id,
    },
  );

  if (!user || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="mt-60" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-muted-foreground mb-4">
          Job details not found or you don't have access to this job
        </p>
        <Link to="/seekerDashboard">
          <Button variant="outline">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const requirements = data.requirements
    ? data.requirements
        .split(/\r?\n|,|\./)
        .map((r) => r.trim())
        .filter((r) => r.length > 0)
    : [];

  const accommodations = data.accommodation
    ? data.accommodation.split(",").map((a) => a.trim())
    : [];

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-8 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="py-4 md:py-6">
            <Link
              to="/seekerDashboard"
              className="inline-flex items-center gap-2 text-secondary dark:text-primary hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>

          {/* Application Status Card */}
          <Card className="p-6 mb-6 border-2 shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <h3 className="font-bold text-lg text-secondary dark:text-primary">
                    Application Status
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Applied on{" "}
                    {new Date(data.appliedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-yellow-500/10 text-yellow-400 border-yellow-400 border-2 px-4 py-2 text-sm font-semibold"
              >
                {data.applicationStatus}
              </Badge>
            </div>
          </Card>

          {/* Main Job Details Card */}
          <Card className="p-4 md:p-10 border shadow-lg">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold text-[#0f1f3d] dark:text-white mb-2">
                  {data.jobTitle}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {data.employerName}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
                <Badge
                  variant="secondary"
                  className="text-sm bg-green-400 text-black hover:bg-green-500"
                >
                  {data.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-sm dark:bg-gray-400 dark:text-black"
                >
                  {data.jobType}
                </Badge>
              </div>
            </div>

            {/* Job Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>{data.location}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  LKR {data.minSalary.toLocaleString()} -{" "}
                  {data.maxSalary.toLocaleString()} /day
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {dateFormater(data.startDatetime, data.endDatetime)}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {data.requiredGender}
                  {data.requiredGender === "Male & Female both" ? "" : " Only"}
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>{data.employerContact || "Not provided"}</span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Star className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {data.employerRating ? data.employerRating.toFixed(1) : "N/A"}{" "}
                  employer rating
                </span>
              </div>
            </div>

            {/* Job Description */}
            <div className="border-t border-border pt-8 mb-8 text-[#0f1f3d] dark:text-yellow-100">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Job Description
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                {data.jobDescription}
              </p>

              {requirements.length > 0 && (
                <>
                  <h3 className="text-lg md:text-xl font-semibold mb-3">
                    Requirements
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                    {requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </>
              )}

              {accommodations.length > 0 && (
                <>
                  <h3 className="text-lg md:text-xl font-semibold mb-3">
                    Benefits & Accommodations
                  </h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    {accommodations.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              {data.latitude && data.longitude && (
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`,
                      "_blank",
                    )
                  }
                  className="flex-1 hover:bg-[#0f1f3d] hover:text-white dark:hover:bg-yellow-400 dark:hover:text-[#0f1f3d]"
                >
                  <Map className="w-5 h-5 mr-2" />
                  View Location on Map
                </Button>
              )}

              {data.employerContact && (
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = `tel:${data.employerContact}`)
                  }
                  className="flex-1 hover:bg-[#0f1f3d] hover:text-white dark:hover:bg-yellow-400 dark:hover:text-[#0f1f3d]"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Employer
                </Button>
              )}
            </div>
          </Card>

          {/* Additional Info Card */}
          {data.applicationStatus === "APPROVED" && (
            <Card className="p-6 mt-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">
                    Your application has been approved!
                  </h3>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Make sure to arrive on time and bring any required
                    documents. Contact the employer if you have any questions.
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingJobDetails;
