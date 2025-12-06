import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import { Link } from "react-router-dom";

import logoIcon from "../assets/logo-icon.svg";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState("jobseeker");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#FFFFFF] via-[#FFF8E5] to-[#FFF4D0] p-6">

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

      
      <div className="text-center mb-4">
        <p className="text-[#364D7D] mt-1 font-roboto text-[16px]">
          {activeTab === "login" ? "Welcome back!" : "Create your account"}
        </p>
      </div>

      
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-[#F3E8C8]">

       
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        
        {activeTab === "login" ? (
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleLogin}>
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button className="w-full h-[40px] bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition">
              Login
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSignup}>
            <InputField
              label="Full Name"
              placeholder="John Doe"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <SelectField
              label="I am a"
              value={signupRole}
              onChange={(e) => setSignupRole(e.target.value)}
              options={[
                { value: "jobseeker", label: "Jobseeker" },
                { value: "employer", label: "Employer" },
              ]}
            />

            <button className="w-full h-[40px] bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition">
              Sign Up
            </button>
          </form>
        )}

      </div>
      
      <p className="text-center mt-6 text-[14px] text-[#364D7D]">
        By continuing, you agree to our{" "}
        <span className="text-[#FACC15] cursor-pointer">Terms of Service</span>
      </p>
      
    </div>
  );
};

export default Auth;
