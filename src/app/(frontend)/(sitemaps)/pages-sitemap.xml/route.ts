import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://vslrentcar.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
        changefreq: 'daily',
        priority: 1.0,
      },
      {
        loc: `${SITE_URL}/batumi`,
        lastmod: dateFallback,
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: `${SITE_URL}/tbilisi`,
        lastmod: dateFallback,
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: `${SITE_URL}/kutaisi`,
        lastmod: dateFallback,
        changefreq: 'daily',
        priority: 0.9,
      },
      {
        loc: `${SITE_URL}/terms`,
        lastmod: dateFallback,
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/contacts`,
        lastmod: dateFallback,
        changefreq: 'weekly',
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/reviews`,
        lastmod: dateFallback,
        changefreq: 'daily',
        priority: 0.8,
      },
      {
        loc: `${SITE_URL}/sos`,
        lastmod: dateFallback,
        changefreq: 'monthly',
        priority: 0.7,
      },
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
        changefreq: 'weekly',
        priority: 0.5,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
        changefreq: 'weekly',
        priority: 0.6,
      },
    ]

    const existingLocs = new Set(defaultSitemap.map((item) => item.loc))

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => {
            const loc = page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`
            return {
              loc,
              lastmod: page.updatedAt || dateFallback,
              changefreq: 'weekly',
              priority: 0.7,
            }
          })
          .filter((item) => !existingLocs.has(item.loc))
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
