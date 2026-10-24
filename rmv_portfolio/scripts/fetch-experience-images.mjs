/**
 * Downloads curated Magnific / Freepik free *photos* for the Experience section.
 *
 * Prefer FREEPIK_API_KEY / MAGNIFIC_API_KEY + the Stock API when available
 * (see src/lib/freepik.ts). Falls back to verified Magnific CDN photo URLs so
 * the portfolio ships realistic workplace imagery without a key.
 *
 * Prefer photorealistic free-photo assets (not vectors / flat illustrations).
 *
 * Attribution (required for Freepik free license):
 *   Photo by Freepik — https://www.magnific.com
 *
 * Run: npm run freepik:experience
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.resolve(__dirname, '../public/experience')
const rootDir = path.resolve(__dirname, '..')

function loadEnvLocal() {
  const envPath = path.join(rootDir, '.env.local')
  if (!fs.existsSync(envPath)) return
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}

loadEnvLocal()

const API_KEY =
  process.env.FREEPIK_API_KEY?.trim() || process.env.MAGNIFIC_API_KEY?.trim()

/** Curated realistic Magnific free photos (theme-checked against downloads). */
const ASSETS = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'experience-photo-assets.json'), 'utf8'),
)

async function downloadBuffer(url, referer = 'https://www.magnific.com/') {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; MaxwellPortfolio/1.0; +https://localhost)',
      Accept: 'image/*',
      Referer: referer,
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf[0] !== 0xff) throw new Error(`Not a JPEG: ${url}`)
  return buf
}

async function downloadViaApi(asset) {
  const searchParams = new URLSearchParams({
    term: asset.query,
    limit: '12',
    order: 'relevance',
    'filters[content_type][photo]': '1',
  })
  const searchRes = await fetch(
    `https://api.freepik.com/v1/resources?${searchParams}`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en-US',
        'x-freepik-api-key': API_KEY,
      },
    },
  )
  if (!searchRes.ok) {
    throw new Error(`API search ${searchRes.status}: ${await searchRes.text()}`)
  }
  const searchJson = await searchRes.json()
  const first = searchJson?.data?.[0]
  if (!first?.id) throw new Error(`No API results for ${asset.key}`)

  const dlRes = await fetch(
    `https://api.freepik.com/v1/resources/${first.id}/download?image_size=large`,
    {
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en-US',
        'x-freepik-api-key': API_KEY,
      },
    },
  )
  if (!dlRes.ok) {
    throw new Error(`API download ${dlRes.status}: ${await dlRes.text()}`)
  }
  const dlJson = await dlRes.json()
  const fileUrl = dlJson?.data?.url || dlJson?.data?.signed_url
  if (!fileUrl) throw new Error(`No download URL for ${asset.key}`)

  const buf = await downloadBuffer(fileUrl)
  return {
    buf,
    title: first.title || asset.title,
    author: first.author?.name || asset.author,
    page: first.url || asset.page,
  }
}

async function downloadViaCdn(asset) {
  const buf = await downloadBuffer(asset.cdn)
  return {
    buf,
    title: asset.title,
    author: asset.author,
    page: asset.page,
  }
}

async function download(asset) {
  const dest = path.join(outDir, asset.filename)
  let result
  if (API_KEY) {
    try {
      result = await downloadViaApi(asset)
      console.log(
        `✓ ${asset.key} via Magnific/Freepik API → ${asset.filename} (${result.buf.length} bytes)`,
      )
    } catch (err) {
      console.warn(
        `⚠ API failed for ${asset.key} (${err.message}); using Magnific CDN photo`,
      )
      result = await downloadViaCdn(asset)
      console.log(
        `✓ ${asset.key} via CDN → ${asset.filename} (${result.buf.length} bytes)`,
      )
    }
  } else {
    result = await downloadViaCdn(asset)
    console.log(
      `✓ ${asset.key} via Magnific CDN → ${asset.filename} (${result.buf.length} bytes)`,
    )
  }

  fs.writeFileSync(dest, result.buf)
  return {
    key: asset.key,
    src: `/experience/${asset.filename}`,
    alt: asset.alt,
    theme: asset.theme,
    accent: asset.accent,
    kind: 'photo',
    attribution: {
      author: result.author,
      title: result.title,
      url: result.page,
      provider: 'Magnific',
      providerUrl: 'https://www.magnific.com',
    },
  }
}

fs.mkdirSync(outDir, { recursive: true })

if (!API_KEY) {
  console.log(
    'No FREEPIK_API_KEY / MAGNIFIC_API_KEY — using curated Magnific free-photo CDN URLs.\n',
  )
} else {
  console.log('Using Freepik / Magnific API key for Experience photos.\n')
}

const manifest = []
for (const asset of ASSETS) {
  manifest.push(await download(asset))
}

const manifestPath = path.resolve(
  __dirname,
  '../src/data/freepik-experience.json',
)
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
console.log(`\nWrote manifest → ${manifestPath}`)
