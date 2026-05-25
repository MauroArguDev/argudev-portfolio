import type { Project } from "@/types"
import miFondoImg from "@/assets/mi-fondo.png"
import placeholderImg from "@/assets/placeholder.png"

export const projects: Project[] = [
  {
    id: "fintrack-pro",
    name: "FinTrack Pro",
    type: "iOS App",
    year: "2026",
    image: placeholderImg,
    stack: ["SwiftUI", "SwiftData", "Swift Charts", "CloudKit", "Face ID"],
    descriptionKey: "projects.items.fintrack.description",
    links: {
      github: "https://github.com/MauroArguDev/FinTrackPro",
    },
  },
  {
    id: "mi-fondo-app",
    name: "Mi Fondo App",
    type: "iOS App",
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
