const Footer = () => {
  return (
    <footer className="bg-[#111111] text-white py-16 px-5">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Seção DevEmDesenvolvimento */}
          <div className="flex flex-col justify-center md:justify-start">
            <h3 className="text-3xl font-bold mb-4 md:mb-0">DevEmDesenvolvimento</h3>
            <p className="text-base leading-7 tracking-wide text-justify">
              O <span className="text-blue-400">DevEmDesenvolvimento</span> é um espaço dedicado ao compartilhamento
              de aprendizados e insights sobre programação, focando em estudantes e desenvolvedores juniores. Vamos evoluir juntos, <span className="text-blue-400">um código de cada vez</span>.
            </p>
          </div>

          {/* Seções Contribua e Contato */}
          <div className="flex flex-col sm:flex-row justify-between sm:space-x-10 mt-10 md:mt-0 md:col-span-1">
            <div className="flex justify-center sm:justify-start mb-6 sm:mb-0 w-full sm:w-auto">
              <div>
                <h4 className="text-2xl font-semibold mb-5">Contribua</h4>
                <ul className="text-base space-y-3">
                  <li><a href="#" className="text-blue-400 hover:underline">Reportar um bug</a></li>
                  <li><a href="#" className="text-blue-400 hover:underline">Ver questões abertas</a></li>
                  <li><a href="#" className="text-blue-400 hover:underline">Patreon</a></li>
                </ul>
              </div>
            </div>
            <div className="flex justify-center sm:justify-end w-full sm:w-auto">
              <div>
                <h4 className="text-2xl font-semibold mb-5">Contato</h4>
                <ul className="text-base space-y-3">
                  <li><a href="#" className="text-blue-400 hover:underline">Twitter</a></li>
                  <li><a href="#" className="text-blue-400 hover:underline">YouTube</a></li>
                  <li><a href="#" className="text-blue-400 hover:underline">Instagram</a></li>
                  <li><a href="#" className="text-blue-400 hover:underline">Udemy</a></li>
                </ul>
              </div>
            </div>
            {/* Imagem Condicional */}
            <div className="flex justify-center items-center sm:hidden md:block md:w-auto md:ml-20">
              <img
                src="/caminho-para-imagem.jpg" // Substitua pelo caminho real da imagem
                alt="Imagem Descritiva"
                className="w-48 h-48 object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Linha de rodapé */}
        <div className="text-center text-base mt-16 border-t border-gray-700 pt-8">
          <a href="#" className="text-blue-400 hover:underline">Termos de Serviço</a> | <a href="#" className="text-blue-400 hover:underline">Privacidade</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
