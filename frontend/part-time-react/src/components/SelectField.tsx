import React from "react";
import downArrow from "../assets/arrow-down.svg";

interface SelectFieldProps {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  option: string;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value = "",
  onChange,
  option,
  options,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-roboto text-[14px] font-medium text-[#0F1F3D]">
        {label}
      </label>

      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
          w-full px-4 h-[40px]
          border border-[#A5A8AD] rounded-lg
          bg-[#FAFAFA] text-[14px] font-roboto text-[#0F1F3D]
          appearance-none
          focus:ring-1 focus:ring-[#FACC15]
          focus:border-[#FACC15] focus:outline-none
          transition-all duration-200
        "
        >
          <option value="" disabled>
            {option}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <img
          src={downArrow}
          alt="dropdown arrow"
          className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
        />
      </div>
    </div>
  );
};

export default SelectField;
