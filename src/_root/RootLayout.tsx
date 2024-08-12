// src/_root/RootLayout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/layout/Topbar';
import Bottombar from '@/components/layout/Bottombar';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
