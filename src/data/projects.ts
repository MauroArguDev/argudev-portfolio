import type { Project } from "@/types"

export const projects: Project[] = [
  {
    id: "fintrack-pro",
    name: "FinTrack Pro",
    type: "iOS App",
    year: "2026",
    stack: ["SwiftUI", "SwiftData", "Swift Charts", "CloudKit", "Face ID"],
    descriptionKey: "projects.items.fintrack.description",
    links: {},
  },
  {
    id: "mindfulai-journal",
    name: "MindfulAI Journal",
    type: "iOS App",
    year: "2026",
    stack: ["SwiftUI", "Core ML", "Claude API", "Speech", "SwiftData"],
    descriptionKey: "projects.items.mindfulai.description",
    links: {},
  },
  {
    id: "arshop-showcase",
    name: "ARShop Showcase",
    type: "iOS App",
    year: "2026",
    stack: ["ARKit", "RealityKit", "Combine", "URLSession", "Apple Pay"],
    descriptionKey: "projects.items.arshop.description",
    links: {},
  },
  {
    id: "react-landing",
    name: "SaaS Landing",
    type: "React",
    year: "2026",
    stack: ["Next.js 15", "Tailwind CSS", "Framer Motion", "Resend"],
    descriptionKey: "projects.items.landing.description",
    links: {},
  },
]
