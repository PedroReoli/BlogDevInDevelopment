// src/_root/RootLayout/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import Topbar from '@/components/layout/Topbar';


const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1">
        <Outlet />
      </main>
      
    </div>
  );
};

export default RootLayout;
