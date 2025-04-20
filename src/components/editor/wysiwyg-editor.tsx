"use client"

import { useRef, useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { FiMaximize2, FiMinimize2 } from "react-icons/fi"
import { supabase } from "@/lib/supabase"

interface WysiwygEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const WysiwygEditor = ({ value, onChange, placeholder = "Comece a escrever..." }: WysiwygEditorProps) => {
  const quillRef = useRef<ReactQuill>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular um pequeno atraso para garantir que o editor seja inicializado corretamente
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Função para fazer upload de imagens para o Supabase
  const imageHandler = () => {
    const input = document.createElement("input")
    input.setAttribute("type", "file")
    input.setAttribute("accept", "image/*")
    input.click()

    input.onchange = async () => {
      if (input.files && input.files[0]) {
        const file = input.files[0]
        const editor = quillRef.current?.getEditor()
        if (!editor) return

        try {
          // Mostrar indicador de carregamento no editor
          const range = editor.getSelection(true)
          editor.insertText(range.index, "Carregando imagem...")

          // Gerar nome único para o arquivo
          const fileExt = file.name.split(".").pop() || "jpg"
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
          const filePath = `editor-images/${fileName}`

          // Fazer upload para o Supabase Storage
          const { error } = await supabase.storage.from("editor-images").upload(filePath, file)

          if (error) {
            throw error
          }

          // Obter URL pública da imagem
          const { data: urlData } = supabase.storage.from("editor-images").getPublicUrl(filePath)
          const imageUrl = urlData.publicUrl

          // Remover o texto "Carregando imagem..." e inserir a imagem
          editor.deleteText(range.index, "Carregando imagem...".length)
          editor.insertEmbed(range.index, "image", imageUrl)
          editor.setSelection(range.index + 1, 0)
        } catch (error) {
          console.error("Erro ao fazer upload da imagem:", error)
          const range = editor.getSelection(true)
          editor.deleteText(range.index, "Carregando imagem...".length)
          editor.insertText(range.index, "Erro ao carregar imagem.")
        }
      }
    }
  }

  // Configuração dos módulos do Quill
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "code-block", "blockquote"],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  }

  // Formatos suportados
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
    "code-block",
    "blockquote",
    "color",
    "background",
  ]

  // Estilos personalizados para o tema escuro
  const darkThemeStyles = `
    .ql-snow.ql-toolbar, .ql-snow.ql-container {
      border-color: #334155;
    }
    .ql-toolbar.ql-snow {
      background-color: #1e293b;
      border-top-left-radius: 0.375rem;
      border-top-right-radius: 0.375rem;
    }
    .ql-container.ql-snow {
      background-color: #0f172a;
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      color: #f8fafc;
      font-family: var(--font-family-body);
    }
    .ql-editor {
      min-height: 200px;
    }
    .ql-editor.ql-blank::before {
      color: #94a3b8;
      font-style: normal;
    }
    .ql-snow .ql-stroke {
      stroke: #94a3b8;
    }
    .ql-snow .ql-fill, .ql-snow .ql-stroke.ql-fill {
      fill: #94a3b8;
    }
    .ql-snow .ql-picker {
      color: #94a3b8;
    }
    .ql-snow .ql-picker-options {
      background-color: #1e293b;
      border-color: #334155;
    }
    .ql-snow .ql-tooltip {
      background-color: #1e293b;
      border-color: #334155;
      color: #f8fafc;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    .ql-snow .ql-tooltip input[type=text] {
      background-color: #0f172a;
      border-color: #334155;
      color: #f8fafc;
    }
    .ql-snow a {
      color: #60a5fa;
    }
    .ql-snow .ql-picker-label::before, .ql-snow .ql-picker.ql-expanded .ql-picker-label::before {
      color: #94a3b8;
    }
    .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
      color: #f8fafc;
      font-family: var(--font-family-heading);
    }
    .ql-editor pre.ql-syntax {
      background-color: #0f172a;
      color: #f8fafc;
      border: 1px solid #334155;
      border-radius: 0.375rem;
    }
    .ql-editor blockquote {
      border-left: 4px solid #3b82f6;
      padding-left: 16px;
      color: #cbd5e1;
    }
    .ql-editor img {
      max-width: 100%;
      height: auto;
      border-radius: 0.375rem;
    }
  `

  return (
    <div
      className="editor-container transition-all duration-300"
      style={{
        position: isFullscreen ? "fixed" : "relative",
        inset: isFullscreen ? "0" : "auto",
        zIndex: isFullscreen ? "50" : "auto",
        backgroundColor: isFullscreen ? "var(--color-background)" : "transparent",
        padding: isFullscreen ? "1rem" : "0",
      }}
    >
      <style>{darkThemeStyles}</style>

      <div className="flex justify-end mb-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          className="p-2 rounded-md bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          aria-label={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
          title={isFullscreen ? "Sair do modo tela cheia" : "Modo tela cheia"}
        >
          {isFullscreen ? <FiMinimize2 size={18} /> : <FiMaximize2 size={18} />}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96 bg-slate-800 rounded-md border border-slate-700">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          style={{
            height: isFullscreen ? "calc(100vh - 120px)" : "auto",
            maxHeight: isFullscreen ? "none" : "600px",
          }}
        />
      )}
    </div>
  )
}

export default WysiwygEditor
