import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { useState } from "react";
import DesktopFilterSidebar, {
  MobileFilterButton,
  type FilterState,
} from "./DesktopFilterSidebar";
import useJobs from "@/hooks/useJobs";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const FindJob = () => {
  const [titleSearch, setTitleSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    jobType: "all",
    requiredGender: "",
    salaryRange: [0, 10000],
  });

  const resetFilters = () => {
    setFilters({
      category: "all",
      jobType: "all",
      requiredGender: "",
      salaryRange: [0, 10000],
    });
    setTitleSearch("");
    setLocationSearch("");
    setSelectedDate("");
  };

  const queryParams = new URLSearchParams();

  if (titleSearch) queryParams.append("query", titleSearch);
  if (locationSearch) queryParams.append("location", locationSearch);
  if (selectedDate) queryParams.append("date", selectedDate);

  if (filters.category !== "all")
    queryParams.append("category", filters.category);
  if (filters.jobType !== "all") queryParams.append("jobType", filters.jobType);
  if (filters.requiredGender !== "")
    queryParams.append("requiredGender", filters.requiredGender);

  queryParams.append("minSalary", String(filters.salaryRange[0]));
  queryParams.append("maxSalary", String(filters.salaryRange[1]));

  const { data, isLoading } = useJobs(
    { titleSearch, locationSearch, selectedDate, ...filters },
    queryParams.toString(),
    { page }
  );

  const filteredJobs = data?.jobs.content ?? [];
  const totalPages = data?.jobs.totalPages ?? 1;

  // Sort jobs based on sortBy
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime()
        );
      case "salary-high":
        return b.minSalary - a.minSalary;
      case "salary-low":
        return a.minSalary - b.minSalary;
      default:
        return 0; // no sorting
    }
  });

  const getDaysLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffTime = end.getTime() - now.getTime();
    return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;
  };

  const getTimeAgo = (postedDate: string) => {
    const now = new Date();
    const posted = new Date(postedDate);
    const diffHours = Math.floor(
      (now.getTime() - posted.getTime()) / (1000 * 60 * 60)
    );
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const shortenLocation = (location: string) => {
    return location.split(",")[0];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="md:mx-13 mx-7 mt-15">
        {/* Header */}
        <div>
          <div className="container py-8 md:py-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0f1f3d] dark:text-white font-bold mb-4">
              Find Your Next{" "}
              <span className="text-yellow-400">Opportunity</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground ">
              Browse part-time jobs across Sri Lanka
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <Card className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Job title, keywords..."
                className="pl-10"
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Location..."
                className="pl-10"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="date"
                placeholder="Search date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full rounded-md border border-input px-3 py-2 text-base focus:outline-none focus:ring-1 focus:ring-yellow-300 dark-calendar"
              />
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 md:w-12 text-[#0f1f3d] w-full rounded-lg items-center justify-center flex cursor-pointer p-2">
              <Search className="h-5 w-5 md:mr-0" />
              <span className="md:hidden ml-2">Search</span>
            </button>
          </div>
        </Card>
      </div>
      {/* Filters & View Controls */}
      <div className="border-y border-border bg-card mt-10">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center md:gap-4">
            <div className="flex items-center gap-3">
              {/* Mobile Filter Button */}
              <div className="lg:hidden">
                <MobileFilterButton
                  filters={filters}
                  onFilterChange={setFilters}
                  onReset={resetFilters}
                  totalJobs={filteredJobs.length}
                  filteredCount={filteredJobs.length}
                />
              </div>
              <div className="text-sm text-muted-foreground hidden sm:block">
                Showing {sortedJobs.length}
                <span className="font-semibold text-foreground"></span> of{" "}
                {data?.totalJobs} jobs
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Sort Dropdown */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="Newest First" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="salary-high">
                    Salary: High to Low
                  </SelectItem>
                  <SelectItem value="salary-low">
                    Salary: Low to High
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <Card className="bg-background">
        <div className="container px-2 lg:px-8 pb-12 pt-12 md:mx-4">
          <div className="lg:flex lg:gap-6">
            {/* Desktop Sidebar Filters */}
            <div className="hidden lg:block w-72 shrink-0 rounded-2xl ">
              <DesktopFilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                onReset={resetFilters}
                totalJobs={data?.totalJobs || 0}
                filteredCount={sortedJobs.length}
              />
            </div>
            <div className=" justify-center w-full">
              {isLoading && (
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              )}

              {!isLoading && filteredJobs.length === 0 ? (
                <Card className="p-12 text-center">
                  <div className="text-muted-foreground">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">
                      No jobs found
                    </h3>
                    <p className="mb-4">
                      Try adjusting your filters or search terms
                    </p>
                    <Button
                      variant="outline"
                      className="hover:bg-gray-400 dark:hover:text-black cursor-pointer"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </Card>
              ) : (
                <div
                  className={"grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"}
                >
                  {sortedJobs.map((job) => {
                    const accommodations = job.accommodation
                      ? job.accommodation.split(",").map((a) => a.trim())
                      : [];
                    return (
                      <Card
                        key={job.id}
                        className="p-4 md:p-6 hover:shadow-xl hover:shadow-yellow-400/5 border transition-all duration-300 group h-full flex flex-col"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              {job.isUrgent && (
                                <Badge
                                  variant="destructive"
                                  className="text-xs"
                                >
                                  <Zap className="w-3 h-3 mr-1" />
                                  Urgent
                                </Badge>
                              )}
                              <Badge
                                variant="secondary"
                                className="text-sm bg-green-700 dark:text-black text-white mb-2 hover:text-white hover:bg-green-700"
                              >
                                {job.category}
                              </Badge>
                            </div>
                            <h3 className="text-3xl font-semibold text-[#0f1f3d] dark:text-yellow-100 group-hover:text-yellow-400 transition-colors line-clamp-2">
                              {job.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-4 text-xl">
                          {job.employer}
                        </p>

                        <div className="space-y-2 text-md text-muted-foreground flex-1">
                          <div className="flex flex-col  gap-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                              <span className="truncate">
                                {shortenLocation(job.location)}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-yellow-400 shrink-0" />
                              <span className="truncate">
                                Rs {job.minSalary}/day
                              </span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex flex-row gap-2">
                              <Clock className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />
                              <span className="truncate">Job Schedules</span>
                            </div>
                            {job.jobSchedules.map((s, i) => {
                              const start = new Date(s.startDatetime);
                              const end = new Date(s.endDatetime);

                              return (
                                <div
                                  key={i}
                                  className="flex justify-between text-sm ml-7 dark:text-yellow-100 text-gray-700"
                                >
                                  <span>
                                    {start.toLocaleDateString(undefined, {
                                      dateStyle: "medium",
                                    })}{" "}
                                    —{" "}
                                    {start.toLocaleTimeString(undefined, {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}{" "}
                                    →{" "}
                                    {end.toLocaleTimeString(undefined, {
                                      hour: "numeric",
                                      minute: "2-digit",
                                      hour12: true,
                                    })}
                                  </span>
                                </div>
                              );
                            })}
                          </div>

                          <div className="flex flex-wrap gap-2 mt-5">
                            {accommodations.map((item, index) => (
                              <Badge
                                key={index}
                                className="text-xs bg-blue-200/60 dark:bg-blue-300 text-blue-900 dark:text-[#0f1f3d]"
                              >
                                {item}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex md:flex-row gap-15 mt-3">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-yellow-400 shrink-0" />
                              <span className="truncate">
                                {getDaysLeft(job.deadline)}{" "}
                                {getDaysLeft(job.deadline) === 1
                                  ? "day left"
                                  : "days left"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-yellow-400 shrink-0" />
                              <span className="truncate">
                                {job.availableVacancies}{" "}
                                {job.availableVacancies === 1
                                  ? "vacancy"
                                  : "vacancies"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">
                            {getTimeAgo(job.postedDate)}
                          </span>
                          <Link to={`/job-details/${job.id}`}>
                            <Button
                              size="sm"
                              className="text-[#0f1f3d] bg-yellow-400 text-sm hover:bg-yellow-300 cursor-pointer"
                            >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6 md:ml-70">
            <Button
              className="dark:bg-yellow-400 dark:hover:bg-yellow-300"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              size="lg"
            >
              <ArrowLeft />
              Previous
            </Button>
            <Button
              className="dark:bg-yellow-400 dark:hover:bg-yellow-300"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              size="lg"
            >
              Next
              <ArrowRight />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FindJob;
