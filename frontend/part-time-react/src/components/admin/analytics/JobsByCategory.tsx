import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobsByCategory() {
  return (
    <Card className="group rounded-2xl w-full">
      <CardHeader className="p-4 sm:p-6 md:p-8">
        <CardTitle className="text-xl sm:text-left font-medium">Jobs by Category</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="relative h-[120px]">
          <div
            className="
              absolute
              w-[220px]
              h-[220px]
              bg-[#364d7d]/10
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
            "
          />
        </div>
      </CardContent>
      
    </Card>
  );
}
