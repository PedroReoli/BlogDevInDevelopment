import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  role: "CEO" | "ADM" | "MOD" | "USER";
  lastActive: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleUsers, setVisibleUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Simulated user data
  useEffect(() => {
    const simulatedUsers: User[] = [
      { id: 1, name: "Pedro", role: "CEO", lastActive: "Online agora" },
      { id: 2, name: "Ana", role: "ADM", lastActive: "Ativo há 1 dia" },
      { id: 3, name: "João", role: "MOD", lastActive: "Ativo há 3 horas" },
      { id: 4, name: "Maria", role: "USER", lastActive: "Ativo há 5 dias" },
      // Simular mais usuários
      ...Array.from({ length: 50 }, (_, i) => ({
        id: i + 5,
        name: `Usuário ${i + 5}`,
        role: "USER" as const,
        lastActive: `Ativo há ${i + 1} horas`,
      })),
    ];
    setUsers(simulatedUsers);
    setVisibleUsers(simulatedUsers.slice(0, itemsPerPage));
  }, []);

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(term)
    );
    setVisibleUsers(filteredUsers.slice(0, itemsPerPage));
    setCurrentPage(1);
  };

  // Handle infinite scrolling
  const loadMore = () => {
    const nextPageUsers = users.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
    setVisibleUsers((prev) => [...prev, ...nextPageUsers]);
    setCurrentPage((prev) => prev + 1);
  };

  // Separate users by role
  const ceo = users.find((user) => user.role === "CEO");
  const adminsAndMods = users.filter((user) =>
    ["ADM", "MOD"].includes(user.role)
  );
  const regularUsers = users.filter((user) => user.role === "USER");

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)] min-h-screen">
      {/* Title and Search */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Usuários</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-full text-[var(--text-primary)] bg-[var(--bg-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--hover-primary)] transition-all"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hover-primary)]" />
        </div>
      </div>

      {/* Total Users */}
      <p className="text-lg text-[var(--text-secondary)] mb-6">
        Total de usuários: {users.length}
      </p>

      {/* CEO */}
      {ceo && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">CEO</h2>
          <Link
            to={`/profile/${ceo.id}`}
            className="flex items-center p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg hover:bg-[var(--hover-primary)] hover:text-white transition-all"
          >
            <FaUserCircle className="text-5xl text-[var(--hover-primary)] mr-4" />
            <div>
              <h3 className="text-xl font-bold">{ceo.name}</h3>
              <p className="text-[var(--text-secondary)]">{ceo.lastActive}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Admins and Moderators */}
      {adminsAndMods.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Equipe de Administração</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {adminsAndMods.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.id}`}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg text-center hover:bg-[var(--hover-primary)] hover:text-white transition-all"
              >
                <FaUserCircle className="text-5xl text-[var(--hover-primary)] mb-2 mx-auto" />
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p className="text-[var(--text-secondary)] text-sm">{user.lastActive}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Regular Users */}
      {regularUsers.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Usuários</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleUsers.map((user) => (
              <Link
                key={user.id}
                to={`/profile/${user.id}`}
                className="p-4 bg-[var(--bg-secondary)] rounded-lg shadow-lg text-center hover:bg-[var(--hover-primary)] hover:text-white transition-all"
              >
                <FaUserCircle className="text-4xl text-[var(--hover-primary)] mb-2 mx-auto" />
                <h3 className="text-sm font-bold">{user.name}</h3>
                <p className="text-[var(--text-secondary)] text-xs">{user.lastActive}</p>
              </Link>
            ))}
          </div>
          {/* Load More */}
          {visibleUsers.length < regularUsers.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={loadMore}
                className="px-4 py-2 bg-[var(--hover-primary)] text-white rounded-lg hover:bg-blue-600 transition"
              >
                Carregar mais
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Users Message */}
      {users.length === 0 && (
        <p className="text-center text-lg text-[var(--text-secondary)] mt-12">
          Nenhum usuário encontrado. Aguarde atualizações.
        </p>
      )}
    </div>
  );
};

export default UsersPage;
