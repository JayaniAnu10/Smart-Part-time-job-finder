import EmpJobPost from "@/pages/EmployerDashboard/EmpJobPost";
import EmpStat from "@/pages/EmployerDashboard/EmpStat";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useEmpStats from "@/hooks/useEmpStats";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
  const employerId = "511e9a6c-3ce6-494b-bf39-80e1afce4d5e";
  const { data, isLoading, isError } = useEmpStats(employerId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-50">
        <Spinner />
      </div>
    );
  if (isError)
    return <div className="text-2xl text-red-500">Error loading stats</div>;

  return (
    <div className="mx-8 my-10 md:mx-20 flex flex-col gap-13">
      <div className="flex justify-between md:flex-row flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-[#0f1f3d] font-bold dark:text-white ">
            Employer Dashboard
          </h1>
          <span className="text-muted-foreground">
            Manage your job postings and applicants
          </span>
        </div>
        <div className="mt-6">
          <Button asChild className="gap-2 p-5 cursor-pointer">
            <Link to={"/postJob"}>
              <Plus /> <span className="">Post New Job</span>
            </Link>
          </Button>
        </div>
      </div>
      <EmpStat data={data} />
      <EmpJobPost jobs={data?.jobStats} empId={employerId} />
    </div>
  );
};

export default EmployerDashboard;
