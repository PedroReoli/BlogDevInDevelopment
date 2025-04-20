"use client"

import { useState } from "react"
import { FiLogOut, FiList, FiEdit2, FiGrid, FiSettings, FiUser, FiHome } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import { Link } from "react-router-dom"
import PostForm from "@/components/admin/post-form"
// import WysiwygPostForm from "@/components/admin/wysiwyg-post-form"
import PostList from "@/components/admin/post-list"
import toast from "react-hot-toast"
import SettingsPanel from "@/components/admin/settings-panel"

type Tab = "create-wysiwyg" | "create-notion" | "list" | "settings"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("create-wysiwyg")
  const { signOut, user } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    toast.success("Logout realizado com sucesso")
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Admin Header */}
      <div className="bg-slate-800 border-b border-slate-700 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2 rounded-md">
              <FiGrid size={20} />
            </div>
            <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <FiUser className="text-blue-400" />
              <span>{user?.email}</span>
            </div>
            <Link to="/" className="p-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-md">
              <FiHome size={20} />
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-md transition-colors"
            >
              <FiLogOut size={18} />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8 bg-slate-800 rounded-lg p-1 flex flex-wrap">
          <button
            className={`py-3 px-4 rounded-md flex items-center gap-2 transition-colors ${
              activeTab === "create-wysiwyg"
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("create-wysiwyg")}
          >
            
            <FiEdit2 size={18} />
            <span className="hidden sm:inline">Upload Notion</span>
            <span className="sm:hidden">Notion</span>
          </button>
          <button
            className={`py-3 px-4 rounded-md flex items-center gap-2 transition-colors ${
              activeTab === "list" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("list")}
          >
            <FiList size={18} />
            <span>Posts</span>
          </button>
          <button
            className={`py-3 px-4 rounded-md flex items-center gap-2 transition-colors ${
              activeTab === "settings" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <FiSettings size={18} />
            <span className="hidden sm:inline">Configurações</span>
            <span className="sm:hidden">Config</span>
          </button>
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          {activeTab === "settings" ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Configurações</h2>
              <SettingsPanel />
            </div>
          ) : activeTab === "list" ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Gerenciar Posts</h2>
              <PostList />
            </div>
          ) : activeTab === "create-notion" ? (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Importar do Notion</h2>
              <PostForm onSuccess={() => setActiveTab("list")} />
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Editor WYSIWYG</h2>
              <PostForm onSuccess={() => setActiveTab("list")} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
