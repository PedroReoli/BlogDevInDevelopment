import React from "react";

interface PublicProfileProps {
  user: {
    name: string;
    bio: string;
    role: "CEO" | "ADM" | "MOD" | "USER";
    profilePicture: string;
  };
}

const PublicProfilePage: React.FC<PublicProfileProps> = ({ user }) => {
  return (
    <div className="p-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-3xl font-extrabold mb-6">Perfil Público</h1>
      <div className="flex flex-col md:flex-row items-center gap-6 bg-[var(--bg-secondary)] p-6 rounded-lg shadow">
        <div
          className={`relative w-36 h-36 rounded-full overflow-hidden border-4 ${
            user.role === "CEO"
              ? "border-blue-500 animate-pulse"
              : user.role === "ADM"
              ? "border-yellow-500 animate-bounce"
              : user.role === "MOD"
              ? "border-green-500"
              : "border-gray-400"
          }`}
        >
          <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-sm text-[var(--text-secondary)]">"{user.bio}"</p>
          <span
            className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
              user.role === "CEO"
                ? "text-blue-500 bg-blue-100"
                : user.role === "ADM"
                ? "text-yellow-500 bg-yellow-100"
                : "text-green-500 bg-green-100"
            }`}
          >
            {user.role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
