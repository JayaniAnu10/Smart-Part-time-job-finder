import { Link, useNavigate } from "react-router-dom";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";

import logoIcon from "../../assets/logo-icon.svg";
import buildingIcon from "../../assets/briefcase.svg";
import idIcon from "../../assets/nic.svg";
import userIcon from "../../assets/person.svg";
import phoneIcon from "../../assets/phone.svg";
import locationIcon from "../../assets/location.svg";
import arrowBack from "../../assets/arrow-back.svg";
import arrowForward from "../../assets/arrow-forward.svg";

export default function EmployerStep2() {
  const navigate = useNavigate();

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
        Employer Registration
      </h2>

      <p className="text-[#364D7D] text-[16px] mt-1">
        Register your company to find qualified workers
      </p>

      <StepIndicator currentStep={1} />

      <RegistrationCard title="Company Information">
        <div className="flex flex-col gap-5">
          <InputField
            label="Company Name *"
            placeholder="Your Company Ltd."
            icon={buildingIcon}
          />

          <InputField
            label="Business Registration ID *"
            placeholder="e.g., PV12345678"
            icon={idIcon}
          />

          <InputField
            label="Contact Person Name *"
            placeholder="John Doe"
            icon={userIcon}
          />

          <InputField
            label="Contact Phone"
            placeholder="+94 77 123 4567"
            icon={phoneIcon}
          />

          <InputField
            label="Company Address *"
            placeholder="Company address"
            icon={locationIcon}
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/getstarted")}
              className="px-6 h-[40px] rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] flex items-center gap-2 hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200"
            >
              <img src={arrowBack} alt="back arrow" className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={() => navigate("/employer/register/step2")}
              className="px-6 h-[40px] rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold flex items-center gap-2"
            >
              Next
              <img src={arrowForward} alt="forward arrow" className="w-4 h-4" />
            </button>
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
