import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  "New job posted by ABC Company",
  "New job posted by ABC Company",
  "New job posted by ABC Company",
  "New job posted by ABC Company",
];

export default function RecentActivities() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-secondary dark:text-primary">
          Recent Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-b pb-3 last:border-none"
          >
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2 w-2 rounded-full bg-yellow-400 shrink-0" />

              <p className="font-medium text-lg text-secondary dark:text-primary">
                {activity}
              </p>
            </div>
            <p className="mt-1text-sm text-secondary/70 dark:text-primary/70 ml-5">
              2 hours ago
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
