// src/constants/interfaces.ts

export interface BlogPost {
  title: string;
  description: string;
  date: string;
  keywords: string[];
  imageUrl: string;
  link: string; // Link direto para o arquivo no bucket
  slug: string; // Slug para URLs amigáveis
}

export interface Lesson {
  title: string;
  description: string;
  date: string;
  keywords: string[];
  imageUrl: string;
  link: string; // Link direto para o arquivo no bucket
  slug: string; // Slug para URLs amigáveis
}

export interface Project {
  title: string;
  description: string;
  date: string;
  keywords: string[];
  imageUrl: string;
  link: string; // Link direto para o arquivo no bucket
  slug: string; // Slug para URLs amigáveis
}
