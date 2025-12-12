import logoLight from "@/assets/daybee-lightmode.png";
import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <NavLink to={"/"}>
        <img src={logoLight} alt="Logo" className="scale-20" />
      </NavLink>
    </div>
  );
};

export default Logo;
