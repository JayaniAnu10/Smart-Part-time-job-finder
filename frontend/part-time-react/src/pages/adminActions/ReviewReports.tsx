import {
  Card,
  CardContent,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { AlertTriangle, CheckCircle2 } from "lucide-react"

export default function ReviewReportsPage() {
  return (
    <div className="p-12 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">
          Review Reports
        </h1>
        <p className="text-secondary/70 dark:text-primary/70">
          Handle user and job reports
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">

          <Select defaultValue="pending">
            <SelectTrigger className="h-12 w-[180px] text-secondary data-[placeholder]:text-secondary">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="text-secondary dark:text-primary">
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="reviewed">Resolved</SelectItem>
              <SelectItem value="rejected">Dismissed</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-[#364d7d]">
            <AlertTriangle className="h-4 w-4 text-[#364d7d]" />
            <span>0 reports found</span>
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col items-center justify-center py-18 text-center space-y-4">
          
          <CheckCircle2 className="h-14 w-14 text-green-500" />

          <h2 className="text-xl font-semibold text-secondary dark:text-primary">
            No pending reports
          </h2>

          <p className="text-secondary/70 dark:text-primary/70">
            All reports have been reviewed
          </p>

        </CardContent>
      </Card>

    </div>
  )
}
