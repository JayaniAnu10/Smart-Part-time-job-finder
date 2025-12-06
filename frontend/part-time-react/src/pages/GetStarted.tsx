import { Link } from "react-router-dom";
import RoleCard from "../components/RoleCard";

import personImg from "../assets/person.svg";
import buildingImg from "../assets/briefcase.svg";
import logoIcon from "../assets/logo-icon.svg";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center pt-10 pb-20 font-sans">
      
      {/* Top Logo */}
      <div className="flex items-center gap-2 mt-4 mb-2">
        
        <div className="w-[40px] h-[40px] bg-[#F7C01D] flex items-center justify-center rounded-[15px]">
          <img src={logoIcon} alt="logo icon" className="w-[24px] h-[24px]" />
        </div>

        
        <h1 className="text-[24px] font-bold">
           <span className="text-[#0F1F3D]">Day</span>
           <span className="text-[#F7C01D]">Bee</span>
           <span className="text-[#0F1F3D]">.lk</span>
        </h1>
      </div>

      {/* Title */}
      <h1 className="text-[30px] font-bold text-[#0F1F3D] mt-4 mb-2">
        Join DayBee.lk
      </h1>
      
      {/* Subtitle */}
      <p className="text-[#515980] text-[18px] mb-10 text-center px-4 md:px-0">
        Select how you want to use our platform
      </p>

      {/* Cards */}
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-center items-start gap-8 px-4">
        <RoleCard
          image={personImg}
          title="I'm a Job Seeker"
          description="Find part-time jobs, connect with employers, and build your career in Sri Lanka"
          bullets={[
            "Browse thousands of job listings",
            "Create your professional profile",
            "Apply with one click",
            "Build your trust score",
          ]}
          navigateTo="/register/jobseeker/step1"
        />

        <RoleCard
          image={buildingImg}
          title="I'm an Employer"
          description="Post jobs, find qualified candidates, and grow your business with reliable workers"
          bullets={[
            "Post unlimited job listings",
            "Access verified job seekers",
            "Manage applications easily",
            "QR-based attendance tracking",
          ]}
          navigateTo="/register/employer/step1"
        />
      </div>

      {/* Bottom Links */}
      <div className="text-center mt-10">
        <p className="text-[16px] text-[#365186]">
          Already have an account?{" "}
          <Link to="/auth" className="text-[#F7C01D] font-semibold">
            Sign in
          </Link>
        </p>

        <Link
          to="/"
          className="text-[14px] text-[#365186] mt-2 inline-block hover:underline"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
