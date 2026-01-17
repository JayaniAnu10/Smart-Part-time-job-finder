import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search,
  Briefcase,
  Users,
  Building2,
  Star,
} from "lucide-react";

import heroImage from "@/assets/hero1.jpg";
import heroImage1 from "@/assets/hero2.jpg";
import heroImage2 from "@/assets/hero4.jpg";

import { fadeUp, fadeIn, scaleIn, stagger } from "@/lib/animations";

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
    <motion.section initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="bg-gradient-to-br from-background via-yellow-300/40 dark:via-blue-300/40 to-background py-16">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/*hero content */}
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/*left */}
          <motion.div variants={stagger} 
                      initial="hidden"
                      animate="visible"
                      className="text-secondary dark:text-primary space-y-6 -mt-16">

            <motion.h1 variants={fadeUp}
                       className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              <span>Find Your Perfect </span>
              <span className="text-yellow-400">Part-Time Job</span>
              <span> in Sri Lanka</span>
            </motion.h1>
            
            <motion.p variants={fadeUp}
                      className="text-secondary/70 dark:text-primary/70 max-w-xl">
              Connect with thousands of flexible job opportunities. Work on your
              terms, grow your income, and build your future.
            </motion.p>

            <motion.div variants={fadeUp}
                        className="flex flex-col sm:flex-row gap-3">

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

            </motion.div>
          </motion.div>

          {/* right */}
          <motion.div variants={scaleIn}
                      className="relative w-full flex justify-center md:justify-end">

            <div className="relative w-[360px] h-[520px]">

              <motion.div variants={fadeUp}
                          transition={{ delay: 0.2}}
                          className="absolute left-3 top-0 -translate-x-1/2 w-[225px] h-[455px] rounded-[120px] bg-none 
                                     filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]">
                          

                <img src={heroImage}
                     className="w-full h-full object-cover rounded-[110px]"
                     />
              </motion.div>
 
              <motion.div  variants={fadeUp} 
                           transition={{delay: 0.4}}
                           className="absolute top-0 right-3 w-[210px] h-[220px] rounded-full bg-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"  
                           style= {{ borderRadius: "50% 50% 50% 0%" }}>

                <img src={heroImage1} 
                     className="w-full h-full object-cover" 
                     style={{ borderRadius: "50% 50% 50% 0%" }}/>
              </motion.div>

              <motion.div variants={fadeUp}
              transition={{delay: 0.6}}
                          className="absolute bottom-16 right-3 w-[210px] h-[220px] rounded-full bg-none filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
                          style={{ borderRadius: "0% 50% 50% 50%" }}>

                <img src={heroImage2}
                     className="w-full h-full object-cover"
                     style={{ borderRadius: "0% 0% 50% 50%" }}/>
              </motion.div>

            </div>
          </motion.div>

        </div>

        <motion.div variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div variants={fadeUp}
                          key={item.label}
                          className="rounded-xl bg-card shadow-lg p-6 text-center">
                <Icon className="mx-auto mb-2 h-8 w-8 text-yellow-400" />

                <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
                  {item.value}
                </h3>

                <p className="text-secondary/70 dark:text-primary/70 mt-1">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default HeroSection;
