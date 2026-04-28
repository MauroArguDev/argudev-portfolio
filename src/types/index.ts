export interface Project {
  id: string
  name: string
  type: string
  year: string
  stack: string[]
  descriptionKey: string
  links: {
    github?: string
    testflight?: string
    appstore?: string
    live?: string
  }
}
