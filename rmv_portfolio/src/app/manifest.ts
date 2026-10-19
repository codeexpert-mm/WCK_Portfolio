import { MetadataRoute } from 'next'
import { PERSON, SITE } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSON.name} - ${PERSON.jobTitle}`,
    short_name: `${PERSON.givenName} ${PERSON.familyName}`,
    description: SITE.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0070f3',
    orientation: 'portrait-primary',
    categories: ['portfolio', 'developer', 'technology'],
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    lang: 'en',
    dir: 'ltr',
  }
}
