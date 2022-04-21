import FirebaseIcon from "@/assets/category/firebase.svg"
import JavaScriptIcon from "@/assets/category/javascript.svg"
import ReactIcon from "@/assets/category/react.svg"
import TypeScriptIcon from "@/assets/category/typescript.svg"
import type { Category } from "@/types/microcms"

export const CategoryIconMap = new Map<Category, string>([
  ["React", ReactIcon],
  ["TypeScript", TypeScriptIcon],
  ["JavaScript", JavaScriptIcon],
  ["Firebase", FirebaseIcon],
])
