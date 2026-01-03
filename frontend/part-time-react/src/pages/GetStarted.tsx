import { Link } from "react-router-dom";
import RoleCard from "../components/RoleCard";

import Jobseeker from "../assets/jobseeker.svg";
import Employer from "../assets/employer.svg";
import Logo from "@/components/common/Logo";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center pt-10 pb-20 font-sans">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h1 className="text-[30px] font-bold text-secondary dark:text-primary mt-4 mb-2">
        Join DayBee.lk
      </h1>

      <p className="text-secondary/70 dark:text-primary/70 text-[18px] mb-10 text-center px-4 md:px-0">
        Select how you want to use our platform
      </p>

      <div className="w-full max-w-300 flex flex-col md:flex-row justify-center items-start gap-8 px-4">
        <RoleCard
          image={Jobseeker}
          title="I'm a Job Seeker"
          description="Find part-time jobs, connect with employers, and build your career in Sri Lanka"
          bullets={[
            "Browse thousands of job listings",
            "Create your professional profile",
            "Apply with one click",
            "Build your trust score",
          ]}
          navigateTo="/jobseeker/register/step1"
        />

        <RoleCard
          image={Employer}
          title="I'm an Employer"
          description="Post jobs, find qualified candidates, and grow your business with reliable workers"
          bullets={[
            "Post unlimited job listings",
            "Access verified job seekers",
            "Manage applications easily",
            "QR-based attendance tracking",
          ]}
          navigateTo="/employer/register/step1"
        />
      </div>

      <div className="text-center mt-10">
        <p className="text-[16px] text-secondary/70 dark:text-primary/70">
          Already have an account?{" "}
          <Link to="/auth" className="text-yellow-400 font-medium">
            Sign in
          </Link>
        </p>

        <Link
          to="/"
          className="text-[14px] text-secondary/70 dark:text-primary/70 mt-2 inline-block hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
