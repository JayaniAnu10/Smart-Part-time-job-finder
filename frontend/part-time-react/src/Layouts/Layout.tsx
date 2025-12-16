import NavBar from "@/components/NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="relative z-30">
        <NavBar />
      </div>
      {/*<ScrollToTop />*/}
      <div id="main">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
