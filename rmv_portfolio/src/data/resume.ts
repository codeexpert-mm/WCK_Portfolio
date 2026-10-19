/**
 * Resume content, transcribed from the PDF in public/resume.pdf.
 *
 * The site's About, Experience, and Skills sections render from this file, so
 * keep it in step with the PDF when either changes.
 */

export const SUMMARY =
  "Full-stack engineer with 10 years of software development experience across enterprise platforms and AI-enabled tools. Architected Go and gRPC services, shipped React interfaces, and improved LLM-assisted workflows with guarded tool integrations and measurable latency reductions. Drives architecture decisions across distributed engineering teams."

export const YEARS_OF_EXPERIENCE = 10

export interface Job {
  company: string
  location: string
  title: string
  start: string
  end: string
  highlights: string[]
}

export const EXPERIENCE: Job[] = [
  {
    company: "Sourcegraph",
    location: "San Francisco, CA (Remote)",
    title: "Senior Full Stack AI Engineer",
    start: "01/2023",
    end: "09/2026",
    highlights: [
      "Architected Go-based repository indexing services behind gRPC endpoints, using Protocol Buffers for versioned contracts and bounded work queues to handle 3.2 million daily requests while bringing p95 response time from 420 to 290 milliseconds.",
      "Drove a React and TSX overhaul of code-search analytics views, introducing incremental rendering and reusable query-state components for 11 high-traffic screens; reduced interaction latency by 28% and clarified navigation for enterprise users.",
      "Engineered a Python service for LLM-assisted code explanations, pairing retrieval-augmented generation (RAG) with schema validation and replayable failure cases across repository-scoped contexts; cut unsupported-answer escalations by 24% without widening read permissions.",
      "Evaluated Google Agent Development Kit (ADK) for bounded multi-step developer workflows, defining tool permissions, execution traces, and manual approval checkpoints; documented architecture review criteria so internal agent prototypes could be tested without exposing privileged write operations.",
      "Introduced Model Context Protocol (MCP) adapters around repository search and file navigation for external agent clients, using capability-scoped tokens and structured error responses; reduced failed agent tool calls from 7.1% to 2.4% in test traffic.",
      "Prototyped Agent2Agent (A2A) handoffs between code-navigation and review assistants, establishing task identifiers, cancellation semantics, and auditable responses across service boundaries; focused on failure containment rather than fully autonomous change approval to keep runs inspectable.",
      "Overhauled Kubernetes delivery and CI/CD checks for API and agent components, adding canary gates and rollback playbooks; reduced failed production deployments from 8% to 3% while standardizing releases across distributed engineering teams.",
    ],
  },
  {
    company: "Grafana Labs",
    location: "New York, NY (Remote)",
    title: "Full Stack Software Engineer",
    start: "06/2020",
    end: "12/2022",
    highlights: [
      "Owned a Go query-adapter service for enterprise telemetry dashboards, tightening SQL time-window filters and controlling concurrent reads across data sources; cut median dashboard query time from 1.1 seconds to 720 milliseconds.",
      "Rebuilt AngularJS panel extensions as React and TypeScript plugins, preserving data-source contracts while lazily loading visual elements and retaining keyboard navigation; reduced dashboard initialization from 3.8 to 2.6 seconds for migrated panels.",
      "Shipped Vega-Lite exploration panels for incident trend analysis, converting backend aggregates into reusable chart specifications with drill-down filters, sensible sampling limits, and safe defaults that made dense multi-series telemetry easier to interpret.",
      "Implemented REST API endpoints and typed configuration migration paths for enterprise dashboards, adding schema validation and integration tests; lowered malformed-query errors by 37% across affected plugins.",
      "Partnered with design and support engineers across time zones to simplify JavaScript and HTML/CSS plugin settings, documenting edge cases and ensuring accessible controls remained consistent with existing user workflows.",
    ],
  },
  {
    company: "Dell Technologies",
    location: "Overland Park, KS (Onsite)",
    title: "Software Engineer",
    start: "06/2016",
    end: "05/2020",
    highlights: [
      "Implemented Java and SQL-backed inventory reconciliation workers for enterprise support systems, batching updates and adding duplicate guards to cut nightly processing from 5.5 hours to 3.4 hours.",
      "Developed Python automation around REST API integration checks and retry-safe ticket updates, replacing manual spreadsheet comparisons with repeatable validation so support teams could trace failed device status syncs.",
      "Instrumented service logs and queue-depth alerts for hardware entitlement feeds, separating transient downstream timeouts from bad records and lowering mean incident diagnosis time from 65 to 38 minutes.",
      "Refactored authentication and payload-validation logic in internal backend services, working within senior-reviewed designs and documenting failure paths to make upstream integration changes safer to deploy.",
    ],
  },
]

export const EDUCATION = {
  school: "The University of Kansas",
  degree: "Bachelor of Science (B.S.), Computer Science",
  start: "2012",
  end: "2016",
}
