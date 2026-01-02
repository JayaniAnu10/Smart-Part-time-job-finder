import { Link, useNavigate } from "react-router-dom";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";
import {
  Building2,
  IdCard,
  User,
  Phone,
  MapPin,
} from "lucide-react";

import { ArrowRight, ArrowLeft } from "lucide-react";
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
    <div className="min-h-screen bg-background flex flex-col items-center py-10">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold mt-2 text-secondary dark:text-primary">
        Employer Registration
      </h2>

      <p className="text-secondary/70 dark:text-primary/70 text-[16px] mt-1">
        Register your company to find qualified workers
      </p>

      <StepIndicator currentStep={1} />

      <RegistrationCard title="Company Information">
        <div className="flex flex-col gap-5">
          <InputField
            label="Company Name *"
            placeholder="Your Company Ltd."
            icon={<Building2 size={16} />}
            value={data.companyName}
            onChange={(e) => setData({ companyName: e.target.value })}
          />

          <InputField
            label="Business Registration ID / NIC *"
            placeholder="e.g., PV12345678"
             icon={<IdCard size={16} />}
            value={data.registrationID}
            onChange={(e) => setData({ registrationID: e.target.value })}
          />

          <InputField
            label="Contact Person Name *"
            placeholder="John Doe"
            icon={<User size={16} />}
            value={data.contactPerson}
            onChange={(e) => setData({ contactPerson: e.target.value })}
          />

          <InputField
            label="Contact Phone"
            placeholder="+94 77 123 4567"
            icon={<Phone size={16} />}
            value={data.phone}
            onChange={(e) => setData({ phone: e.target.value })}
          />

          <InputField
            label="Company Address *"
            placeholder="Company address"
            icon={<MapPin size={16} />}
            value={data.address}
            onChange={(e) => setData({ address: e.target.value })}
          />

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/getstarted")}
              className="px-6 h-10 rounded-[12px] border border-border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary text-[14px] flex items-center gap-2 cursor-pointer hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <button
              onClick={handleNext}
              className="px-6 h-10 rounded-[12px] bg-yellow-400 text-secondary text-[14px] font-semibold flex items-center cursor-pointer gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </RegistrationCard>

      <p className="mt-6 text-secondary/70 dark:text-primary/70 text-[14px]">
        Already have an account?{" "}
        <Link to="/auth" className="text-yellow-400 text-[14px]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
