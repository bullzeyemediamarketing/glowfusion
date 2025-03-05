// import PostPage from 'components/PostPage'
// import PreviewPostPage from 'components/PreviewPostPage'
// import { readToken } from 'lib/sanity.api'
// import {
//   getAllPostsSlugs,
//   getClient,
//   getPostAndMoreStories,
//   getSettings,
// } from 'lib/sanity.client'
// import { Post, Settings } from 'lib/sanity.queries'
// import { GetStaticProps } from 'next'
// import type { SharedPageProps } from 'pages/_app'

// interface PageProps extends SharedPageProps {
//   post: Post
//   morePosts: Post[]
//   settings?: Settings
// }

// interface Query {
//   [key: string]: string
// }

// export default function ProjectSlugRoute(props: PageProps) {
//   const { settings, post, morePosts, draftMode } = props

//   if (draftMode) {
//     return (
//       <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
//     )
//   }

//   return <PostPage post={post} morePosts={morePosts} settings={settings} />
// }

// export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
//   const { draftMode = false, params = {} } = ctx
//   const client = getClient(draftMode ? { token: readToken } : undefined)

//   const [settings, { post, morePosts }] = await Promise.all([
//     getSettings(client),
//     getPostAndMoreStories(client, params.slug),
//   ])

//   if (!post) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       post,
//       morePosts,
//       settings,
//       draftMode,
//       token: draftMode ? readToken : '',
//     },
//   }
// }

// export const getStaticPaths = async () => {
//   const slugs = await getAllPostsSlugs()

//   return {
//     paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
//     fallback: 'blocking',
//   }
// }

import PostPage from 'components/PostPage'
import { NextSeo } from 'next-seo'
import PreviewPostPage from 'components/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  post: Post
  morePosts: Post[] 
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, draftMode } = props

  // ✅ Generate SEO-friendly URL based on the post slug
  const postUrl = `https://glowfusion.vercel.app/posts/${post.slug}`

  // ✅ SEO for Individual Blog Post
 const seoTitle = post.title || "Default Title"


  // ✅ Truncate SEO Description to 160 characters max
  const seoDescription = post.excerpt
    ? post.excerpt.length > 157
      ? post.excerpt.substring(0, 155) + '.'  // Truncate if it exceeds 160 characters
      : post.excerpt
    : "Read this amazing blog post on GLOW FUSION."

  const seoImage = post.coverImage ? post.coverImage : "default-image.jpg" // Provide a fallback image if there's no cover image

  // Adding Article Schema Markup (Structured Data)
  const structuredData = {
    "@context": "http://schema.org",
    "@type": "Article",
    headline: post.title, 
    description: seoDescription,
    image: seoImage, // Use the post cover image for the structured data image
    author: {
      "@type": "Person",
      name: "Glow Fusion", // Update with author name if available
    },
    publisher: {
      "@type": "Organization",
      name: "Glow Fusion",
      logo: {
        "@type": "ImageObject",
        url: seoImage, // Use the post cover image as the publisher's logo
      },
    },
    // Handle the missing `publishedAt` and `updatedAt` fields:
    // datePublished: post.createdAt || post.publishedDate, // Use 'createdAt' or 'publishedDate' as fallback
    // dateModified: post.updatedAt || post.createdAt || post.publishedDate, // Fallback to 'createdAt' or 'publishedDate'
    url: postUrl,
  }

  if (draftMode) {
    return (
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    )
  }

  return (
    <>
      {/* Dynamic SEO Tags */}
      <NextSeo
        title={seoTitle} // Dynamic title
        description={seoDescription} // Dynamic description
        canonical={postUrl} // Dynamic canonical URL
        openGraph={{
          url: postUrl,
          title: seoTitle,
          description: seoDescription,
          images: post.coverImage
            ? [{ url: post.coverImage, alt: seoTitle }]
            : [{ url: seoImage, alt: seoTitle }],
          site_name: "GlowUp Beauty",
        }}
        twitter={{
          handle: "@GlowFusion",
          site: "@GlowFusion",
          cardType: "summary_large_image",
        }}
      />
      
      {/* Add structured data to the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <PostPage post={post} morePosts={morePosts} settings={settings} />
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, { post, morePosts }] = await Promise.all([ 
    getSettings(client), 
    getPostAndMoreStories(client, params.slug),
  ])

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      morePosts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
    fallback: 'blocking',
  }
}


// import PostPage from 'components/PostPage'
// import { NextSeo } from 'next-seo'
// import PreviewPostPage from 'components/PreviewPostPage'
// import { readToken } from 'lib/sanity.api'
// import {
//   getAllPostsSlugs,
//   getClient,
//   getPostAndMoreStories,
//   getSettings,
// } from 'lib/sanity.client'
// import { Post, Settings } from 'lib/sanity.queries'
// import { GetStaticProps } from 'next'
// import type { SharedPageProps } from 'pages/_app'

// interface PageProps extends SharedPageProps {
//   post: Post
//   morePosts: Post[] 
//   settings?: Settings
// }

// interface Query {
//   [key: string]: string
// }

// export default function ProjectSlugRoute(props: PageProps) {
//   const { settings, post, morePosts, draftMode } = props

//   // ✅ Generate SEO-friendly URL based on the post slug
//   const postUrl = `https://glowfusion.vercel.app/posts/${post.slug}`

//   // ✅ SEO for Individual Blog Post
//   // Ensure SEO title is the post title and truncated to a max of 60 characters
//   // const seoTitle = post.title ? (post.title.length > 60 ? post.title.substring(0, 60) : post.title) : "Default Title"

//    const seoTitle = post.title
//     ? post.title.length > 60
//       ? post.title.substring(0, 59)  + '.'  // Truncate if it exceeds 160 characters
//       : post.title
//     : "Default Title"

//   // ✅ Truncate SEO Description to 160 characters max
//   const seoDescription = post.excerpt
//     ? post.excerpt.length > 155 
//       ? post.excerpt.substring(0, 154) + '.'  // Truncate if it exceeds 160 characters
//       : post.excerpt
//     : "Read this amazing blog post on GLOW FUSION."

//   const seoImage = post.coverImage ? post.coverImage : "default-image.jpg" // Provide a fallback image if there's no cover image

//   // Adding Article Schema Markup (Structured Data)
//   const structuredData = {
//     "@context": "http://schema.org",
//     "@type": "Article",
//     headline: post.title, 
//     description: seoDescription,
//     image: seoImage, // Use the post cover image for the structured data image
//     author: {
//       "@type": "Person",
//       name: "Glow Fusion", // Update with author name if available
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Glow Fusion",
//       logo: {
//         "@type": "ImageObject",
//         url: seoImage, // Use the post cover image as the publisher's logo
//       },
//     },
//     // Handle the missing `publishedAt` and `updatedAt` fields:
//     url: postUrl,
//   }

//   if (draftMode) {
//     return (
//       <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
//     )
//   }

//   return (
//     <>
//       {/* Dynamic SEO Tags */}
//       <NextSeo
//         title={seoTitle} // Dynamic title
//         description={seoDescription} // Dynamic description
//         canonical={postUrl} // Dynamic canonical URL
//         openGraph={{
//           url: postUrl,
//           title: seoTitle,
//           description: seoDescription,
//           images: post.coverImage
//             ? [{ url: post.coverImage, alt: seoTitle }]
//             : [{ url: seoImage, alt: seoTitle }],
//           site_name: "GlowUp Beauty",
//         }}
//         twitter={{
//           handle: "@GlowFusion",
//           site: "@GlowFusion",
//           cardType: "summary_large_image",
//         }}
//       />
      
//       {/* Add structured data to the page */}
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(structuredData),
//         }}
//       />
      
//       <PostPage post={post} morePosts={morePosts} settings={settings} />
//     </>
//   )
// }

// export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
//   const { draftMode = false, params = {} } = ctx
//   const client = getClient(draftMode ? { token: readToken } : undefined)

//   const [settings, { post, morePosts }] = await Promise.all([
//     getSettings(client),
//     getPostAndMoreStories(client, params.slug),
//   ])

//   if (!post) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       settings,
//       post,
//       morePosts,
//       draftMode,
//     },
//     revalidate: 60, // ISR: Regenerate page every 60 seconds
//   }
// }

// export const getStaticPaths = async () => {
//   const slugs = await getAllPostsSlugs()

//   return {
//     paths: slugs?.map(({ slug }) => `/posts/${slug}`) || [],
//     fallback: 'blocking',
//   }
// }


