"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"
import SEOHead from "../components/seo/SEOHead"

const About = () => {
  useEffect(() => {
    document.title = "Sobre | DevEmDesenvolvimento"
  }, [])

  return (
    <>
      <SEOHead
        title="Sobre"
        description="Conheça mais sobre o DevEmDesenvolvimento, nossa missão e valores."
        keywords="sobre, quem somos, missão, valores, contato, desenvolvimento web"
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sobre o DevEmDesenvolvimento</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            O DevEmDesenvolvimento nasceu da paixão por compartilhar conhecimento e da crença de que o aprendizado
            contínuo é fundamental para o crescimento profissional. Nossa missão é democratizar o acesso à educação em
            tecnologia, oferecendo conteúdo de qualidade em português para desenvolvedores de todos os níveis.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            Acreditamos que o desenvolvimento de software vai além de escrever código. É sobre resolver problemas, criar
            soluções inovadoras e impactar positivamente a vida das pessoas. Por isso, nosso conteúdo abrange não apenas
            aspectos técnicos, mas também boas práticas, carreira e tendências do mercado.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">O Que Oferecemos</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Blog</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Artigos, tutoriais e dicas sobre desenvolvimento web, programação e tecnologia. Nosso conteúdo é
                atualizado regularmente e aborda temas relevantes para desenvolvedores de todos os níveis.
              </p>
              <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
                Explorar o blog →
              </Link>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Cursos</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Cursos práticos e objetivos sobre desenvolvimento web, programação e tecnologia. Nossos cursos são
                projetados para ajudar você a adquirir novas habilidades e aprimorar as existentes.
              </p>
              <Link to="/cursos" className="text-blue-600 dark:text-blue-400 hover:underline">
                Ver cursos disponíveis →
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Nossa Equipe</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Somos um grupo de desenvolvedores apaixonados por tecnologia e educação. Cada membro da nossa equipe
            contribui com sua experiência e conhecimento para criar conteúdo relevante e de qualidade.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                <img src="/placeholder.svg?height=80&width=80" alt="Fundador" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Pedro Silva</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Fundador & Desenvolvedor Full Stack</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Apaixonado por tecnologia e educação, com mais de 10 anos de experiência em desenvolvimento web.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="Colaborador"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Ana Oliveira</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Desenvolvedora Front-end & UX/UI</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  Especialista em criar interfaces intuitivas e acessíveis, com foco na experiência do usuário.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Tem alguma dúvida, sugestão ou feedback? Ficaremos felizes em ouvir você! Entre em contato conosco através
            das redes sociais ou por email.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:contato@devemdesenvolvimento.com.br"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
            >
              <Mail size={18} />
              <span>Email</span>
            </a>
            <a
              href="https://github.com/devemdesenvolvimento"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
            >
              <Github size={18} />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com/devemdesenvolvimento"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
            >
              <Twitter size={18} />
              <span>Twitter</span>
            </a>
            <a
              href="https://linkedin.com/company/devemdesenvolvimento"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-md transition-colors"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
