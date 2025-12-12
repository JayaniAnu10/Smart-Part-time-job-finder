import logoLight from "@/assets/daybee-lightmode.png";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <NavLink to={"/"}>
        <img
          src={logoLight}
          alt="Logo"
          className="w-auto h-12  hover:scale-110 transition-transform duration-300"
        />
      </NavLink>
    </div>
  );
};

export default Logo;
