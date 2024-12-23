import Typewriter from "typewriter-effect";
import "@/CSS/Responsive.css";

const ResponsiveHome = () => {
  return (
    <section id="home" className="bg-[#111111] text-white py-20 px-5">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex-1 max-w-2xl text-center">
        <div className="flex-1 mt-10 flex justify-center items-center">
          <img src="/images/owl.svg" alt="logo" className="w-26 h-26 max-w-xs" />
        </div>
          <h1 className="text-3xl font-extrabold mb-5 leading-tight">
            DevEmDesenvolvimento <span className="text-blue-500">Blog</span>
          </h1>
          <div className="text-lg mb-5 text-gray-300 flex justify-center items-center">
            <Typewriter
              options={{
                autoStart: true,
                delay: 38,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "Explorando o que há de novo em Programação, Tecnologia e Inovação."
                  )
                  .callFunction(() => {
                    console.log("Texto finalizado e permanece na tela.");
                  })
                  .start();
              }}
            />
          </div>
        </div>
       
      </div>
    </section>
  );
};

export default ResponsiveHome;
