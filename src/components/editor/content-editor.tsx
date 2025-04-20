"use client"

import { useState } from "react"
import WysiwygEditor from "./wysiwyg-editor"
import EditorPreview from "./editor-preview"
import { EnsureStorageBucket } from "./ensure-storage-bucket"
import { FiEye, FiEdit, FiSave, FiRotateCcw } from "react-icons/fi"
import toast from "react-hot-toast"

interface ContentEditorProps {
  initialValue?: string
  onChange: (content: string) => void
  title?: string
}

const ContentEditor = ({ initialValue = "", onChange, title }: ContentEditorProps) => {
  const [content, setContent] = useState(initialValue)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")
  const [savedContent, setSavedContent] = useState(initialValue)
  const [hasChanges, setHasChanges] = useState(false)

  const handleChange = (value: string) => {
    setContent(value)
    onChange(value)
    setHasChanges(value !== savedContent)
  }

  const handleSave = () => {
    setSavedContent(content)
    setHasChanges(false)
    toast.success("Conteúdo salvo temporariamente")
  }

  const handleRevert = () => {
    if (
      window.confirm("Tem certeza que deseja reverter para a última versão salva? Todas as alterações serão perdidas.")
    ) {
      setContent(savedContent)
      onChange(savedContent)
      setHasChanges(false)
      toast.success("Conteúdo revertido para a última versão salva")
    }
  }

  return (
    <div className="content-editor bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="flex border-b border-slate-700 bg-slate-800 py-1 px-2">
        <button
          type="button"
          className={`py-1.5 px-3 flex items-center gap-1.5 border-b-2 transition-colors text-sm ${
            activeTab === "edit"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          <FiEdit size={16} />
          <span>Editar</span>
        </button>
        <button
          type="button"
          className={`py-1.5 px-3 flex items-center gap-1.5 border-b-2 transition-colors text-sm ${
            activeTab === "preview"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          <FiEye size={16} />
          <span>Visualizar</span>
        </button>

        <div className="ml-auto flex items-center px-2">
          {hasChanges && (
            <>
              <span className="text-amber-400 text-xs mr-2">Alterações não salvas</span>
              <button
                type="button"
                onClick={handleRevert}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700 mr-1"
                title="Reverter alterações"
              >
                <FiRotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="p-1.5 rounded-md text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                title="Salvar temporariamente"
              >
                <FiSave size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="editor-content p-2">
        {activeTab === "edit" ? (
          <EnsureStorageBucket bucketName="editor-images">
            <WysiwygEditor value={content} onChange={handleChange} />
          </EnsureStorageBucket>
        ) : (
          <EditorPreview content={content} title={title} />
        )}
      </div>
    </div>
  )
}

export default ContentEditor
