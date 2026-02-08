import React from "react";

interface StatsCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const StatsCard = ({ icon: Icon, label, value }: StatsCardProps) => (
  <div className="rounded-xl border justify-items-start backdrop-blur-md hover:shadow-lg hover:scale-103 transition-transform duration-300 p-6">
    <div className="flex flex-col items-start">
      {Icon && (
        <div className="mb-3">
          <Icon size={36} className="text-yellow-400" strokeWidth={2} />
        </div>
      )}

      <h3 className="text-3xl font-extrabold text-secondary dark:text-primary">
        {value}
      </h3>
      <p className="text-secondary/70 dark:text-primary/70 mt-1 text-lg">
        {label}
      </p>
    </div>
  </div>
);

export default StatsCard;
