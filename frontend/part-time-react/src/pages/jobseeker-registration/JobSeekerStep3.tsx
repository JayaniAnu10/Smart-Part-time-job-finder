import { useState } from "react";
import UploadButton from "../../components/UploadButton";
import SkillTag from "../../components/SkillTag";
import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import Checkbox from "../../components/Checkbox";
import { Link } from "react-router-dom";

import profileIcon from "../../assets/person.svg";
import logoIcon from "../../assets/logo-icon.svg";

export default function JobSeekerStep3() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const skillOptions = [
    "Customer Service", "Data Entry", "Driving", "Cleaning",
    "Cooking", "Delivery", "Sales", "Marketing",
    "IT Support", "Teaching", "Accounting", "Photography",
    "Writing", "Translation", "Warehouse", "Security",
    "Receptionist", "Cashier", "Waiter/Waitress", "Other"
  ];

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] flex flex-col items-center py-10 px-4">

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

      <h2 className="text-[30px] font-extrabold text-[#0F1F3D] mt-2">
        Job Seeker Registration
      </h2>

      <p className="text-[16px] text-[#364D7D] mt-1">
        Create your profile to find part-time jobs
      </p>

      <StepIndicator currentStep={3} />

      <RegistrationCard title="Profile Details">

        <div className="mb-4">
          <p className="text-[14px] text-[#0F1F3D] mb-1">Profile Picture</p>

          <div className="flex items-center gap-6">
            <div className="w-[80px] h-[80px] bg-[#E0E7F5] rounded-full flex items-center justify-center overflow-hidden">
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
              onChange={(file) => setPhoto(file)}
            />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-[14px] text-[#0F1F3D] mb-2">Bio</p>

          <textarea
            placeholder="Tell employers about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full h-[90px] border border-[#CCD7E9] rounded-lg p-3 text-[#364D7D] placeholder:text-[#364D7D] bg-[#FAFAFA] "
          ></textarea>
        </div>

        <div className="mt-6">
          <p className="text-[14px] text-[#0F1F3D] mb-3">
            Skills <span className="text-[#0F1F3D]">*</span>{" "}
            <span className="text-[14px] text-[#0F1F3D]">(Select at least one)</span>
          </p>

          <div className="border border-[#CCD7E9] rounded-lg p-4 flex flex-wrap gap-1 bg-[#FAFAFA]">
            {skillOptions.map((skill) => (
              <SkillTag
                key={skill}
                label={skill}
                selected={skills.includes(skill)}
                toggle={() => toggleSkill(skill)}
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
          <Link to="/jobseeker/register/step2">
            <button className="px-6 h-[40px] rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] hover:bg-[#F7C01D] transition">
              ← Back
            </button>
          </Link>

          <button className="px-6 h-[40px] rounded-[12px] bg-[#F7C01D] text-[#0F1F3D] text-[14px] font-semibold">
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
