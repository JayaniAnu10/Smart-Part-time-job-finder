import EmpJobPost from "@/pages/EmployerDashboard/EmpJobPost";
import EmpStat from "@/pages/EmployerDashboard/EmpStat";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useEmpStats from "@/hooks/useEmpStats";
import { Plus } from "lucide-react";

const EmployerDashboard = () => {
  const employerId = "94993140-62f6-4068-af08-d78365f17470";
  const { data, isLoading, isError } = useEmpStats(employerId);

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading stats</div>;

  return (
    <div className="mx-8 my-12 md:mx-20 flex flex-col gap-13">
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
          <Button className="gap-2 p-5 cursor-pointer">
            <Plus /> <span className="">Post New Job</span>
          </Button>
        </div>
      </div>
      <EmpStat data={data} />
      <EmpJobPost jobs={data?.jobStats} />
    </div>
  );
};

export default EmployerDashboard;
