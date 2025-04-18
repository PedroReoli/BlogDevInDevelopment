"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Home, Search, BookOpen, FileText } from "lucide-react"
import SEOHead from "../components/seo/SEOHead"

const NotFound = () => {
  useEffect(() => {
    document.title = "Página não encontrada | DevEmDesenvolvimento"
  }, [])

  return (
    <>
      <SEOHead
        title="Página não encontrada"
        description="A página que você está procurando não foi encontrada."
        noIndex={true}
      />

      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600 dark:text-blue-400">404</h1>
          <h2 className="text-3xl font-bold mt-4 mb-2">Página não encontrada</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ops! A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Aqui estão algumas sugestões:</h3>

          <ul className="space-y-4 text-left max-w-md mx-auto">
            <li className="flex items-start">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-3 mt-1">
                <Search size={16} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Verifique se o URL foi digitado corretamente</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-3 mt-1">
                <Home size={16} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Volte para a página inicial e navegue até o conteúdo desejado
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-3 mt-1">
                <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">
                Explore nossos cursos para encontrar o que procura
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 dark:bg-blue-900/30 p-1 rounded-full mr-3 mt-1">
                <FileText size={16} className="text-blue-600 dark:text-blue-400" />
              </span>
              <span className="text-gray-700 dark:text-gray-300">Confira nossos artigos recentes no blog</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Voltar para a página inicial
          </Link>
          <Link
            to="/blog"
            className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium py-2 px-6 rounded-md transition-colors"
          >
            Explorar o blog
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
