import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import * as jwt_decode from "jwt-decode";
import type { ReactNode } from "react";

type TokenPayload = {
  exp: number; // expiration time in seconds
};

type PrivateRouteProps = {
  requiredRole?: "employer" | "jobseeker";
  children: ReactNode;
};

export default function PrivateRoute({
  requiredRole,
  children,
}: PrivateRouteProps) {
  const location = useLocation();
  const token = useAuthStore((s) => s.accessToken);
  const user = useAuthStore((s) => s.user);

  if (!token) return <Navigate to="/auth" state={{ from: location }} replace />;

  try {
    const payload = jwt_decode.jwtDecode<TokenPayload>(token);
    const isExpired = payload.exp * 1000 < Date.now(); // exp is in seconds

    if (isExpired) {
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    if (requiredRole) {
      if (requiredRole === "employer" && !user?.isEmployer) {
        return <Navigate to="/getstarted" replace />;
      }
      if (requiredRole === "jobseeker" && !user?.isJobseeker) {
        return <Navigate to="/getstarted" replace />;
      }
    }

    return children;
  } catch {
    // token is invalid
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
}
