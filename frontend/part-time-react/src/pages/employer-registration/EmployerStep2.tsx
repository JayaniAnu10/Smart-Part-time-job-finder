import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import RegistrationCard from "../../components/RegistrationCard";
import StepIndicator from "../../components/StepIndicator";
import InputField from "../../components/InputField";
import UploadButton from "../../components/UploadButton";
import Checkbox from "../../components/Checkbox";
import SelectField from "@/components/SelectField";
import Log from "../../assets/briefcase.svg";
import { Globe } from "lucide-react";

import { ArrowLeft } from "lucide-react";
import { useEmployerStore } from "@/store/useEmployerStore";
import toast from "react-hot-toast";
import useAddEmployer from "@/hooks/useAddEmployer";
import Logo from "@/components/common/Logo";
import axios from "axios";

export default function EmployerStep2() {
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
      onError: (error) => {
        //Axios error handle
        if (axios.isAxiosError(error)) {
          //Get error from server
          const msg =
            error.response?.data.error ||
            "Employer signup failed. Please try again.";
          toast.error(msg);
        } else {
          toast.error("Employer signup failed. Please try again.");
        }
        reset();
        setAgreeTerms(false);
      },
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-10 px-4">
      <div className="flex items-center gap-2 mt-2 mb-4">
        <Logo />
      </div>

      <h2 className="text-[30px] font-extrabold text-secondary dark:text-primary mt-2">
        Employer Registration
      </h2>

      <p className="text-[16px] text-secondary/70 dark:text-primary/70 mt-1">
        Create your company profile
      </p>

      <StepIndicator currentStep={2} />

      <RegistrationCard title="Additional Details">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-secondary dark:text-primary mb-1">
              Company Logo
            </p>
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

          <SelectField
            label="Industry *"
            option="Select industry"
            value={data.industry}
            onChange={(value) => setData({ industry: value })}
            options={[
              { value: "Retail", label: "Retail" },
              { value: "Hospitality", label: "Hospitality" },
              { value: "Food & Beverage", label: "Food & Beverage" },
              { value: "Healthcare", label: "Healthcare" },
              { value: "Education", label: "Education" },
              { value: "IT & Software", label: "IT & Software" },
              { value: "Construction", label: "Construction" },
              { value: "Manufacturing", label: "Manufacturing" },
              { value: "Logistic", label: "Logistic" },
              { value: "Finance", label: "Finance" },
              { value: "Entertainment", label: "Entertainment" },
              { value: "Real Estate", label: "Real Estate" },
              { value: "Agriculture", label: "Agriculture" },
              { value: "Other", label: "Other" },
            ]}
          />

          <InputField
            label="Website"
            placeholder="https://www.example.com"
            icon={<Globe size={16} />}
            value={data.website}
            onChange={(e) => setData({ website: e.target.value })}
          />

          <div className="flex flex-col gap-3">
            <p className="text-[14px] text-secondary dark:text-primary mb-2">
              Company Description
            </p>
            <textarea
              value={data.description}
              onChange={(e) => setData({ description: e.target.value })}
              placeholder="Tell job seekers about your company..."
              className="w-full h-22 border border-border rounded-[12px] p-3 text-secondary 
                         dark:text-primary bg-[#FAFAFA] dark:bg-background placeholder:text-secondary/50 
                         dark:placeholder:text-primary/50 outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>

          <div className="flex flex-col gap-3">
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
          <button
            onClick={() => navigate("/employer/register/step1")}
            className="px-6 h-10 rounded-[12px] border border-border bg-[#FAFAFA] dark:bg-background text-secondary 
                       dark:text-primary dark:hover:text-secondary text-[14px] flex items-center gap-2 hover:bg-yellow-400 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            disabled={addEmployerMutation.isPending}
            className="px-6 h-10 font-medium rounded-[12px] bg-yellow-400 text-secondary text-[14px] 
                       transition-transform duration-150 active:scale-105 cursor-pointer "
            onClick={handleSubmit}
          >
            Create Account
          </button>
        </div>
      </RegistrationCard>

      <p className="mt-8 text-[14px] text-secondary/70 dark:text-primary/70 mb-6">
        Already have an account?{" "}
        <Link to="/auth" className="text-yellow-400">
          Sign in
        </Link>
      </p>
    </div>
  );
}
