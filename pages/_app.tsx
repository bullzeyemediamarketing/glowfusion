// import '../tailwind.css'

// import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
// import { AppProps } from 'next/app'
// import dynamic from 'next/dynamic'

// export interface SharedPageProps {
//   draftMode: boolean
//   token: string
// }

// const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

// export default function App({
//   Component,
//   pageProps,
// }: AppProps<SharedPageProps>) {
//   const { draftMode, token } = pageProps
//   return (
//     <>
//       {draftMode ? (
//         <PreviewProvider token={token}>
//           <Component {...pageProps} />
//         </PreviewProvider>
//       ) : (
//         <Component {...pageProps} />
//       )}
//       {draftMode && <VisualEditing />}
//     </>
//   )
// }


import '../tailwind.css'
import { DefaultSeo } from 'next-seo'
import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

export interface SharedPageProps {
  draftMode: boolean
  token: string
}

const PreviewProvider = dynamic(() => import('components/PreviewProvider'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  return (
    <>
      {/* ✅ Global SEO Settings */}
      <DefaultSeo
        titleTemplate="%s | Glow Fusion - Advanced Health & Skincare Solutions"
        defaultTitle="Glow Fusion - Advanced Health & Skincare Solutions"
        description="Glow Fusion offers science-backed skincare and advanced health solutions to enhance your natural beauty and well-being."
        canonical="https://glowfusion.vercel.app/"
        openGraph={{
          url: "https://glowfusion.vercel.app/",
          title: "Glow Fusion - Advanced Health & Skincare Solutions",
          description: "Glow Fusion offers science-backed skincare and advanced health solutions to enhance your natural beauty and well-being.",
          images: [
            {
              url: "https://glowfusion.vercel.app/glowfusion-image.jpg", // Ensure this image exists
              width: 1200,
              height: 630,
              alt: "Glow Fusion",
            },
          ],
          site_name: "Glow Fusion -Advanced Health & Skincare Solutions",
        }}
        twitter={{
          handle: "@GlowFusion",
          site: "@GlowFusion",
          cardType: "summary_large_image",
        }}
      />

      {/* JSON-LD Structured Data for Rich Results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "WebSite",
            "url": "https://glowfusion.vercel.app/",
            "name": "Glow Fusion",
            "description": "Glow Fusion is your trusted destination for cutting-edge health and skincare solutions. We combine science-backed treatments with innovative wellness.",
            "publisher": {
              "@type": "Organization",
              "name": "Glow Fusion",
              "logo": {
                "@type": "ImageObject",
                "url": "https://glowfusion.vercel.app/logo.png", // Use your actual logo URL here
              },
            },
            "sameAs": [
              "https://www.facebook.com/glowfusion",
              "https://twitter.com/glowfusion",
              "https://www.instagram.com/glowfusion",
            ],
            "mainEntityOfPage": "https://glowfusion.vercel.app/",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://glowfusion.vercel.app/",
                },
              ],
            },
          }),
        }}
      />

      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      {draftMode && <VisualEditing />}
    </>
  )
}
