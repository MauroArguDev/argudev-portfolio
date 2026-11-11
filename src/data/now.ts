// The "Now" line in the hero. When it changes, update the date and all three languages here.
export const now = {
  since: "2026-11-10",
  status: {
    en: "Shipping Guldr to the App Store",
    es: "Lanzando Guldr en el App Store",
    fr: "Je publie Guldr sur l’App Store",
  },
} as const

export type NowLanguage = keyof typeof now.status
