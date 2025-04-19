"use client"

import { useEffect, useState, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"
import toast from "react-hot-toast"

interface EnsureStorageBucketProps {
  bucketName: string
  children: ReactNode
}

export const EnsureStorageBucket = ({ bucketName, children }: EnsureStorageBucketProps) => {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const ensureBucketExists = async () => {
      try {
        // Verificar se o bucket existe
        const { data: buckets, error: listError } = await supabase.storage.listBuckets()

        if (listError) {
          throw new Error(`Erro ao verificar buckets: ${listError.message}`)
        }

        const bucketExists = buckets.some((bucket) => bucket.name === bucketName)

        if (!bucketExists) {
          // Criar o bucket se não existir
          const { error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true, // Tornar os arquivos públicos por padrão
          })

          if (createError) {
            throw new Error(`Erro ao criar bucket: ${createError.message}`)
          }

          // Definir política de acesso público para o bucket
          const { error: policyError } = await supabase.storage.from(bucketName).createSignedUrl("dummy.txt", 60)

          if (policyError && !policyError.message.includes("not found")) {
            console.warn(`Aviso ao configurar política: ${policyError.message}`)
          }
        }

        setIsReady(true)
      } catch (err) {
        console.error("Erro ao configurar bucket de armazenamento:", err)
        setError((err as Error).message)
        toast.error("Erro ao configurar armazenamento de imagens")
      }
    }

    ensureBucketExists()
  }, [bucketName])

  if (error) {
    return (
      <div
        className="p-4 border rounded-md"
        style={{
          color: "var(--color-error)",
          borderColor: "var(--color-error)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
        }}
      >
        <p>Erro ao configurar armazenamento de imagens: {error}</p>
        <p className="text-sm mt-2">Verifique as permissões do Supabase Storage e tente novamente.</p>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="flex items-center justify-center p-4">
        <div
          className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: "var(--color-primary)" }}
        ></div>
        <span className="ml-2">Configurando armazenamento...</span>
      </div>
    )
  }

  return <>{children}</>
}

export default EnsureStorageBucket
