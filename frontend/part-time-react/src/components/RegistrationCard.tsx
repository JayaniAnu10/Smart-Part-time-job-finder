interface Props {
  title: string;
  children: React.ReactNode;
}

const RegistrationCard = ({ title, children }: Props) => {
  return (
    <div className="w-[500px] bg-[#FFFFFF] rounded-[12px] border border-[#E5E7EB] shadow-sm p-8 mt-4">
      <h2 className="text-[20px] font-semibold text-[#0F1F3D] mb-6">{title}</h2>
      {children}
    </div>
  );
};

export default RegistrationCard;
