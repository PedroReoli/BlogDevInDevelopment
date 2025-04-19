"use client"

import { useState, useEffect, useRef } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import hljs from "highlight.js"
import "highlight.js/styles/github.css"
import { FiMaximize2, FiMinimize2 } from "react-icons/fi"
import ImageUploadModal from "./image-upload-modal"

// Configurar highlight.js para o Quill
hljs.configure({
  languages: ["javascript", "typescript", "html", "css", "python", "java", "php"],
})

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const WysiwygEditor = ({ value, onChange, placeholder = "Comece a escrever..." }: WysiwygEditorProps) => {
  const [editorValue, setEditorValue] = useState(value)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    setEditorValue(value)
  }, [value])

  const handleChange = (content: string) => {
    setEditorValue(content)
    onChange(content)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Função para inserir imagem no editor
  const insertImage = (url: string, alt = "") => {
    const editor = quillRef.current?.getEditor()
    if (editor) {
      // Salvar a posição atual do cursor
      const range = editor.getSelection(true)

      // Inserir a imagem na posição do cursor
      editor.insertEmbed(range.index, "image", url)

      // Se tiver texto alternativo, adicionar o atributo alt
      if (alt) {
        editor.formatText(range.index, 1, { alt })
      }

      // Mover o cursor para depois da imagem
      editor.setSelection(range.index + 1, 0)
    }
  }

  // Handler personalizado para o botão de imagem
  const imageHandler = () => {
    setShowImageModal(true)
  }

  // Módulos e formatos do Quill
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
    "blockquote",
    "code-block",
    "color",
    "background",
  ]

  return (
    <div
      className="editor-container transition-all duration-300"
      style={{
        position: isFullscreen ? "fixed" : "relative",
        inset: isFullscreen ? "0" : "auto",
        zIndex: isFullscreen ? "50" : "auto",
        backgroundColor: isFullscreen ? "var(--color-bg)" : "transparent",
        padding: isFullscreen ? "1rem" : "0",
        overflow: isFullscreen ? "auto" : "visible",
        border: !isFullscreen ? "1px solid var(--color-border)" : "none",
        borderRadius: !isFullscreen ? "0.375rem" : "0",
      }}
    >
      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
          title={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
        >
          {isFullscreen ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
        </button>
      </div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={editorValue}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="editor-quill"
      />

      {/* Modal de upload de imagem */}
      {showImageModal && <ImageUploadModal onClose={() => setShowImageModal(false)} onImageInsert={insertImage} />}

      <style>
        {`
        .editor-quill {
          height: ${isFullscreen ? "calc(100vh - 120px)" : "400px"};
        }
        .ql-container {
          font-family: var(--font-family-body);
          font-size: var(--font-size-md);
          height: calc(100% - 42px);
          overflow-y: auto;
        }
        .ql-editor {
          min-height: ${isFullscreen ? "calc(100vh - 170px)" : "350px"};
        }
        .ql-toolbar {
          border-top-left-radius: 0.375rem;
          border-top-right-radius: 0.375rem;
          background-color: var(--color-foreground);
          border-color: var(--color-border);
        }
        .ql-container {
          border-bottom-left-radius: 0.375rem;
          border-bottom-right-radius: 0.375rem;
          border-color: var(--color-border);
        }
        .ql-editor.ql-blank::before {
          color: var(--color-text-tertiary);
        }
        .ql-snow .ql-stroke {
          stroke: var(--color-text-primary);
        }
        .ql-snow .ql-fill {
          fill: var(--color-text-primary);
        }
        .ql-snow .ql-picker {
          color: var(--color-text-primary);
        }
        .ql-snow .ql-picker-options {
          background-color: var(--color-card);
          border-color: var(--color-border);
        }
        .ql-snow .ql-tooltip {
          background-color: var(--color-card);
          border-color: var(--color-border);
          color: var(--color-text-primary);
          box-shadow: var(--shadow-md);
        }
        .ql-snow .ql-tooltip input[type=text] {
          border-color: var(--color-border);
          color: var(--color-text-primary);
          background-color: var(--color-background);
        }
        .hljs {
          background-color: var(--color-foreground);
          border-radius: 0.375rem;
        }
        `}
      </style>
    </div>
  )
}

export default WysiwygEditor
