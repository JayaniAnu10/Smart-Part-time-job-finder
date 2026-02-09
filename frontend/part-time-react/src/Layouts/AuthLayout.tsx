import { Outlet } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

const AuthLayout = () => {
  return (
    <div id="auth-container">
      <ScrollToTop />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
