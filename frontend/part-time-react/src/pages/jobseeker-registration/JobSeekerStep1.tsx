import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import StepIndicator from "../../components/StepIndicator";
import RegistrationCard from "../../components/RegistrationCard";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, MapPin, IdCard, ArrowLeft, ArrowRight, } from "lucide-react";

import Logo from "@/components/common/Logo";
import { useJobSeekerStore } from "@/store/useJobSeekerStore";
import toast from "react-hot-toast";

export default function JobSeekerStep2() {
  const navigate = useNavigate();
  const { data, setData } = useJobSeekerStore();
  const nicPattern = /^(?:\d{9}[VvXx]|\d{12})$/;

  const handleNext = () => {
    //  validation
    if (
      !data.firstName ||
      !data.lastName ||
      !data.nic ||
      !data.address ||
      !data.dob ||
      !data.gender
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time part

    if (data.dob >= today) {
      toast.error("Date of birth is invalid.");
      return;
    }

    if (!nicPattern.test(data.nic)) {
      toast.error("Please enter a valid NIC number.");
      return;
    }

    navigate("/jobseeker/register/step2");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold mt-2 text-secondary dark:text-primary">
        Job Seeker Registration
      </h2>

      <p className="text-secondary/70 dark:text-primary/70 text-[16px] mt-1">
        Create your profile to find part-time jobs
      </p>

      <StepIndicator currentStep={1} />

      <RegistrationCard title="Personal Information">
        <div className="flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="w-1/2">
              <InputField
                label="First Name *"
                placeholder="John"
                value={data.firstName}
                onChange={(e) => setData({ firstName: e.target.value })}
              />
            </div>

            <div className="w-1/2">
              <InputField
                label="Last Name *"
                placeholder="Doe"
                value={data.lastName}
                onChange={(e) => setData({ lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="  flex gap-6  ">
            <div className="flex-1">
              <SelectField
                label="Gender"
                option="Select Gender"
                options={[
                  { value: "male", label: "Male" },
                  { value: "female", label: "Female" },
                  { value: "other", label: "Other" },
                ]}
                value={data.gender}
                onChange={(value) => setData({ gender: value })}
              />
            </div>

            <InputField
              label="Date of Birth"
              type="date"
              icon={<Calendar className="w-4 h-4" />}
              value={data.dob ? data.dob.toISOString().split("T")[0] : ""}
              onChange={(e) =>
                setData({
                  dob: e.target.value ? new Date(e.target.value) : null,
                })
              }
            />
          </div>

          <InputField
            label="NIC Number *"
            placeholder="123456789V or 200012345678"
            icon={<IdCard className="w-4 h-4" />}
            value={data.nic}
            onChange={(e) => setData({ nic: e.target.value })}
          />

          <InputField
            label="Address"
            placeholder="Your address"
            icon={<MapPin className="w-4 h-4" />}
            value={data.address}
            onChange={(e) => setData({ address: e.target.value })}
          />

          <div className="flex justify-between mt-6">
            <Link to="/getstarted">
              <button className="px-6 h-10 rounded-[12px] border border-border bg-[#FAFAFA] dark:bg-background text-secondary dark:text-primary text-[14px] flex items-center gap-2 hover:bg-yellow-400 hover:text-secondary transition-colors duration-200">
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </Link>

            <button
              className="px-6 h-10 rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold flex items-center gap-2"
              onClick={handleNext}
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
