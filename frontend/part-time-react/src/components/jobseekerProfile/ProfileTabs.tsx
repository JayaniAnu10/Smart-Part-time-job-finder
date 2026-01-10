import { User, Star } from "lucide-react";

interface Props {
  active: "profile" | "reviews";
  onChange: (tab: "profile" | "reviews") => void;
}

export default function ProfileTabs({ active, onChange }: Props) {
  return (
    <div className="flex max-w-xl h-[44px] rounded-xl bg-[#E0E7F5] dark:bg-background p- shadow-sm items-center">
      <button
        onClick={() => onChange("profile")}
        className={`flex-1 flex h-[36px] items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
          ${
            active === "profile"
              ? "bg-[#FAFAFA]/60 text-[#0F1F3D] shadow-sm"   
              : "bg-transparent text-secondary/70 dark:text-primary/70"    
          }`}
      >
        <User size={16} />
        Profile Details
      </button>

      <button
        onClick={() => onChange("reviews")}
        className={`flex-1 flex h-[36px] items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer
          ${
            active === "reviews"
              ? "bg-[#FAFAFA]/60 text-[#0F1F3D] shadow-sm"
              : "bg-transparent text-secondary/70 dark:text-primary/70"
          }`}
      >
        <Star size={16} />
        Ratings & Reviews
      </button>
    </div>
  );
}
