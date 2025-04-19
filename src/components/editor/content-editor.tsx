"use client"

import { useState } from "react"
import WysiwygEditor from "./wysiwyg-editor"
import EditorPreview from "./editor-preview"
import { EnsureStorageBucket } from "./ensure-storage-bucket"
import { FiEye, FiEdit } from "react-icons/fi"

interface ContentEditorProps {
  initialValue?: string
  onChange: (content: string) => void
  title?: string
}

const ContentEditor = ({ initialValue = "", onChange, title }: ContentEditorProps) => {
  const [content, setContent] = useState(initialValue)
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit")

  const handleChange = (value: string) => {
    setContent(value)
    onChange(value)
  }

  return (
    <div className="content-editor">
      <div className="flex border-b mb-4" style={{ borderColor: "var(--color-border)" }}>
        <button
          type="button"
          className="py-2 px-4 flex items-center gap-2 border-b-2 transition-colors"
          style={{
            borderColor: activeTab === "edit" ? "var(--color-primary)" : "transparent",
            color: activeTab === "edit" ? "var(--color-primary)" : "",
          }}
          onClick={() => setActiveTab("edit")}
        >
          <FiEdit size={18} />
          <span>Editar</span>
        </button>
        <button
          type="button"
          className="py-2 px-4 flex items-center gap-2 border-b-2 transition-colors"
          style={{
            borderColor: activeTab === "preview" ? "var(--color-primary)" : "transparent",
            color: activeTab === "preview" ? "var(--color-primary)" : "",
          }}
          onClick={() => setActiveTab("preview")}
        >
          <FiEye size={18} />
          <span>Preview</span>
        </button>
      </div>

      <div className="editor-content">
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
