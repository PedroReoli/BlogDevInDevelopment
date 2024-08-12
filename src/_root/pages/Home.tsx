// src/_root/pages/Home.tsx
import { useEffect, useState } from 'react';

const Home = () => {
  const [text, setText] = useState('');
  // Não consegui arrumar e entender o fato do 2* caracter sempre ser cortado da animação
  // Então esse espaço é fundamental para isso(gambiarra danada)
  const fullText = "  Notícias,Materiais e Novidades ";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 60); // o tempo ta aq
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="bg-[#111111] text-white py-20 px-5">
      <div className="container mx-auto flex flex-col md:flex-row items-start">
        <div className="flex-1 max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-5 text-left leading-tight">
            
          </h1>
          <h1 className="text-5xl font-extrabold mb-5 text-left leading-tight">
           DevEmDesenvolvimento  <span className="text-blue-500">Blog</span>
          </h1>
          <div className="text-2xl mb-5 text-gray-300 flex items-center">
            <p className="whitespace-pre-wrap">{text}</p>
            <span className="typewriter-cursor"></span>
          </div>
  
        </div>
        <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center">
          <img src="/images/prog.svg" alt="logo" className="w-1/2 h-auto max-w-xs sm:hidden md:block"/>
        </div>
      </div>
    </section>
  );
};

export default Home;
