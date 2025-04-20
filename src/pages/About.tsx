import type React from "react"
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi"
import {
  SiTailwindcss,
  SiNextdotjs,
  SiVite,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiSharp,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiMongodb,
} from "react-icons/si"

const About = () => {
  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl md:text-4xl font-bold font-heading tracking-tight text-white">
          Sobre o <span className="text-blue-500">DevEmDesenvolvimento</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4 font-heading tracking-tight text-white">Minha Jornada</h2>
          <p className="mb-4 text-lg text-gray-300">
            O DevEmDesenvolvimento é um blog pessoal que nasceu da minha vontade de compartilhar conhecimento e também
            armazenar tudo o que venho aprendendo no mercado de trabalho. Como um jovem gafanhoto nessa jornada de
            desenvolvimento, cada descoberta e aprendizado se torna uma oportunidade de crescimento.
          </p>
          <p className="mb-4 text-lg text-gray-300">
            Acredito que o aprendizado contínuo é essencial para se manter relevante no mercado de tecnologia, e
            documentar esse processo não apenas me ajuda a fixar o conhecimento, mas também pode auxiliar outros
            desenvolvedores que estão em jornadas similares.
          </p>
          <p className="text-lg text-gray-300">
            Todo o conteúdo é criado com foco em aplicações práticas, para que você possa aplicar o conhecimento
            imediatamente em seus projetos e expandir suas habilidades técnicas, assim como eu faço diariamente.
          </p>
        </div>

        <div className="card p-6 text-center bg-gray-800 rounded-xl">
          <div className="relative mx-auto mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full blur opacity-30"></div>
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Pedro Reoli"
              className="relative w-32 h-32 rounded-full mx-auto object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2 font-heading tracking-tight text-white">Pedro Reoli</h3>
          <p className="text-gray-400 mb-4">Desenvolvedor Full Stack & Criador de Conteúdo</p>
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="https://github.com/PedroReoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/pedro-reoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/pedro_reoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              aria-label="Email"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <FiMail size={20} />
            </a>
          </div>
          <p className="text-gray-300">
            Apaixonado por desenvolvimento web e novas tecnologias. Compartilhando minha jornada enquanto aprendo e
            evoluo como desenvolvedor.
          </p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 font-heading tracking-tight text-white">Minha Stack</h2>
        <div className="tech-carousel-container overflow-hidden">
          <div className="tech-carousel">
            <TechIcon icon={<SiReact size={48} color="#61DAFB" />} name="React" />
            <TechIcon icon={<SiReact size={48} color="#61DAFB" />} name="React Native" />
            <TechIcon icon={<SiNextdotjs size={48} color="#ffffff" />} name="Next.js" />
            <TechIcon icon={<SiVite size={48} color="#646CFF" />} name="Vite" />
            <TechIcon icon={<SiTailwindcss size={48} color="#06B6D4" />} name="Tailwind" />
            <TechIcon icon={<SiTypescript size={48} color="#3178C6" />} name="TypeScript" />
            <TechIcon icon={<SiJavascript size={48} color="#F7DF1E" />} name="JavaScript" />
            <TechIcon icon={<SiSharp size={48} color="#239120" />} name="C#" />
            <TechIcon icon={<SiPython size={48} color="#3776AB" />} name="Python" />
            <TechIcon icon={<SiMysql size={48} color="#4479A1" />} name="SQL" />
            <TechIcon icon={<SiPostgresql size={48} color="#4169E1" />} name="PostgreSQL" />
            <TechIcon icon={<SiMongodb size={48} color="#47A248" />} name="MongoDB" />

            {/* Duplicar ícones para criar efeito de loop contínuo */}
            <TechIcon icon={<SiReact size={48} color="#61DAFB" />} name="React" />
            <TechIcon icon={<SiReact size={48} color="#61DAFB" />} name="React Native" />
            <TechIcon icon={<SiNextdotjs size={48} color="#ffffff" />} name="Next.js" />
            <TechIcon icon={<SiVite size={48} color="#646CFF" />} name="Vite" />
            <TechIcon icon={<SiTailwindcss size={48} color="#06B6D4" />} name="Tailwind" />
            <TechIcon icon={<SiTypescript size={48} color="#3178C6" />} name="TypeScript" />
            <TechIcon icon={<SiJavascript size={48} color="#F7DF1E" />} name="JavaScript" />
            <TechIcon icon={<SiSharp size={48} color="#239120" />} name="C#" />
            <TechIcon icon={<SiPython size={48} color="#3776AB" />} name="Python" />
            <TechIcon icon={<SiMysql size={48} color="#4479A1" />} name="SQL" />
            <TechIcon icon={<SiPostgresql size={48} color="#4169E1" />} name="PostgreSQL" />
            <TechIcon icon={<SiMongodb size={48} color="#47A248" />} name="MongoDB" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente para exibir ícones de tecnologia
const TechIcon = ({ icon, name }: { icon: React.ReactNode; name: string }) => {
  return (
    <div className="tech-icon">
      <div className="tech-icon-inner">
        {icon}
        <span className="mt-2 text-sm text-gray-400 group-hover:text-white transition-colors">{name}</span>
      </div>
    </div>
  )
}

export default About
