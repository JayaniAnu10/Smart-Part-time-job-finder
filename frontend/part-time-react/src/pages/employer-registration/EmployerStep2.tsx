import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";
import UploadButton from "../../components/UploadButton";
import Checkbox from "../../components/Checkbox";
import Log from "../../assets/briefcase.svg";
import webSite from "../../assets/link.svg";
import arrowBack from "../../assets/arrow-back.svg";
import downArrow from "../../assets/arrow-down.svg";
import { useEmployerStore } from "@/store/useEmployerStore";
import toast from "react-hot-toast";
import useAddEmployer from "@/hooks/useAddEmployer";
import Logo from "@/components/common/Logo";

export default function EmployerStep3() {
  const navigate = useNavigate();
  const { data, setData, reset } = useEmployerStore();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const addEmployerMutation = useAddEmployer();

  const handleSubmit = () => {
    if (!data.industry) {
      toast.error("Please select industry");
      return;
    }

    if (!data.description) {
      toast.error("Description is required.");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to terms & conditions");
      return;
    }

    addEmployerMutation.mutate(data, {
      onSuccess: () => {
        reset(); // clear zustand store
        navigate("/"); // navigate after success
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10 px-4">
      <div className="flex items-center gap-2 mt-2 mb-4">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold text-[#0F1F3D] mt-2">
        Employer Registration
      </h2>

      <p className="text-[16px] text-[#364D7D] mt-1">
        Create your company profile
      </p>

      <StepIndicator currentStep={2} />

      <RegistrationCard title="Additional Details">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-1">Company Logo</p>
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-[#E0E7F5] rounded-[15px] flex items-center justify-center overflow-hidden">
                {companyLogo ? (
                  <img
                    src={URL.createObjectURL(companyLogo)}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={Log}
                    alt="Default Logo"
                    className="w-8 h-12 opacity-80"
                  />
                )}
              </div>

              <UploadButton
                label="Upload Logo"
                onChange={(file) => {
                  setCompanyLogo(file), setData({ logo: file });
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-2">Industry *</p>
            <div className="relative w-full">
              <select
                className="w-full border border-[#A5A8AD] rounded-[12px] px-4 py-3 bg-[#FAFAFA] text-[#0F1F3D] appearance-none"
                value={data.industry}
                onChange={(e) => setData({ industry: e.target.value })}
              >
                <option disabled selected>
                  Select industry
                </option>
                <option>Retail</option>
                <option>Hospitality</option>
                <option>Food & Beverage</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>IT & Software</option>
                <option>Construction</option>
                <option>Manufacturing</option>
                <option>Logistic</option>
                <option>Finance</option>
                <option>Entertainment</option>
                <option>Real Estate</option>
                <option>Agriculture</option>
                <option>Other</option>
              </select>

              <img
                src={downArrow}
                className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <InputField
            label="Website"
            placeholder="https://www.example.com"
            icon={webSite}
            value={data.website}
            onChange={(e) => setData({ website: e.target.value })}
          />

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-2">
              Company Description
            </p>
            <textarea
              value={data.description}
              onChange={(e) => setData({ description: e.target.value })}
              placeholder="Tell job seekers about your company..."
              className="w-full h-22.5 border border-[#A5A8AD] rounded-[12px] p-3 text-[#364D7D] bg-[#FAFAFA] placeholder:text-[#364D7D] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              label={
                <span className="text-[#0F1F3D] text-[14px]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#FACC15]">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#FACC15]">
                    Privacy Policy
                  </Link>
                </span>
              }
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/employer/register/step1")}
            className="px-6 h-10 rounded-[12px] border border-[#CCD7E9] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] flex items-center gap-2 hover:bg-[#FACC15] transition"
          >
            <img src={arrowBack} alt="back arrow" className="w-4 h-4" />
            Back
          </button>

          <button
            disabled={addEmployerMutation.isPending}
            className="px-6 h-10 rounded-[12px] bg-[#FACC15] text-[#0F1F3D] text-[14px] font-semibold transition-transform duration-150 active:scale-105"
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
      </RegistrationCard>

      <p className="mt-8 text-[14px] text-[#364D7D] mb-6">
        Already have an account?{" "}
        <Link to="/auth" className="text-[#FACC15] font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
