import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    const {
      label,
      type = "text",
      placeholder,
      icon,
      className,
      ...rest
    } = props;

    return (
      <div className="flex flex-col gap-1">
        <label className="font-roboto text-[14px] text-[#0F1F3D]">
          {label}
        </label>

        <div className="relative w-full h-10">
          {icon && (
            <img
              src={icon}
              alt="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-100"
            />
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
            className={`
                            w-full h-10 pr-4 bg-[#FAFAFA] border border-[#A5A8AD] rounded-lg text-[14px] 
                            font-roboto text-[#111827] placeholder:text-[14px] placeholder:font-roboto placeholder:text-[#364D7D] 
                            outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all duration-200
                            ${icon ? "pl-10" : "pl-4"} pr-4
                            ${className || ""}
                        `}
          />
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
