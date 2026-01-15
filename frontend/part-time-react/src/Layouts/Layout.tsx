import NavBar from "@/components/navBar/NavBar";
import { Outlet } from "react-router-dom";
import FooterSection from "@/components/FooterSection";

const Layout = () => {
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavBar />
      </div>

      {/* Page Content */}
      <main className="pt-10">
        <Outlet />
      </main>

      <FooterSection />
    </>
  );
};

export default Layout;
