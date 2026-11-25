// The "Now" line in the hero. When it changes, update the date and all three languages here.
export const now = {
  since: "2026-11-24",
  status: {
    en: "Guldr is live on the App Store",
    es: "Guldr ya está en el App Store",
    fr: "Guldr est disponible sur l’App Store",
  },
} as const

export type NowLanguage = keyof typeof now.status
