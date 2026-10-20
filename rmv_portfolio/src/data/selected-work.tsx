import type { ComponentType } from "react"
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPython,
  SiOllama,
  SiNodedotjs,
  SiMongodb,
  SiSocketdotio,
  SiStreamlit,
  SiScikitlearn,
  SiNumpy,
  SiMysql,
} from "react-icons/si"
import { FaAws } from "react-icons/fa"
import { KeyRound } from "lucide-react"

export interface Tech {
  name: string
  icon: ComponentType<{ className?: string }>
}

export interface SelectedProject {
  title: string
  description: string
  /** Screenshot under /public. */
  image: string
  imageAlt: string
  tech: Tech[]
  /** Repository URL. The "View on GitHub" button is hidden while empty. */
  github: string
}

const tech = {
  react: { name: "React.js", icon: SiReact },
  next: { name: "Next.js", icon: SiNextdotjs },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss },
  python: { name: "Python", icon: SiPython },
  ollama: { name: "Ollama", icon: SiOllama },
  node: { name: "Node.js", icon: SiNodedotjs },
  mongo: { name: "MongoDB", icon: SiMongodb },
  socket: { name: "Socket.io", icon: SiSocketdotio },
  oauth: { name: "OAuth", icon: KeyRound },
  aws: { name: "AWS", icon: FaAws },
  streamlit: { name: "Streamlit", icon: SiStreamlit },
  sklearn: { name: "Scikit-learn", icon: SiScikitlearn },
  numpy: { name: "NumPy", icon: SiNumpy },
  mysql: { name: "MySQL", icon: SiMysql },
} satisfies Record<string, Tech>

// Rendered as a zig-zag timeline: even entries put the screenshot on the left.
export const selectedProjects: SelectedProject[] = [
  {
    title: "AI Compliance & Policy Assistant",
    description:
      "A RAG-based document intelligence system that allows users to upload policy/compliance PDFs and ask questions using natural language.",
    image: "/projects/compliance-assistant.webp",
    imageAlt: "AI Compliance Assistant chat interface with a PDF knowledge base sidebar",
    tech: [tech.react, tech.next, tech.tailwind, tech.python, tech.ollama],
    github: "",
  },
  {
    title: "Synapse",
    description:
      "Synapse is a modern social media web application that connects users through posts, real-time chats, and interactive communities.",
    image: "/projects/synapse.webp",
    imageAlt: "Synapse landing page: Connect and Share with the World",
    tech: [tech.react, tech.node, tech.mongo, tech.socket, tech.oauth, tech.aws],
    github: "",
  },
  {
    title: "CardioPredict",
    description:
      "CardioPredict is a machine learning-based system that predicts the risk of heart attacks using patient health data such as age, cholesterol levels, blood pressure, and lifestyle factors.",
    image: "/projects/cardiopredict.webp",
    imageAlt: "CardioPredict landing page showing a heart attack risk analysis",
    tech: [tech.react, tech.streamlit, tech.python, tech.sklearn, tech.numpy, tech.mysql],
    github: "",
  },
]
