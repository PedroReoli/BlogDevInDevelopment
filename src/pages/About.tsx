import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi"
import ThemeSettings from "@/components/theme/theme-settings"

const About = () => {
  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <img src="/images/logo.svg" alt="Logo" className="w-8 h-8" />
        <h1 className="text-3xl md:text-4xl font-bold">Sobre o DevEmDesenvolvimento</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="mb-4 text-lg">
            O DevEmDesenvolvimento nasceu da paixão por compartilhar conhecimento e ajudar desenvolvedores a evoluírem
            em suas carreiras. Nossa missão é fornecer conteúdo de qualidade sobre desenvolvimento web, programação e
            tecnologias modernas.
          </p>
          <p className="mb-4 text-lg">
            Acreditamos que o aprendizado contínuo é essencial para se manter relevante no mercado de tecnologia, e
            queremos ser um recurso valioso nessa jornada de crescimento profissional.
          </p>
          <p className="text-lg">
            Todo o conteúdo é criado com foco em aplicações práticas, para que você possa aplicar o conhecimento
            imediatamente em seus projetos e expandir suas habilidades técnicas.
          </p>

          <div className="mt-8 p-6 bg-foreground rounded-xl">
            <h3 className="text-xl font-bold mb-4">Nossos Valores</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mt-0.5">
                  1
                </span>
                <span>
                  <strong>Qualidade:</strong> Priorizamos conteúdo de alta qualidade e relevância.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mt-0.5">
                  2
                </span>
                <span>
                  <strong>Acessibilidade:</strong> Tornamos o conhecimento técnico acessível para todos os níveis.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mt-0.5">
                  3
                </span>
                <span>
                  <strong>Comunidade:</strong> Valorizamos a troca de experiências e o crescimento coletivo.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300 mt-0.5">
                  4
                </span>
                <span>
                  <strong>Inovação:</strong> Estamos sempre atentos às novas tecnologias e tendências.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="card p-6 text-center">
          <div className="relative mx-auto mb-6">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-primary-300 rounded-full blur opacity-30"></div>
            <img
              src="/placeholder.svg?height=128&width=128"
              alt="Pedro Reoli"
              className="relative w-32 h-32 rounded-full mx-auto object-cover"
            />
          </div>
          <h3 className="text-xl font-bold mb-2">Pedro Reoli</h3>
          <p className="text-text-secondary mb-4">Desenvolvedor Full Stack & Criador de Conteúdo</p>
          <div className="flex justify-center gap-4 mb-6">
            <a
              href="https://github.com/PedroReoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="https://linkedin.com/in/pedro-reoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              <FiLinkedin size={20} />
            </a>
            <a
              href="https://twitter.com/pedro_reoli"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="mailto:pedrosousa2160@gmail.com"
              aria-label="Email"
              className="text-text-secondary hover:text-primary-500 transition-colors"
            >
              <FiMail size={20} />
            </a>
          </div>
          <p className="text-text-secondary">
            Apaixonado por desenvolvimento web e novas tecnologias. Compartilhando conhecimento para ajudar outros
            desenvolvedores a crescerem.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Tecnologias</h2>
          <p className="mb-4">O DevEmDesenvolvimento é construído com as seguintes tecnologias:</p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                ✓
              </span>
              <span>Vite + React para o frontend</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                ✓
              </span>
              <span>TypeScript para tipagem estática</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                ✓
              </span>
              <span>Tailwind CSS para estilização</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300">
                ✓
              </span>
              <span>Next.js para renderização do lado do servidor (SSR)</span>
            </li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
          <p className="mb-4">Personalize a aparência do site com o Theme Settings:</p>
          <ThemeSettings />
        </div>
      </div>
    </div>
  )
}

export default About
