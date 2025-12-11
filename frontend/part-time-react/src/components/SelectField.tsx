import React from "react";

interface SelectFieldProps {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
}

const SelectField: React.FC<SelectFieldProps> = ({ label, value = "", onChange, options }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-roboto text-[14px] font-medium text-[#0F1F3D]">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="
          w-full px-4 h-[40px]
          border border-[#A5A8AD] rounded-lg
          text-[14px] font-roboto text-[#364D7D]
          focus:ring-1 focus:ring-[#FACC15]
          focus:border-[#FACC15] focus:outline-none
          transition-all duration-200
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
