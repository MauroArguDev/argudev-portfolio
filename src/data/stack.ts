// Each group is anchored to the work where it was used (brand voice: no bare tech lists)
export const stack = [
  { items: ["SwiftUI", "SwiftData", "WidgetKit", "Swift Charts"], usedIn: "about.used_guldr" },
  { items: ["UIKit", "Combine", "URLSession"], usedIn: "about.used_mifondo" },
  { items: ["Swift Testing", "XCTest", "SwiftLint", "GitHub Actions"], usedIn: "about.used_ci" },
  { items: ["React", "TypeScript", "Tailwind CSS", "Vite"], usedIn: "about.used_site" },
] as const
