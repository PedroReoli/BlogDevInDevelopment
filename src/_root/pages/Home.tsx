import Typewriter from "typewriter-effect";
import "@/Responsive.css";

const Home = () => {
  return (
    <section id="home" className="bg-[#111111] text-white py-20 px-5">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex-1 max-w-2xl text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
<<<<<<< HEAD
            DevEmDesenvolvimento <span className="text-blue-500">Blog</span>
=======
            DevEmDesenvolvimento <span className="text-blue-500">Blog, Aulas e Projetos</span>
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
          </h1>
          <div className="text-xl md:text-2xl mb-5 text-gray-300 flex justify-center md:justify-start items-center">
            <Typewriter
              options={{
                autoStart: true,
                delay: 38,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
<<<<<<< HEAD
                    "Explorando o que há de novo em Programação, Tecnologia e Inovação."
=======
                    "Programação, Tecnologia e Inovação."
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
                  )
                  .callFunction(() => {
                    console.log("Texto finalizado e permanece na tela.");
                  })
                  .start();
              }}
            />
          </div>
        </div>
        <div className="flex-1 mt-10 md:mt-0 flex justify-center items-center">
<<<<<<< HEAD
          <img src="/images/prog.svg" alt="logo" className="w-full max-w-xs md:max-w-sm" />
=======
          <img src="/images/owl.svg" alt="logo" className="w-full max-w-xs md:max-w-sm" />
>>>>>>> 26135da4fd2509448af34e722b1ce37d69edd630
        </div>
      </div>
    </section>
  );
};

export default Home;
