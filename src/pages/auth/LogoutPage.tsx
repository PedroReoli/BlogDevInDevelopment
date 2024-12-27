import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "@/components/Shared/Button";

const LogOutPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    localStorage.clear();

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate("/", { state: { message: "Você foi desconectado com sucesso." } });
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

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
        className="bg-[var(--bg-secondary)] rounded-lg shadow-lg p-8 w-full max-w-md text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Você foi desconectado</h2>
        <p className="mb-6">
          Redirecionando para a página inicial em{" "}
          <span className="font-bold text-[var(--hover-primary)]">{countdown}</span> segundos...
        </p>
        <div className="space-y-4">
          <Link to="/login" className="block">
            <Button className="w-full">Fazer login novamente</Button>
          </Link>
          <Link to="/" className="block">
            <Button variant="secondary" className="w-full">
              Voltar para a página inicial
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LogOutPage;
