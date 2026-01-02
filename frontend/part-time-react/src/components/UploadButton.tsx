import React from "react";
import { Upload } from "lucide-react";

interface UploadButtonProps {
  label: string;
  onChange: (file: File | null) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, onChange }) => {
  return (
    <label className="group flex items-center gap-2 px-4 h-[38px] rounded-[8px] cursor-pointer 
                      bg-[#fafafa] dark:bg-background shadow-sm hover:bg-yellow-400 transition">

     <Upload size={16} className="text-secondary dark:text-primary dark:group-hover:text-secondary" />
      <span className="text-[14px] text-secondary dark:text-primary dark:hover:text-secondary font-medium">{label}</span>

      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </label>
  );
};

export default UploadButton;
