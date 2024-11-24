// src/_root/RootLayout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/layout/Topbar';
import ResponsiveTopbar from '@/components/layout/ResponsiveTopbar';
import { useEffect, useState } from 'react';

const RootLayout = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;
    setIsSmallScreen(width <= 1024);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isSmallScreen ? <ResponsiveTopbar /> : <Topbar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
