import { useEffect, useState } from 'react';

const ResponsiveHome = () => {
  const [text, setText] = useState('');
  const fullText = "   Notícias, Materiais e Novidades";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="bg-[#111111] text-white py-20 px-5">
      <div className="container mx-auto flex flex-col items-center text-center">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 leading-tight">
            DevEmDesenvolvimento <span className="text-blue-500">Blog</span>
          </h1>
          <div className="text-xl md:text-2xl mb-5 text-gray-300 flex justify-center items-center">
            <p className="whitespace-pre-wrap">{text}</p>
            <span className="typewriter-cursor"></span>
          </div>
        </div>
        <div className="flex-1 mt-10">
          <img src="/images/prog.svg" alt="logo" className="w-full max-w-xs md:max-w-sm" />
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHome;
