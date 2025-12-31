import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function StatusFilters() {
  return (
    <div className="flex items-center gap-4 p-4 h-[100px] border rounded-xl bg-muted">

      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-6 w-4 text-secondary dark:text-primary" />
        <Input
          placeholder="Search Jobs..."
          className="pl-9 h-12 text-secondary dark:text-primary placeholder:text-secondary dark:placeholder:text-primary"
        />
      </div>

      <Select>
        <SelectTrigger className="h-12 w-[180px] text-secondary data-[placeholder]:text-secondary">
          <SelectValue placeholder="All Status"/>
        </SelectTrigger>

        <SelectContent className="text-secondary dark:text-primary">
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="admin">Adctive</SelectItem>
          <SelectItem value="employer">Pending</SelectItem>
          <SelectItem value="jobseeker">Rejected</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
