interface AuthTabsProps {
  activeTab: "login" | "signup";
  setActiveTab: (tab: "login" | "signup") => void;
}

const AuthTabs = ({ activeTab, setActiveTab }: AuthTabsProps) => {
  return (
    <div className="w-full max-w-sm bg-[#E7ECF7] dark:bg-background p-1 rounded-xl flex shadow-sm">
      
      <button
        onClick={() => setActiveTab("login")}
        className={`
          flex-1 py-2 text-[14px] font-medium rounded-lg transition-all duration-200 cursor-pointer
          ${
            activeTab === "login"
              ? "bg-[#FAFAFA]/60 text-[#0F1F3D] shadow-sm"      
              : "bg-transparent text-secondary/70 dark:text-primary/70"            
          }
        `}
      >
        Login
      </button>

      <button
        onClick={() => setActiveTab("signup")}
        className={`
          flex-1 py-2 text-[14px] font-medium rounded-lg transition-all duration-200 cursor-pointer
          ${
            activeTab === "signup"
              ? "bg-[#FAFAFA]/70 text-[#0F1F3D] shadow-sm"       
              : "bg-transparent text-secondary/70 dark:text-primary/70"            
          }
        `}
      >
        Sign Up
      </button>
    </div>
  );
};

export default AuthTabs;
