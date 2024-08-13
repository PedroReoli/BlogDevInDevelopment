// src/components/Bottombar.tsx

const Bottombar = () => {
  return (
    <footer className="bg-gradient-to-b from-black to-[#111111] p-4 md:hidden fixed bottom-0 w-full z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
      <a href="#home" className="text-white hover:text-blue-500 transition">Sobre</a>
          <a href="#about" className="text-white hover:text-blue-500 transition">Blog</a>
          <a href="#experience" className="text-white hover:text-blue-500 transition">Material</a>
          <a href="#projects" className="text-white hover:text-blue-500 transition">Twitter</a>
          <a href="#services" className="text-white hover:text-blue-500 transition">Cursos</a>  </div>
    </footer>
  );
};

export default Bottombar;
