export type WorkLinkLabel =
  | "work.view_github"
  | "work.view_appstore"

export interface WorkLink {
  label: WorkLinkLabel
  href: string
}

export interface CaseStudy {
  name: string
  year: string
  client?: string
  stack: string[]
  links: WorkLink[]
}
