import { useState } from "react";
import AuthTabs from "../components/AuthTabs";
import InputField from "../components/InputField";
import Logo from "@/components/common/Logo";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAddUser from "@/hooks/useAddUser";
import useUserLogin from "@/hooks/useUserLogin";

export type AuthFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
  contact?: string;
};

const Auth = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleLogin = useUserLogin(() => {
    reset();
  });

  const handleSignup = useAddUser(() => {
    reset();
    setActiveTab("login");
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>();

  const onSubmit = (data: AuthFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    handleSignup.mutate(data);
  };

  const onLogin = (data: AuthFormData) => {
    handleLogin.mutate(data);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center 
                    bg-linear-to-br from-yellow-400/20 via-background to-yellow-400/20 
                    dark:from-blue-300/20 dark:via-background dark:to-blue-300/20 p-6">
      <div className="flex items-center gap-2 mt-4 mb-2">
        <Logo />
      </div>

      <div className="text-center mb-4">
        <p className="text-secondary/70 dark:text-primary/70 mt-1 font-roboto text-[16px]">
          {activeTab === "login" ? "Welcome back!" : "Create your account"}
        </p>
      </div>

      <div className="bg-card w-full max-w-md p-8 rounded-2xl shadow-lg ">
        <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "login" ? (
          <form
            className="flex flex-col gap-4 mt-4"
            onSubmit={handleSubmit(onLogin)}
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
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <button
              className="w-full h-10 bg-yellow-400 text-secondary 
                         rounded-lg font-medium font-roboto transition-all duration-300
                         hover:scale-102 active:scale-98 transition cursor-pointer"
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
                         rounded-lg font-medium font-roboto transition-all duration-300
                         hover:scale-102 active:scale-98 transition cursor-pointer"
            >
              {handleSignup.isPending ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>

      <p className="text-center mt-6 text-[14px] text-secondary/70 dark:text-primary/70">
        By continuing, you agree to our{" "}
        <span className="text-yellow-400 cursor-pointer">Terms of Service</span>
      </p>
    </div>
  );
};

export default Auth;
