// src/_root/pages/MainPage.tsx

import BlogGridList from '@/components/Blog/BlogGridList';
import Footer from './Footer';
import Home from './Home';


const MainPage = () => {
  return (
    <div>
      <Home />
      <BlogGridList/>
      <Footer/>
    </div>
  );
};

export default MainPage;
