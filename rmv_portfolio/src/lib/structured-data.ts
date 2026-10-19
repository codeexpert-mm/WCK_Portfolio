import { PERSON, SAME_AS, SITE, SITE_URL } from '@/lib/site'
import { EDUCATION } from '@/data/resume'

/**
 * JSON-LD for the site, emitted as one linked `@graph` rather than several
 * standalone blocks.
 *
 * Giving every node a stable `@id` and referencing those ids turns the graph
 * into a single assertion: this person, this site, the same subject. Separate
 * blocks that each re-declare a bare Person read to a crawler as several
 * weakly-described entities instead of one well-described one.
 */

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`
const WEBPAGE_ID = `${SITE_URL}/#webpage`

/** Reusable reference to the Person node — never re-describe, always point. */
const personRef = { '@id': PERSON_ID }

const personNode = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: PERSON.name,
  givenName: PERSON.givenName,
  familyName: PERSON.familyName,
  jobTitle: PERSON.jobTitle,
  description: SITE.description,
  url: SITE_URL,
  mainEntityOfPage: { '@id': WEBPAGE_ID },
  image: {
    '@type': 'ImageObject',
    url: PERSON.image,
    caption: `${PERSON.name} — ${PERSON.jobTitle}`,
  },
  email: `mailto:${PERSON.email}`,
  telephone: PERSON.telephone,
  address: {
    '@type': 'PostalAddress',
    addressLocality: PERSON.locality,
    addressRegion: PERSON.region,
    addressCountry: PERSON.countryCode,
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: EDUCATION.school,
  },
  ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  knowsAbout: [
    'Full Stack Development',
    'Go',
    'Python',
    'TypeScript',
    'JavaScript',
    'SQL',
    'React',
    'gRPC',
    'Protocol Buffers',
    'REST APIs',
    'Microservices',
    'Kubernetes',
    'CI/CD',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Model Context Protocol',
    'Agent2Agent',
    'Google Agent Development Kit',
  ],
}

const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  alternateName: `${PERSON.name} Portfolio`,
  description: SITE.description,
  url: SITE_URL,
  inLanguage: 'en-US',
  publisher: personRef,
  copyrightHolder: personRef,
  /**
   * `about` names the subject of the site. A portfolio's subject is its owner,
   * and saying so removes an inference step for anything reading the graph.
   */
  about: personRef,
}

/**
 * ProfilePage rather than plain WebPage.
 *
 * ProfilePage is the type Google documents for "a page about one person or
 * organisation", and it tells an answer engine that `mainEntity` is the thing
 * the page is actually about — the exact question an AI overview is answering
 * when someone searches a name.
 */
const webPageNode = {
  '@type': 'ProfilePage',
  '@id': WEBPAGE_ID,
  url: SITE_URL,
  name: SITE.title,
  description: SITE.description,
  isPartOf: { '@id': WEBSITE_ID },
  about: personRef,
  mainEntity: personRef,
  inLanguage: 'en-US',
  primaryImageOfPage: { '@type': 'ImageObject', url: SITE.ogImage },
}

/**
 * Site-wide identity, emitted from the root layout on every route: who this
 * person is and what this site is.
 */
export const identityGraph = {
  '@context': 'https://schema.org',
  '@graph': [personNode, websiteNode],
}

/**
 * Home-page node, emitted by the home page rather than the layout, because it
 * describes one specific URL.
 */
export const homePageGraph = {
  '@context': 'https://schema.org',
  '@graph': [webPageNode],
}

/**
 * Services offered, kept separate from the identity graph.
 *
 * Note this is `ProfessionalService`, not `LocalBusiness` — there is no
 * storefront, no opening hours, and no service area beyond "remote", so
 * claiming local-business markup would be an unsupported signal.
 */
export const professionalServiceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#services`,
  name: `${PERSON.name} — Software Engineering`,
  description:
    'Full stack and AI engineering: Go and gRPC services, React interfaces, LLM-assisted workflows, and Kubernetes delivery.',
  url: SITE_URL,
  image: SITE.ogImage,
  provider: personRef,
  areaServed: { '@type': 'Country', name: PERSON.country },
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: `${SITE_URL}/#contact`,
    availableLanguage: ['en'],
  },
  serviceType: [
    'Full Stack Development',
    'Backend Development',
    'Frontend Development',
    'AI Integration',
    'Distributed Systems Architecture',
  ],
}
