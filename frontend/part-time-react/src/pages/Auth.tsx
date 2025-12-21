import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import InputField from "../components/InputField";
import Logo from "@/components/common/Logo";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type SignupFormData = {
  email: string;
  password: string;
  confirmPassword: string;
  contact: string;
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleSignup = useMutation<any, Error, SignupFormData>({
    mutationFn: (data: SignupFormData) => {
      return axios
        .post("http://localhost:8080/user", data)
        .then((res) => res.data);
    },
    onSuccess: () => {
      alert("Signup successful!");
      reset();
      setActiveTab("login");
    },
    onError: (error) => {
      //Axios error handle
      if (axios.isAxiosError(error)) {
        //Get error from server
        const msg =
          error.response?.data.error || "Signup failed. Please try again.";
        alert(msg);
      } else {
        alert("Signup failed. Please try again.");
      }
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>();

  const onSubmit = (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    handleSignup.mutate(data);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center 
      bg-linear-to-br from-[#FFFFFF] via-[#FAF5E8] to-[#FCF5DE] p-6"
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
              className="w-full h-10 bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition"
            >
              Login
            </button>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <InputField
              label="Contact Number"
              type="tel"
              placeholder="+94 77 234 5678"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact must be exactly 10 digits",
                },
              })}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <InputField
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              {...register("confirmPassword", {
                required: "Confirm the password",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              disabled={handleSignup.isPending}
              className="w-full h-10 bg-[#FACC15] text-[#0f1f3d]
              rounded-lg font-medium font-roboto hover:bg-[#E5B80C] transition cursor-pointer"
            >
              {handleSignup.isPending ? "Signing up..." : "Sign Up"}
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
