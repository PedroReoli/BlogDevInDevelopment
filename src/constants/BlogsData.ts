import { BlogPost } from './interfaces';

export const blogsData: BlogPost[] = [
  {
    title: "Boas Práticas em SQL",
    description: "Descubra como boas práticas como BIGINT, IDENTITY e colunas de log podem transformar o design de bancos de dados SQL, garantindo eficiência e escalabilidade.",
    date: "24/11/2024",
    keywords: ["Boas Práticas SQL", "Design de Banco de Dados", "SQL Avançado", "Escalabilidade"],
    imageUrl: "/postpictures/post-sql.svg",
    filename: "post-boas_praticas_sql" 
  },  
  {
    title: "Desafios e Benefícios das Primary Keys",
    description: "Explore os desafios e vantagens do uso de Primary Keys em bancos de dados, com exemplos e práticas modernas.",
    date: "24/11/2024",
    keywords: ["Primary Keys", "Bancos de Dados", "SQL", "Boas Práticas"],
    imageUrl: "/postpictures/post3.svg",
    filename: "post-porque_algumas_pessoas_nao_gostam_de_usar_pk" // Deve corresponder a "post3.html" em /content/
  },  
  {
    title: "Programação Orientada a Objetos: Estruturando Sistemas Reais",
    description: "Aprenda como a Programação Orientada a Objetos (POO) revoluciona o desenvolvimento de software.Com exemplos práticos do mundo real.",
    date: "24/11/2024",   
    keywords: ["POO", "Programação Orientada a Objetos", "C#", "JavaScript"],
    imageUrl: "/postpictures/post-poo.png",
    filename: "post-poo" // Deve corresponder a "post-poo.html" em /content/
  },
  // Adicione mais posts conforme necessário
];
