import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import BellIcon from "@/assets/bell.svg";
import MoneyIcon from "@/assets/money.svg";
import BriefcaseIcon from "@/assets/logo-icon.svg";
import StarIcon from "@/assets/star-darkBlue.svg";
import ApplicationIcon from "@/assets/applications.svg";
import ClockIcon from "@/assets/clock.svg";
import ClockIconDark from "@/assets/clock-yellow.svg";
import MoneyIconDark from "@/assets/money-darkmode.svg";
import StarIconYellow from "@/assets/star.svg";
import FindJobsIcon from "@/assets/jobs-lightmode.svg";
import FindJobsIconDarkMode from "@/assets/jobs-darkmode.svg";
import ScheduleIcon from "@/assets/schedule-lightmode.svg";
import ScheduleIconDarkMode from "@/assets/schedule-darkmode.svg";
import MapIcon from "@/assets/map-icon.svg";
import MapIconDarkMode from "@/assets/map-darkmode.svg";
import useSeekerStat from "@/hooks/useSeekerStat";
import { useAuthStore } from "@/store/AuthStore";
import { dateFormater } from "@/utils/dateFormater";
import { Spinner } from "@/components/ui/spinner";

const JobseekerDashboard = () => {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { data, isLoading, isError } = useSeekerStat(user?.id!);

  if (isLoading) <Spinner className="flex items-center justify-center" />;

  if (isError) {
    <p>Something went wrong</p>;
  }

  return (
    <div className="relative  min-h-screen bg-background">
      <section className="bg-linear-to-br from-yellow-400/20 via-background to-yellow-400/20 dark:from-blue-300/20 dark:via-background dark:to-blue-300/20 border-b">
        <div className="max-w-352 mx-auto px-8 h-35 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-primary ">
              Welcome back,{" "}
              <span className="text-primary dark:text-yellow-400">
                {data?.name}
              </span>
              ! 👋
            </h1>
            <p className="mt-2 text-secondary/70 dark:text-primary/70">
              You have {data?.countUpcomingJobs} upcoming jobs
            </p>
          </div>

          <Button
            asChild
            className="gap-2 text-secondary dark:bg-yellow-400 transition-all duration-300
                             hover:scale-105 active:scale-95 hover:bg-yellow-400 hover:shadow-[0_0_4px_rgba(250,204,21,0.5)]"
          >
            <Link to="/notifications">
              <img src={BellIcon} alt="notifications" className="h-4 w-4 " />
              View Notifications
            </Link>
          </Button>
        </div>
      </section>

      <section className="pt-12 max-w-352 mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
          {[
            {
              icon: MoneyIcon,
              label: "Total Earnings",
              value:
                data?.earning.totalEarning == null
                  ? "LKR 0.0"
                  : "LKR " + data?.earning.totalEarning,
            },
            {
              icon: BriefcaseIcon,
              label: "Jobs Completed",
              value: data?.earning.totalJobs,
            },
            { icon: StarIcon, label: "Trust Score", value: data?.trustScore },
            {
              icon: ApplicationIcon,
              label: "Active Applications",
              value: data?.activeApplications,
            },
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-start gap-3 p-6">
                <div className="bg-yellow-400 h-12 w-12 rounded-lg flex items-center justify-center">
                  <img src={item.icon} alt="" className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary dark:text-primary">
                    {item.value}
                  </p>
                  <p className="text-sm text-secondary/70 dark:text-primary/70">
                    {item.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="pt-12 max-w-352 mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT SIDE - UPCOMING JOBS */}
          <div className="lg:col-span-2 space-y-8 mb-15">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-secondary dark:text-primary">
                  Upcoming Jobs
                </h2>
              </div>

              <div className="space-y-4">
                {data?.upcomingJobs?.length === 0 ? (
                  <Card>
                    <CardContent className="p-6 text-center text-secondary/70">
                      No Upcoming Jobs
                    </CardContent>
                  </Card>
                ) : (
                  data?.upcomingJobs.map((job, i) => (
                    <Card
                      key={i}
                      className="transition-duration duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      <CardContent className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6">
                        <div className="flex gap-4">
                          <div className="bg-yellow-400 h-12 w-12 rounded-lg flex items-center justify-center shrink-0">
                            <img
                              src={BriefcaseIcon}
                              alt="job icon"
                              className="h-6 w-6"
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-secondary dark:text-primary">
                              {job.title}
                            </h3>
                            <p className="text-sm text-secondary/80 dark:text-primary/80">
                              {job.name}
                            </p>

                            <div className="flex items-center gap-4 mt-2 text-sm text-secondary/80 dark:text-primary/80">
                              <div className="flex items-center gap-1">
                                <img
                                  src={ClockIcon}
                                  alt="time"
                                  className="h-4 w-4 dark:hidden"
                                />
                                <img
                                  src={ClockIconDark}
                                  alt="time"
                                  className="h-4 w-4 hidden dark:block"
                                />
                                <span>
                                  {dateFormater(job.startTime, job.endTime)}
                                </span>
                              </div>

                              <div className="flex items-center gap-1 text-yellow-400 font-medium">
                                <img
                                  src={MoneyIcon}
                                  className="h-4 w-4 dark:hidden"
                                />
                                <img
                                  src={MoneyIconDark}
                                  className="h-4 w-4 hidden dark:block"
                                />
                                <span>{job.minSalary}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 ">
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              job.status === "APPROVED"
                                ? "bg-yellow-400/10 text-yellow-400"
                                : "bg-[#364d7d]/10 text-[#364d7d] dark:text-primary/70"
                            }`}
                          >
                            {job.status}
                          </span>

                          <Button
                            variant="outline"
                            className="text-secondary dark:text-primary transition-all duration-300 hover:scale-105 active:scale-95
                                                             hover:text-secondary hover:bg-yellow-400"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}

                <Card className="w-full rounded-2xl">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-bold text-secondary dark:text-primary">
                      Quick Actions
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Button
                        variant="outline"
                        onClick={() => navigate("/find-your-job")}
                        className="group h-20 flex flex-col gap-2 text-secondary dark:text-primary
                                         hover:bg-yellow-400 hover:text-secondary transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={FindJobsIcon}
                          alt="Find Jobs"
                          className="h-6 w-6 dark:hidden"
                        />
                        <img
                          src={FindJobsIconDarkMode}
                          alt="find jobs"
                          className="h-6 w-6 hidden dark:block dark:group-hover:hidden"
                        />
                        <img
                          src={FindJobsIcon}
                          alt="find jobs"
                          className="h-6 w-6 hidden dark:group-hover:block"
                        />
                        <span className="text-sm font-medium">Find Jobs</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => navigate("/job-history")}
                        className="group h-20 flex flex-col gap-2 text-secondary dark:text-primary
                                         hover:bg-yellow-400 hover:text-secondary transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={ScheduleIcon}
                          alt="Schedule"
                          className="h-6 w-6 dark:hidden"
                        />
                        <img
                          src={ScheduleIconDarkMode}
                          alt="Schedule"
                          className="h-6 w-6 hidden dark:block dark:group-hover:hidden"
                        />
                        <img
                          src={ScheduleIcon}
                          alt="schedule"
                          className="h-6 w-6 hidden dark:group-hover:block"
                        />
                        <span className="text-sm font-medium">Job History</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => navigate("/nearby")}
                        className="group h-20 flex flex-col gap-2 text-secondary dark:text-primary
                                         hover:bg-yellow-400 hover:text-secondary transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={MapIcon}
                          alt="view map"
                          className="h-6 w-6 dark:hidden"
                        />
                        <img
                          src={MapIconDarkMode}
                          alt="view map"
                          className="h-6 w-6 hidden dark:block dark:group-hover:hidden"
                        />
                        <img
                          src={MapIcon}
                          alt="view map"
                          className="h-6 w-6 hidden dark:group-hover:block"
                        />
                        <span className="text-sm font-medium">Map View</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE PANEL */}
          <div className="space-y-6">
            <Card className="w-full mx-auto rounded-2xl">
              <CardContent className="p-8 text-center space-y-5">
                <div className="flex items-start gap-2">
                  <img
                    src={StarIconYellow}
                    alt="trust score"
                    className="h-6 w-6"
                  />
                  <h3 className="text-lg font-semibold text-secondary dark:text-primary">
                    Trust Score
                  </h3>
                </div>

                <div className="text-5xl font-bold text-yellow-400">
                  {data?.trustScore}
                </div>

                <div className="flex justify-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="relative">
                      <img
                        src={StarIcon}
                        alt="rating star"
                        className="h-5 w-5 dark:hidden"
                      />
                      <img
                        src={StarIconYellow}
                        alt="rating star"
                        className="h-5 w-5 hidden dark:block"
                      />
                    </div>
                  ))}
                </div>

                <p className="text-sm text-secondary dark:text-primary">
                  No ratings yet
                </p>

                <Button
                  variant="outline"
                  asChild
                  className="w-full text-secondary dark:text-primary hover:bg-yellow-400 hover:text-secondary
                               transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Link to="/seekerProfile">View Full Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobseekerDashboard;
