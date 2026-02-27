import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

export default function UserGrowthChart() {
  const { dailyTraffic } = useAdminAnalytics();

  // 🔹 Define the map with a specific type to stop TypeScript warnings
  const monthlyMap: Record<string, number> = {};

  dailyTraffic?.forEach((item) => {
    const month = new Date(item.date).toLocaleString("en-US", {
      month: "short",
    });
    monthlyMap[month] = (monthlyMap[month] || 0) + item.count;
  });

  const MONTH_ORDER = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // 🔹 Filter and Map safely using optional chaining or nullish coalescing
  const data = MONTH_ORDER
    .filter((m) => !!monthlyMap[m]) 
    .map((m) => ({
      month: m,
      users: monthlyMap[m] ?? 0, // Fallback to 0 if undefined
    }));

  return (
    <Card className="rounded-3xl border-none bg-card shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2 pt-8 px-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              User Growth
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Monthly registration trends</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-indigo-600 dark:text-indigo-400" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[320px] pt-4">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
             <p className="text-sm text-muted-foreground italic">No user growth data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              
              <CartesianGrid 
                vertical={false} 
                strokeDasharray="3 3" 
                stroke="rgba(200,200,200,0.2)" 
              />
              
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
                dy={10}
              />
              
              <YAxis
                hide={true}
                allowDecimals={false}
              />
              
              <Tooltip
                cursor={{ stroke: '#6366F1', strokeWidth: 2, strokeDasharray: '5 5' }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  padding: "12px"
                }}
                itemStyle={{ color: "#4F46E5", fontWeight: "bold" }}
              />
              
              <Area
                type="monotone"
                dataKey="users"
                stroke="#6366F1"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorUsers)"
                animationDuration={2000}
                dot={{ r: 4, fill: "#6366F1", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}