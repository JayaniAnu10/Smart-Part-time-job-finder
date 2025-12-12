import Logo from "./Logo";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="fixed flex  top-0 right-0 left-0  backdrop-blur-lg h-16 z-50 border-2 items-center ">
      <div className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center ml-auto gap-4">
          <Button variant="ghost">Explore Jobs</Button>
          <Button variant="ghost">Post Jobs</Button>
          <Button variant="ghost">Nearby Map</Button>
          <Button variant="ghost">About</Button>
          <Button variant="ghost">Contact</Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
