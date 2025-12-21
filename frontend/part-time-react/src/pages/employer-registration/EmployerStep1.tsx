import { Link, useNavigate } from "react-router-dom";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";
import buildingIcon from "../../assets/briefcase.svg";
import idIcon from "../../assets/nic.svg";
import userIcon from "../../assets/person.svg";
import phoneIcon from "../../assets/phone.svg";
import locationIcon from "../../assets/location.svg";
import arrowBack from "../../assets/arrow-back.svg";
import arrowForward from "../../assets/arrow-forward.svg";
import Logo from "@/components/common/Logo";
import { useEmployerStore } from "@/store/useEmployerStore";
import toast from "react-hot-toast";

export default function EmployerStep2() {
  const navigate = useNavigate();
  const { data, setData } = useEmployerStore();

  const handleNext = () => {
    //  validation
    const phoneRegex = /^[0-9]{10}$/;
    if (
      !data.companyName ||
      !data.registrationID ||
      !data.contactPerson ||
      !data.phone ||
      !data.address
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    if (!phoneRegex.test(data.phone)) {
      toast.error("Invalid phone number. Should contain 10 digits");
      return;
    }
    navigate("/employer/register/step2");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
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
            value={data.companyName}
            onChange={(e) => setData({ companyName: e.target.value })}
          />

          <InputField
            label="Business Registration ID / NIC *"
            placeholder="e.g., PV12345678"
            icon={idIcon}
            value={data.registrationID}
            onChange={(e) => setData({ registrationID: e.target.value })}
          />

          <InputField
            label="Contact Person Name *"
            placeholder="John Doe"
            icon={userIcon}
            value={data.contactPerson}
            onChange={(e) => setData({ contactPerson: e.target.value })}
          />

          <InputField
            label="Contact Phone"
            placeholder="+94 77 123 4567"
            icon={phoneIcon}
            value={data.phone}
            onChange={(e) => setData({ phone: e.target.value })}
          />

          <InputField
            label="Company Address *"
            placeholder="Company address"
            icon={locationIcon}
            value={data.address}
            onChange={(e) => setData({ address: e.target.value })}
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/getstarted")}
              className="px-6 h-10 rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] flex items-center gap-2 cursor-pointer hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200"
            >
              <img src={arrowBack} alt="back arrow" className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="px-6 h-10 rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold flex items-center cursor-pointer gap-2"
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
