import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAnalytics } from "@/hooks/useAdminAnalytics";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Modern Gradient-ish Professional Colors
const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#3B82F6"];

export default function JobsByCategory() {
  const { topCategories } = useAdminAnalytics();

  const chartData = [...topCategories]
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item) => ({
      name: item.category,
      value: item.count,
    }));

  return (
    <Card className="rounded-3xl border-none bg-card shadow-lg overflow-hidden">
      <CardHeader className="pb-2 pt-8 px-8">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold tracking-tight text-foreground">
            Jobs by Category
          </CardTitle>
          <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
            Top 5
          </span>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between h-[300px]">
          {/* Chart Section */}
          <div className="w-full md:w-1/2 h-full">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-sm text-muted-foreground italic">
                  No category data available
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: "bold" }}
                  />
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={65} // Making it a Donut for modern look
                    outerRadius={90}
                    paddingAngle={5} // Adds spacing between segments
                    stroke="none"
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity duration-300 cursor-pointer"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Attractive Legend Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-3 px-4">
            {chartData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full shadow-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
