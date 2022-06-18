import type { MicroCMSDate } from "microcms-js-sdk"

const Categories = {
  React: "React",
  TypeScript: "TypeScript",
  JavaScript: "JavaScript",
  Go: "Go",
  Firebase: "Firebase",
  AWS: "AWS",
  GitHub: "GitHub",
} as const

export type CategoryType = keyof typeof Categories

type Content = {
  fieldId: "content"
  richText: string
}

type Message = {
  fieldId: "message"
  type: ("point" | "info" | "alert")[]
  message: string
}

type Link = {
  fieldId: "link"
  url: string
}

export type Code = {
  fieldId: "code"
  language: string
  fileName?: string
  code: string
  highlight?: string
  diffAdd?: string
  diffRemove?: string
}

export type MicroCMSContent = {
  id: string
  title: string
  image: { url: string; height: number; width: number }
  category: CategoryType[]
  body: (Content | Message | Link | Code)[]
} & MicroCMSDate

export const isCategory = (category: string): category is CategoryType => {
  return category in Categories
}
