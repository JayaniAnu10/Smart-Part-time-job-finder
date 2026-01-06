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
            ? "bg-yellow-400 text-secondary border-yellow-400"
            : "bg-[#E0E7F5] dark:bg-card text-[#364D7D] dark:text-primary/50 border-[#E0E7F5] dark:border-input "
        }`}
    >
      {label}
    </button>
  );
};

export default SkillTag;
