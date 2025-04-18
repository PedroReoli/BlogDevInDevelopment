import * as cheerio from "cheerio"
import { supabase } from "../services/supabase"

/**
 * Processa o HTML exportado do Notion e faz upload das imagens para o Supabase Storage
 */
export async function processHtml(
  html: string,
  slug: string,
  isCourse = false,
  imageFiles: File[] = [],
): Promise<string> {
  // Carregar o HTML com cheerio
  const $ = cheerio.load(html)

  // Mapa para relacionar nomes de arquivos com os arquivos reais
  const fileMap = new Map<string, File>()
  imageFiles.forEach((file) => {
    fileMap.set(file.name, file)
  })

  // Encontrar todas as imagens no HTML
  const imagePromises: Promise<void>[] = []

  $("img").each((_, el) => {
    const img = $(el)
    const src = img.attr("src")

    if (src && !src.startsWith("http")) {
      // É uma imagem local da exportação
      const fileName = src.split("/").pop() || ""
      const file = fileMap.get(fileName)

      if (file) {
        // Definir o caminho no Supabase Storage
        const storagePath = isCourse ? `courses/${slug}/images/${fileName}` : `blog/${slug}/images/${fileName}`

        // Adicionar à lista de uploads
        const uploadPromise = uploadImageToSupabase(file, storagePath)
          .then((publicUrl) => {
            // Atualizar o src da imagem no HTML
            img.attr("src", publicUrl)
          })
          .catch((err) => {
            console.error(`Erro ao fazer upload da imagem ${fileName}:`, err)
          })

        imagePromises.push(uploadPromise)
      }
    }
  })

  // Aguardar todos os uploads de imagens
  await Promise.all(imagePromises)

  // Adicionar classes para estilização
  $("h1, h2, h3, h4, h5, h6").addClass("notion-heading")
  $("p").addClass("notion-paragraph")
  $("ul").addClass("notion-list notion-list-disc")
  $("ol").addClass("notion-list notion-list-decimal")
  $("a").addClass("notion-link")
  $("blockquote").addClass("notion-blockquote")
  $("code").addClass("notion-code")
  $("pre").addClass("notion-pre")
  $("table").addClass("notion-table")
  $("img").addClass("notion-image")

  // Retornar o HTML processado
  return $.html()
}

/**
 * Faz upload de uma imagem para o Supabase Storage
 */
async function uploadImageToSupabase(file: File, storagePath: string): Promise<string> {
  // Fazer upload do arquivo para o Supabase Storage
  const { data, error } = await supabase.storage.from("content").upload(storagePath, file, {
    cacheControl: "3600",
    upsert: true,
  })

  if (error) {
    throw error
  }

  // Obter a URL pública da imagem
  const { data: urlData } = supabase.storage.from("content").getPublicUrl(storagePath)

  return urlData.publicUrl
}
