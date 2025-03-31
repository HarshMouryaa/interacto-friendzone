
import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export function MainLayout() {
  const isMobile = useIsMobile();

  return (
    <ThemeProvider>
      <div className="min-h-screen flex bg-background">
        <Sidebar />
        <main className={`flex-1 ${isMobile ? 'pt-16' : 'ml-64'} min-h-screen`}>
          <div className="container max-w-5xl py-6 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}
