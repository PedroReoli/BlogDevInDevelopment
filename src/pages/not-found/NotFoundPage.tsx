import { Helmet } from "react-helmet";
import Button from "@/components/Shared/Button"; // Importa o Button do caminho especificado

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#111111] text-white">
      {/* SEO da Página 404 */}
      <Helmet>
        <title>Página Não Encontrada | Meu Blog</title>
        <meta name="description" content="A página que você tentou acessar não existe." />
      </Helmet>

      {/* Logo Central */}
      <img
        src="/images/logo.svg" // Caminho direto para a logo no public/assets
        alt="Logo"
        className="w-24 h-24 mb-8 object-contain"
      />

      {/* Mensagem de Erro */}
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-6 text-center max-w-md">
        Ops! Parece que a página que você está procurando não existe. Verifique o endereço ou volte para a página inicial.
      </p>

      {/* Botão de Retorno */}
      <Button
        href="/"
        className="text-blue-500 border border-blue-500 bg-transparent hover:bg-blue-500 hover:text-white px-6 py-3 rounded-md font-semibold transition-all"
      >
        Voltar para a Página Inicial
      </Button>
    </div>
  );
};

export default NotFoundPage;
