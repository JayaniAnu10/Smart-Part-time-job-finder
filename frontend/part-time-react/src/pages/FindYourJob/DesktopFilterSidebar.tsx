import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import useCategory from "@/hooks/useCategory";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  ChevronDown,
  DollarSign,
  RotateCcw,
  SlidersHorizontal,
  Tag,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const genders = ["Male", "Female", "Male & Female Both"];
const typesOfJob = ["Online", "Physical/On-site"];

export interface FilterState {
  category: string;
  jobType: string;
  requiredGender: string;
  salaryRange: [number, number];
}

interface JobFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  totalJobs: number;
  filteredCount: number;
}

const FilterContent = ({
  filters,
  onFilterChange,
  onReset,
  totalJobs,
  filteredCount,
}: JobFiltersProps) => {
  const activeFiltersCount = [
    filters.category !== "all",
    filters.jobType !== "all",
    filters.requiredGender !== "",
    filters.salaryRange[0] > 0 || filters.salaryRange[1] < 10000,
  ].filter(Boolean).length;

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const FilterSection = ({
    title,
    icon: Icon,
    children,
    defaultOpen = true,
  }: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
  }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 hover:bg-muted/50 rounded-lg transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-yellow-200/15 rounded-md">
              <Icon className="h-5 w-5 text-yellow-400" />
            </div>
            <span className="font-sans font-semibold text-[#0f1f3d] dark:text-white text-sm">
              {title}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">
          {children}
        </CollapsibleContent>
      </Collapsible>
    );
  };

  const FilterChips = ({
    options,
    value,
    onChange,
  }: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="flex flex-wrap gap-2 pt-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-200",
            value === option
              ? "bg-yellow-400 text-[#0f1f3d] shadow-sm hover:bg-amber-300"
              : "dark:border dark:bg-none bg-gray-200 dark:bg-gray-200/0 hover:bg-gray-500/40 text-muted-foreground hover:text-foreground"
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );

  const { data: categories } = useCategory();

  return (
    <div className="space-y-1">
      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="p-4 bg-primary/5 rounded-lg mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Active Filters</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="h-7 text-xs text-muted-foreground hover:text-[#0f1f3d]"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {filters.category}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("category", "all")}
                />
              </Badge>
            )}
            {filters.jobType !== "all" && (
              <Badge variant="secondary" className="gap-1">
                {filters.jobType}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("jobType", "all")}
                />
              </Badge>
            )}
            {filters.requiredGender !== "" && (
              <Badge variant="secondary" className="gap-1">
                {filters.requiredGender}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => updateFilter("requiredGender", "")}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Category Filter */}
      <FilterSection title="Category" icon={Tag}>
        <FilterChips
          options={categories?.map((c) => c.category) ?? []}
          value={filters.category}
          onChange={(v) => updateFilter("category", v)}
        />
      </FilterSection>

      {/* Job Type Filter */}
      <FilterSection title="Job Type" icon={Briefcase}>
        <FilterChips
          options={typesOfJob}
          value={filters.jobType}
          onChange={(v) => updateFilter("jobType", v)}
        />
      </FilterSection>

      {/* Location Filter */}
      <FilterSection title="Required Gender" icon={Users}>
        <Select
          value={filters.requiredGender || undefined}
          onValueChange={(v) => updateFilter("requiredGender", v)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Required Gender" />
          </SelectTrigger>
          <SelectContent>
            {genders.map((gender) => (
              <SelectItem key={gender} value={gender}>
                {gender}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Salary Range Filter */}
      <FilterSection title="Salary Range" icon={DollarSign}>
        <div className="pt-4 px-2">
          <Slider
            value={filters.salaryRange}
            onValueChange={(v) =>
              updateFilter("salaryRange", v as [number, number])
            }
            min={0}
            max={10000}
            step={500}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Rs {filters.salaryRange[0].toLocaleString()}</span>
            <span>Rs {filters.salaryRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      {/* Results Summary */}
      <div className="pt-4 px-4 border-t border-border mt-4">
        <p className="text-sm text-muted-foreground text-center">
          Showing{" "}
          <span className="font-semibold text-foreground">{filteredCount}</span>{" "}
          of <span className="font-semibold text-foreground">{totalJobs}</span>{" "}
          jobs
        </p>
      </div>
    </div>
  );
};

// Mobile Filter Button with Sheet
export const MobileFilterButton = (props: JobFiltersProps) => {
  const activeFiltersCount = [
    props.filters.category !== "all",
    props.filters.jobType !== "all",
    props.filters.requiredGender !== "",
    props.filters.salaryRange[0] > 0 || props.filters.salaryRange[1] < 10000,
  ].filter(Boolean).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-primary text-primary-foreground text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4 border-b border-border">
          <SheetTitle className="flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            Filter Jobs
          </SheetTitle>
        </SheetHeader>
        <div className="pt-4">
          <FilterContent {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

// Desktop Filter Sidebar
const DesktopFilterSidebar = (props: JobFiltersProps) => {
  const activeFiltersCount = [
    props.filters.category !== "all",
    props.filters.jobType !== "all",
    props.filters.requiredGender !== "",
    props.filters.salaryRange[0] > 0 || props.filters.salaryRange[1] < 10000,
  ].filter(Boolean).length;

  return (
    <Card className="p-4 sticky top-24">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-6 w-6 text-yellow-400" />
          <h2 className="font-medium text-xl text-[#0f1f3d] dark:text-white">
            Filter Jobs
          </h2>
        </div>
        {activeFiltersCount > 0 && (
          <Badge className="bg-yellow-400 text-[#0f1f3d]">
            {activeFiltersCount} active
          </Badge>
        )}
      </div>
      <FilterContent {...props} />
    </Card>
  );
};

export default DesktopFilterSidebar;
