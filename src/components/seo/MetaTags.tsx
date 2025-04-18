"use client"

import { Helmet } from "react-helmet"

interface MetaTagsProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogType?: "website" | "article"
  url?: string
}

const MetaTags = ({
  title,
  description,
  keywords = "",
  ogImage = "/og-image.jpg",
  ogType = "website",
  url,
}: MetaTagsProps) => {
  const siteUrl = url || window.location.href
  const fullTitle = `${title} | DevEmDesenvolvimento`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={siteUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteUrl} />
    </Helmet>
  )
}

export default MetaTags
