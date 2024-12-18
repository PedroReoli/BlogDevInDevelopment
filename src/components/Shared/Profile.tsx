import React from "react";

interface ProfileProps {
  name: string;
  role: "CEO" | "ADM" | "MOD" | "USER";
  imageUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ name, role, imageUrl }) => {
  return (
    <div className="flex items-center space-x-4 bg-[var(--bg-secondary)] p-3 rounded-md shadow-md">
      {/* Foto do Usuário */}
      <div className="w-12 h-12 rounded-full border-2 border-[var(--hover-primary)] overflow-hidden">
        <img
          src={imageUrl}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Nome e Cargo */}
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {name}
        </span>
        <span className="text-xs font-medium text-[var(--hover-primary)]">
          {role}
        </span>
      </div>
    </div>
  );
};

export default Profile;
