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
  status: string;
  onStatusChange: (value: string) => void;
  onSearch: (value: string) => void;
}

export default function StatusFilter({
  status,
  onStatusChange,
  onSearch,
}: Props) {
  return (
    <div className="flex items-center gap-4 p-4 h-[100px] border rounded-xl bg-muted">
      {/* 🔍 Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-4 h-4 w-4 text-secondary" />
        <Input
          placeholder="Search jobs..."
          className="pl-9 h-12"
          onChange={(e) => onSearch(e.target.value)} 
        />
      </div>

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger className="h-12 w-[180px]">
          <SelectValue placeholder="All Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">All Status</SelectItem>
          <SelectItem value="ACTIVE">Active</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
