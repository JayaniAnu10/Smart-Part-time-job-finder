import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface Props {
  search: string;
  role: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
}

export default function UserFilters({
  search,
  role,
  onSearchChange,
  onRoleChange,
}: Props) {
  return (
    <div className="flex items-center gap-4 p-4 h-[100px] border rounded-xl bg-muted">
      
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-6 w-4 text-secondary dark:text-primary" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search users..."
          className="pl-9 h-12"
        />
      </div>

      {/* Role dropdown */}
      <Select value={role} onValueChange={onRoleChange}>
        <SelectTrigger className="h-12 w-[180px]">
          <SelectValue placeholder="All Roles" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Roles</SelectItem>
          <SelectItem value="ADMIN">Admin</SelectItem>
          <SelectItem value="EMPLOYER">Employer</SelectItem>
          <SelectItem value="JOBSEEKER">Job Seeker</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
