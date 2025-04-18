import { supabase } from "@/lib/supabase"

export const UploadService = {
  /**
   * Faz upload de uma imagem para o Supabase Storage
   * @param file Arquivo de imagem para upload
   * @param bucket Nome do bucket (pasta) no Storage
   * @returns URL pública da imagem
   */
  async uploadImage(file: File, bucket = "editor-images"): Promise<string> {
    // Verificar se o arquivo é uma imagem
    if (!file.type.startsWith("image/")) {
      throw new Error("O arquivo deve ser uma imagem")
    }

    // Verificar tamanho do arquivo (máx. 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("A imagem deve ter no máximo 5MB")
    }

    // Gerar nome único para o arquivo
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${bucket}/${fileName}`

    // Fazer upload para o Supabase Storage
    const { error } = await supabase.storage.from(bucket).upload(filePath, file)

    if (error) {
      throw new Error(`Erro ao fazer upload da imagem: ${error.message}`)
    }

    // Obter URL pública da imagem
    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)

    return data.publicUrl
  },
}
