import React, { useState } from "react";

interface User {
  id: number;
  name: string;
  role: "CEO" | "ADM" | "MOD" | "USER";
}

const UsersPage: React.FC = () => {
  const [users] = useState<User[]>([
    { id: 1, name: "Pedro", role: "CEO" },
    { id: 2, name: "Ana", role: "ADM" },
    { id: 3, name: "João", role: "MOD" },
    { id: 4, name: "Maria", role: "USER" },
  ]);

  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-2xl font-bold mb-6">Usuários</h1>
      <table className="w-full border-collapse border border-[var(--border-primary)]">
        <thead>
          <tr className="bg-[var(--bg-secondary)] text-left">
            <th className="p-2 border border-[var(--border-primary)]">Nome</th>
            <th className="p-2 border border-[var(--border-primary)]">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-[var(--hover-primary)] hover:bg-opacity-20">
              <td className="p-2 border border-[var(--border-primary)]">{user.name}</td>
              <td className="p-2 border border-[var(--border-primary)]">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
