// import { getAllPosts, getClient } from 'lib/sanity.client'

// type SitemapLocation = {
//   url: string
//   changefreq?:
//     | 'always'
//     | 'hourly'
//     | 'daily'
//     | 'weekly'
//     | 'monthly'
//     | 'yearly'
//     | 'never'
//   priority: number
//   lastmod?: Date
// }

// // Use this to manually add routes to the sitemap
// const defaultUrls: SitemapLocation[] = [
//   {
//     url: '/',
//     changefreq: 'daily',
//     priority: 1,
//     lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
//   },
//   //   { url: '/about', priority: 0.5 },
//   //   { url: '/blog', changefreq: 'weekly', priority: 0.7 },
// ]

// const createSitemap = (locations: SitemapLocation[]) => {
//   // const baseUrl = process.env.NEXT_PUBLIC_URL // Make sure to configure this
//    const baseUrl = 'https://glowfusion.vercel.app'
  
//   return `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${locations
//         .map((location) => {
//           return `<url>
//                     <loc>${baseUrl}${location.url}</loc>
//                     <priority>${location.priority}</priority>
//                     ${
//                       location.lastmod
//                         ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
//                         : ''
//                     }
//                   </url>`
//         })
//         .join('')}
//   </urlset>
//   `
// }

// export default function SiteMap() {
//   // getServerSideProps will do the heavy lifting
// }

// export async function getServerSideProps({ res }) {
//   const client = getClient()

//   // Get list of Post urls
//   const [posts = []] = await Promise.all([getAllPosts(client)])
//   const postUrls: SitemapLocation[] = posts
//     .filter(({ slug = '' }) => slug)
//     .map((post) => {
//       return {
//         url: `/posts/${post.slug}`,
//         priority: 0.5,
//         lastmod: new Date(post._updatedAt),
//       }
//     })

//   // ... get more routes here

//   // Return the default urls, combined with dynamic urls above
//   const locations = [...defaultUrls, ...postUrls]

//   // Set response to XML
//   res.setHeader('Content-Type', 'text/xml')
//   res.write(createSitemap(locations))
//   res.end()

//   return {
//     props: {},
//   }
// }


// import { getAllPosts, getClient } from 'lib/sanity.client'

// type SitemapLocation = {
//   url: string
//   changefreq?:
//     | 'always'
//     | 'hourly'
//     | 'daily'
//     | 'weekly'
//     | 'monthly'
//     | 'yearly'
//     | 'never'
//   priority: number
//   lastmod?: Date
//   type?: string // Optionally add a type to each URL if needed
// }

// // Use this to manually add routes to the sitemap
// const defaultUrls: SitemapLocation[] = [
//   {
//     url: '/',
//     changefreq: 'daily',
//     priority: 1,
//     lastmod: new Date(), // or custom date: '2023-06-12T00:00:00.000Z',
//     type: 'webpage', // Optional type for the homepage
//   },
//   //   { url: '/about', priority: 0.5 },
//   //   { url: '/blog', changefreq: 'weekly', priority: 0.7 },
// ]

// const createSitemap = (locations: SitemapLocation[]) => {
//   const baseUrl = 'https://glowfusion.vercel.app'
  
//   return `<?xml version="1.0" encoding="UTF-8"?>
//   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//       ${locations
//         .map((location) => {
//           return `<url>
//                     <loc>${baseUrl}${location.url}</loc>
//                     <priority>${location.priority}</priority>
//                     ${
//                       location.lastmod
//                         ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
//                         : ''
//                     }
//                     ${
//                       location.changefreq
//                         ? `<changefreq>${location.changefreq}</changefreq>`
//                         : ''
//                     }
//                     ${
//                       location.type
//                         ? `<type>${location.type}</type>` // Adding type (Optional)
//                         : ''
//                     }
//                   </url>`
//         })
//         .join('')}
//   </urlset>
//   `
// }

// export default function SiteMap() {
//   // getServerSideProps will do the heavy lifting
// }

// export async function getServerSideProps({ res }) {
//   const client = getClient()

//   // Get list of Post urls
//   const [posts = []] = await Promise.all([getAllPosts(client)])
//   const postUrls: SitemapLocation[] = posts
//     .filter(({ slug = '' }) => slug)
//     .map((post) => {
//       return {
//         url: `/posts/${post.slug}`,
//         priority: 0.5,
//         lastmod: new Date(post._updatedAt),
//         type: 'article', // Optional type for articles
//       }
//     })

//   // Combine the default URLs with dynamic post URLs
//   const locations = [...defaultUrls, ...postUrls]

//   // Set response to XML
//   res.setHeader('Content-Type', 'text/xml')
//   res.write(createSitemap(locations))
//   res.end()

//   return {
//     props: {},
//   }
// }

import { getAllPosts, getClient } from 'lib/sanity.client'

type SitemapLocation = {
  url: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
  priority: number
  lastmod?: Date
}

const createSitemapIndex = (sitemapUrls: string[]) => {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapUrls
        .map((url) => {
          return `<sitemap>
                    <loc>${url}</loc>
                  </sitemap>`
        })
        .join('')}
  </sitemapindex>`
}

const createSitemap = (locations: SitemapLocation[]) => {
  const baseUrl = 'https://glowfusion.vercel.app'
  
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${locations
        .map((location) => {
          return `<url>
                    <loc>${baseUrl}${location.url}</loc>
                    <priority>${location.priority}</priority>
                    ${
                      location.lastmod
                        ? `<lastmod>${location.lastmod.toISOString()}</lastmod>`
                        : ''
                    }
                    ${
                      location.changefreq
                        ? `<changefreq>${location.changefreq}</changefreq>`
                        : ''
                    }
                  </url>`
        })
        .join('')}
  </urlset>
  `
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const client = getClient()

  // Get list of Post urls
  const [posts = []] = await Promise.all([getAllPosts(client)])
  const postUrls: SitemapLocation[] = posts
    .filter(({ slug = '' }) => slug)
    .map((post) => {
      return {
        url: `/posts/${post.slug}`,
        priority: 0.5,
        lastmod: new Date(post._updatedAt),
      }
    })

  // Similarly, you can generate page URLs or any other URLs you want
  const pageUrls: SitemapLocation[] = [
    { url: '/', priority: 1, lastmod: new Date() },
    // Add more page URLs here
  ]

  // Generate the post and page sitemaps
  const postSitemapUrl = 'https://glowfusion.vercel.app/post-sitemap.xml'
  const pageSitemapUrl = 'https://glowfusion.vercel.app/page-sitemap.xml'

  // Generate the location URLs
  const locations = [...postUrls, ...pageUrls]
  
  // Create individual sitemaps for posts and pages
  const postSitemap = createSitemap(postUrls)
  const pageSitemap = createSitemap(pageUrls)

  // Set response headers for XML
  res.setHeader('Content-Type', 'text/xml')

  // If you are requesting the sitemap index, send it
  if (res.req.url === '/sitemap.xml') {
    res.write(createSitemapIndex([postSitemapUrl, pageSitemapUrl]))
    res.end()
  } 
  // If you are requesting a specific post or page sitemap, send it
  else if (res.req.url === '/post-sitemap.xml') {
    res.write(postSitemap)
    res.end()
  } else if (res.req.url === '/page-sitemap.xml') {
    res.write(pageSitemap)
    res.end()
  }

  return {
    props: {},
  }
}

