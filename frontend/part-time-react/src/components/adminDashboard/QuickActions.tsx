import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Briefcase,
  AlertTriangle,
  Activity,
} from "lucide-react";

export default function QuickActions() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-secondary dark:text-primary"></CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary hover:text-secondary 
                     hover:bg-yellow-400 transition-all duration-300 hover:scale-102 active:scale-98"
        >
          <Users className="w-5 h-5 text-secondary dark:text-primary group-hover:text-secondary" />
          Manage Users
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary hover:text-secondary 
                     hover:bg-yellow-400 transition-all duration-300 hover:scale-102 active:scale-98"
        >
          <Briefcase className="w-5 h-5 text-secondary dark:text-primary group-hover:text-secondary" />
          Moderate Job Posts
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary hover:text-secondary 
                     hover:bg-yellow-400 transition-all duration-300 hover:scale-102 active:scale-98"
        >
          <AlertTriangle className="w-5 h-5 text-secondary dark:text-primary group-hover:text-secondary" />
          Review Reports
        </Button>

        <Button
          variant="outline"
          className="group w-full justify-start gap-3 py-6 text-secondary dark:text-primary hover:text-secondary 
                     hover:bg-yellow-400 transition-all duration-300 hover:scale-102 active:scale-98"
        >
          <Activity className="w-5 h-5 text-secondary dark:text-primary group-hover:text-secondary" />
          View Analytics
        </Button>
      </CardContent>
    </Card>
  );
}
