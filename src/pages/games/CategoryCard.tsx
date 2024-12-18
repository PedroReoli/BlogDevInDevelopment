import React from "react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, link }) => {
  return (
    <Link to={link} className="block bg-[var(--bg-secondary)] rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 p-6">
      <h2 className="text-xl font-bold text-[var(--hover-primary)]">{name}</h2>
      <p className="text-sm text-[var(--text-secondary)] mt-2">Explore desafios e jogos de {name}.</p>
    </Link>
  );
};

export default CategoryCard;
