import { LucideIcon } from 'lucide-react'; // Me import eka aniwaren thiyenna ona

interface StatsCardProps {
  icon: LucideIcon; 
  label: string;
  value: string | number;
}

const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => (
  <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col gap-3">
    <div className="flex items-center justify-between">
      {/* Icon eka lassanata align kala */}
      <Icon size={24} className="text-[#f59e0b]" strokeWidth={2.5} />
    </div>
    <div>
      <span className="text-2xl font-black text-slate-800 block leading-none">{value}</span>
      <span className="text-gray-500 text-[13px] font-bold mt-1 block uppercase tracking-wider">{label}</span>
    </div>
  </div>
);

export default StatsCard;