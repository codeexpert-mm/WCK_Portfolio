/**
 * Single source of truth for site identity and the canonical facts about
 * William Christian Kolega.
 *
 * Search engines and AI answer engines resolve a person into a knowledge-graph
 * entity by cross-referencing the identifiers a site asserts about itself. When
 * those identifiers are missing, contradictory, or spread across files that
 * drift apart, the engine falls back to guessing.
 *
 * Everything an engine needs to pin the entity lives here, and only here.
 */

/**
 * Canonical origin — no trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL in the deployment (Production scope) to the real
 * domain. Metadata, canonicals, OpenGraph, JSON-LD, robots.txt, and the sitemap
 * all read from here.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '')

export const absoluteUrl = (path = '') =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/**
 * Verified profile URLs, used as schema.org `sameAs` and for the social links.
 *
 * Every URL here must resolve to a live profile actually owned by William. A
 * dead or wrong `sameAs` is worse than none: it tells the crawler the site's
 * self-description is unreliable. Empty values are filtered out everywhere, so
 * adding a profile is a one-line change once it exists.
 *
 * Setting `github` also turns on the Projects section, which lists the public
 * repositories of that account.
 */
export const PROFILES = {
  github: '',
  linkedin: '',
  x: '',
} as const

/** GitHub username derived from `PROFILES.github`; empty when none is set. */
export const GITHUB_USERNAME = PROFILES.github.replace(/^https?:\/\/github\.com\//, '').replace(/\/$/, '')

/** The `sameAs` set. Empty entries are dropped. */
export const SAME_AS: string[] = Object.values(PROFILES).filter(Boolean)

export const PERSON = {
  name: 'William Christian Kolega',
  givenName: 'William',
  familyName: 'Kolega',
  jobTitle: 'Senior Full Stack AI Engineer',
  email: 'billkolega@outlook.com',
  telephone: '+16562215249',
  /** Display form of the phone number. */
  telephoneDisplay: '+1 (656) 221-5249',
  locality: 'Tampa',
  region: 'FL',
  country: 'United States',
  countryCode: 'US',
  image: absoluteUrl('/about-illustration.jpg'),
} as const

export const SITE = {
  name: 'William Christian Kolega Portfolio',
  title: `${PERSON.name} — Senior Full Stack AI Engineer`,
  /**
   * Kept under ~155 characters so Google renders it whole rather than
   * synthesising a replacement from page text.
   */
  description:
    'William Christian Kolega is a full-stack engineer in Tampa, FL with 10 years building Go/gRPC services, React interfaces, and LLM-assisted tools.',
  ogImage: absoluteUrl('/opengraph-image'),
  locale: 'en_US',
} as const
