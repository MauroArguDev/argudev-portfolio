import type { Project } from "@/types"
import miFondoImg from "@/assets/mi-fondo.webp"
import guldrImg from "@/assets/guldr.webp"

export const projects: Project[] = [
  {
    id: "guldr",
    name: "Guldr",
    type: "ios_app",
    year: "2026",
    image: guldrImg,
    stack: ["Swift 6", "SwiftUI", "SwiftData", "WidgetKit", "Swift Charts", "Swift Testing"],
    descriptionKey: "projects.items.guldr.description",
    links: {
      github: "https://github.com/MauroArguDev/Guldr",
    },
  },
  {
    id: "mi-fondo-app",
    name: "Mi Fondo App",
    type: "ios_app",
    year: "2020",
    image: miFondoImg,
    client: "Fiducia S.A.",
    stack: ["Swift", "UIKit", "Combine", "URLSession", "OTP Security"],
    descriptionKey: "projects.items.mifondo.description",
    links: {
      appstore: "https://apps.apple.com/sv/app/mi-fondo-app/id1461509423?l=en-GB",
    },
  },
]
