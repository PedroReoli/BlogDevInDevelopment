"use client"

import { useState } from "react"
import { FiLogOut, FiList, FiUpload, FiEdit2 } from "react-icons/fi"
import { useAuth } from "@/contexts/auth-context"
import PostForm from "@/components/admin/post-form"
import WysiwygPostForm from "@/components/admin/wysiwyg-post-form"
import PostList from "@/components/admin/post-list"

type Tab = "create-notion" | "create-wysiwyg" | "list"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("create-wysiwyg")
  const { signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="container py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <button onClick={handleSignOut} className="btn btn-outline flex items-center gap-2">
          <FiLogOut /> Sair
        </button>
      </div>

      <div className="mb-8">
        <div className="border-b border-color-border">
          <div className="flex flex-wrap">
            <button
              className={`py-2 px-4 border-b-2 flex items-center gap-2 ${
                activeTab === "create-wysiwyg" ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("create-wysiwyg")}
            >
              <FiEdit2 /> Editor WYSIWYG
            </button>
            <button
              className={`py-2 px-4 border-b-2 flex items-center gap-2 ${
                activeTab === "create-notion" ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("create-notion")}
            >
              <FiUpload /> Upload Notion
            </button>
            <button
              className={`py-2 px-4 border-b-2 flex items-center gap-2 ${
                activeTab === "list" ? "border-primary text-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("list")}
            >
              <FiList /> Listar Posts
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-md">
        {activeTab === "create-wysiwyg" ? (
          <WysiwygPostForm onSuccess={() => setActiveTab("list")} />
        ) : activeTab === "create-notion" ? (
          <PostForm onSuccess={() => setActiveTab("list")} />
        ) : (
          <PostList />
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
