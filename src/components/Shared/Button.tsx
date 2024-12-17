import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  className?: string;
  target?: string;
  rel?: string;
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
    primary: `
      border-[var(--hover-primary)] 
      bg-transparent 
      text-[var(--text-primary)] 
      hover:bg-[var(--hover-primary)] 
      hover:text-[var(--header-text)] 
      active:bg-[var(--hover-primary)] 
      active:text-[var(--header-text)] 
      hover:shadow-lg
    `,
    secondary: `
      border-[var(--hover-primary)] 
      bg-transparent 
      text-[var(--hover-primary)] 
      hover:bg-[var(--hover-primary)] 
      hover:text-[var(--header-text)] 
      active:bg-[var(--hover-primary)] 
      active:text-[var(--header-text)] 
      hover:shadow-lg
    `,
  };

  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedStyles}
        target={target}
        rel={rel}
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
