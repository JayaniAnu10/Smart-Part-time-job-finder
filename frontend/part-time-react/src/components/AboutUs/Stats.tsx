import React from "react";
import useAboutStats from "@/hooks/useAboutStats";

const Stats: React.FC = () => {
  const { data: statsData } = useAboutStats();

  return (
    <section className="bg-yellow-300 rounded-xl p-14 text-center shadow-lg">
      <h2 className="text-4xl font-bold text-[var(--secondary)] mb-4">
        Join Our Growing Community
      </h2>
      <p className="text-[var(--secondary)]/80 mb-12 text-lg max-w-3xl mx-auto font-medium leading-relaxed">
        Whether you're looking for flexible work opportunities or seeking
        reliable workers for your business, DayBee.lk is here to help you
        succeed.
      </p>
      <div className="grid grid-cols-2 gap-6 border-t border-[#0f1f3d]/20 pt-12">
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-black text-[var(--secondary)] tracking-tight">
            {statsData?.totalUsers
              ? `${statsData.totalUsers.toLocaleString()}+`
              : "0"}
          </p>
          <p className="text-sm font-bold text-[var(--secondary)] opacity-70 uppercase tracking-widest">
            Active Users
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-5xl font-black text-[var(--secondary)] tracking-tight">
            {statsData?.totalJobs
              ? `${statsData.totalJobs.toLocaleString()}+`
              : "0"}
          </p>
          <p className="text-sm font-bold text-[var(--secondary)] opacity-70 uppercase tracking-widest">
            Daily Jobs
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
