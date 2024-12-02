// src/constants/interfaces.ts

export interface BlogPost {
    title: string;
    description: string;
    date: string;
    keywords: string[];
    imageUrl: string;
    filename: string; // Nome do arquivo HTML 
  }
  export interface Lesson {
    title: string;
    description: string;
    date: string;
    keywords: string[];
    videoUrl: string; // URL do vídeo da aula
    duration: string; // Duração da aula, e.g., "15 min"
  }
  
  export interface Project {
    title: string;
    description: string;
    date: string;
    keywords: string[];
    imageUrl: string;
    repositoryUrl: string; // URL do repositório do projeto no GitHub
    liveDemoUrl?: string; // URL do demo ao vivo (opcional)
  }