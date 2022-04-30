import FirebaseIcon from "@/assets/category/firebase.svg"
import JavaScriptIcon from "@/assets/category/javascript.svg"
import ReactIcon from "@/assets/category/react.svg"
import TypeScriptIcon from "@/assets/category/typescript.svg"
import type { CategoryType } from "@/types/microcms"

export const CategoryIconMap = new Map<CategoryType, string>([
  ["React", ReactIcon],
  ["TypeScript", TypeScriptIcon],
  ["JavaScript", JavaScriptIcon],
  ["Firebase", FirebaseIcon],
])

export const LanguageIconMap = new Map<string, string>([
  ["tsx", ReactIcon],
  ["ts", TypeScriptIcon],
])
