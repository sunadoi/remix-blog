import type { MicroCMSDate } from "microcms-js-sdk"

const Categories = {
  React: "React",
  TypeScript: "TypeScript",
  JavaScript: "JavaScript",
  Firebase: "Firebase",
} as const

export type Category = keyof typeof Categories

export type MicroCMSContent = {
  id: string
  title: string
  image: { url: string; height: number; width: number }
  category: Category[]
  topic: Category[]
  body: {
    rich: string
    html: string
    code: {
      language: string
      fileName: string
      code: string
      diffAdd: string
      diffRemove: string
      highlight: string
    }[]
    type: ("rich" | "code" | "point" | "alert")[]
  }[]
} & MicroCMSDate

export const isCategory = (category: string): category is Category => {
  return category in Categories
}
