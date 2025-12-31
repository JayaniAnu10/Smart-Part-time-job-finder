import InputField from "../../components/InputField";
import SelectField from "../../components/SelectField";
import StepIndicator from "../../components/StepIndicator";
import RegistrationCard from "../../components/RegistrationCard";
import { Link, useNavigate } from "react-router-dom";
import calendarIcon from "../../assets/calendar.svg";
import locationIcon from "../../assets/location.svg";
import nicIcon from "../../assets/nic.svg";
import arrowBack from "../../assets/arrow-back.svg";
import arrowForward from "../../assets/arrow-forward.svg";
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
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold mt-2 text-[#0F1F3D]">
        Job Seeker Registration
      </h2>

      <p className="text-[#364D7D] text-[16px] mt-1">
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
              icon={calendarIcon}
              type="date"
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
            icon={nicIcon}
            value={data.nic}
            onChange={(e) => setData({ nic: e.target.value })}
          />

          <InputField
            label="Address"
            placeholder="Your address"
            icon={locationIcon}
            value={data.address}
            onChange={(e) => setData({ address: e.target.value })}
          />

          <div className="flex justify-between mt-6">
            <Link to="/getstarted">
              <button className="px-6 h-10 rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] flex items-center gap-2 hover:bg-[#F7C01D] hover:text-[#0F1F3D] transition-colors duration-200">
                <img src={arrowBack} alt="back arrow" className="w-4 h-4" />
                Back
              </button>
            </Link>

            <button
              className="px-6 h-10 rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold flex items-center gap-2"
              onClick={handleNext}
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
