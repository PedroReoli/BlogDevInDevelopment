import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset"; // Adicionado suporte para tipo de botão
  variant?: "primary" | "secondary"; // Variantes de botão
  className?: string; // Adicionado suporte para classes customizadas
  target?: string; // Adicionado suporte para target
  rel?: string; // Adicionado suporte para rel
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  href,
  type = "button",
  variant = "primary",
  className = "",
  target,
  rel,
}) => {
  const baseStyles =
    "py-3 px-8 rounded-full text-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantStyles = {
    primary: "text-white border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg active:bg-blue-600",
    secondary: "text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white hover:shadow-lg active:bg-blue-600",
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target={target} // Passa target para o link
        rel={rel} // Passa rel para o link
      >
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles} type={type}>
      {children}
    </button>
  );
};

export default Button;
