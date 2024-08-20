import { useEffect, useState } from 'react';
import '@/Responsive.css'
const Home = () => {
  const [text, setText] = useState('');
  const fullText = "  Notícias, Materiais e Novidades ";

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
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
            DevEmDesenvolvimento <span className="text-blue-500">Blog</span>
          </h1>
          <div className="text-xl md:text-2xl mb-5 text-gray-300 flex justify-center md:justify-start items-center">
            <p className="whitespace-pre-wrap">{text}</p>
            <span className="typewriter-cursor"></span>
          </div>
        </div>
        <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center md:block hidden md:flex">
          <img src="/images/prog.svg" alt="logo" className="w-full max-w-xs" />
        </div>
      </div>
    </section>
  );
};

export default Home;
