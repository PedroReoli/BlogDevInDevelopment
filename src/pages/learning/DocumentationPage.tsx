import React from "react";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs, // Nome corrigido para Node.js
  SiPython,
  SiCsharp,
  SiOracle, // Substituto para Java, pois não há um ícone direto para Java
  SiTypescript,
} from "react-icons/si";

const documentations = [
  {
    id: 1,
    title: "Documentação React",
    description: "Acesse a documentação oficial do React para entender todos os conceitos.",
    icon: <SiReact />,
    url: "https://reactjs.org/docs/getting-started.html",
  },
  {
    id: 2,
    title: "Documentação JavaScript",
    description:
      "Explore a documentação JavaScript do MDN para aprender a base da programação web.",
    icon: <SiJavascript />,
    url: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
  },
  {
    id: 3,
    title: "Documentação HTML",
    description: "Aprenda a criar a estrutura de suas páginas na documentação HTML do MDN.",
    icon: <SiHtml5 />,
    url: "https://developer.mozilla.org/pt-BR/docs/Web/HTML",
  },
  {
    id: 4,
    title: "Documentação CSS",
    description: "Descubra como estilizar suas páginas com a documentação CSS do MDN.",
    icon: <SiCss3 />,
    url: "https://developer.mozilla.org/pt-BR/docs/Web/CSS",
  },
  {
    id: 5,
    title: "Documentação Node.js",
    description: "Tudo o que você precisa saber para trabalhar com o runtime Node.js.",
    icon: <SiNodedotjs />,
    url: "https://nodejs.org/en/docs/",
  },
  {
    id: 6,
    title: "Documentação Python",
    description: "Aprenda a programar com a linguagem Python na documentação oficial.",
    icon: <SiPython />,
    url: "https://docs.python.org/3/",
  },
  {
    id: 7,
    title: "Documentação C#",
    description: "Aprofunde-se no desenvolvimento com C# acessando a documentação oficial.",
    icon: <SiCsharp />,
    url: "https://learn.microsoft.com/pt-br/dotnet/csharp/",
  },
  {
    id: 8,
    title: "Documentação Java",
    description: "Conheça as bases do desenvolvimento com Java na documentação oficial.",
    icon: <SiOracle />, // Ícone substituto para Java
    url: "https://docs.oracle.com/en/java/",
  },
  {
    id: 9,
    title: "Documentação TypeScript",
    description: "Aprenda sobre TypeScript acessando a documentação oficial.",
    icon: <SiTypescript />,
    url: "https://www.typescriptlang.org/docs/",
  },
];

const DocumentationPage: React.FC = () => {
  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Documentação Oficial</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Consulte documentações oficiais e recursos técnicos para se aprofundar em cada tecnologia.
      </p>

      {/* Lista de Documentações */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {documentations.map((doc) => (
          <div
            key={doc.id}
            className="p-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-all"
          >
            {/* Ícone */}
            <div className="mb-4 text-[var(--hover-primary)] text-5xl">{doc.icon}</div>
            {/* Título */}
            <h2 className="text-xl font-bold mb-2">{doc.title}</h2>
            {/* Descrição */}
            <p className="text-[var(--text-secondary)] text-sm mb-6">{doc.description}</p>
            {/* Botão de Acesso */}
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-6 rounded-full text-sm font-semibold border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2
              border-[var(--hover-primary)] bg-transparent text-[var(--hover-primary)]
              hover:bg-[var(--hover-primary)] hover:text-[var(--header-text)]"
            >
              Acessar Documentação
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentationPage;
