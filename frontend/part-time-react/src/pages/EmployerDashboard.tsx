import { Button } from "@/components/ui/button";
import { Briefcase, Plus } from "lucide-react";

const EmployerDashboard = () => {
  return (
    <div className="mx-8 my-12">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-[#0f1f3d] font-bold dark:text-white ">
            Employer Dashboard
          </h1>
          <span className="text-muted-foreground">
            Manage your job postings and applicants
          </span>
        </div>
        <div className="mt-6">
          <Button className="gap-2 p-5 ">
            <Plus /> <span className="">Post New Job</span>
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-4 mt-10 ">
        <div className="rounded-xl  bg-card border justify-items-start backdrop-blur-md hover:shadow-lg hover:scale-103 transition-transform duration-300 p-6 text-center">
          <Briefcase className="text-yellow-400 w-10 h-10 mb-3" />
          <h3 className="text-2xl font-extrabold text-secondary dark:text-primary">
            10
          </h3>
          <p className="text-secondary/70 dark:text-primary/70 mt-1">
            Active Jobs
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
