"use client"

import type React from "react"

import { Helmet } from "react-helmet-async"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  ogType?: "website" | "article"
  url?: string
  canonical?: string
  noIndex?: boolean
  structuredData?: Record<string, any>
  children?: React.ReactNode
}

const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = "/og-image.jpg",
  ogType = "website",
  url,
  canonical,
  noIndex = false,
  structuredData,
  children,
}: SEOHeadProps) => {
  const siteUrl = url || (typeof window !== "undefined" ? window.location.href : "")
  const pageTitle = title ? `${title} | DevEmDesenvolvimento` : "DevEmDesenvolvimento | Blog e Cursos de Programação"
  const pageDescription =
    description ||
    "Blog e plataforma de cursos sobre desenvolvimento web, programação e tecnologia. Aprenda React, TypeScript, JavaScript, CSS e muito mais."
  const canonicalUrl = canonical || siteUrl

  return (
    <Helmet>
      {/* Título e meta tags básicas */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta
        property="og:image"
        content={ogImage.startsWith("http") ? ogImage : `${window.location.origin}${ogImage}`}
      />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="DevEmDesenvolvimento" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta
        name="twitter:image"
        content={ogImage.startsWith("http") ? ogImage : `${window.location.origin}${ogImage}`}
      />

      {/* Structured Data / JSON-LD */}
      {structuredData && <script type="application/ld+json">{JSON.stringify(structuredData)}</script>}

      {/* Conteúdo adicional */}
      {children}
    </Helmet>
  )
}

export default SEOHead
