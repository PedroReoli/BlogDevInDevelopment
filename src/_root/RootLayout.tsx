// src/_root/RootLayout/RootLayout.tsx
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
   
      <main className="flex-1">
        <Outlet />
      </main>
     
    </div>
  );
};

export default RootLayout;
