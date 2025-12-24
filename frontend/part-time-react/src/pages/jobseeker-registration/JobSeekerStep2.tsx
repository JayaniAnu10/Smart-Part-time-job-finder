import { useState } from "react";
import UploadButton from "../../components/UploadButton";
import SkillTag from "../../components/SkillTag";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import Checkbox from "../../components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../assets/person.svg";
import arrowBack from "../../assets/arrow-back.svg";
import Logo from "@/components/common/Logo";
import { useJobSeekerStore } from "@/store/useJobSeekerStore";
import toast from "react-hot-toast";
import useAddJobSeeker from "@/hooks/useAddJobSeeker";

export default function JobSeekerStep3() {
  const [photo, setPhoto] = useState<File | null>(null);
  const navigate = useNavigate();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { data, setData, reset } = useJobSeekerStore();
  const addSeekerMutation = useAddJobSeeker();

  const skillOptions = [
    "Customer Service",
    "Data Entry",
    "Driving",
    "Cleaning",
    "Cooking",
    "Delivery",
    "Sales",
    "Marketing",
    "IT Support",
    "Teaching",
    "Accounting",
    "Photography",
    "Writing",
    "Translation",
    "Warehouse",
    "Security",
    "Receptionist",
    "Cashier",
    "Waiter/Waitress",
    "Other",
  ];

  const handleSubmit = () => {
    if (!data.bio) {
      toast.error("Bio is required");
      return;
    }

    if (!data.skills) {
      toast.error("At least one skill is required.");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms & conditions");
      return;
    }

    addSeekerMutation.mutate(data, {
      onSuccess: () => {
        reset(); // clear zustand store
        navigate("/"); // navigate after success
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10 px-4">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold text-[#0F1F3D] mt-2">
        Job Seeker Registration
      </h2>

      <p className="text-[16px] text-[#364D7D] mt-1">
        Create your profile to find part-time jobs
      </p>

      <StepIndicator currentStep={2} />

      <RegistrationCard title="Profile Details">
        <div className="mb-4">
          <p className="text-[14px] text-[#0F1F3D] mb-1">Profile Picture</p>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#E0E7F5] rounded-full flex items-center justify-center overflow-hidden">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={profileIcon}
                  alt="Profile icon"
                  className="w-12 h-12 opacity-80"
                />
              )}
            </div>

            <UploadButton
              label="Upload Photo"
              onChange={(file) => {
                setPhoto(file), setData({ profilePicture: file });
              }}
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[14px] text-[#0F1F3D] mb-2">Bio</p>

          <textarea
            placeholder="Tell employers about yourself..."
            value={data.bio}
            onChange={(e) => setData({ bio: e.target.value })}
            className="w-full h-22.5 border border-[#A5A8AD] rounded-lg p-3 text-[#364D7D] placeholder:text-[#364D7D] bg-[#FAFAFA] "
          ></textarea>
        </div>

        <div className="mt-6">
          <p className="text-[14px] text-[#0F1F3D] mb-3">
            Skills <span className="text-[#0F1F3D]">*</span>{" "}
            <span className="text-[14px] text-[#0F1F3D]">
              (Select at least one)
            </span>
          </p>

          <div className="border border-[#A5A8AD] rounded-lg p-4 flex flex-wrap gap-1 bg-[#FAFAFA]">
            {skillOptions.map((skill) => (
              <SkillTag
                key={skill}
                label={skill}
                selected={data.skills.includes(skill)}
                toggle={() => {
                  if (data.skills.includes(skill)) {
                    // remove skill
                    setData({ skills: data.skills.filter((s) => s !== skill) });
                  } else {
                    // add skill
                    setData({ skills: [...data.skills, skill] });
                  }
                }}
              />
            ))}
          </div>

          <div className="mt-4">
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              label={
                <span className="text-[#0F1F3D] text-[14px]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#F7C01D] ">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#F7C01D] ">
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/jobseeker/register/step1">
            <button className="px-6 h-10 rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] flex items-center gap-2 hover:bg-[#F7C01D] transition cursor-pointer">
              <img src={arrowBack} alt="left arrow" className="w-4 h-4" />
              Back
            </button>
          </Link>

          <button
            disabled={addSeekerMutation.isPending}
            className="px-6 h-10 rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold transition-transform duration-150 active:scale-105 cursor-pointer"
            onClick={handleSubmit}
          >
            Create Account
          </button>
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
