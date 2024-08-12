// src/constants/BlogsData.ts
import { BlogPost } from "./interfaces";

export const blogsData: BlogPost[] = [
  {
    title: "Now in Baseline: como animar efeitos de entrada",
    description: "Melhore a legibilidade do texto ao usar fontes substitutas.",
    date: "8 de agosto de 2024",
    author: "Una Kravets",
    filename: "post1.html",
    imageUrl: "/images/animating-entry-effects.png",  
  },
  {
    title:
      "Interop 2024: Chrome em 100% para a área de foco de acessibilidade",
    description:
      "O Chrome agora é aprovado em 100% dos testes da área de foco de acessibilidade. Esta postagem explica as melhorias feitas.",
    date: "31 de julho de 2024",
    author: "Rachel Andrew",
    filename: "post2.html",
    imageUrl: "/images/interop-2024.png",  
  },
  {
    title: "A plataforma da Web começou a ser veiculada em julho",
    description:
      "Descubra alguns dos recursos interessantes que chegaram em navegadores da Web estáveis e Beta em julho de 2024.",
    date: "30 de julho de 2024",
    author: "Rachel Andrew",
    filename: "post3.html",
    imageUrl: "/images/web-platform-july.png",  
  },
  // Mais posts
];
