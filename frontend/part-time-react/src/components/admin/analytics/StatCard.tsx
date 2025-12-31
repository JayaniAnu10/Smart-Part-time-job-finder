import { Card, CardContent } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  bgColor: string;
  iconColor: string;
}

export default function StatCard({ title, value, icon: Icon, bgColor, iconColor }: StatCardProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bgColor}`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>

        <div>
          <p className="text-sm text-secondary/80 dark:text-primary/80">{title}</p>
          <h2 className="text-2xl font-semibold text-secondary dark:text-primary">{value}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
