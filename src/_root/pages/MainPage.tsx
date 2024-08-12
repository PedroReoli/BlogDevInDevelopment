// src/_root/pages/MainPage.tsx

import BlogGridList from '@/components/Blog/BlogGridList';
import About from './About';
import Home from './Home';


const MainPage = () => {
  return (
    <div>
      <Home />
      <BlogGridList/>
      <About/>
    </div>
  );
};

export default MainPage;
