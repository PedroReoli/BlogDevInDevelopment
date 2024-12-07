import { BlogPost } from './interfaces';

// Função para gerar o slug automaticamente
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-");   // Substitui espaços por "-"
};

export const blogsData: BlogPost[] = [
  ///////////////////////////////////////////////////////////
  // POSTS SQL E BD
  {
    title: "Comandos Iniciais SQL",
    description: "Aprenda e pratique os comandos SQL básicos para começar a manipular dados em bancos de dados relacionais com facilidade.",
    date: "24/11/2024",
    keywords: ["SQL", "Banco de Dados", "Nível Inicial", "SQL", "SQL Inicial", "Comandos", "SGBD"],
    imageUrl: "/postpictures/bg/post-sql.svg",
    // SQL1.html no Appwrite
    link:"https://cloud.appwrite.io/v1/storage/buckets/6754748b002e04fa000d/files/6759cd1c003bb0c4a595/view?project=6754745500352b3feccd&project=6754745500352b3feccd&mode=admin",
    slug: generateSlug("Comandos Iniciais SQL"), // Gerado dinamicamente
  },
  {
    title: "Comandos Intermediários SQL",
    description: "Explore exemplos de comandos SQL Intermediários para manipulação de dados, filtros e junções em consultas complexas.",
    date: "24/11/2024",
    keywords: ["SQL", "Banco de Dados", "Nível Intermediário", "Comandos", "SGBD"],
    imageUrl: "/postpictures/bg/post-sql.svg",
    // SQL2.html 
    link: "https://cloud.appwrite.io/v1/storage/buckets/6754748b002e04fa000d/files/6759d84100311b27a3e1/view?project=6754745500352b3feccd&project=6754745500352b3feccd&mode=admin",
    slug: generateSlug("Comandos Intermediários SQL"),
  },
  {
    title: "Boas Práticas em SQL",
    description: "Descubra como boas práticas como BIGINT, IDENTITY e colunas de log podem transformar o design de bancos de dados SQL, garantindo eficiência e escalabilidade.",
    date: "24/11/2024",
    keywords: ["Boas Práticas SQL", "Design de Banco de Dados", "SQL Avançado", "Escalabilidade"],
    imageUrl: "/postpictures/bg/post-sql.svg",
    // BoasPraticasSQL.html
    link: "https://cloud.appwrite.io/v1/storage/buckets/6754748b002e04fa000d/files/6759d7790032297693b4/view?project=6754745500352b3feccd&project=6754745500352b3feccd&mode=admin",
    slug: generateSlug("Boas Praticas em SQL"),
  },
  {
    title: "Desafios e Benefícios das Primary Keys",
    description: "Explore os desafios e vantagens do uso de Primary Keys em bancos de dados, com exemplos e práticas modernas.",
    date: "24/11/2024",
    keywords: ["Primary Keys", "Bancos de Dados", "Chave Primária", "Dicas", "Vantagens e Desvantagens","SQL"],
    imageUrl: "/postpictures/bg/post-pk.svg",
    // PK1.html
    link: "https://cloud.appwrite.io/v1/storage/buckets/6754748b002e04fa000d/files/6759d53c000b3cf93715/view?project=6754745500352b3feccd&project=6754745500352b3feccd&mode=admin",
    slug: generateSlug("Desafios e Benefícios das Primary Keys"),
  },
  ///////////////////////////////////////////////////////////
  // POO
  {
    title: "Programação Orientada a Objetos: Estruturando Sistemas Reais",
    description: "Aprenda como a Programação Orientada a Objetos (POO) revoluciona o desenvolvimento de software. Com exemplos práticos do mundo real.",
    date: "24/11/2024",
    keywords: ["POO", "Programação Orientada a Objetos", "C#", "JavaScript"],
    imageUrl: "/postpictures/bg/post-poo.svg",
    // POO1.html
    link: "https://cloud.appwrite.io/v1/storage/buckets/6754748b002e04fa000d/files/6759d351000baeff7746/view?project=6754745500352b3feccd&project=6754745500352b3feccd&mode=admin",
    slug: generateSlug("Programação Orientada a Objetos: Estruturando Sistemas Reais"),
  },
];
