

interface CheckboxProps {
  label: any;
  checked: boolean;
  onChange: () => void;
}

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-[13px] h-[13px] accent-[#FACC15]"
      />
      <span className="text-[14px] text-[#0F1F3D]">{label}</span>
    </label>
  );
}
