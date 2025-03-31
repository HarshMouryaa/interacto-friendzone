
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Home, LogOut, Menu, MessageSquare, Moon, Search, Settings, Sun, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export function Sidebar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(!isMobile);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Messages", icon: MessageSquare, path: "/messages" },
    { name: "Notifications", icon: Bell, path: "/notifications" },
    { name: "Search", icon: Search, path: "/search" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md"
            onClick={toggleSidebar}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-background shadow-md transition-transform duration-200 ease-in-out",
          {
            "-translate-x-full": !isOpen && isMobile,
            "translate-x-0": isOpen || !isMobile,
          }
        )}
      >
        <div className="flex h-16 items-center px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-social"></div>
            <span className="text-xl font-bold">Interacto</span>
          </Link>
        </div>

        <div className="flex-1 space-y-1 px-3 py-5">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn("nav-link", {
                  active: location.pathname === item.path,
                })}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex justify-between p-4 border-t">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-destructive">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isOpen && isMobile && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
