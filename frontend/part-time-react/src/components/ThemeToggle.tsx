import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div>
      <Button
        variant="ghost"
        className="rounded-full hover:bg-yellow-400 dark:text-white dark:hover:text-secondary  "
        onClick={() => setDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
};

export default ThemeToggle;
