import QuickActions from "@/components/adminDashboard/QuickActions";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="h-full bg-sidebar text-sidebar-foreground p-4">
      
      {/* Wrapper */}
      <div className="h-full flex flex-col gap-3">

        {/* Back to Home */}
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => navigate("/")}
        >
          <Home className="w-5 h-5" />
          Home
        </Button>

        {/* Back to Dashboard */}
        <Button
          variant="outline"
          className="mb-4 w-full justify-start gap-2"
          onClick={() => navigate("/admin/dashboard")}
        >
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Button>

        {/* Quick Actions */}
        <div className="flex-1">
          <QuickActions />
        </div>

      </div>

    </aside>
  );
}