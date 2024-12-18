import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface ProfileProps {
  user: {
    name: string;
    isLoggedIn: boolean;
    role: "CEO" | "ADM" | "MOD" | "USER";
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Classes animadas baseadas no cargo
  const getRoleClasses = () => {
    if (user.role === "CEO") return "border-4 border-blue-500 animate-pulse shadow-blue-500";
    if (user.role === "ADM") return "border-4 border-yellow-500 animate-bounce shadow-yellow-500";
    if (user.role === "MOD") return "border-4 border-green-500 animate-wiggle shadow-green-500";
    return "border-2 border-gray-400";
  };

  const roleLabel =
    user.role === "CEO"
      ? "CEO"
      : user.role === "ADM"
      ? "ADM"
      : user.role === "MOD"
      ? "MOD"
      : "";

  return (
    <div className="flex flex-col items-center mb-4">
      {/* Foto do Usuário */}
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden ${getRoleClasses()} transition-all`}
      >
        {user.isLoggedIn ? (
          <img src="/images/profile.jpg" alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <FaUser className="text-[var(--hover-primary)] text-3xl" />
        )}
      </div>
      {/* Nome e Cargo */}
      <p className="mt-2 font-semibold text-lg">{user.isLoggedIn ? user.name : "Visitante"}</p>
      {user.isLoggedIn && (
        <span
          className={`mt-1 px-2 py-1 rounded-full text-xs font-bold ${
            user.role === "CEO"
              ? "text-blue-500"
              : user.role === "ADM"
              ? "text-yellow-500"
              : "text-green-500"
          }`}
        >
          {roleLabel}
        </span>
      )}
      {/* Link para Login */}
      {!user.isLoggedIn && (
        <Link
          to="/login"
          className="text-[var(--hover-primary)] hover:underline text-sm"
        >
          Fazer Login
        </Link>
      )}
    </div>
  );
};

export default Profile;
