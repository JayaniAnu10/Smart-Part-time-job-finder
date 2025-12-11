import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import StepIndicator from "../../components/StepIndicator";
import RegistrationCard from "../../components/RegistrationCard";
import { Link } from "react-router-dom";

import logoIcon from "../../assets/logo-icon.svg";
import calendarIcon from "../../assets/calendar.svg";
import locationIcon from "../../assets/location.svg";
import nicIcon from "../../assets/nic.svg";

export default function JobSeekerStep2() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10">

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

      <h2 className="text-[30px] font-extrabold mt-2 text-[#0F1F3D]">
        Job Seeker Registration
      </h2>

      <p className="text-[#364D7D] text-[16px] mt-1">
        Create your profile to find part-time jobs
      </p>

      <StepIndicator currentStep={2} />

      <RegistrationCard title="Personal Information">
        <div className="flex flex-col gap-5">

          <div className="flex gap-4">
            <div className="w-1/2">
              <InputField 
                label="First Name *" 
                placeholder="John" 
              />
            </div>

            <div className="w-1/2">
              <InputField 
                label="Last Name *" 
                placeholder="Doe" 
              />
            </div>
          </div>

           <div className="flex gap-4">
            <div className="w-1/2">
              <SelectField
                label="Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
              />
            </div>

            <div className="w-1/2">
              <InputField
                label="Date of Birth"
                icon={calendarIcon}
                type="date"
              />
            </div>
          </div>

          <InputField
            label="NIC Number *"
            placeholder="123456789V or 200012345678"
            icon={nicIcon}
          />

          <InputField
            label="Address"
            placeholder="Your address"
            icon={locationIcon}
          />

          <div className="flex justify-between mt-6">
            <Link to="/jobseeker/register/step1">
              <button className="px-6 h-[40px] rounded-[12px] border border-[#cCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200">
                ← Back
              </button>
            </Link>

            <Link to="/jobseeker/register/step3">
              <button className="px-6 h-[40px] rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold">
                Next →
              </button>
            </Link>
          </div>

        </div>
      </RegistrationCard>

      <p className="mt-6 text-[#364D7D] text-[14px]">
        Already have an account?{" "}
        <Link to="/auth" className="text-[#F7C01D] text-[14px]">
          Sign in
        </Link>
      </p>

    </div>
  );
}
