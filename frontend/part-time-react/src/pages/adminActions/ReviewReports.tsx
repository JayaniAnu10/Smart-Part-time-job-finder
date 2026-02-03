import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle } from "lucide-react";
import APIClient from "@/services/apiClient";
import ComplaintsTable from "@/components/admin/ComplaintsTable";
import type { AdminComplaint } from "@/components/admin/ComplaintsTable";


/* ================= API ================= */

const client = new APIClient<AdminComplaint[]>("/admin/complaints");

/* ================= PAGE ================= */

export default function ReviewReportsPage() {
  const [complaints, setComplaints] = useState<AdminComplaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    client
      .get()
      .then(setComplaints)
      .finally(() => setLoading(false));
  }, []);

  const filteredComplaints = useMemo(() => {
    if (statusFilter === "all") return complaints;
    return complaints.filter(
      (c) => c.status === statusFilter.toUpperCase()
    );
  }, [complaints, statusFilter]);

  return (
    <div className="p-12 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-secondary dark:text-primary">
          Review Reports
        </h1>
        <p className="text-secondary/70 dark:text-primary/70">
          Handle user and job related complaints
        </p>
      </div>

      {/* FILTER */}
      <Card>
        <CardContent className="flex items-center justify-between gap-4 p-6 flex-wrap">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 w-[200px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-[#364d7d] font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>{filteredComplaints.length} reports found</span>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      {loading ? (
        <Card>
          <CardContent className="p-20 text-center text-secondary/70">
            Loading complaints...
          </CardContent>
        </Card>
      ) : (
        <ComplaintsTable
          complaints={filteredComplaints}
          onView={(complaint) => {
            console.log("View complaint", complaint);
          }}
        />
      )}
    </div>
  );
}
