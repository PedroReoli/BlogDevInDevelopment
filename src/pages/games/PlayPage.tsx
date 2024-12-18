import React from "react";
import { Link } from "react-router-dom";
import { 
  DiHtml5, DiCss3, DiJavascript, DiReact, DiNodejsSmall, DiPython, DiJava, DiGithub, DiDatabase, DiDocker, DiRust, DiAngularSimple,
} from "react-icons/di";
import { FaCogs, FaShieldAlt } from "react-icons/fa";
import { SiTailwindcss, SiTypescript, SiFlutter , SiCsharp ,SiDjango , SiGo , SiCplusplus } from "react-icons/si";

const PlayPage: React.FC = () => {
  const categories = [
    { name: "HTML", link: "/play/html", icon: <DiHtml5 /> },
    { name: "CSS", link: "/play/css", icon: <DiCss3 /> },
    { name: "JavaScript", link: "/play/javascript", icon: <DiJavascript /> },
    { name: "React", link: "/play/react", icon: <DiReact /> },
    { name: "Node.js", link: "/play/nodejs", icon: <DiNodejsSmall /> },
    { name: "C#", link: "/play/csharp", icon: <SiCsharp /> },
    { name: "TailwindCSS", link: "/play/tailwind", icon: <SiTailwindcss /> },
    { name: "Python", link: "/play/python", icon: <DiPython /> },
    { name: "Java", link: "/play/java", icon: <DiJava /> },
    { name: "C++", link: "/play/cpp", icon: <SiCplusplus /> },
    { name: "Git e GitHub", link: "/play/git", icon: <DiGithub /> },
    { name: "SQL", link: "/play/sql", icon: <DiDatabase /> },
    { name: "Django", link: "/play/django", icon: <SiDjango /> },
    { name: "Angular", link: "/play/angular", icon: <DiAngularSimple /> },
    { name: "GoLang", link: "/play/golang", icon: <SiGo /> },
    { name: "Rust", link: "/play/rust", icon: <DiRust /> },
    { name: "TypeScript", link: "/play/typescript", icon: <SiTypescript /> },
    { name: "Docker", link: "/play/docker", icon: <DiDocker /> },
    { name: "Flutter", link: "/play/flutter", icon: <SiFlutter /> },
    { name: "Cybersecurity", link: "/play/cybersecurity", icon: <FaShieldAlt /> },
    { name: "DevOps", link: "/play/devops", icon: <FaCogs /> },
  ];

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Portal de Jogos</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Aprenda e se divirta com desafios interativos, quizzes e jogos de programação!
      </p>

      {/* Categorias */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.link}
            className="flex flex-col items-center justify-center p-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg text-center 
            hover:bg-[var(--hover-primary)] hover:text-white transition-all"
          >
            <div className="text-5xl mb-4">{category.icon}</div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
          </Link>
        ))}
      </div>

      {/* Destaques */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Destaques</h2>
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-[var(--text-secondary)]">
            Ganhe pontos, suba no ranking e desbloqueie badges especiais!
          </p>
          <Link
            to="/ranking"
            className="bg-[var(--hover-primary)] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Ver Ranking Global
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
