"use client"

import { useEffect, useRef, useState } from "react"
import DOMPurify from "dompurify"
import Prism from "prismjs"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-jsx"
import "prismjs/components/prism-tsx"
import "prismjs/components/prism-css"
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-bash"
import "prismjs/components/prism-json"
import "prismjs/components/prism-markdown"
import "prismjs/components/prism-sql"
import "prismjs/components/prism-yaml"
import "prismjs/components/prism-go"
import "prismjs/components/prism-rust"
import "prismjs/components/prism-php"
import "prismjs/components/prism-c"
import "prismjs/components/prism-cpp"
import "prismjs/components/prism-csharp"
import "prismjs/components/prism-ruby"
import "prismjs/components/prism-swift"
import "prismjs/components/prism-kotlin"
import "prismjs/components/prism-dart"
import "./notion-styles.css"

interface NotionRendererProps {
  html: string
  className?: string
}

const NotionRenderer = ({ html, className = "" }: NotionRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const tocRef = useRef<HTMLDivElement>(null)
  const [imageViewerOpen, setImageViewerOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; text: string; level: number }>>([])
  const [showToc, setShowToc] = useState(false)
  const [tocVisible, setTocVisible] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [activeHeading, setActiveHeading] = useState<string | null>(null)

  // Fechar TOC quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tocRef.current &&
        !tocRef.current.contains(event.target as Node) &&
        !event.target?.toString().includes("toc-toggle")
      ) {
        setTocVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Fechar TOC quando clicar em um link dentro dele
  const handleTocLinkClick = () => {
    setTocVisible(false)
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Configurar DOMPurify para permitir classes e IDs do Notion
    DOMPurify.addHook("afterSanitizeAttributes", (node) => {
      if (node.hasAttribute("class")) {
        // Preservar classes do Notion
        const classes = node.getAttribute("class")
        if (classes && classes.includes("notion-")) {
          node.setAttribute("class", classes)
        }
      }

      // Preservar IDs do Notion
      if (node.hasAttribute("id") && node.getAttribute("id")?.startsWith("1deb5818-")) {
        const id = node.getAttribute("id")
        if (id) {
          node.setAttribute("id", id)
        }
      }
    })

    // Sanitize HTML to prevent XSS attacks
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ADD_ATTR: ["target", "style", "data-language", "data-line"],
      ADD_TAGS: ["iframe", "style"],
      FORBID_TAGS: ["script"],
      FORBID_ATTR: ["onerror", "onload", "onclick"],
    })

    containerRef.current.innerHTML = sanitizedHtml

    // Após inserir o HTML sanitizado, aplicamos os estilos
    const container = containerRef.current

    // Estilizar o artigo principal
    const article = container.querySelector("article")
    if (article) {
      article.classList.add("bg-card", "rounded-lg", "shadow-md", "overflow-hidden")
    }

    // Estilizar o corpo da página
    const pageBody = container.querySelector(".page-body")
    if (pageBody) {
      pageBody.classList.add("p-6", "md:p-8")
    }

    // Gerar tabela de conteúdos e adicionar IDs aos cabeçalhos
    const headings = container.querySelectorAll("h1, h2, h3")
    const tocItems: Array<{ id: string; text: string; level: number }> = []

    headings.forEach((heading, index) => {
      // Adicionar ID para ancoragem
      const headingText = heading.textContent?.trim() || `Seção ${index + 1}`
      const headingId = headingText
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")

      heading.id = `heading-${headingId}`

      // Adicionar link de âncora
      const anchorLink = document.createElement("a")
      anchorLink.href = `#${heading.id}`
      anchorLink.classList.add("heading-anchor")
      anchorLink.innerHTML = '<span class="opacity-0 group-hover:opacity-100 ml-2 text-primary-500">#</span>'
      heading.classList.add("group", "flex", "items-center")
      heading.appendChild(anchorLink)

      // Adicionar ao TOC
      const level = Number.parseInt(heading.tagName.substring(1))
      tocItems.push({
        id: heading.id,
        text: headingText,
        level,
      })

      heading.classList.add("font-heading", "text-text-primary", "scroll-mt-20")

      if (heading.tagName === "H1") {
        heading.classList.add("text-3xl", "md:text-4xl", "font-bold", "mb-6", "mt-8")
      } else if (heading.tagName === "H2") {
        heading.classList.add("text-2xl", "font-bold", "mt-8", "mb-4")

        // Adicionar ícones aos títulos H2
        const emoji =
          heading.textContent?.trim().startsWith("🧠") ||
          heading.textContent?.trim().startsWith("⚙️") ||
          heading.textContent?.trim().startsWith("🧩") ||
          heading.textContent?.trim().startsWith("📉") ||
          heading.textContent?.trim().startsWith("🔍") ||
          heading.textContent?.trim().startsWith("🧬") ||
          heading.textContent?.trim().startsWith("🛠") ||
          heading.textContent?.trim().startsWith("💬") ||
          heading.textContent?.trim().startsWith("🎯")

        if (!emoji) {
          const iconSpan = document.createElement("span")
          iconSpan.classList.add("text-primary")
          iconSpan.textContent = "•"
          heading.insertBefore(iconSpan, heading.firstChild)
          heading.insertBefore(document.createTextNode(" "), iconSpan.nextSibling)
        }
      } else if (heading.tagName === "H3") {
        heading.classList.add("text-xl", "font-bold", "mt-6", "mb-3", "text-primary")
      }
    })

    setTableOfContents(tocItems)
    setShowToc(tocItems.length >= 3)

    // Estilizar parágrafos
    const paragraphs = container.querySelectorAll("p")
    paragraphs.forEach((p) => {
      if (p.textContent?.trim()) {
        p.classList.add("text-text-primary", "mb-4", "leading-relaxed")
      }
    })

    // Estilizar listas
    const lists = container.querySelectorAll("ul, ol")
    lists.forEach((list) => {
      list.classList.add("mb-6", "ml-5", "text-text-primary", "space-y-2")

      if (list.classList.contains("bulleted-list")) {
        list.classList.add("list-disc")
      } else if (list.classList.contains("numbered-list")) {
        list.classList.add("list-decimal")
      }
    })

    // Estilizar itens de lista
    const listItems = container.querySelectorAll("li")
    listItems.forEach((item) => {
      item.classList.add("mb-2")
    })

    // Estilizar blockquotes
    const blockquotes = container.querySelectorAll("blockquote")
    blockquotes.forEach((quote) => {
      quote.classList.add(
        "bg-accent",
        "p-4",
        "rounded-lg",
        "my-4",
        "text-text-secondary",
        "border-l-4",
        "border-primary",
        "italic",
      )
    })

    // Estilizar imagens e figuras
    const figures = container.querySelectorAll("figure")
    figures.forEach((figure) => {
      figure.classList.add("my-8")

      const img = figure.querySelector("img")
      if (img) {
        img.classList.add("rounded-lg", "shadow-md", "mx-auto", "max-w-full", "h-auto")

        // Remover qualquer link pai da imagem
        if (img.parentElement?.tagName === "A") {
          const link = img.parentElement
          const parent = link.parentElement
          if (parent) {
            parent.insertBefore(img, link)
            link.remove()
          }
        }

        // Adicionar wrapper para centralizar
        const wrapper = document.createElement("div")
        wrapper.classList.add("flex", "justify-center")
        img.parentNode?.insertBefore(wrapper, img)
        wrapper.appendChild(img)

        // Prevenir cliques na imagem
        img.style.pointerEvents = "none"

        // Adicionar funcionalidade de zoom
        img.classList.add("cursor-zoom-in", "transition-transform", "duration-300")
        img.addEventListener("click", (e) => {
          e.preventDefault()
          setCurrentImage(img.src)
          setImageViewerOpen(true)
        })

        // Lazy loading para imagens
        img.loading = "lazy"

        // Adicionar efeito de hover
        img.classList.add("hover:scale-[1.02]")
      }

      const figcaption = figure.querySelector("figcaption")
      if (figcaption) {
        figcaption.classList.add("text-text-secondary", "text-sm", "text-center", "mt-2")
      }
    })

    // Estilizar links
    const links = container.querySelectorAll("a")
    links.forEach((link) => {
      link.classList.add("text-primary", "hover:underline", "transition-colors", "font-medium")

      // Verificar se é um link externo
      if (link.href && link.hostname !== window.location.hostname) {
        link.setAttribute("target", "_blank")
        link.setAttribute("rel", "noopener noreferrer")

        // Adicionar ícone para links externos
        if (!link.querySelector(".external-link-icon")) {
          const externalIcon = document.createElement("span")
          externalIcon.innerHTML = " ↗"
          externalIcon.classList.add("external-link-icon", "text-xs", "align-text-top", "ml-0.5")
          link.appendChild(externalIcon)
        }
      }
    })

    // Estilizar código inline
    const codeInline = container.querySelectorAll("code")
    codeInline.forEach((code) => {
      if (code.parentElement?.tagName !== "PRE") {
        code.classList.add("bg-accent", "px-1.5", "py-0.5", "rounded", "text-sm", "font-mono", "text-primary")
      }
    })

    // Estilizar blocos de código com syntax highlighting
    const codeBlocks = container.querySelectorAll("pre")
    codeBlocks.forEach((block) => {
      block.classList.add("bg-card", "rounded-lg", "overflow-x-auto", "my-4", "border", "border-border", "relative")

      // Adicionar padding com espaço para o botão de copiar
      block.classList.add("p-4", "pr-12")

      const code = block.querySelector("code")
      if (code) {
        code.classList.add("text-text-primary", "font-mono", "text-sm")

        // Detectar linguagem
        let language = "text"
        const classes = code.className.split(" ")
        for (const cls of classes) {
          if (cls.startsWith("language-")) {
            language = cls.replace("language-", "")
            break
          }
        }

        // Adicionar atributo para Prism
        code.setAttribute("data-language", language)

        // Adicionar botão de copiar
        const copyButton = document.createElement("button")
        copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
        copyButton.classList.add(
          "absolute",
          "top-2",
          "right-2",
          "p-1.5",
          "rounded",
          "text-text-secondary",
          "hover:bg-accent",
          "hover:text-primary",
          "transition-colors",
        )
        copyButton.title = "Copiar código"

        copyButton.addEventListener("click", () => {
          navigator.clipboard.writeText(code.textContent || "")

          // Feedback visual
          copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`
          copyButton.classList.add("text-primary")

          setTimeout(() => {
            copyButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-copy"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`
            copyButton.classList.remove("text-primary")
          }, 2000)
        })

        block.appendChild(copyButton)

        // Adicionar label de linguagem
        if (language !== "text") {
          const langLabel = document.createElement("div")
          langLabel.textContent = language
          langLabel.classList.add(
            "absolute",
            "top-0",
            "left-0",
            "px-2",
            "py-1",
            "text-xs",
            "font-mono",
            "bg-accent",
            "text-text-secondary",
            "rounded-br",
          )
          block.appendChild(langLabel)
        }
      }
    })

    // Aplicar syntax highlighting
    Prism.highlightAllUnder(container)

    // Estilizar tabelas
    const tables = container.querySelectorAll("table")
    tables.forEach((table) => {
      table.classList.add("w-full", "border-collapse", "my-6")

      // Adicionar wrapper para responsividade
      const wrapper = document.createElement("div")
      wrapper.classList.add("overflow-x-auto", "my-6", "rounded-lg", "border", "border-border")
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)

      const headers = table.querySelectorAll("th")
      headers.forEach((th) => {
        th.classList.add("bg-accent", "p-2", "text-left", "font-medium", "text-text-primary", "sticky", "top-0")
      })

      const cells = table.querySelectorAll("td")
      cells.forEach((td) => {
        td.classList.add("border-t", "border-border", "p-2")
      })

      // Adicionar hover nas linhas
      const rows = table.querySelectorAll("tr")
      rows.forEach((row) => {
        row.classList.add("hover:bg-foreground", "transition-colors")
      })
    })

    // Estilizar divisores horizontais
    const hrs = container.querySelectorAll("hr")
    hrs.forEach((hr) => {
      hr.classList.add("my-8", "border-border", "opacity-50")
    })

    // Estilizar classes específicas do Notion
    const columnLists = container.querySelectorAll(".column-list")
    columnLists.forEach((list) => {
      list.classList.add("flex", "flex-col", "md:flex-row", "gap-6", "my-8")
    })

    const columns = container.querySelectorAll(".column")
    columns.forEach((column) => {
      column.classList.add("flex-1", "min-w-0")
    })

    // Estilizar elementos com classes de cor do Notion
    const highlights = container.querySelectorAll('[class*="highlight-"]')
    highlights.forEach((highlight) => {
      if (highlight.classList.contains("highlight-blue")) {
        highlight.classList.add("text-primary", "font-medium")
      } else if (highlight.classList.contains("highlight-red")) {
        highlight.classList.add("text-error", "font-medium")
      } else if (highlight.classList.contains("highlight-green")) {
        highlight.classList.add("text-success", "font-medium")
      } else if (highlight.classList.contains("highlight-yellow")) {
        highlight.classList.add("text-warning", "font-medium")
      } else if (highlight.classList.contains("highlight-gray")) {
        highlight.classList.add("text-text-secondary")
      }
    })

    // Estilizar fundos coloridos
    const backgroundHighlights = container.querySelectorAll('[class*="_background"]')
    backgroundHighlights.forEach((highlight) => {
      if (highlight.classList.contains("highlight-blue_background")) {
        highlight.classList.add("bg-primary/10", "px-1", "rounded")
      } else if (highlight.classList.contains("highlight-red_background")) {
        highlight.classList.add("bg-error/10", "px-1", "rounded")
      } else if (highlight.classList.contains("highlight-green_background")) {
        highlight.classList.add("bg-success/10", "px-1", "rounded")
      } else if (highlight.classList.contains("highlight-yellow_background")) {
        highlight.classList.add("bg-warning/10", "px-1", "rounded")
      } else if (highlight.classList.contains("highlight-gray_background")) {
        highlight.classList.add("bg-text-secondary/10", "px-1", "rounded")
      }
    })

    // Estilizar checkboxes
    const checkboxes = container.querySelectorAll(".checkbox")
    checkboxes.forEach((checkbox) => {
      checkbox.classList.add("inline-flex", "items-center", "justify-center", "w-4", "h-4", "mr-2")
    })

    // Estilizar to-do lists
    const todoLists = container.querySelectorAll(".to-do-list")
    todoLists.forEach((list) => {
      list.classList.add("space-y-2", "my-4")
    })

    // Estilizar toggle lists
    const toggleLists = container.querySelectorAll(".toggle")
    toggleLists.forEach((list) => {
      list.classList.add("space-y-2", "my-4")
    })

    // Estilizar detalhes/summary (toggles)
    const details = container.querySelectorAll("details")
    details.forEach((detail) => {
      detail.classList.add("bg-card", "rounded-lg", "overflow-hidden", "border", "border-border", "my-2")

      const summary = detail.querySelector("summary")
      if (summary) {
        summary.classList.add("p-3", "cursor-pointer", "font-medium", "flex", "items-center")
        summary.classList.add("hover:bg-accent", "transition-colors")

        // Adicionar ícone de seta
        const arrow = document.createElement("span")
        arrow.innerHTML = "▶"
        arrow.classList.add("inline-block", "mr-2", "text-xs", "transition-transform", "duration-200")
        summary.insertBefore(arrow, summary.firstChild)

        // Rotacionar seta quando aberto
        detail.addEventListener("toggle", () => {
          if (detail.open) {
            arrow.style.transform = "rotate(90deg)"
          } else {
            arrow.style.transform = "rotate(0)"
          }
        })
      }
    })

    // Estilizar callouts
    const callouts = container.querySelectorAll(".callout")
    callouts.forEach((callout) => {
      callout.classList.add("bg-accent", "p-4", "rounded-lg", "my-6", "flex", "items-start", "gap-3")
    })

    // Estilizar bookmarks
    const bookmarks = container.querySelectorAll(".bookmark")
    bookmarks.forEach((bookmark) => {
      bookmark.classList.add(
        "border",
        "border-border",
        "rounded-lg",
        "overflow-hidden",
        "my-6",
        "no-underline",
        "hover:shadow-md",
        "transition-shadow",
      )

      const info = bookmark.querySelector(".bookmark-info")
      if (info) {
        info.classList.add("p-4")
      }
    })

    // Estilizar classes de fonte
    const sansFonts = container.querySelectorAll(".sans")
    sansFonts.forEach((font) => {
      font.classList.add("font-body")
    })

    const serifFonts = container.querySelectorAll(".serif")
    serifFonts.forEach((font) => {
      font.classList.add("font-serif")
    })

    const monoFonts = container.querySelectorAll(".mono")
    monoFonts.forEach((font) => {
      font.classList.add("font-mono")
    })

    // Estilizar classes de bloco de cor
    const blockColors = container.querySelectorAll('[class*="block-color-"]')
    blockColors.forEach((block) => {
      if (block.classList.contains("block-color-blue")) {
        block.classList.add("text-primary")
      } else if (block.classList.contains("block-color-red")) {
        block.classList.add("text-error")
      } else if (block.classList.contains("block-color-green")) {
        block.classList.add("text-success")
      } else if (block.classList.contains("block-color-yellow")) {
        block.classList.add("text-warning")
      } else if (block.classList.contains("block-color-gray")) {
        block.classList.add("text-text-secondary")
      }
    })

    // Adicionar animações sutis
    const animatedElements = container.querySelectorAll("h1, h2, h3, blockquote, figure")
    animatedElements.forEach((el) => {
      el.classList.add("motion-safe:animate-fadeIn")
    })

    // Adicionar classes para melhorar a legibilidade
    container.querySelectorAll("p, li").forEach((el) => {
      el.classList.add("text-base", "md:text-lg")
    })

    // Melhorar a aparência de strong e em
    container.querySelectorAll("strong").forEach((el) => {
      el.classList.add("font-semibold", "text-text-primary")
    })

    container.querySelectorAll("em").forEach((el) => {
      el.classList.add("italic", "text-text-primary")
    })

    // Configurar observer para detectar cabeçalhos visíveis
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: "-100px 0px -80% 0px" },
    )

    headings.forEach((heading) => {
      if (observerRef.current) {
        observerRef.current.observe(heading)
      }
    })
  }, [html])

  // Limpar observer ao desmontar
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Função para alternar a visibilidade do TOC
  const toggleToc = () => {
    setTocVisible(!tocVisible)
  }

  return (
    <div className="relative">
      {/* Botão de hambúrguer para tabela de conteúdos */}
      {showToc && tableOfContents.length > 0 && (
        <button
          onClick={toggleToc}
          className="fixed z-40 top-24 right-4 p-2 bg-card rounded-full shadow-md border border-border hover:bg-accent transition-colors duration-200 toc-toggle"
          aria-label={tocVisible ? "Fechar índice" : "Abrir índice"}
          aria-expanded={tocVisible}
          aria-controls="table-of-contents"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transition-transform duration-300 ${tocVisible ? "text-primary-500" : "text-text-secondary"}`}
          >
            <path d="M4 6h16"></path>
            <path d="M4 12h16"></path>
            <path d="M4 18h12"></path>
          </svg>
        </button>
      )}

      {/* Tabela de conteúdos */}
      {showToc && tableOfContents.length > 0 && (
        <div
          ref={tocRef}
          id="table-of-contents"
          className={`fixed z-30 top-36 right-4 w-72 bg-card rounded-lg border border-border shadow-lg transition-all duration-300 transform ${
            tocVisible ? "translate-x-0 opacity-100" : "translate-x-[120%] opacity-0"
          } max-h-[calc(100vh-160px)] overflow-y-auto`}
        >
          <div className="p-4 border-b border-border bg-accent/30 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-500"
                >
                  <path d="M4 6h16"></path>
                  <path d="M4 12h16"></path>
                  <path d="M4 18h12"></path>
                </svg>
                <h4 className="font-medium text-text-primary">Neste artigo</h4>
              </div>
              <button
                onClick={toggleToc}
                className="p-1 hover:bg-foreground rounded-full transition-colors"
                aria-label="Fechar índice"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <nav className="p-3">
            <ul className="space-y-1">
              {tableOfContents.map((item) => (
                <li
                  key={item.id}
                  style={{ paddingLeft: `${(item.level - 1) * 12}px` }}
                  className={`transition-all duration-200 ${activeHeading === item.id ? "bg-accent/50 rounded" : ""}`}
                >
                  <a
                    href={`#${item.id}`}
                    className={`block py-1.5 px-2 text-sm rounded hover:bg-accent transition-colors relative ${
                      activeHeading === item.id
                        ? "text-primary-500 font-medium"
                        : "text-text-secondary hover:text-text-primary"
                    }`}
                    onClick={handleTocLinkClick}
                  >
                    {activeHeading === item.id && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary-500 rounded-full"></span>
                    )}
                    <span className="truncate block">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <div
        ref={containerRef}
        className={`notion-content prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary prose-img:rounded-lg ${className}`}
      />

      {/* Visualizador de imagem */}
      {imageViewerOpen && currentImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setImageViewerOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={currentImage || "/placeholder.svg"}
              alt="Imagem ampliada"
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button
              className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              onClick={() => setImageViewerOpen(false)}
              aria-label="Fechar visualizador"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NotionRenderer
