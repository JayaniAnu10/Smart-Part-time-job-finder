import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/AuthStore";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const token = useAuthStore((s) => s.accessToken);

  if (token) {
    // If logged in, redirect to dashboard
    return <Navigate to="/empDashboard" replace />;
  }

  return children;
}
