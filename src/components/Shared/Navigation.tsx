import { Link } from "react-router-dom";

interface NavigationProps {
  currentSlug: string;
  data: Array<{ slug: string; title: string }>;
  basePath: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentSlug, data, basePath }) => {
  const currentIndex = data.findIndex((item) => item.slug === currentSlug);
  const previousItem = data[currentIndex - 1];
  const nextItem = data[currentIndex + 1];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-6 md:flex-row justify-between items-center mt-10 border-t border-gray-300 pt-5">
      {/* Seção do item anterior */}
      <div className="w-full md:w-auto text-center md:text-left">
        {previousItem ? (
          <Link
            to={`/${basePath}/${previousItem.slug}`}
            className="text-sm text-gray-500 hover:text-blue-500 transition"
            onClick={scrollToTop}
          >
            <div className="flex flex-col items-center md:items-start">
              <span className="text-sm text-gray-500">Anterior</span>
              <span className="text-blue-600 font-medium">{previousItem.title}</span>
            </div>
          </Link>
        ) : (
          <span className="text-gray-500 text-sm">Não há item anterior</span>
        )}
      </div>

      {/* Botão transparente para a Página Inicial */}
      <div className="w-full md:w-auto text-center">
        <Link
          to="/"
          onClick={scrollToTop}
          className="inline-block px-5 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition focus:outline-none focus:ring focus:ring-blue-300"
        >
          Página Inicial
        </Link>
      </div>

      {/* Seção do próximo item */}
      <div className="w-full md:w-auto text-center md:text-right">
        {nextItem ? (
          <Link
            to={`/${basePath}/${nextItem.slug}`}
            className="text-sm text-gray-500 hover:text-blue-500 transition"
            onClick={scrollToTop}
          >
            <div className="flex flex-col items-center md:items-end">
              <span className="text-sm text-gray-500">Próximo</span>
              <span className="text-blue-600 font-medium">{nextItem.title}</span>
            </div>
          </Link>
        ) : (
          <span className="text-gray-500 text-sm">Não há próximo item</span>
        )}
      </div>
    </div>
  );
};

export default Navigation;
