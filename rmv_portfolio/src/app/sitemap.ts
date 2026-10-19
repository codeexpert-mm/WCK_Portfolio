import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * A sitemap lists indexable URLs. Nothing else belongs in it.
 *
 * Fragments such as `/#about` are not separate resources — the server returns
 * the identical document for all of them — so they are left out. The site is a
 * single page, so the home URL is the only entry.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
