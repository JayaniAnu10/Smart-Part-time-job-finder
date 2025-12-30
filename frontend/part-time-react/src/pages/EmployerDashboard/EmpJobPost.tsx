import type { JobStats } from "@/hooks/useEmpStats";

import { Badge } from "@/components/ui/badge";
import { Edit, Eye, Trash2, Users } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
  jobs?: JobStats[];
}

export const getDaysAgo = (date: string) => {
  const postedDate = new Date(date);
  const today = new Date();

  const diffTime = today.getTime() - postedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
};

const EmpJobPost = ({ jobs }: Props) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border shadow-md rounded-xl p-7  ">
        <div className="text-[#0f1f3d] dark:text-white text-2xl font-medium mb-5">
          Your Job Posts
        </div>
        <div className="flex flex-col gap-5">
          {jobs?.map((job, index) => (
            <div
              key={index}
              className="flex  items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/90 transition-colors"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#0f1f3d] dark:text-white mb-2">
                  {job.title}
                </h3>
                <div className="flex md:flex-row md:items-center gap-4 text-sm text-muted-foreground flex-col items-start">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applicants} applicants
                  </span>
                  <span>Posted {getDaysAgo(job.postedDate)}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:flex-row flex-col">
                <Badge
                  variant={job.status === "ACTIVE" ? "default" : "secondary"}
                >
                  {job.status}
                </Badge>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                    onClick={() => navigate(`/${job.id}/applicants`)}
                  >
                    <Eye className="w-4 h-4 text-foreground" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmpJobPost;
