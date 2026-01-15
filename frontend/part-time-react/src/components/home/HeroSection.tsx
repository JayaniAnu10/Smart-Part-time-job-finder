import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Search,
  Briefcase,
  Users,
  Building2,
  Star,
} from "lucide-react";

import heroImage from "@/assets/h.jpg";
import heroImage1 from "@/assets/hero3.jpeg";



type StatItem = {
  icon: React.ElementType;
  value: string;
  label: string;
};

const stats: StatItem[] = [
  { icon: Briefcase, value: "2,500+", label: "Active Jobs" },
  { icon: Users, value: "15,000+", label: "Job Seekers" },
  { icon: Building2, value: "850+", label: "Companies" },
  { icon: Star, value: "94%", label: "Success Rate" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-background via-yellow-300/40 dark:via-blue-300/30 to-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/*hero content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/*left */}
          <div className="text-secondary dark:text-primary space-y-6 -mt-16">

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              <span>Find Your Perfect </span>
              <span className="text-yellow-400">Part-Time Job</span>
              <span> in Sri Lanka</span>
            </h1>

            <p className="text-secondary/70 dark:text-primary/70 max-w-xl">
              Connect with thousands of flexible job opportunities. Work on your
              terms, grow your income, and build your future.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">

              <Button
                size="lg"
                onClick={() => navigate("/find-your-job")}
                className="h-14 px-8 bg-yellow-400 text-secondary text-[18px]
                           hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <Search className="mr-2 h-5 w-5" />
                Find Jobs Now
              </Button>

              <Button
                size="lg"
                onClick={() => navigate("/postJob")}
                className="h-14 px-8 border border-secondary bg-primary-foreground/40  dark:border-white/30 
                dark:bg-white/10 dark:text-white backdrop-blur-sm text-[18px] text-secondary foreground transition-all 
                duration-300 active:scale-95 hover:bg-primary-foreground/40 dark:hover:bg-secondary/50 
                hover:text-secondary dark:hover:text-secondary-foreground cursor-pointer"
              >
                <Briefcase className="mr-2 h-5 w-5" />
                Post a Job
              </Button>

            </div>
          </div>

          {/* right */}
          <div className="relative w-full flex justify-center md:justify-end">

            <div className="relative w-[360px] h-[520px]">

              <div className="absolute left-3 top-0 -translate-x-1/2
                              w-[230px] h-[450px] rounded-[120px]
                              bg-none shadow-xl">

                <img
                  src={heroImage}
                  className="w-full h-full object-cover rounded-[110px]"
                />
              </div>

              <div className="absolute top-0 right-3
                              w-[210px] h-[220px] rounded-full
                              bg-none shadow-xl"  
                   style={{ borderRadius: "50% 50% 50% 0%" }}>

                <img
                  src={heroImage1}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "50% 50% 50% 0%" }}
                />
              </div>

              <div className="absolute bottom-16 right-3
                              w-[210px] h-[220px] rounded-full
                              bg-none shadow-xl"
                   style={{ borderRadius: "50% 0% 50% 50%" }}>

                <img
                  src={heroImage}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: "50% 0% 50% 50%" }}
                />
              </div>

            </div>
          </div>

        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-xl bg-card shadow-lg p-6 text-center"
              >
                <Icon className="mx-auto mb-2 h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                  {item.value}
                </h3>

                <p className="text-secondary/70 dark:text-primary/70 mt-1">
                  {item.label}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
