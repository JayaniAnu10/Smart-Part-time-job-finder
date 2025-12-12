import Logo from "./Logo";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <nav className="fixed flex  top-0 right-0 left-0  backdrop-blur-lg h-20 z-50 border ">
      <div className="flex justify-between w-full items-center">
        <div className="mx-7">
          <Logo />
        </div>

        <div className="md:flex items-center mx-2  gap-4">
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 cursor-pointer"
          >
            Explore Jobs
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 cursor-pointer"
          >
            Post Jobs
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 cursor-pointer"
          >
            Nearby Map
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 cursor-pointer"
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 cursor-pointer"
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
