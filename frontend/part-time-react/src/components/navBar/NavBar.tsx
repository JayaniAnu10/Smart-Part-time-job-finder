import { useState } from "react";
import Logo from "../common/Logo";
import ThemeToggle from "../navBar/ThemeToggle";
import { Button } from "../ui/button";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="fixed flex px-6 top-0 right-0 left-0 bg-background/50 backdrop-blur-lg h-20 z-50  w-full ">
      <div className="flex justify-between w-full items-center gap-2">
        <Logo />

        <div className="tab:flex hidden md:flex items-center mx-2  gap-3">
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-base-100/6 
            dark:hover:text-yellow-400
            cursor-pointer"
          >
            Explore Jobs
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 dark:hover:text-yellow-400 cursor-pointer"
          >
            Post Jobs
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6  dark:hover:text-yellow-400 cursor-pointer"
          >
            Nearby Map
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 dark:hover:text-yellow-400 cursor-pointer"
          >
            About
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 dark:hover:text-yellow-300 cursor-pointer"
          >
            Contact
          </Button>
        </div>
        <div className="flex gap-3">
          <div>
            <ThemeToggle />
          </div>
          <div className="tab:flex md:flex hidden gap-3 pr-6">
            <Button
              variant="ghost"
              className="hover:bg-yellow-400 text-md cursor-pointer dark:hover:text-[#0f1f3d] "
            >
              Login
            </Button>
            <Button
              variant="default"
              className="bg-yellow-400 cursor-pointer text-[#0f1f3d] hover:scale-105 dark:hover:bg-yellow-400 text-md transition-transform duration-300 hover:shadow-lg hover:shadow-yellow-300/25"
            >
              Get Started
            </Button>
          </div>
          {/*Mobile design of nav bar */}
          <div
            className="tab:hidden md:hidden cursor-pointer pr-4 my-auto block"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <div
              className={`bg-yellow-400 w-8 rounded-full h-1 ${
                isMenuOpen ? "rotate-45 top-2" : ""
              } relative transition-all`}
            ></div>
            <div
              className={`bg-yellow-400 w-8 rounded-full h-1 mt-1 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`bg-yellow-400 w-8 rounded-full h-1 mt-1 ${
                isMenuOpen ? "-rotate-45 -top-2" : ""
              } relative transition-all`}
            ></div>
          </div>
        </div>

        <div
          className={`tab:hidden absolute top-20 bg-white  dark:bg-background/90 dark:text-primary flex flex-col w-full font-semibold text-lg text-secondary transform transition-transform ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <ul className="text-left w-full p-4">
            <li className="  hover:text-yellow-400 transition-all cursor-pointer py-2">
              Find Jobs
            </li>
            <li className="hover:text-yellow-400 transition-all cursor-pointer py-2">
              Post Job
            </li>
            <li className=" hover:text-yellow-400 transition-all cursor-pointer py-2">
              NearBy
            </li>
            <li className=" hover:text-yellow-400 transition-all cursor-pointer py-2">
              Contact
            </li>
            <li className="hover:text-yellow-400 transition-all cursor-pointer py-2">
              About
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
