import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";
import UploadButton from "../../components/UploadButton";
import Checkbox from "../../components/Checkbox";

import logoIcon from "../../assets/logo-icon.svg";
import Logo from "../../assets/briefcase.svg";
import webSite from "../../assets/link.svg";

export default function EmployerStep3() {
  const navigate = useNavigate();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [companyDesc, setCompanyDesc] = useState("");
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-10 px-4">

      <div className="flex items-center gap-2 mt-2 mb-4">
        <div className="w-[40px] h-[40px] bg-[#FACC15] flex items-center justify-center rounded-[15px]">
          <img src={logoIcon} alt="logo icon" className="w-[24px] h-[24px]" />
        </div>

        <h1 className="text-[24px] font-bold">
          <span className="text-[#0F1F3D]">Day</span>
          <span className="text-[#FACC15]">Bee</span>
          <span className="text-[#0F1F3D]">.lk</span>
        </h1>
      </div>

      <h2 className="text-[30px] font-extrabold text-[#0F1F3D] mt-2">
        Employer Registration
      </h2>

      <p className="text-[16px] text-[#364D7D] mt-1">
        Create your company profile
      </p>

      <StepIndicator currentStep={3} />

      <RegistrationCard title="Additional Details">
      
        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-1">Company Logo</p>
            <div className="flex items-center gap-6">
              <div className="w-[80px] h-[80px] bg-[#E0E7F5] rounded-[15px] flex items-center justify-center overflow-hidden">
                {companyLogo ? (
                  <img
                    src={URL.createObjectURL(companyLogo)}
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={Logo}
                    alt="Default Logo"
                    className="w-8 h-12 opacity-80"
                  />
                )}
              </div>

              <UploadButton
                label="Upload Logo"
                onChange={(file) => setCompanyLogo(file)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-2">Industry *</p>
            <select className="w-full border border-[#A5A8AD] rounded-[12px] px-4 py-3 bg-[#FAFAFA] text-[#0F1F3D]">
              <option disabled selected>Select industry</option>
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
          </div>

          <InputField
            label="Website"
            placeholder="https://www.example.com"
            icon={webSite}
          />

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-[#0F1F3D] mb-2">Company Description</p>
            <textarea
              value={companyDesc}
              onChange={(e) => setCompanyDesc(e.target.value)}
              placeholder="Tell job seekers about your company..."
              className="w-full h-[90px] border border-[#A5A8AD] rounded-[12px] p-3 text-[#364D7D] bg-[#FAFAFA] placeholder:text-[#364D7D] focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Checkbox
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              label={
                <span className="text-[#0F1F3D] text-[14px]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-[#FACC15]">Terms & Conditions</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#FACC15]">Privacy Policy</Link>
                </span>
              }
            />
          </div>

        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate("/employer/register/step2")}
            className="px-6 h-[40px] rounded-[12px] border border-[#A5A8AD] bg-[#FAFAFA] text-[#0F1F3D] text-[14px] hover:bg-[#FACC15] transition"
          >
            ← Back
          </button>

          <button
            className="px-6 h-[40px] rounded-[12px] bg-[#FACC15] text-[#0F1F3D] text-[14px] font-semibold"
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
