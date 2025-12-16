import NavBar from "../components/NavBar";
import heroBackground from "@/assets/hero6.png";

import { Button } from "@/components/ui/button";

import SearchIcon from "@/assets/search.svg";
import PostJobButtonIcon from "@/assets/logo-icon.svg";
import PostJobButtonIconDarkMode from "@/assets/darkmode-briefcase.svg";
import JobsIcon from "@/assets/jobs.svg";
import JobSeekerIcon from "@/assets/group.svg";
import CompaniesIcon from "@/assets/companies.svg";
import SuccessIcon from "@/assets/star.svg";

const HomePage = () => {
  return (
    <div className="relative">
      <NavBar />
      <div>
        <section
          className="relative min-h-screen flex items-center justify-center bg-cover bg-center pt-24"
          style={{
            backgroundImage: `url(${heroBackground})`,
          }}  
        >
          <div className="absolute inset-0 bg-linear-to-b from-background/50 via-background/35 to-background/20 z-10" />
          <div className="relative text-center z-30 max-w-5xl px-6 text-center ">
      
            <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-sm leading-tight">

              <span className="whitespace-nowrap">
                <span className="text-secondary dark:text-primary">
                  Find Your Perfect{" "}
                </span>
                <span className="text-primary dark:text-yellow-400 ">
                  Part-Time Job
                </span>
              </span>{" "}
              <span className="text-secondary dark:text-primary">
                in Sri Lanka
              </span>

            </h1>


            <p className="mt-6 text-base md:text-lg text-secondary/80 dark:text-secondary-foreground max-w-3xl mx-auto">
              Connect with thousands of flexible job opportunities. Work on your
              terms, grow your income, and build your future.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" 
                      className="bg-primary dark:bg-yellow-400 hover:bg-primary dark:hover:bg-yellow-400 dark:bg-yellow-400 text-secondary px-8 transition-all duration-300 hover:scale-105 active:scale-95">
                <img
                  src={SearchIcon}
                  alt="Search jobs"
                  className="mr-2 h-5 w-5"
                />
                Find Jobs Now
              </Button>

              <Button size="lg"
                      className="relative overflow-hidden border border-secondary bg-primary-foreground/40 dark:bg-[rgba(255,255,255,0.12)]
                                 backdrop-blur-sm text-secondary dark:text-secondary-foreground px-8 transition-all duration-300 hover:bg-secondary/60 active:scale-95 ">
                <img
                  src={PostJobButtonIcon}
                  alt="Post a job"
                  className="mr-2 h-5 w-5 dark:hidden"
                />
           
                <img
                  src={PostJobButtonIconDarkMode}
                  alt="Post a job"
                  className="mr-2 h-5 w-5 hidden dark:inline"
                />
                Post a Job
              </Button>
            </div>

            <div className="relative z-30 mt-16 w-full max-w-6xl px-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="rounded-xl bg-card backdrop-blur-md shadow-lg p-6 text-center">
                  <img
                    src={JobsIcon}
                    alt="Active Jobs"
                    className="mx-auto mb-2 h-8 w-8 text-primary"
                  />
                  <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                    2,500+
                  </h3>
                  <p className="text-secondary/80 dark:text-primary/70 mt-1">
                    Active Jobs
                  </p>
                </div>

                <div className="rounded-xl bg-card backdrop-blur-md shadow-lg p-6 text-center">
                  <img src={JobSeekerIcon} 
                       alt="Job Seekers" 
                       className="mx-auto mb-2 h-8 w-8" 
                  />
                  <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                    15,000+
                  </h3>
                  <p className="text-secondary/80 dark:text-primary/70 mt-1">
                    Job Seekers
                  </p>
                </div>

                <div className="rounded-xl bg-card backdrop-blur-md shadow-lg p-6 text-center">
                  <img src={CompaniesIcon} 
                       alt="Companies" 
                       className="mx-auto mb-2 h-8 w-8" 
                  />
                  <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                    850+
                  </h3>
                  <p className="text-secondary/80 dark:text-primary/70 mt-1">
                    Companies
                  </p>
                </div>

                <div className="rounded-xl bg-card backdrop-blur-md shadow-lg p-6 text-center">
                  <img src={SuccessIcon} 
                       alt="Success Rate" 
                       className="mx-auto mb-2 h-8 w-8" 
                  />
                  <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                    94%
                  </h3>
                  <p className="text-secondary/70 dark:text-primary/70 mt-1">
                    Success Rate
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>
        <div>jp</div>
      </div>
    </div>
  );
};

export default HomePage;
