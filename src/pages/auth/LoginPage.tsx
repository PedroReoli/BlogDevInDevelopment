import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação (substituir com lógica real)
    if (email === "admin@example.com" && password === "password123") {
      // Redirecionar para a página principal após login
      navigate("/");
    } else {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="p-8 bg-[var(--bg-secondary)] rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)]"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)]"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[var(--hover-primary)] text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
