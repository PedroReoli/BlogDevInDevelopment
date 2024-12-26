import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/Shared/Button";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password123") {
      navigate("/", { state: { message: "Login realizado com sucesso!" } });
    } else {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-4"
    >
      <motion.img
        src="/images/owl.svg"
        alt="Logo"
        className="w-24 h-24 mb-8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.h1
        className="text-3xl font-bold mb-2 text-center"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        DevEmDesenvolvimento
      </motion.h1>
      <motion.p
        className="text-lg mb-8 text-center text-[var(--text-secondary)]"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Programação, Tecnologia e Inovação
      </motion.p>
      <motion.div
        className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-8 w-full max-w-md"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)]"
              placeholder="Digite seu email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md bg-[var(--input-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)]"
              placeholder="Digite sua senha"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-[var(--hover-primary)] hover:underline">
              Registre-se aqui
            </Link>
          </p>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-[var(--hover-primary)] hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;

