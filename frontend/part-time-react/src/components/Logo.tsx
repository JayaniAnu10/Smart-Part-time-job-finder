import logoLight from "@/assets/daybee-lightmode.png";
import logodark from "@/assets/daybee-darkmode.png";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <NavLink to={"/"}>
        <img
          src={logoLight}
          alt="Logo"
          className="w-55 h-12 container  hover:scale-110 transition-transform duration-300 dark:hidden"
        />
        <img
          src={logodark}
          className="hidden dark:block container hover:scale-110  w-55 h-12 transition-transform duration-300"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
