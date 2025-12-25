import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Briefcase,
  AlertTriangle,
  DollarSign,
  Activity,
  TrendingUp,
} from "lucide-react";

export default function StatsSection() {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      icon: Users,
      color: "text-yellow-400",
      change: "+12%",
    },
    {
      title: "Active Jobs",
      value: "342",
      icon: Briefcase,
      color: "text-yellow-400",
      change: "+8%",
    },
    {
      title: "Pending Reports",
      value: "23",
      icon: AlertTriangle,
      color: "text-red-500",
      change: "-5%",
    },
    {
      title: "Total Revenue",
      value: "LKR 2.4M",
      icon: DollarSign,
      color: "text-yellow-400",
      change: "+18%",
    },
    {
      title: "Active Job Seekers",
      value: "1,823",
      icon: Activity,
      color: "text-yellow-400",
      change: "+15%",
    },
    {
      title: "Employers",
      value: "1,024",
      icon: TrendingUp,
      color: "text-yellow-400",
      change: "+10%",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="rounded-2xl border hover:shadow-lg transition-all duration-300 hover:scale-105">
            <CardContent className="relative p-6">
              <span className="absolute top-6 right-6 text-md text-yellow-400 font-medium">
                {stat.change}
              </span>

              <div className="flex flex-col gap-2">
                <Icon className={`w-7 h-7 ${stat.color}`} />

                <p className="text-3xl font-bold text-secondary dark:text-primary">
                  {stat.value}
                </p>

                <p className="text-sm text-secondary/70 dark:text-primary/70">
                  {stat.title}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
