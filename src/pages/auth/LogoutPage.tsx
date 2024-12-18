import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Lógica para limpar dados do usuário (exemplo)
    localStorage.clear();
    navigate("/login");
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-xl font-bold">Você foi desconectado.</h1>
    </div>
  );
};

export default LogoutPage;
