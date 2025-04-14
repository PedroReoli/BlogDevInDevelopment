import { Outlet } from "react-router-dom";
import Topbar from "@/components/Shared/Topbar";
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
        {!isSmallScreen && <Topbar />}
      </div>

      {/* Conteúdo Principal */}
      <main className=" flex-1 p-4 bg-[var(--bg-primary)] overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
