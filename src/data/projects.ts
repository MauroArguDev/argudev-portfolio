import type { CaseStudy } from "@/types"

// Copy for each case study lives in the locale files under work.guldr and work.mifondo.
export const guldr: CaseStudy = {
  name: "Guldr",
  year: "2026",
  stack: ["Swift 6", "SwiftUI", "SwiftData", "WidgetKit", "Swift Charts", "Swift Testing"],
  links: [
    { label: "work.view_github", href: "https://github.com/MauroArguDev/Guldr" },
  ],
}

export const miFondo: CaseStudy = {
  name: "Mi Fondo",
  year: "2020",
  client: "Fiducia S.A.",
  stack: ["Swift", "UIKit", "Combine", "URLSession"],
  links: [
    { label: "work.view_appstore", href: "https://apps.apple.com/sv/app/mi-fondo-app/id1461509423?l=en-GB" },
  ],
}
