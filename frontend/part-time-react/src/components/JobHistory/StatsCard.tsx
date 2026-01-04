interface StatsCardProps {
  icon?: string; 
  label: string;
  value: string | number;
}

const StatsCard = ({ label, value }: StatsCardProps) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
    <span className="text-gray-500 text-[13px] font-medium tracking-wide uppercase">{label}</span>
    <span className="text-2xl font-bold text-slate-800">{value}</span>
  </div>
);

export default StatsCard;