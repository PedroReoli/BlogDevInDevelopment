import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto text-center py-16">
      {/* SEO da Página 404 */}
      <Helmet>
        <title>Página Não Encontrada | Meu Blog</title>
        <meta name="description" content="A página que você tentou acessar não existe." />
      </Helmet>

      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-gray-600 text-lg mt-4">
        Ops! Parece que a página que você está procurando não existe.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-400"
      >
        Voltar para a Página Inicial
      </Link>
    </div>
  );
};

export default NotFoundPage;
