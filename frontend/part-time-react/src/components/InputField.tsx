import React from "react";

interface InputFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    icon,
}) => {
    return (
        <div className="flex flex-col gap-1">
            <label className="font-roboto text-[14px] font-medium text-[#0F1F3D]">{label}</label>

            <div className="relative w-full h-[40px] ">
                {icon && (
                    <img
                        src={icon}
                        alt="icon"
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-70"
                    />
                )}
            

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                    w-full h-[40px] pl-10 pr-4 bg-white border border-[#A5A8AD] rounded-lg text-[14px] 
                    font-roboto text-[#111827] placeholder:text-[14px] placeholder:font-roboto placeholder:text-[#364D7D] 
                    outline-none focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] transition-all duration-200"
            />
            </div>
        </div>
    );
};

export default InputField;
