import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi"
import ThemeSettings from "@/components/theme/theme-settings"

const About = () => {
  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Sobre o DevEmDesenvolvimento</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="mb-4">
            O DevEmDesenvolvimento nasceu da paixão por compartilhar conhecimento e ajudar desenvolvedores a evoluírem
            em suas carreiras. Nossa missão é fornecer conteúdo de qualidade sobre desenvolvimento web, programação e
            tecnologias modernas.
          </p>
          <p className="mb-4">
            Acreditamos que o aprendizado contínuo é essencial para se manter relevante no mercado de tecnologia, e
            queremos ser um recurso valioso nessa jornada de crescimento profissional.
          </p>
          <p>
            Todo o conteúdo é criado com foco em aplicações práticas, para que você possa aplicar o conhecimento
            imediatamente em seus projetos e expandir suas habilidades técnicas.
          </p>
        </div>

        <div className="bg-foreground p-6 rounded-lg transition-colors duration-300">
          <img
            src="/placeholder.svg"
            alt="Pedro Sousa"
            className="w-32 h-32 rounded-full mx-auto mb-4"
            width="128"
            height="128"
          />
          <h3 className="text-xl font-bold text-center mb-2">Pedro Sousa</h3>
          <p className="text-text-secondary text-center mb-4">Desenvolvedor Full Stack & Criador de Conteúdo</p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-primary"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-primary"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-text-secondary hover:text-primary"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              aria-label="Email"
              className="text-text-secondary hover:text-primary"
            >
              <FiMail size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-4">Tecnologias</h2>
          <p className="mb-4">O DevEmDesenvolvimento é construído com as seguintes tecnologias:</p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Vite + React para o frontend</li>
            <li>TypeScript para tipagem estática</li>
            <li>Supabase para backend, autenticação e armazenamento</li>
            <li>CSS personalizado para estilização</li>
          </ul>
          <p>
            Escolhemos essas tecnologias por sua performance, facilidade de uso e capacidade de criar experiências web
            modernas e responsivas.
          </p>
        </div>

        <ThemeSettings />
      </div>
    </div>
  )
}

export default About
