import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div id="auth-container">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
