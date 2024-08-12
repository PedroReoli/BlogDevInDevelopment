// src/components/Topbar.tsx
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <header className="bg-[#111111] p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/assets/image/logo-page.svg" alt="logo" className="w-24 h-auto" />
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-white hover:text-blue-500 transition">Home</Link>
          <a href="#" className="text-white hover:text-blue-500 transition">Portfolio</a>
          <a href="#experience" className="text-white hover:text-blue-500 transition">Material</a>
          <a href="#projects" className="text-white hover:text-blue-500 transition">Twitter</a>
          <a href="#services" className="text-white hover:text-blue-500 transition">Cursos</a>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
