const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/admin/*',
    '/next/*',
    '/api/*',
    '/*.png',
    '/*.ico',
    '/*.svg',
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
  ],
  additionalPaths: async (config) => {
    const pages = [
      { path: '/', priority: 1.0, changefreq: 'daily' },
      { path: '/terms', priority: 0.8, changefreq: 'weekly' },
      { path: '/contacts', priority: 0.8, changefreq: 'weekly' },
      { path: '/reviews', priority: 0.8, changefreq: 'daily' },
      { path: '/sos', priority: 0.7, changefreq: 'monthly' },
      { path: '/search', priority: 0.5, changefreq: 'weekly' },
      { path: '/posts', priority: 0.6, changefreq: 'weekly' },
    ]

    return Promise.all(
      pages.map(async (page) => {
        const transformed = await config.transform(config, page.path)
        return {
          ...transformed,
          priority: page.priority,
          changefreq: page.changefreq,
        }
      }),
    )
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/*', '/next/*', '/api/*'],
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
