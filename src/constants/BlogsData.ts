import { BlogPost } from './interfaces';

export const blogsData: BlogPost[] = [
  {
    title: "Primeiro Post",
    description: "Descrição do primeiro post.",
    date: "12/08/2024",
    keywords: ["React", "JavaScript"],
    imageUrl: "/imagens/primeiro-post.jpg",
    filename: "post1" // Deve corresponder a "post1.html" em /content/
  },
  {
    title: "Segundo Post",
    description: "Descrição do segundo post.",
    date: "12/08/2024",
    keywords: ["CSS", "Design"],
    imageUrl: "/imagens/segundo-post.jpg",
    filename: "post2" // Deve corresponder a "post2.html" em /content/
  },
  {
    title: "Terceuri Post",
    description: "Descrição do segundo post.",
    date: "12/08/2024",
    keywords: ["CSS", "Design"],
    imageUrl: "/imagens/segundo-post.jpg",
    filename: "post2" // Deve corresponder a "post2.html" em /content/
  },
  // Adicione mais posts conforme necessário
];
