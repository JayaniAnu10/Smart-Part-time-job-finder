import { useState } from "react";
import UploadButton from "../../components/UploadButton";
import SkillTag from "../../components/SkillTag";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import Checkbox from "../../components/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { User, ArrowLeft } from "lucide-react";
import Logo from "@/components/common/Logo";
import { useJobSeekerStore } from "@/store/useJobSeekerStore";
import toast from "react-hot-toast";
import useAddJobSeeker from "@/hooks/useAddJobSeeker";
import axios from "axios";

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

    if (data.skills.length == 0) {
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
      onError: (error) => {
        //Axios error handle
        if (axios.isAxiosError(error)) {
          //Get error from server
          const msg =
            error.response?.data.error ||
            "Job Seeker signup failed. Please try again.";
          toast.error(msg);
        } else {
          toast.error("Job Seeker signup failed. Please try again.");
        }
        reset();
        setAgreeTerms(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold text-secondary dark:text-primary mt-2">
        Job Seeker Registration
      </h2>

      <p className="text-[16px] text-secondary/70 dark:text-primary/70 mt-1">
        Create your profile to find part-time jobs
      </p>

      <StepIndicator currentStep={2} />

      <RegistrationCard title="Profile Details">
        <div className="mb-2">
          <p className="text-[14px] text-secondary dark:text-primary mb-3">Profile Picture</p>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-[#E0E7F5] rounded-full flex items-center justify-center overflow-hidden">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-[#364d7d]" />
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
          <p className="text-[14px] text-secondary dark:text-primary mb-2">Bio</p>

          <textarea
            placeholder="Tell employers about yourself..."
            value={data.bio}
            onChange={(e) => setData({ bio: e.target.value })}
            className="w-full h-22 border border-border rounded-lg p-3 text-secondary dark:text-primary 
                       placeholder:text-secondary/50 dark:placeholder:text-primary/50 bg-[#fafafa] 
                       dark:bg-background outline-none focus:ring-1 focus:ring-yellow-400"
          ></textarea>
        </div>

        <div className="mt-6">
          <p className="text-[14px] text-secondary dark:text-primary mb-3">
            Skills <span className="text-secondary dark:text-primary">*</span>{" "}
            <span className="text-[14px] text-secondary dark:text-primary">
              (Select at least one)
            </span>
          </p>

          <div className="border border-border rounded-lg p-4 flex flex-wrap gap-1 bg-[#fafafa] dark:bg-background">
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
                <span className="text-secondary dark:text-primary text-[14px]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-yellow-400">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-yellow-400">
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Link to="/jobseeker/register/step1">
            <button className="px-6 h-10 rounded-[12px] border border-border bg-[#fafafa] dark:bg-background text-secondary 
                               dark:text-primary  dark:hover:text-secondary text-[14px] flex items-center gap-2 hover:bg-yellow-400 transition cursor-pointer">
              <ArrowLeft className="w-4 h-4" />
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

      <p className="mt-6 text-secondary/70 dark:text-primary/70 text-[14px]">
        Already have an account?{" "}
        <Link to="/auth" className="text-yellow-400 text-[14px]">
          Sign in
        </Link>
      </p>
    </div>
  );
}
