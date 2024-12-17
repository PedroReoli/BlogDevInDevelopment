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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Topbar */}
      <div className="sticky top-0 z-50">
        {isSmallScreen ? <ResponsiveTopbar /> : <Topbar />}
      </div>

      {/* Layout Principal */}
      <div className="flex flex-1">
        {/* Sticky LeftSideBar */}
        {!isSmallScreen && (
          <div className="sticky top-16 h-[calc(100vh-4rem)] w-64">
            <LeftSideBar />
          </div>
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
