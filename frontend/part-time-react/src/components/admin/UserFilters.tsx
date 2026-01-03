import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function UserFilters() {
  return (
    <div className="flex items-center gap-4 p-4 h-[100px] border rounded-xl bg-muted">
      
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-6 w-4 text-secondary dark:text-primary" />
        <Input
          placeholder="Search users..."
          className="pl-9 h-12 text-secondary dark:text-primary placeholder:text-secondary dark:placeholder:text-primary"
        />
      </div>

      {/* Role dropdown */}
      <Select>
        <SelectTrigger className="h-12 w-[180px] text-secondary data-[placeholder]:text-secondary">
          <SelectValue placeholder="All Roles"/>
        </SelectTrigger>

        <SelectContent className="text-secondary dark:text-primary">
          <SelectItem value="all">All Roles</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="employer">Employer</SelectItem>
          <SelectItem value="jobseeker">Job Seeker</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
