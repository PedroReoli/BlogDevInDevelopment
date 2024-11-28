// src\components\layout\Topbar.tsx
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Topbar = () => {
  return (
    <header className="topbar-container bg-gradient-to-b from-black to-[#111111] p-4 sticky top-0 z-50 shadow-md border-b-2 border-gray-700 w-full">
      <div className="w-full flex justify-between items-center">
        {/* Logo com animação */}
        <div className="topbar-logo text-2xl font-bold text-white">
          <Typewriter
            options={{
              autoStart: true,
              delay: 50,
              deleteSpeed: 25,
              loop: false,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("DevEmDesenvolvimento")
                .pauseFor(1000)
                .deleteAll()
                .typeString("Blog feito por Pedro Lucas Reis")
                .pauseFor(1000)
                .deleteAll()
                .typeString("DevEmDesenvolvimento") 
                .start();
            }}
          />
        </div>

        {/* Menu */}
        <nav className="topbar-nav flex space-x-6">
          <Link
          to="/"
          className="text-white hover:text-blue-500 transition"
          >
            Blog
          </Link>
          <a
            href="https://www.youtube.com/@DevDesenvolvimento"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition"
          >
            Youtube
          </a>
          <a
            href="https://www.instagram.com/01_dev_em_desenvolvimento"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition"
          >
            Instagram
          </a>
          <a
            href="https://x.com/opedroreoli"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition"
          >
            Twitter
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Topbar;
