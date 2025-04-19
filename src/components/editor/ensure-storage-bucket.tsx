"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import toast from "react-hot-toast"

interface EnsureStorageBucketProps {
  bucketName: string
  children: React.ReactNode
}

const EnsureStorageBucket = ({ bucketName, children }: EnsureStorageBucketProps) => {
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
      <div className="text-error p-4 border border-error rounded-md bg-error/10">
        <p>Erro ao configurar armazenamento de imagens: {error}</p>
        <p className="text-sm mt-2">Verifique as permissões do Supabase Storage e tente novamente.</p>
      </div>
    )
  }

  if (!isReady) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="inline-block animate-spin rounded-


Vamos atualizar o serviço UploadService:

\
