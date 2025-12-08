import InputField from "../../components/InputField";
import StepIndicator from "../../components/StepIndicator";
import RegistrationCard from "../../components/RegistrationCard";
import { Link } from "react-router-dom";

import emailIcon from "../../assets/email.svg";
import lockIcon from "../../assets/lock.svg";
import logoIcon from "../../assets/logo-icon.svg";

export default function JobSeekerStep1() {
  return (
    <div className="min-h-screen bg-[#FAFAfA] flex flex-col items-center py-10">
      
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
      <h2 className="text-[30px] font-extrabold text-[#0F1F3D] mt-2">Job Seeker Registration</h2>
      <p className="text-[16px] text-[#364D7D] mt-1">Create your profile to find part-time jobs</p>

      <StepIndicator currentStep={1} />

      <RegistrationCard title="Account Information">
        <div className="flex flex-col gap-5">

          <InputField
            label="Email Address *"
            placeholder="you@example.com"
            type="email"
            icon={emailIcon}
          />

          <InputField
            label="Password *"
            placeholder="Create a strong password"
            type="password"
            icon={lockIcon}
          />

          <InputField
            label="Confirm Password *"
            placeholder="Confirm your password"
            type="password"
             icon={lockIcon}
          />

          <div className="flex justify-between mt-6">
            <button className="px-6 h-[40px] rounded-[12px] border border-[#cCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200">
              ← Back
            </button>

            <Link to="/jobseeker/register/step2">
              <button className="px-6 h-[40px] rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold">
              Next →
              </button>
            </Link>
          </div>
        </div>
      </RegistrationCard>

      <p className="mt-6 text-[#364D7D] text-[14px]">
        Already have an account?{" "}
        <Link to="/auth" className="text-[#F7C01D] text-[14px]">Sign in</Link>
      </p>
    </div>
  );
}
