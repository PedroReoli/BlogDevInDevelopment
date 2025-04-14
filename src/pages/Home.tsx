import Typewriter from "typewriter-effect"
import "@/CSS/Responsive.css"

const Home = () => {
  return (
    <section
      id="home"
      className="bg-[var(--bg-primary)] text-[var(--text-primary)] py-16 xs:py-18 sm:py-20 px-4 xs:px-5 transition-all duration-300 min-h-screen"
    >
      <div className="container mx-auto flex flex-col tablet:flex-row items-center tablet:justify-between">
        <div className="flex-1 max-w-full tablet:max-w-2xl text-center tablet:text-left">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
            DevEmDesenvolvimento <span className="text-blue-500">Blog, Aulas e Projetos</span>
          </h1>
          <div className="text-xl xs:text-xl sm:text-2xl lg:text-2xl mb-5 text-[var(--text-secondary)] flex justify-center tablet:justify-start items-center">
            <Typewriter
              options={{
                autoStart: true,
                delay: 38,
                loop: false,
              }}
              onInit={(typewriter) => {
                typewriter.typeString("Programação, Tecnologia e Inovação.").start()
              }}
            />
          </div>
        </div>
        <div className="flex-1 mt-10 tablet:mt-0 flex justify-center tablet:justify-end items-center">
          <img
            src="/images/owl.svg"
            alt="logo"
            className="w-full max-w-[200px] xs:max-w-[240px] sm:max-w-xs lg:max-w-sm xl:max-w-md"
          />
        </div>
      </div>
    </section>
  )
}

export default Home

