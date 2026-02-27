import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import useAuth from "@/hooks/useAuth";
import { Spinner } from "../ui/spinner";

type PrivateRouteProps = {
  requiredRole?: "employer" | "jobseeker" | "admin";
  children: ReactNode;
};

export default function PrivateRoute({
  requiredRole,
  children,
}: PrivateRouteProps) {
  const location = useLocation();
  const { data: user, isLoading, error } = useAuth();

  
  if (isLoading)
    return (
      <div className="mt-30 flex justify-center items-center">
        <Spinner />
      </div>
    );

  
  if (error || !user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  
  if (requiredRole) {
    
    if (requiredRole === "employer" && !user.isEmployer) {
      return <Navigate to="/getstarted" replace />;
    }

    
    if (requiredRole === "jobseeker" && !user.isJobseeker) {
      return <Navigate to="/getstarted" replace />;
    }

    
    if (requiredRole === "admin" && user.role !== "ADMIN") {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
