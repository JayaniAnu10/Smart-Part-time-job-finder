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
        w-full max-w-[324px] bg-[#ffffff]
        border border-[#cbd5e9]
        rounded-[12px] shadow-md
        px-6 py-8
        flex flex-col items-center
        transition-all duration-300
        hover:border-[#fbbd23]
        hover:shadow-[0_8px_20px_rgba(251,189,35,0.4)]
      "
    >
      {/* Image */}
      <div className="w-[80px] h-[80px] rounded-full bg-[#fef8e9] flex items-center justify-center mb-6">
        <img
          src={image || "https://via.placeholder.com/40"} 
          className="w-[40px] h-[40px] object-contain"
        />
      </div>

      {/* Title */}
      <h3 className="text-[24px] font-bold text-[#0F1F3D] text-center mb-3">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-[16px] text-[#364D7D] text-center leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* Bullets */}
      {bullets.length > 0 && (
        <ul className="text-[14px] text-[#0F1F3D] space-y-1 mb-6">
          {bullets.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#FBBd23] text-[14px]">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Button */}
      <button
        onClick={() => navigate(navigateTo)}
        className="
          text-[16px] font-semibold text-[#FBBd23]
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
