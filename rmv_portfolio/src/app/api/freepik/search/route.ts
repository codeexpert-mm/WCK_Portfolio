import { NextRequest, NextResponse } from 'next/server'
import {
  hasFreepikApiKey,
  searchFreepikResources,
} from '@/lib/freepik'

/**
 * Search Freepik stock resources.
 *
 * Requires FREEPIK_API_KEY. Without it, returns 503 so the UI can fall back
 * to the curated local assets in /public/experience.
 *
 * Example: GET /api/freepik/search?q=software+engineer&type=vector&limit=8
 */
export async function GET(request: NextRequest) {
  if (!hasFreepikApiKey()) {
    return NextResponse.json(
      {
        error:
          'Freepik API key not configured. Set FREEPIK_API_KEY or MAGNIFIC_API_KEY in .env.local.',
        hint: 'Curated Experience images still load from /public/experience. Get a key at https://www.freepik.com/api (Magnific / Freepik).',
      },
      { status: 503 },
    )
  }

  const { searchParams } = request.nextUrl
  const term = searchParams.get('q')?.trim()
  if (!term) {
    return NextResponse.json(
      { error: 'Missing required query parameter: q' },
      { status: 400 },
    )
  }

  const type = searchParams.get('type')
  const contentType =
    type === 'photo' || type === 'vector' || type === 'psd' ? type : 'photo'
  const limit = Math.min(
    24,
    Math.max(1, Number(searchParams.get('limit') ?? 8) || 8),
  )

  try {
    const result = await searchFreepikResources({
      term,
      limit,
      contentType,
      order: 'relevance',
    })

    return NextResponse.json({
      data: (result.data ?? []).map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
        preview: item.image?.source?.url ?? null,
        author: item.author?.name ?? null,
        license: item.licenses?.[0]?.type ?? null,
      })),
      meta: result.meta ?? null,
    })
  } catch (error) {
    console.error('Freepik search failed:', error)
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Freepik search failed',
      },
      { status: 502 },
    )
  }
}
