import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Calendar,
  Users,
  ArrowLeft,
  Zap,
  Map,
  CalendarClock,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import useJobDetails from "@/hooks/useJobDetails";
import { getDaysLeft, getTimeAgo } from "@/utils/date";
import { Spinner } from "@/components/ui/spinner";
import useUserRate from "@/hooks/useUserRate";
import { useState } from "react";
import ScheduleDialog from "./ScheduleDialog";
import useJobApply from "@/hooks/useJobApply";
import toast from "react-hot-toast";
import EmployerRating from "./EmployerRating";

const JobProfile = () => {
  const [open, setOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  if (!id) return <p>Job not found.</p>;

  const { data, isLoading, isError } = useJobDetails(id!);
  const { data: rate } = useUserRate(data?.employerId);
  const jobApplyMutation = useJobApply();

  const currentUserId = "8e32f9cb-9108-4560-a6eb-8122b37c117e";

  const handleApply = (scheduleId: string) => {
    if (data?.id && scheduleId) {
      jobApplyMutation.mutate(
        { jobId: data?.id, jobseeker: currentUserId, scheduleId },
        {
          onSuccess: () => {
            toast.success("Application submitted successfully!");
            setOpen(false);
          },
        }
      );
    }
  };

  const accommodations = data?.accommodation
    ? data.accommodation.split(",").map((a) => a.trim())
    : [];

  const requirements = data?.requirements
    ? data.requirements
        .split(/\r?\n|,|\./)
        .map((a) => a.trim())
        .filter((a) => a.length > 0)
    : [];

  if (isLoading) {
    return (
      <div className="flex justify-center ">
        <Spinner className=" mt-60" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex mt-30">
        <p>Something went wrong...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <div className="py-4 md:py-6">
            <Link
              to="/find-your-job"
              className="inline-flex items-center gap-2  hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Link>
          </div>

          <Card className="p-4 md:p-10 border">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
              <div className="flex-1">
                <div className="flex gap-5">
                  <h1 className="text-2xl md:text-4xl font-bold text-[#0f1f3d] dark:text-white mb-2">
                    {data?.title}{" "}
                  </h1>
                </div>
                <p className="text-muted-foreground text-lg">
                  {data?.employer}
                </p>
              </div>
              <div className="flex items-center gap-2 w-full md:w-auto">
                {data?.isUrgent && (
                  <Badge variant="destructive" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Urgent
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className="text-sm rounded-4xl bg-green-400 text-black   hover:bg-green-700"
                >
                  {data?.category}
                </Badge>
                <Badge
                  variant="secondary"
                  className="text-sm rounded-4xl dark:bg-gray-400 text-black/80   dark:hover:bg-gray-400"
                >
                  {data?.jobType}
                </Badge>
                <Badge className="bg-yellow-400 text-[#0f1f3d] text-sm">
                  {data?.status}
                </Badge>
                {/*<SaveJobButton
                  jobId={jobId}
                  isSaved={isSaved}
                  onToggle={toggleSaveJob}
                  variant="full"
                />
                <Button variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>*/}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>{data?.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  LKR {data?.minSalary} - {data?.maxSalary} /day
                </span>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {data?.jobSchedules.map((s, i) => {
                    const start = new Date(s.startDatetime);
                    const end = new Date(s.endDatetime);

                    return (
                      <div
                        key={i}
                        className="flex justify-between text-muted-foreground"
                      >
                        <span>
                          {start.toLocaleDateString(undefined, {
                            dateStyle: "medium",
                          })}{" "}
                          —{" "}
                          {start.toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}{" "}
                          →{" "}
                          {end.toLocaleTimeString(undefined, {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true,
                          })}
                        </span>
                      </div>
                    );
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {data?.availableVacancies}{" "}
                  {data?.availableVacancies === 1 ? "vacancy" : "vacancies"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Briefcase className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {data?.requiredGender}
                  {data?.requiredGender === "Male & Female both" ? "" : " Only"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <CalendarClock className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>
                  {getDaysLeft(data?.deadline) === "Closed" ? "" : "Apply soon"}{" "}
                  {getDaysLeft(data?.deadline)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>Posted {getTimeAgo(data?.postedDate)}</span>
              </div>
            </div>

            <div className="border-t border-border pt-8 mb-8 text-[#0f1f3d] dark:text-yellow-100">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Job Description
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 whitespace-pre-line">
                {data?.description}
              </p>

              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Requirements
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
                {requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>

              <h3 className="text-lg md:text-xl font-semibold mb-3">
                Benefits
              </h3>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                {accommodations.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="flex  flex-col md:flex-row gap-4">
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${data?.latitude},${data?.longitude}`,
                    "_blank"
                  )
                }
                className="flex-1 flex hover:bg-[#0f1f3d] hover:text-white"
              >
                <Map className="w-5 h-5 text-yellow-400 shrink-0" />
                <span>View Location</span>
              </Button>

              <Button
                onClick={() => setOpen(true)}
                className=" bg-yellow-400 flex-1 hover:bg-yellow-300 text-[#0f1f3d]"
              >
                Apply Now
              </Button>
              <ScheduleDialog
                open={open}
                setOpen={setOpen}
                schedules={data?.jobSchedules || []}
                isLoading={jobApplyMutation.isPending}
                onApply={handleApply}
              />

              {/*<SaveJobButton
                jobId={jobId}
                isSaved={isSaved}
                onToggle={toggleSaveJob}
                variant="full"
                className="flex-1 sm:hidden"
              />*/}
            </div>
          </Card>

          <EmployerRating
            averageRate={rate.averageRate}
            reviews={rate.reviews}
          />
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
