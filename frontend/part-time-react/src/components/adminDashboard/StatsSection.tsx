import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  AlertTriangle,
  DollarSign,
  Activity,
  TrendingUp,
} from "lucide-react";
import useAdminOverview from "@/hooks/useAdminOverview";

export default function StatsSection() {
  const { data, isLoading, isError } = useAdminOverview();

  if (isLoading) {
    return <p className="text-muted-foreground">Loading statistics...</p>;
  }

  if (isError || !data) {
    return (
      <p className="text-red-500">
        Failed to load admin statistics
      </p>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data.totalUsers,
      icon: Users,
    },
    {
      title: "Active Jobs",
      value: data.activeJobs,
      icon: Briefcase,
    },
    {
      title: "Pending Reports",
      value: data.pendingComplaints,
      icon: AlertTriangle,
    },
    {
      title: "Total Revenue",
      value: `LKR ${data.totalPaymentAmount}`,
      icon: DollarSign,
    },
    {
      title: "Job Seekers",
      value: data.totalJobSeekers,
      icon: Activity,
    },
    {
      title: "Employers",
      value: data.totalEmployers,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="rounded-2xl border hover:shadow-lg transition-all"
          >
            <CardContent className="p-6 space-y-2">
              <Icon className="w-7 h-7 text-primary" />
              <p className="text-3xl font-bold text-secondary dark:text-primary">
                {stat.value}
              </p>
              <p className="text-sm text-secondary/70 dark:text-primary/70">
                {stat.title}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
