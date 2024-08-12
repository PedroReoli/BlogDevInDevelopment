import { BlogPost } from './interfaces';

export const blogsData: BlogPost[] = [
  {
    title: "Computação Quântica: Explorando o Futuro da Programação",
    description: "Um mergulho na computação quântica, suas aplicações e como os programadores podem se preparar para essa revolução tecnológica.",
    date: "12/08/2024",
    keywords: ["Computação Quântica", "Qiskit", "Tecnologia", "Programação"],
    imageUrl: "/backgrounds/post1.png",
    filename: "post1" // Deve corresponder a "post1.html" em /content/
  },
  {
    title: "Programação Ética na Era da Inteligência Artificial",
    description: "A importância de desenvolver IA de maneira ética, garantindo transparência, justiça e respeito aos direitos humanos.",
    date: "12/08/2024",
    keywords: ["Programação Ética", "Inteligência Artificial", "IA", "Tecnologia"],
    imageUrl: "/backgrounds/post2.png",
    filename: "post2" // Deve corresponder a "post2.html" em /content/
  },
  {
    title: "WebAssembly: Elevando a Performance no Desenvolvimento Web",
    description: "Como WebAssembly está transformando o desenvolvimento web com alta performance e portabilidade.",
    date: "12/08/2024",
    keywords: ["WebAssembly", "Wasm", "Desenvolvimento Web", "Tecnologia"],
    imageUrl: "/backgrounds/post3.png",
    filename: "post3" // Deve corresponder a "post2.html" em /content/
  },
  // Adicione mais posts conforme necessário
];
