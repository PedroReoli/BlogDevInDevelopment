import React, { useEffect, useState } from "react";
import {
  SiReact,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiPython,
  SiCsharp,
  SiOracle,
  SiTypescript,
} from "react-icons/si";

interface Material {
  id: number;
  título: string;
  descrição: string;
  ícone: string;
  url: string;
  categoriaPrincipal: string;
  subcategoria: string;
}

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://api.sheety.co/f07cf17198b5bb94b23fee472faecc25/apiDev/documentação";

  const getIconComponent = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case "react":
        return <SiReact />;
      case "javascript":
        return <SiJavascript />;
      case "html5":
        return <SiHtml5 />;
      case "css3":
        return <SiCss3 />;
      case "node":
        return <SiNodedotjs />;
      case "python":
        return <SiPython />;
      case "csharp":
        return <SiCsharp />;
      case "java":
        return <SiOracle />;
      case "typescript":
        return <SiTypescript />;
      default:
        return <SiReact />;
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Erro ao carregar os materiais.");
        }
        const data = await response.json();
        setMaterials(data["documentação"]);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const organizeByCategory = () => {
    return materials.reduce((acc: Record<string, Record<string, Material[]>>, material) => {
      const { categoriaPrincipal, subcategoria } = material;

      if (!acc[categoriaPrincipal]) {
        acc[categoriaPrincipal] = {};
      }
      if (!acc[categoriaPrincipal][subcategoria]) {
        acc[categoriaPrincipal][subcategoria] = [];
      }
      acc[categoriaPrincipal][subcategoria].push(material);

      return acc;
    }, {});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-center text-[var(--hover-primary)] text-2xl">Carregando materiais...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  const organizedMaterials = organizeByCategory();

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Materiais de Estudo</h1>
      <p className="text-lg text-[var(--text-secondary)] text-center mb-8">
        Explore recursos organizados por categorias principais e subcategorias para facilitar seus estudos.
      </p>

      {Object.keys(organizedMaterials).map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-[var(--hover-primary)]">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Object.keys(organizedMaterials[category]).map((subcategory) => (
              <div key={subcategory} className="p-6 bg-[var(--bg-secondary)] rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-4 text-[var(--header-text)]">
                  {subcategory}
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {organizedMaterials[category][subcategory].map((material) => (
                    <div
                      key={material.id}
                      className="p-4 bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-secondary-dark)] rounded-lg shadow hover:shadow-xl transition-all"
                    >
                      <div className="flex justify-center mb-4 text-4xl text-[var(--hover-primary)]">
                        {getIconComponent(material.ícone)}
                      </div>
                      <h4 className="text-lg font-bold mb-2">{material.título}</h4>
                      <p className="text-sm text-[var(--text-secondary)] mb-4">
                        {material.descrição}
                      </p>
                      <a
                        href={material.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center py-2 px-4 border border-[var(--hover-primary)] text-[var(--hover-primary)] rounded-full font-semibold hover:bg-[var(--hover-primary)] hover:text-white transition-all"
                      >
                        Acessar Material
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaterialsPage;
