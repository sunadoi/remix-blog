import type { MicroCMSDate } from "microcms-js-sdk"

export type Category = "React" | "TypeScript" | "JavaScript" | "Firebase"

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
