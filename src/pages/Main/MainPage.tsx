
import Sessions from '@/components/Transition/Sessions';
import { useEffect, useState } from 'react';
import  Home  from '@/pages/Main/Home';
import ResponsiveFooter from '../ResponsiveLayouts/ResponsiveFooter';
import Footer from './Footer';

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
      <Home />
      <Sessions />
      {isSmallScreen ? <ResponsiveFooter /> : <Footer />}
    </div>
  );
};

export default MainPage;
