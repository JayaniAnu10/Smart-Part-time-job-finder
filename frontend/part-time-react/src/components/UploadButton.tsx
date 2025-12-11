import React from "react";
import uploadIcon from "../assets/upload.svg"; 

interface UploadButtonProps {
  label: string;
  onChange: (file: File | null) => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({ label, onChange }) => {
  return (
    <label className="flex items-center gap-2 px-4 h-[38px] border rounded-[12px] cursor-pointer bg-[#FAFAFA] shadow-sm hover:bg-[#F7C01D] transition">
      <img src={uploadIcon} alt="Upload" className="w-[16px] h-[16px]" />
      <span className="text-[14px] text-[#0F1F3D] font-medium">{label}</span>

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
