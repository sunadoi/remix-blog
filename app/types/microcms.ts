import type { MicroCMSDate } from "microcms-js-sdk"

export type MicroCMSContent = {
  id: string
  title: string
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
