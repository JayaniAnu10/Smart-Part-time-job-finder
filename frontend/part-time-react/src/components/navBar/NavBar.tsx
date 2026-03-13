import { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";
import ThemeToggle from "../navBar/ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/AuthStore";
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { LogOut, Menu } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useLogout from "@/hooks/useLogout";

const NavBar = () => {
  const { t } = useTranslation("navBar");
  const navigate = useNavigate();

  const { data: user } = useAuth();
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useLogout();

  const handleLogout = useCallback(async () => {
    await logout();
    navigate("/");
  }, [logout, navigate]);

  const actionButtons = useMemo(() => {
    if (!accessToken) {
      return [
        { label: t("login"), to: "/auth", variant: "ghost" },
        { label: t("getStarted"), to: "/getstarted", variant: "default" },
      ];
    }

    const buttons: any[] = [];

    if (user?.role === "ADMIN") {
      buttons.push({
        label: t("adminDashboard"),
        to: "/admin/dashboard",
        variant: "default",
      });
    }

    if (
      user &&
      !user.isEmployer &&
      !user.isJobseeker &&
      user.role !== "ADMIN"
    ) {
      buttons.push({
        label: t("getStarted"),
        to: "/getstarted",
        variant: "default",
      });
    }

    if (user?.isJobseeker) {
      buttons.push({
        label: t("seekerDashboard"),
        to: "/seekerDashboard",
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
    { label: t("contact"), to: "/contact" },
    { label: t("about"), to: "/about" },
  ];

  return (
    <nav className="text-sm fixed top-0 left-0 right-0 z-50 bg-background/75 backdrop-blur-lg w-full px-4 lg:px-6 min-h-16 flex items-center justify-between flex-wrap lg:flex-nowrap">
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

      {/* Mobile controls */}
      <div className="flex lg:hidden items-center gap-2 ml-auto">
        <LanguageSwitcher />
        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="border border-border text-foreground hover:bg-yellow-400 hover:text-[#0f1f3d]"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-2">
            <DropdownMenuLabel>{t("dashboard")}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {navLinks.map((link) => (
              <DropdownMenuItem key={link.label} asChild>
                <Link to={link.to}>{link.label}</Link>
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            {actionButtons.map((btn) =>
              btn.to ? (
                <DropdownMenuItem key={btn.label} asChild>
                  <Link to={btn.to}>{btn.label}</Link>
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={btn.label} onClick={btn.onClick}>
                  <LogOut size={16} />
                  {btn.label}
                </DropdownMenuItem>
              ),
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden lg:flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeToggle />

        {accessToken && user && (user.isEmployer || user.isJobseeker) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-yellow-400 text-[#0f1f3d] hover:bg-yellow-300 text-md">
                {t("dashboard")}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="p-2">
              {user.isJobseeker && (
                <DropdownMenuItem asChild>
                  <Link to="/seekerDashboard">{t("seekerDashboard")}</Link>
                </DropdownMenuItem>
              )}

              {user.isEmployer && (
                <DropdownMenuItem asChild>
                  <Link to="/empDashboard">{t("employerDashboard")}</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {actionButtons
          .filter(
            (btn) =>
              btn.label !== t("seekerDashboard") &&
              btn.label !== t("employerDashboard"),
          )
          .map((btn) =>
            btn.to ? (
              <Link key={btn.label} to={btn.to}>
                <Button
                  variant={btn.variant}
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
                variant={btn.variant}
                className="px-3 xl:px-4 hover:text-[#0f1f3d]"
                onClick={btn.onClick}
              >
                <LogOut size={16} />
                {btn.label}
              </Button>
            ),
          )}
      </div>
    </nav>
  );
};

export default NavBar;
