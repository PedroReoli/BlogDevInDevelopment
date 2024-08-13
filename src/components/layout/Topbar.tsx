// src/components/Topbar.tsx
import '@/Responsive.css';

const Topbar = () => {
  return (
    <header className="topbar-container bg-gradient-to-b from-black to-[#111111] p-4 sticky top-0 z-50 shadow-md border-b-2 border-gray-700 w-full">
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <div className="topbar-logo text-2xl font-bold">
          &lt; PedroReoli /&gt;
        </div>

        {/* Menu */}
        <nav className="topbar-nav hidden md:flex space-x-6">
          <a href="https://devemdesenvolvimento.netlify.app" className="text-white hover:text-blue-500 transition">Blog</a>
          <a href="https://www.youtube.com/@DevDesenvolvimento" className="text-white hover:text-blue-500 transition">Youtube</a>
          <a href="https://www.instagram.com/01_dev_em_desenvolvimento" className="text-white hover:text-blue-500 transition">Instagram</a>
          <a href="https://x.com/opedroreoli" className="text-white hover:text-blue-500 transition">Twitter</a>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
