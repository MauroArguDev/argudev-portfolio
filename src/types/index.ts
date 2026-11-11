export type ProjectDescriptionKey =
  | "projects.items.guldr.description"
  | "projects.items.mifondo.description"

// Translated through projects.types.<type>
export type ProjectType = "ios_app"

export interface Project {
  id: string
  name: string
  type: ProjectType
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
