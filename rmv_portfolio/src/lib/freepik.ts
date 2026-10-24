/**
 * Freepik / Magnific Stock Content API client.
 *
 * Docs: https://docs.freepik.com (Magnific-branded Freepik API)
 * Product: https://www.magnific.com · https://www.freepik.com/api
 *
 * Auth: set FREEPIK_API_KEY or MAGNIFIC_API_KEY (server-only). The API accepts
 * `x-freepik-api-key`. Without a key, callers should fall back to the curated
 * assets in `src/data/freepik-experience.json`.
 */

const FREEPIK_API_BASE = 'https://api.freepik.com/v1'

export type FreepikResource = {
  id: number
  title: string
  url: string
  image?: {
    type?: string
    orientation?: string
    source?: { url?: string; size?: string; key?: string }
  }
  author?: { name?: string; slug?: string }
  licenses?: Array<{ type?: string; url?: string }>
}

export type FreepikSearchResult = {
  data: FreepikResource[]
  meta?: {
    current_page?: number
    last_page?: number
    per_page?: number
    total?: number
  }
}

export type FreepikDownloadResult = {
  data: {
    filename?: string
    url?: string
    signed_url?: string
  }
}

function apiKey() {
  const key =
    process.env.FREEPIK_API_KEY?.trim() ||
    process.env.MAGNIFIC_API_KEY?.trim()
  if (!key) {
    throw new Error(
      'FREEPIK_API_KEY (or MAGNIFIC_API_KEY) is not set. Add it to .env.local to search/download Freepik assets via API.',
    )
  }
  return key
}

async function freepikFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${FREEPIK_API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      'Accept-Language': 'en-US',
      'x-freepik-api-key': apiKey(),
      ...(init?.headers ?? {}),
    },
    cache: init?.cache ?? 'no-store',
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Freepik API ${res.status}: ${body || res.statusText}`)
  }

  return res.json() as Promise<T>
}

/** Search Freepik stock resources (photos, vectors, PSDs, …). */
export async function searchFreepikResources(options: {
  term: string
  page?: number
  limit?: number
  order?: 'relevance' | 'recent'
  /** e.g. `photo` or `vector` — passed as filters[content_type][photo]=1 */
  contentType?: 'photo' | 'vector' | 'psd'
}): Promise<FreepikSearchResult> {
  const params = new URLSearchParams()
  params.set('term', options.term)
  params.set('page', String(options.page ?? 1))
  params.set('limit', String(options.limit ?? 12))
  params.set('order', options.order ?? 'relevance')
  if (options.contentType) {
    params.set(`filters[content_type][${options.contentType}]`, '1')
  }

  return freepikFetch<FreepikSearchResult>(`/resources?${params.toString()}`)
}

/** Request a downloadable URL for a Freepik resource by id. */
export async function downloadFreepikResource(
  resourceId: number | string,
  imageSize: 'small' | 'medium' | 'large' | 'original' = 'large',
): Promise<FreepikDownloadResult> {
  const params = new URLSearchParams({ image_size: imageSize })
  return freepikFetch<FreepikDownloadResult>(
    `/resources/${resourceId}/download?${params.toString()}`,
  )
}

export function hasFreepikApiKey() {
  return Boolean(
    process.env.FREEPIK_API_KEY?.trim() ||
      process.env.MAGNIFIC_API_KEY?.trim(),
  )
}

/** Attribution string required by Freepik's free license for web use. */
export function freepikAttribution(author = 'Freepik') {
  return `designed by ${author} — Freepik.com`
}

/** Curated search queries used when refreshing Experience photos via API. */
export const EXPERIENCE_FREEPIK_QUERIES = {
  sourcegraph: 'artificial intelligence software developers coding office photo',
  grafana: 'monitoring dashboard telemetry analytics office photo',
  dell: 'data center server room engineer enterprise photo',
  education: 'university students campus library studying photo',
} as const
