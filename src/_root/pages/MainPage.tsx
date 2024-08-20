// src/_root/pages/MainPage.tsx

import BlogGridList from '@/components/Blog/BlogGridList';
import Footer from './Footer';
import Home from './Home';
import ResponsiveHome from './ResponsiveHome';
import ResponsiveFooter from './ResponsiveFooter';
import { useEffect, useState } from 'react';

const MainPage = () => {
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
    <div>
      {isSmallScreen ? <ResponsiveHome /> : <Home />}
      <BlogGridList />
      {isSmallScreen ? <ResponsiveFooter /> : <Footer />}
    </div>
  );
};

export default MainPage;
