/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://domiex-next-default-build.vercel.app/',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  transform: async (config, url) => {
    return {
      loc: url,
      lastmod: new Date().toISOString(),
    }
  },
}
