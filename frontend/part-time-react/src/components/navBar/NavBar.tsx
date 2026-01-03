import { useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";
import ThemeToggle from "../navBar/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/AuthStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation("navBar");

  const { data: user } = useAuth();
  const accessToken = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = useCallback(() => clearAuth(), [clearAuth]);

  // Action buttons based on roles
  const actionButtons = useMemo(() => {
    if (!accessToken) {
      return [
        { label: t("login"), to: "/auth", variant: "ghost" },
        { label: t("getStarted"), to: "/getstarted", variant: "default" },
      ];
    }

    const buttons = [];

    // Only show GetStarted if user has no role at all
    if (user && !user.isEmployer && !user.isJobseeker) {
      buttons.push({
        label: t("getStarted"),
        to: "/getstarted",
        variant: "default",
      });
    }

    if (user?.isJobseeker) {
      buttons.push({
        label: t("seekerDashboard"),
        to: "/dashboard",
        variant: "default",
      });
    }

    if (user?.isEmployer) {
      buttons.push({
        label: t("employerDashboard"),
        to: "/empDashboard",
        variant: "default",
      });
    }

    buttons.push({
      label: t("logout"),
      onClick: handleLogout,
      variant: "ghost",
    });

    return buttons;
  }, [accessToken, user, handleLogout, t]);

  const navLinks = [
    { label: t("findJobs"), to: "/find-your-job" },
    { label: t("postJobs"), to: "/postJob" },
    { label: t("nearbyMap"), to: "/nearBy" },
    { label: t("contact"), to: "/" },
    { label: t("about"), to: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-lg w-full px-4 lg:px-6 min-h-16 flex items-center justify-between flex-wrap lg:flex-nowrap">
      <Logo />

      {/* Desktop nav links */}
      <div className="hidden lg:flex flex-1 justify-center gap-3">
        {navLinks.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            className="hover:text-yellow-400 hover:bg-transparent text-md xl:px-4"
          >
            <Link to={link.to}>{link.label}</Link>
          </Button>
        ))}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />

        {/* dashboard dropdown (desktop only) */}
        {accessToken && user && (user.isEmployer || user.isJobseeker) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-yellow-400 text-[#0f1f3d] hover:bg-yellow-300 text-md">
                {t("dashboard")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="flex flex-col gap-2 p-2  "
            >
              {user?.isJobseeker && (
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">{t("seekerDashboard")}</Link>
                </DropdownMenuItem>
              )}

              {user?.isEmployer && (
                <DropdownMenuItem asChild>
                  <Link to="/empDashboard">{t("employerDashboard")}</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Other action buttons (login / get started / logout) */}
        {actionButtons
          .filter(
            (btn) =>
              btn.label !== t("seekerDashboard") &&
              btn.label !== t("employerDashboard")
          )
          .map((btn) =>
            btn.to ? (
              <Link key={btn.label} to={btn.to}>
                <Button
                  variant={btn.variant as any}
                  className={`px-3 xl:px-4 text-md ${
                    btn.variant === "default"
                      ? "bg-yellow-400 text-[#0f1f3d] hover:bg-yellow-300"
                      : "hover:bg-yellow-400 hover:text-[#0f1f3d]"
                  }`}
                >
                  {btn.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={btn.label}
                variant={btn.variant as any}
                className={`px-3 xl:px-4 ${
                  btn.variant === "default"
                    ? "bg-yellow-400 text-[#0f1f3d]"
                    : "hover:text-[#0f1f3d]"
                }`}
                onClick={btn.onClick}
              >
                <LogOut />
                {btn.label}
              </Button>
            )
          )}
      </div>

      {/* hamburger */}
      <div className="lg:hidden flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />
        <div
          className="cursor-pointer"
          onClick={() => setMenuOpen(!isMenuOpen)}
        >
          <div
            className={`bg-yellow-400 w-7 h-1 rounded-full relative transition-all ${
              isMenuOpen ? "rotate-45 top-2" : ""
            }`}
          ></div>
          <div
            className={`bg-yellow-400 w-7 h-1 rounded-full mt-1 transition-all ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`bg-yellow-400 w-7 h-1 rounded-full mt-1 relative transition-all ${
              isMenuOpen ? "-rotate-45 -top-2" : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute top-16 left-0 w-full bg-white/95 dark:bg-background/95 dark:text-primary flex flex-col p-4 gap-2 font-semibold text-base text-secondary transition-all shadow-lg ${
          isMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-4"
        }`}
      >
        {navLinks.map((link) => (
          <Link key={link.label} to={link.to}>
            <Button
              variant="ghost"
              className="w-full text-left hover:bg-secondary/30"
            >
              {link.label}
            </Button>
          </Link>
        ))}

        <div className="flex flex-col  gap-2 pt-2 border-t border-secondary/20">
          {actionButtons.map((btn) =>
            btn.to ? (
              <Link key={btn.label} to={btn.to}>
                <Button
                  variant={btn.variant as any}
                  className={`w-full text-md ${
                    btn.variant === "default"
                      ? "bg-yellow-400 text-[#0f1f3d] hover:bg-yellow-300"
                      : "hover:bg-yellow-400 hover:text-[#0f1f3d]"
                  }`}
                >
                  {btn.label}
                </Button>
              </Link>
            ) : (
              <Button
                key={btn.label}
                variant={btn.variant as any}
                className={`w-full ${
                  btn.variant === "default"
                    ? "bg-yellow-400 text-[#0f1f3d]"
                    : "hover:text-[#0f1f3d] "
                }`}
                onClick={btn.onClick}
              >
                <LogOut size={16} />
                {btn.label}
              </Button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
