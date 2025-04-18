"use client"

import { Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"

interface ShareButtonsProps {
  url: string
  title: string
  description?: string
}

const ShareButtons = ({ url, title, description = "" }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      alert("Link copiado para a área de transferência!")
    } catch (err) {
      console.error("Erro ao copiar link:", err)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Compartilhar</h3>
      <div className="flex space-x-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
          aria-label="Compartilhar no Facebook"
        >
          <Facebook size={18} />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors"
          aria-label="Compartilhar no Twitter"
        >
          <Twitter size={18} />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors"
          aria-label="Compartilhar no LinkedIn"
        >
          <Linkedin size={18} />
        </a>
        <button
          onClick={copyToClipboard}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          aria-label="Copiar link"
        >
          <LinkIcon size={18} />
        </button>
      </div>
    </div>
  )
}

export default ShareButtons
