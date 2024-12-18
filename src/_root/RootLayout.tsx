import { Outlet } from "react-router-dom";
import Topbar from "@/components/layout/Topbar/Topbar";
import ResponsiveTopbar from "@/components/layout/Topbar/ResponsiveTopbar";
import LeftSideBar from "@/components/Shared/LeftSideBar";
import { useEffect, useState } from "react";

const RootLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const user = {
    name: "Pedro Sousa",
    isLoggedIn: true,
    role: "CEO" as const,
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Topbar */}
      <div className="sticky top-0 z-50">
        {isSmallScreen ? <ResponsiveTopbar /> : <Topbar />}
      </div>

      {/* Layout Principal */}
      <div className="flex flex-1">
        {/* LeftSideBar */}
        {!isSmallScreen && (
          <aside className="w-64 h-screen flex-shrink-0 sticky top-0 overflow-hidden">
            <LeftSideBar user={user} />
          </aside>
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 p-4 bg-[var(--bg-primary)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
