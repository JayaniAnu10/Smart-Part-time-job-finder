interface AuthTabsProps {
  activeTab: "login" | "signup";
  setActiveTab: (tab: "login" | "signup") => void;
}

const AuthTabs = ({ activeTab, setActiveTab }: AuthTabsProps) => {
  return (
    <div className="w-full max-w-sm bg-[#E7ECF7] p-1 rounded-xl flex shadow-sm">
      {/* Login Tab */}
      <button
        onClick={() => setActiveTab("login")}
        className={`
          flex-1 py-2 text-[14px] font-medium rounded-lg transition-all duration-200
          ${
            activeTab === "login"
              ? "bg-white text-[#0F1F3D] shadow-sm"      
              : "bg-transparent text-[#364D7D]"            
          }
        `}
      >
        Login
      </button>

      {/* Signup Tab */}
      <button
        onClick={() => setActiveTab("signup")}
        className={`
          flex-1 py-2 text-[14px] font-medium rounded-lg transition-all duration-200
          ${
            activeTab === "signup"
              ? "bg-white text-[#0F1F3D] shadow-sm"       
              : "bg-transparent text-[#364D7D]"            
          }
        `}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;
