import React from "react";
import { useNavigate } from "react-router-dom";

interface RoleCardProps {
  title: string;
  description?: string;
  bullets?: string[];
  image?: string;
  navigateTo?: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  title,
  description,
  bullets = [],
  image,
  navigateTo = "/",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="
        w-full max-w-[324px] bg-card
        rounded-[12px] shadow-lg
        px-6 py-8
        flex flex-col items-center
        transition-all duration-300
        hover:shadow-[0_8px_20px_rgba(251,189,35,0.4)]
       dark:hover:shadow-[0_6px_16px_rgba(54,77,125,0.45),0_0_18px_rgba(54,77,125,0.2)]

      "
    >
      <div className="w-[80px] h-[80px] rounded-full bg-yellow-400/20 dark:bg-[#ffffff]/30 flex items-center justify-center mb-6">
        <img
          src={image || "https://via.placeholder.com/40"}
          className="w-[40px] h-[40px] object-contain"
        />
      </div>

      <h3 className="text-[24px] font-bold text-secondary dark:text-primary text-center mb-3">
        {title}
      </h3>

      {description && (
        <p className="text-[16px] text-secondary/70 dark:text-primary/70 text-center leading-relaxed mb-6">
          {description}
        </p>
      )}

      {bullets.length > 0 && (
        <ul className="text-[14px] text-secondary dark:text-primary space-y-1 mb-6">
          {bullets.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-yellow-400 text-[14px]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => navigate(navigateTo)}
        className="
          text-lg font-medium text-yellow-400
          flex items-center gap-2
          hover:underline
        "
      >
        Get Started →
      </button>
    </div>
  );
};

export default RoleCard;
