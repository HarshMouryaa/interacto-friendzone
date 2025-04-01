
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { HomePage } from "./pages/home/HomePage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { MessagingPage } from "./pages/messaging/MessagingPage";
import { NotificationsPage } from "./pages/notifications/NotificationsPage";
import { SearchPage } from "./pages/search/SearchPage";
import { SettingsPage } from "./pages/settings/SettingsPage";

// Layout
import { MainLayout } from "./components/layout/MainLayout";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Redirect index to home page */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            
            {/* Add home as direct route (not protected) */}
            <Route path="/home" element={<MainLayout />}>
              <Route index element={<HomePage />} />
            </Route>
            
            {/* All routes with MainLayout (not protected) */}
            <Route element={<MainLayout />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagingPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
