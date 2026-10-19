import {
  SiGo,
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiHtml5,
  SiAngular,
  SiVega,
  SiGoogle,
  SiKubernetes,
  SiGithubactions,
} from "react-icons/si"
import {
  FaDatabase,
  FaCode,
  FaCloud,
  FaJava,
  FaRobot,
  FaPlug,
  FaExchangeAlt,
  FaSearch,
  FaServer,
  FaCubes,
  FaCog,
  FaCheckCircle,
  FaTachometerAlt,
  FaProjectDiagram,
  FaGlobeAmericas,
  FaUsers,
  FaShieldAlt,
  FaBook,
} from "react-icons/fa"

export type CategoryId =
  | "frontend"
  | "ai"
  | "backend"
  | "deployment"
  | "engineering"

export interface Skill {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  /** A technology can legitimately belong to more than one domain. */
  categories: CategoryId[]
}

export interface Language {
  name: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export interface Category {
  id: CategoryId
  label: string
  description: string
}

/**
 * Languages cut across every domain, so they get their own visual treatment
 * (a horizontal chip strip above the tabbed grid) rather than living inside a
 * single category. Matches "Core Languages" on the resume.
 */
export const languages: Language[] = [
  { name: "Go", icon: SiGo, color: "text-cyan-500" },
  { name: "Python", icon: SiPython, color: "text-yellow-500" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
  { name: "SQL", icon: FaDatabase, color: "text-orange-500" },
]

/** One category per "Technical Skills" group on the resume. */
export const categories: Category[] = [
  {
    id: "frontend",
    label: "Frontend & Visualization",
    description: "Interfaces and data visualization",
  },
  {
    id: "ai",
    label: "AI & Agent Systems",
    description: "LLMs, agents and retrieval",
  },
  {
    id: "backend",
    label: "Backend Architecture",
    description: "Services, APIs and contracts",
  },
  {
    id: "deployment",
    label: "Deployment & Quality",
    description: "Delivery, validation and performance",
  },
  {
    id: "engineering",
    label: "Distributed Engineering",
    description: "How the work gets designed and delivered",
  },
]

export const skills: Skill[] = [
  // ── Frontend & Visualization ──
  { name: "React", icon: SiReact, color: "text-blue-500", categories: ["frontend"] },
  { name: "TSX", icon: SiTypescript, color: "text-blue-600", categories: ["frontend"] },
  { name: "HTML/CSS", icon: SiHtml5, color: "text-orange-600", categories: ["frontend"] },
  { name: "AngularJS", icon: SiAngular, color: "text-red-600", categories: ["frontend"] },
  { name: "Vega-Lite", icon: SiVega, color: "text-sky-600", categories: ["frontend"] },

  // ── AI & Agent Systems ──
  { name: "Large Language Models (LLMs)", icon: FaRobot, color: "text-purple-500", categories: ["ai"] },
  { name: "Google Agent Development Kit (ADK)", icon: SiGoogle, color: "text-blue-500", categories: ["ai"] },
  { name: "Model Context Protocol (MCP)", icon: FaPlug, color: "text-amber-600", categories: ["ai"] },
  { name: "Agent2Agent (A2A)", icon: FaExchangeAlt, color: "text-teal-500", categories: ["ai"] },
  { name: "Retrieval-Augmented Generation (RAG)", icon: FaSearch, color: "text-emerald-500", categories: ["ai"] },

  // ── Backend Architecture ──
  { name: "gRPC", icon: FaServer, color: "text-teal-600", categories: ["backend"] },
  { name: "Protocol Buffers", icon: FaCode, color: "text-blue-500", categories: ["backend"] },
  { name: "REST APIs", icon: FaCloud, color: "text-sky-500", categories: ["backend"] },
  { name: "Java", icon: FaJava, color: "text-red-500", categories: ["backend"] },
  { name: "Microservices", icon: FaCubes, color: "text-indigo-500", categories: ["backend"] },

  // ── Deployment & Quality ──
  { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-600", categories: ["deployment"] },
  { name: "CI/CD", icon: SiGithubactions, color: "text-blue-500", categories: ["deployment"] },
  { name: "DevOps", icon: FaCog, color: "text-gray-700 dark:text-gray-300", categories: ["deployment"] },
  { name: "Schema Validation", icon: FaCheckCircle, color: "text-green-600", categories: ["deployment"] },
  { name: "Performance Optimization", icon: FaTachometerAlt, color: "text-orange-500", categories: ["deployment"] },

  // ── Distributed Engineering ──
  { name: "Architecture Reviews", icon: FaProjectDiagram, color: "text-purple-600", categories: ["engineering"] },
  { name: "Distributed Collaboration", icon: FaGlobeAmericas, color: "text-sky-600", categories: ["engineering"] },
  { name: "Cross-Functional Delivery", icon: FaUsers, color: "text-pink-500", categories: ["engineering"] },
  { name: "Reliability Ownership", icon: FaShieldAlt, color: "text-emerald-600", categories: ["engineering"] },
  { name: "Technical Documentation", icon: FaBook, color: "text-amber-700", categories: ["engineering"] },
]

/** Total distinct technologies on show (flat skills + cross-cutting languages). */
export const totalTechnologies = skills.length + languages.length
