import type { Stats } from "@/hooks/useEmpStats";
import { Briefcase, Clock, TrendingUp, Users } from "lucide-react";

interface EmpStatProps {
  data?: Stats;
}

const EmpStat = ({ data }: EmpStatProps) => {
  const cardData = [
    {
      icon: <Briefcase className="text-yellow-400 w-10 h-10 mb-3" />,
      title: data?.jobCount ?? 0,
      label: "Active Jobs",
    },
    {
      icon: <Users className="text-[#0f1f3d] dark:text-white w-10 h-10 mb-3" />,
      title: data?.applicantCount ?? 0,
      label: "Total Applicants",
    },
    {
      icon: <Clock className="text-red-500 w-10 h-10 mb-3" />,
      title: data?.pendingReviewCount ?? 0,
      label: "Pending Reviews",
    },
    {
      icon: <TrendingUp className="text-yellow-400 w-10 h-10 mb-3" />,
      title: `${data?.monthRate ?? 0}%`,
      label: "Monthly Growth",
    },
  ];

  return (
    <div className="grid md:grid-cols-4  gap-6 ">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="rounded-xl   border justify-items-start backdrop-blur-md hover:shadow-lg hover:scale-103 transition-transform duration-300 p-6 text-center"
        >
          {card.icon}
          <h3 className="text-2xl font-extrabold text-secondary dark:text-primary">
            {card.title}
          </h3>
          <p className="text-secondary/70 dark:text-primary/70 mt-1">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default EmpStat;
