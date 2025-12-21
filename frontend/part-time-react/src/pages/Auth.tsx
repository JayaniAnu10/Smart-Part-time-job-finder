import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import InputField from "../components/InputField";

import logoIcon from "../assets/logo-icon.svg";
import Logo from "@/components/common/Logo";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupContact, setSignupContact] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center 
      bg-gradient-to-br from-[#FFFFFF] via-[#FAF5E8] to-[#FCF5DE] p-6"
    >
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <div className="text-center mb-4">
        <p className="text-[#364D7D] mt-1 font-roboto text-[16px]">
          {activeTab === "login" ? "Welcome back!" : "Create your account"}
        </p>
      </div>

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg ">
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

            <button
              className="w-full h-[40px] bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-4 mt-4" onSubmit={handleSignup}>
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />

            <InputField
              label="Contact Number"
              type="tel"
              placeholder="+94 77 234 5678"
              value={signupContact}
              onChange={(e) => setSignupContact(e.target.value)}
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
            />

            <button
              className="w-full h-[40px] bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition"
            >
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
