import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode; 
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
        <label className="font-roboto text-[14px] text-secondary dark:text-primary">
          {label}
        </label>

        <div className="relative w-full h-10">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 dark:text-primary/50">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...rest}
            className={`
                            w-full h-10 pr-4 bg-[#FAFAFA] dark:bg-background border rounded-lg text-[14px] 
                            font-roboto text-secondary dark:text-primary placeholder:text-[14px] placeholder:font-roboto 
                            placeholder:text-secondary/50 dark:placeholder:text-primary/50 
                            outline-none focus:ring-1 focus:ring-yellow-400 transition-all duration-200
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
