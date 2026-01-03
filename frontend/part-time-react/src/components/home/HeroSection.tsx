import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero6.png";
import { Button } from "@/components/ui/button";

import SearchIcon from "@/assets/search.svg";
import PostJobButtonIcon from "@/assets/logo-icon.svg";
import PostJobButtonIconDarkMode from "@/assets/darkmode-briefcase.svg";

import JobsIcon from "@/assets/jobs.svg";
import JobSeekerIcon from "@/assets/group.svg";
import CompaniesIcon from "@/assets/companies.svg";
import SuccessIcon from "@/assets/star.svg";

type StatItem = {
  icon: string;
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { icon: JobsIcon, value: "2,500+", label: "Active Jobs" },
  { icon: JobSeekerIcon, value: "15,000+", label: "Job Seekers" },
  { icon: CompaniesIcon, value: "850+", label: "Companies" },
  { icon: SuccessIcon, value: "94%", label: "Success Rate" },
];

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section
      className="relative min-h-[90vh] md:min-h-screen bg-cover bg-center pt-12"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
   
      <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/35 to-background/20 z-10" />

      <div className="relative z-30 flex items-center justify-center px-6 text-center">
        <div className="max-w-5xl">
          <h1 className="text-7xl sm:text-6xl md:text-7xl lg:text-7xl font-extrabold leading-tight">
            <span className="whitespace-nowrap">

              <span className="text-secondary dark:text-primary">
                Find Your Perfect{" "}
              </span>

              <span className="text-primary dark:text-yellow-400 whitespace-nowrap">
                Part-Time Job
              </span>

            </span>
            
              <span className="text-secondary dark:text-primary">
                {" "}in Sri Lanka
              </span>
            
          </h1>

          <p className="mt-6 text-base md:text-lg text-secondary/80 dark:text-primary/70 max-w-3xl mx-auto">
            Connect with thousands of flexible job opportunities. Work on your
            terms, grow your income, and build your future.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => navigate('/find-jobs')}
              className="h-14 px-8 py-6 bg-primary dark:bg-yellow-400 text-[18px] text-secondary transition-all duration-300 hover:scale-105 active:scale-95 
                         hover:bg-primary dark:hover:bg-yellow-400 hover:text-secondary dark:hover:text-secondary cursor-pointer"
            >
              <img src={SearchIcon} alt="Search jobs" className="mr-2 h-5 w-5" />
              Find Jobs Now
            </Button>

            <Button
              size="lg"
              onClick={() => navigate('/post-job')}
              className="h-14 px-8 py-6 border border-secondary bg-primary-foreground/40 dark:bg-secondary/50
                         backdrop-blur-sm text-[18px] text-secondary dark:text-secondary-foreground transition-all 
                         duration-300 active:scale-95 hover:bg-primary-foreground/40 dark:hover:bg-secondary/50 
                         hover:text-secondary dark:hover:text-secondary-foreground cursor-pointer"
            >
              <img
                src={PostJobButtonIcon}
                alt="Post job"
                className="mr-2 h-5 w-5 dark:hidden"
              />
              <img
                src={PostJobButtonIconDarkMode}
                alt="Post job"
                className="mr-2 h-5 w-5 hidden dark:inline"
              />
              Post a Job
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-30 mt-16 px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-xl bg-card backdrop-blur-md shadow-lg p-6 text-center"
            >
              <img src={item.icon} alt={item.label} className="mx-auto mb-2 h-8 w-8" />
              <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                {item.value}
              </h3>
              <p className="text-secondary/70 dark:text-primary/70 mt-1">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
