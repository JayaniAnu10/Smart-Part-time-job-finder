import { useState } from "react";
import Logo from "../common/Logo";
import ThemeToggle from "../navBar/ThemeToggle";
import { Button } from "../ui/button";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation("navBar");
  return (
    <nav className="fixed flex px-4 lg:px-6 top-0 right-0 left-0 bg-background/75 backdrop-blur-lg min-h-16 z-50 w-full">
      <div className="flex justify-between w-full items-center gap-2 flex-wrap lg:flex-nowrap">
        <Logo />

        <div className="tab:flex hidden lg:flex items-center  xl:gap-3 flex-1 justify-center">
          <Button
            variant="ghost"
            className="font-medium  text-md  hover:bg-secondary/6 
            dark:hover:text-yellow-400
            cursor-pointer  xl:px-4"
          >
            {t("findJobs")}
          </Button>
          <Button
            variant="ghost"
            asChild
            className="font-medium text-md  hover:bg-secondary/6 dark:hover:text-yellow-400 cursor-pointer  xl:px-4"
          >
            <Link to={"/postJob"}>{t("postJobs")}</Link>
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md  hover:bg-secondary/6 dark:hover:text-yellow-400 cursor-pointer whitespace-nowrap  xl:px-4"
          >
            {t("nearbyMap")}
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md hover:bg-secondary/6 dark:hover:text-yellow-400 cursor-pointer whitespace-nowrap px-2 xl:px-4"
          >
            {t("about")}
          </Button>
          <Button
            variant="ghost"
            className="font-medium text-md  hover:bg-secondary/6 dark:hover:text-yellow-300 cursor-pointer whitespace-nowrap px-2 xl:px-4"
          >
            {t("contact")}
          </Button>
        </div>

        <div className="flex gap-1 xl:gap-3 items-center">
          <LanguageSwitcher />
          <div>
            <ThemeToggle />
          </div>
          <div className="tab:flex lg:flex hidden gap-2 xl:gap-3">
            <Link to="/auth">
              <Button
                variant="ghost"
                className="hover:bg-yellow-400 text-md  cursor-pointer dark:hover:text-[#0f1f3d] whitespace-nowrap px-3 xl:px-4"
              >
                {t("login")}
              </Button>
            </Link>
            <Link to="/getstarted">
              <Button
                variant="default"
                className="bg-yellow-400 shadow-none cursor-pointer text-[#0f1f3d] hover:scale-105 dark:hover:bg-yellow-400 text-md  transition-transform duration-300 hover:shadow-lg hover:shadow-yellow-300/25  px-3 xl:px-4"
              >
                {t("getStarted")}
              </Button>
            </Link>
          </div>

          {/*Mobile design of nav bar */}
          <div
            className="lg:hidden cursor-pointer my-auto block"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
            <div
              className={`bg-yellow-400 w-7 rounded-full h-1 ${
                isMenuOpen ? "rotate-45 top-2" : ""
              } relative transition-all`}
            ></div>
            <div
              className={`bg-yellow-400 w-7 rounded-full h-1 mt-1 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
            <div
              className={`bg-yellow-400 w-7 rounded-full h-1 mt-1 ${
                isMenuOpen ? "-rotate-45 -top-2" : ""
              } relative transition-all`}
            ></div>
          </div>
        </div>

        <div
          className={`lg:hidden absolute top-20 bg-white/95 dark:bg-background/95 dark:text-primary flex flex-col w-full font-semibold text-base text-secondary transform transition-all left-0 shadow-lg ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-4"
          }`}
        >
          <ul className="text-left w-full p-4 space-y-1">
            <li className="dark:hover:text-yellow-400 transition-all cursor-pointer py-2 px-2 rounded hover:bg-secondary/10">
              {t("findJobs")}
            </li>
            <Link to={"/postJob"}>
              <li className="dark:hover:text-yellow-400 transition-all cursor-pointer py-2 px-2 rounded hover:bg-secondary/10">
                {t("postJobs")}
              </li>
            </Link>
            <li className="dark:hover:text-yellow-400 transition-all cursor-pointer py-2 px-2 rounded hover:bg-secondary/10">
              {t("nearbyMap")}
            </li>
            <li className="dark:hover:text-yellow-400 transition-all cursor-pointer py-2 px-2 rounded hover:bg-secondary/10">
              {t("contact")}
            </li>
            <li className="dark:hover:text-yellow-400 transition-all cursor-pointer py-2 px-2 rounded hover:bg-secondary/10">
              {t("about")}
            </li>
            <li className="border-t border-secondary/20 mt-3 pt-3 flex gap-2">
              <Button
                variant="ghost"
                className="flex-1 hover:bg-yellow-400 cursor-pointer dark:hover:text-[#0f1f3d]"
              >
                {t("login")}
              </Button>
              <Button
                variant="default"
                className="flex-1 bg-yellow-400 cursor-pointer text-[#0f1f3d] hover:bg-yellow-500"
              >
                {t("getStarted")}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
