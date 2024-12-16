import Typewriter from "typewriter-effect";
import "@/CSS/Responsive.css";

const ResponsiveHome = () => {
  return (
    <section
      id="home"
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-20 px-5 transition-all duration-300"
    >
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex-1 mt-10 flex justify-center items-center">
          <img src="/images/owl.svg" alt="logo" className="w-26 h-26 max-w-xs" />
        </div>
        <div className="flex-1 max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold mb-5 leading-tight">
            DevEmDesenvolvimento{" "}
            <span className="text-hover-primary">Blog</span>
          </h1>
          <div className="text-lg mb-5 text-secondary flex justify-center items-center">
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
