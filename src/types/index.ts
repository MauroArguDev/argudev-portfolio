export type ProjectDescriptionKey =
  | "projects.items.fintrack.description"
  | "projects.items.mifondo.description"

export interface Project {
  id: string
  name: string
  type: string
  year: string
  stack: string[]
  descriptionKey: ProjectDescriptionKey
  client?: string
  image?: string
  links: {
    github?: string
    testflight?: string
    appstore?: string
    live?: string
  }
}
