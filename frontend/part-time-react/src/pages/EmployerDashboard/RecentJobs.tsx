import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Job } from "@/hooks/useSeekerDetails";
import { Dot, Star } from "lucide-react";

interface Props {
  jobs?: Job[];
}

const RecentJobs = ({ jobs = [] }: Props) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-foreground mb-3">
        Recent Jobs
      </h2>
      {jobs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No recent jobs</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {jobs.map((job, index) => {
            const status = job.status?.toLowerCase();
            return (
              <div
                key={index}
                className="flex md:justify-between flex-col gap-3 md:flex-row md:items-center p-3 border border-border rounded-lg"
              >
                <div>
                  <p className="font-medium text-foreground">{job.title}</p>
                  <div className=" text-muted-foreground flex md:flex-row flex-col  md:gap-4 gap-2">
                    <p className="mx-2">{job.companyName}</p>
                    {job.completedDate ? (
                      <span className="inline-flex items-center ">
                        <Dot />
                        {new Date(job.completedDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </span>
                    ) : (
                      ""
                    )}
                    <div>
                      <Badge
                        variant={
                          status === "checked_out" ? "default" : "destructive"
                        }
                      >
                        {status == "checked_out"
                          ? "Completed"
                          : "Not Completed"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < job.jobRating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecentJobs;
