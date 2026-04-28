export type ProjectDescriptionKey =
  | "projects.items.fintrack.description"
  | "projects.items.mindfulai.description"
  | "projects.items.arshop.description"
  | "projects.items.landing.description"

export interface Project {
  id: string
  name: string
  type: string
  year: string
  stack: string[]
  descriptionKey: ProjectDescriptionKey
  links: {
    github?: string
    testflight?: string
    appstore?: string
    live?: string
  }
}
