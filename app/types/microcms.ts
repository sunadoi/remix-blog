import type { MicroCMSDate } from "microcms-js-sdk"

export type MicroCMSContent = {
  id: string
  title: string
} & MicroCMSDate
