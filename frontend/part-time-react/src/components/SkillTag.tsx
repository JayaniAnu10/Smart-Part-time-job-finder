import React from "react";

interface SkillTagProps {
  label: string;
  selected: boolean;
  toggle: () => void;
}

const SkillTag: React.FC<SkillTagProps> = ({ label, selected, toggle }) => {
  return (
    <button
      type="button"
      onClick={toggle}
      className={`px-4 h-6.25 rounded-full text-sm border transition-all
        ${
          selected
            ? "bg-[#F7C01D] text-[#0F1F3D] border-[#F7C01D]"
            : "bg-[#E0E7F5] text-[#364D7D] border-[#E0E7F5] dark:bg-gray-300/0  dark:text-gray-300 dark:border-gray-400"
        }`}
    >
      {label}
    </button>
  );
};

export default SkillTag;
