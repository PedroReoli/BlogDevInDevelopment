import { useState } from "react";
import Typewriter from "typewriter-effect";

const ResponsiveTopbar = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  return (
    <header className="topbar-container bg-gradient-to-b from-black to-[#111111] p-4 sticky top-0 z-50 shadow-md border-b-2 border-gray-700 w-full">
      <div className="w-full flex justify-between items-center">
        {/* Logo com animação ou texto final */}
        <div className="topbar-logo text-2xl font-bold text-white">
          {!animationComplete ? (
            <Typewriter
              options={{
                autoStart: true,
                delay: 50,
                deleteSpeed: 25,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString("DevEmDesenvolvimento")
                  .pauseFor(1000)
                  .deleteAll()
                  .typeString("Blog feito por Pedro Lucas Reis")
                  .pauseFor(1000)
                  .callFunction(() => setAnimationComplete(true)) // Define que a animação acabou
                  .start();
              }}
            />
          ) : (
            "DevEmDesenvolvimento "
          )}
        </div>

        {/* Menu para telas grandes */}
        <nav className="hidden md:flex space-x-6">
          <a
            href="https://devemdesenvolvimento.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-500 transition"
          >
            Blog
          </a>
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

export default ResponsiveTopbar;
