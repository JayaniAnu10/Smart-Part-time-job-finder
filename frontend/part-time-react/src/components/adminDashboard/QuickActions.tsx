import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card className="h-full rounded-2xl bg-card flex flex-col">
      
      {/* Header */}
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-semibold text-secondary dark:text-primary">
          Admin Actions
        </CardTitle>
      </CardHeader>

      {/* Content fills remaining space */}
      <CardContent className="flex-1 flex flex-col gap-4">
        
        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary
                     hover:bg-yellow-400 hover:text-secondary
                     transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate("/admin/manage-users")}
        >
          <Users className="w-5 h-5 group-hover:text-secondary" />
          Manage Users
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary
                     hover:bg-yellow-400 hover:text-secondary
                     transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate("/admin/moderate-job-posts")}
        >
          <Briefcase className="w-5 h-5 group-hover:text-secondary" />
          Moderate Job Posts
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary
                     hover:bg-yellow-400 hover:text-secondary
                     transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate("/admin/review-reports")}
        >
          <AlertTriangle className="w-5 h-5 group-hover:text-secondary" />
          Review Reports
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary
                     hover:bg-yellow-400 hover:text-secondary
                     transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          onClick={() => navigate("/admin/view-analytics")}
        >
          <Activity className="w-5 h-5 group-hover:text-secondary" />
          View Analytics
        </Button>

      </CardContent>
    </Card>
  );
}
