"use client"

import { useEffect, useRef } from "react"
import DOMPurify from "dompurify"
import "./notion-styles.css"

interface NotionRendererProps {
  html: string
  className?: string
}

const NotionRenderer = ({ html, className = "" }: NotionRendererProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Configurar DOMPurify para permitir classes e IDs do Notion
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
      if (node.hasAttribute('class')) {
        // Preservar classes do Notion
        const classes = node.getAttribute('class')
        if (classes && classes.includes('notion-')) {
          node.setAttribute('class', classes)
        }
      }
      
      // Preservar IDs do Notion
      if (node.hasAttribute('id') && node.getAttribute('id')?.startsWith('1deb5818-')) {
        const id = node.getAttribute('id')
        if (id) {
          node.setAttribute('id', id)
        }
      }
    })

    // Sanitize HTML to prevent XSS attacks
    const sanitizedHtml = DOMPurify.sanitize(html, {
      ADD_ATTR: ['target', 'style'],
      ADD_TAGS: ['iframe', 'style'],
      FORBID_TAGS: ['script'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick']
    })
    
    containerRef.current.innerHTML = sanitizedHtml

    // Após inserir o HTML sanitizado, aplicamos os estilos
    const container = containerRef.current

    // Estilizar o artigo principal
    const article = container.querySelector('article')
    if (article) {
      article.classList.add('bg-card', 'rounded-lg', 'shadow-md', 'overflow-hidden')
    }

    // Estilizar o corpo da página
    const pageBody = container.querySelector('.page-body')
    if (pageBody) {
      pageBody.classList.add('p-6', 'md:p-8')
    }

    // Estilizar cabeçalhos
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    headings.forEach(heading => {
      heading.classList.add('font-heading', 'text-text-primary')
      
      if (heading.tagName === 'H1') {
        heading.classList.add('text-3xl', 'md:text-4xl', 'font-bold', 'mb-6', 'mt-8')
      } else if (heading.tagName === 'H2') {
        heading.classList.add('text-2xl', 'font-bold', 'mt-8', 'mb-4')
        
        // Adicionar ícones aos títulos H2
        const emoji = heading.textContent?.trim().startsWith('🧠') || 
                      heading.textContent?.trim().startsWith('⚙️') || 
                      heading.textContent?.trim().startsWith('🧩') || 
                      heading.textContent?.trim().startsWith('📉') || 
                      heading.textContent?.trim().startsWith('🔍') || 
                      heading.textContent?.trim().startsWith('🧬') || 
                      heading.textContent?.trim().startsWith('🛠') || 
                      heading.textContent?.trim().startsWith('💬') || 
                      heading.textContent?.trim().startsWith('🎯')
        
        if (!emoji) {
          heading.classList.add('flex', 'items-center', 'gap-2')
          const icon = document.createElement('span')
          icon.classList.add('text-primary')
          icon.textContent = '•'
          heading.prepend(icon)
        }
      } else if (heading.tagName === 'H3') {
        heading.classList.add('text-xl', 'font-bold', 'mt-6', 'mb-3', 'text-primary')
      }
    })

    // Estilizar parágrafos
    const paragraphs = container.querySelectorAll('p')
    paragraphs.forEach(p => {
      if (p.textContent?.trim()) {
        p.classList.add('text-text-primary', 'mb-4', 'leading-relaxed')
      }
    })

    // Estilizar listas
    const lists = container.querySelectorAll('ul, ol')
    lists.forEach(list => {
      list.classList.add('mb-6', 'ml-5', 'text-text-primary', 'space-y-2')
      
      if (list.classList.contains('bulleted-list')) {
        list.classList.add('list-disc')
      } else if (list.classList.contains('numbered-list')) {
        list.classList.add('list-decimal')
      }
    })

    // Estilizar itens de lista
    const listItems = container.querySelectorAll('li')
    listItems.forEach(item => {
      item.classList.add('mb-2')
    })

    // Estilizar blockquotes
    const blockquotes = container.querySelectorAll('blockquote')
    blockquotes.forEach(quote => {
      quote.classList.add('bg-accent', 'p-4', 'rounded-lg', 'my-4', 'text-text-secondary', 'border-l-4', 'border-primary', 'italic')
    })

    // Estilizar imagens e figuras
    const figures = container.querySelectorAll('figure')
    figures.forEach(figure => {
      figure.classList.add('my-8')
      
      const img = figure.querySelector('img')
      if (img) {
        img.classList.add('rounded-lg', 'shadow-md', 'mx-auto', 'max-w-full', 'h-auto')
        
        // Adicionar efeito de hover
        img.classList.add('transition-transform', 'duration-300', 'hover:scale-[1.02]')
        
        // Adicionar wrapper para centralizar
        const wrapper = document.createElement('div')
        wrapper.classList.add('flex', 'justify-center')
        img.parentNode?.insertBefore(wrapper, img)
        wrapper.appendChild(img)
      }
      
      const figcaption = figure.querySelector('figcaption')
      if (figcaption) {
        figcaption.classList.add('text-text-secondary', 'text-sm', 'text-center', 'mt-2')
      }
    })

    // Estilizar links
    const links = container.querySelectorAll('a')
    links.forEach(link => {
      link.classList.add('text-primary', 'hover:underline', 'transition-colors', 'font-medium')
      link.setAttribute('target', '_blank')
      link.setAttribute('rel', 'noopener noreferrer')
    })

    // Estilizar código inline
    const codeInline = container.querySelectorAll('code')
    codeInline.forEach(code => {
      if (code.parentElement?.tagName !== 'PRE') {
        code.classList.add('bg-accent', 'px-1.5', 'py-0.5', 'rounded', 'text-sm', 'font-mono', 'text-primary')
      }
    })

    // Estilizar blocos de código
    const codeBlocks = container.querySelectorAll('pre')
    codeBlocks.forEach(block => {
      block.classList.add('bg-card', 'p-4', 'rounded-lg', 'overflow-x-auto', 'my-4', 'border', 'border-border')
      
      const code = block.querySelector('code')
      if (code) {
        code.classList.add('text-text-primary', 'font-mono', 'text-sm')
      }
    })

    // Estilizar tabelas
    const tables = container.querySelectorAll('table')
    tables.forEach(table => {
      table.classList.add('w-full', 'border-collapse', 'my-6')
      
      // Adicionar wrapper para responsividade
      const wrapper = document.createElement('div')
      wrapper.classList.add('overflow-x-auto', 'my-6')
      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
      
      const headers = table.querySelectorAll('th')
      headers.forEach(th => {
        th.classList.add('bg-accent', 'p-2', 'text-left', 'font-medium', 'text-text-primary')
      })
      
      const cells = table.querySelectorAll('td')
      cells.forEach(td => {
        td.classList.add('border', 'border-border', 'p-2')
      })
    })

    // Estilizar divisores horizontais
    const hrs = container.querySelectorAll('hr')
    hrs.forEach(hr => {
      hr.classList.add('my-8', 'border-border', 'opacity-50')
    })

    // Estilizar classes específicas do Notion
    const columnLists = container.querySelectorAll('.column-list')
    columnLists.forEach(list => {
      list.classList.add('flex', 'flex-col', 'md:flex-row', 'gap-6', 'my-8')
    })

    const columns = container.querySelectorAll('.column')
    columns.forEach(column => {
      column.classList.add('flex-1', 'min-w-0')
    })

    // Estilizar elementos com classes de cor do Notion
    const highlights = container.querySelectorAll('[class*="highlight-"]')
    highlights.forEach(highlight => {
      if (highlight.classList.contains('highlight-blue')) {
        highlight.classList.add('text-primary', 'font-medium')
      } else if (highlight.classList.contains('highlight-red')) {
        highlight.classList.add('text-error', 'font-medium')
      } else if (highlight.classList.contains('highlight-green')) {
        highlight.classList.add('text-success', 'font-medium')
      } else if (highlight.classList.contains('highlight-yellow')) {
        highlight.classList.add('text-warning', 'font-medium')
      } else if (highlight.classList.contains('highlight-gray')) {
        highlight.classList.add('text-text-secondary')
      }
    })

    // Estilizar fundos coloridos
    const backgroundHighlights = container.querySelectorAll('[class*="_background"]')
    backgroundHighlights.forEach(highlight => {
      if (highlight.classList.contains('highlight-blue_background')) {
        highlight.classList.add('bg-primary/10', 'px-1', 'rounded')
      } else if (highlight.classList.contains('highlight-red_background')) {
        highlight.classList.add('bg-error/10', 'px-1', 'rounded')
      } else if (highlight.classList.contains('highlight-green_background')) {
        highlight.classList.add('bg-success/10', 'px-1', 'rounded')
      } else if (highlight.classList.contains('highlight-yellow_background')) {
        highlight.classList.add('bg-warning/10', 'px-1', 'rounded')
      } else if (highlight.classList.contains('highlight-gray_background')) {
        highlight.classList.add('bg-text-secondary/10', 'px-1', 'rounded')
      }
    })

    // Estilizar checkboxes
    const checkboxes = container.querySelectorAll('.checkbox')
    checkboxes.forEach(checkbox => {
      checkbox.classList.add('inline-flex', 'items-center', 'justify-center', 'w-4', 'h-4', 'mr-2')
    })

    // Estilizar to-do lists
    const todoLists = container.querySelectorAll('.to-do-list')
    todoLists.forEach(list => {
      list.classList.add('space-y-2', 'my-4')
    })

    // Estilizar toggle lists
    const toggleLists = container.querySelectorAll('.toggle')
    toggleLists.forEach(list => {
      list.classList.add('space-y-2', 'my-4')
    })

    // Estilizar detalhes/summary (toggles)
    const details = container.querySelectorAll('details')
    details.forEach(detail => {
      detail.classList.add('bg-card', 'rounded-lg', 'overflow-hidden', 'border', 'border-border', 'my-2')
      
      const summary = detail.querySelector('summary')
      if (summary) {
        summary.classList.add('p-3', 'cursor-pointer', 'font-medium', 'flex', 'items-center')
        summary.classList.add('hover:bg-accent', 'transition-colors')
      }
    })

    // Estilizar callouts
    const callouts = container.querySelectorAll('.callout')
    callouts.forEach(callout => {
      callout.classList.add('bg-accent', 'p-4', 'rounded-lg', 'my-6', 'flex', 'items-start', 'gap-3')
    })

    // Estilizar bookmarks
    const bookmarks = container.querySelectorAll('.bookmark')
    bookmarks.forEach(bookmark => {
      bookmark.classList.add('border', 'border-border', 'rounded-lg', 'overflow-hidden', 'my-6', 'no-underline')
      
      const info = bookmark.querySelector('.bookmark-info')
      if (info) {
        info.classList.add('p-4')
      }
    })

    // Estilizar classes de fonte
    const sansFonts = container.querySelectorAll('.sans')
    sansFonts.forEach(font => {
      font.classList.add('font-body')
    })

    const serifFonts = container.querySelectorAll('.serif')
    serifFonts.forEach(font => {
      font.classList.add('font-serif')
    })

    const monoFonts = container.querySelectorAll('.mono')
    monoFonts.forEach(font => {
      font.classList.add('font-mono')
    })

    // Estilizar classes de bloco de cor
    const blockColors = container.querySelectorAll('[class*="block-color-"]')
    blockColors.forEach(block => {
      if (block.classList.contains('block-color-blue')) {
        block.classList.add('text-primary')
      } else if (block.classList.contains('block-color-red')) {
        block.classList.add('text-error')
      } else if (block.classList.contains('block-color-green')) {
        block.classList.add('text-success')
      } else if (block.classList.contains('block-color-yellow')) {
        block.classList.add('text-warning')
      } else if (block.classList.contains('block-color-gray')) {
        block.classList.add('text-text-secondary')
      }
    })

    // Adicionar animações sutis
    const animatedElements = container.querySelectorAll('h1, h2, h3, blockquote, figure')
    animatedElements.forEach(el => {
      el.classList.add('motion-safe:animate-fadeIn')
    })

    // Adicionar classes para melhorar a legibilidade
    container.querySelectorAll('p, li').forEach(el => {
      el.classList.add('text-base', 'md:text-lg')
    })

    // Melhorar a aparência de strong e em
    container.querySelectorAll('strong').forEach(el => {
      el.classList.add('font-semibold', 'text-text-primary')
    })

    container.querySelectorAll('em').forEach(el => {
      el.classList.add('italic', 'text-text-primary')
    })

  }, [html])

  return (
    <div 
      ref={containerRef} 
      className={`notion-content prose prose-lg max-w-none dark:prose-invert prose-headings:font-heading prose-a:text-primary prose-img:rounded-lg ${className}`}
    />
  )
}

export default NotionRenderer