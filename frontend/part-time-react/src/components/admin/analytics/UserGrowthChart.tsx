import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { month: "Jan", users: 15 },
  { month: "Feb", users: 16 },
  { month: "Mar", users: 20 },
  { month: "Apr", users: 2 },
  { month: "May", users: 15 },
  { month: "Jun", users: 23 },
];

export default function UserGrowthChart() {
  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-medium">User Growth</CardTitle>
      </CardHeader>

      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#364d7d" }}/>
            <YAxis  tick={{ fontSize: 10, fill: "#364d7d" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#f7bf1d"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
