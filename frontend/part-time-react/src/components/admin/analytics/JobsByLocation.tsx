import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";

// Professional Multi-color Palette
const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#F59E0B", "#10B981"];

export default function JobsByLocation() {
  const { jobsByLocation } = useAdminAnalytics();

  // 🔹 Type safety and sorting for a better visual flow
  const data = [...(jobsByLocation || [])]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item) => ({
      location: item.location,
      count: item.count,
    }));

  return (
    <Card className="rounded-3xl border-none bg-card shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="pb-2 pt-8 px-8">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold tracking-tight text-foreground">
              Jobs by Location
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">Geographical job distribution</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center">
            <svg 
              className="w-6 h-6 text-amber-600 dark:text-amber-400" 
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        </div>
      </CardHeader>

      <CardContent className="h-[320px] pt-6">
        {data.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground italic">No location data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid 
                vertical={false} 
                strokeDasharray="3 3" 
                stroke="rgba(200,200,200,0.2)" 
              />
              
              <XAxis
                dataKey="location"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 500 }}
                dy={10}
              />
              
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                allowDecimals={false}
              />
              
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                }}
              />
              
              <Bar 
                dataKey="count" 
                radius={[10, 10, 0, 0]} 
                barSize={45}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    className="hover:opacity-80 transition-opacity duration-300"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}