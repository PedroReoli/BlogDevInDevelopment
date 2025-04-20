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
            // Se o erro for que o recurso já existe, podemos ignorar
            if (createError.message.includes("already exists")) {
              console.log(`Bucket ${bucketName} já existe, continuando...`)
            } else {
              throw new Error(`Erro ao criar bucket: ${createError.message}`)
            }
          }
        }

        // Mesmo se o bucket já existir, podemos continuar
        setIsReady(true)
      } catch (err) {
        console.error("Erro ao configurar bucket de armazenamento:", err)
        // Não definir o erro se for apenas "already exists"
        if (!(err as Error).message.includes("already exists")) {
          setError((err as Error).message)
          toast.error("Erro ao configurar armazenamento de imagens")
        } else {
          // Se o erro for apenas que o bucket já existe, podemos continuar
          setIsReady(true)
        }
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
