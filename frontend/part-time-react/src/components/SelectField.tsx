import React from "react";
import { ChevronDown } from "lucide-react";


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
      <label className="font-roboto text-[14px] text-secondary dark:text-primary">
        {label}
      </label>

      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="
          w-full px-4 h-[40px]
          border rounded-lg
          bg-[#FAFAFA] dark:bg-background text-[14px] font-roboto text-secondary dark:text-primary
          placeholder:text-secondary/50 dark:placeholder:text-primary/50
          appearance-none
          focus:ring-1 focus:ring-yellow-400
          focus:outline-none
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

        <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2
                                text-secondary dark:text-primary pointer-events-none"/>
      </div>
    </div>
  );
};

export default SelectField;
