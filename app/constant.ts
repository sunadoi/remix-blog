import AWSIcon from "@/assets/category/aws.svg"
import FirebaseIcon from "@/assets/category/firebase.svg"
import GitHubIcon from "@/assets/category/github.svg"
import GoIcon from "@/assets/category/go.svg"
import JavaScriptIcon from "@/assets/category/javascript.svg"
import ReactIcon from "@/assets/category/react.svg"
import TypeScriptIcon from "@/assets/category/typescript.svg"
import GoFileIcon from "@/assets/code/go.svg"
import JavaScriptFileIcon from "@/assets/code/javascript.svg"
import ReactFileIcon from "@/assets/code/react.svg"
import TypeScriptFileIcon from "@/assets/code/typescript.svg"
import AprilIcon from "@/assets/months/April.webp"
import AugustIcon from "@/assets/months/August.webp"
import DecemberIcon from "@/assets/months/December.webp"
import FebruaryIcon from "@/assets/months/February.webp"
import JanuaryIcon from "@/assets/months/January.webp"
import JulyIcon from "@/assets/months/July.webp"
import JuneIcon from "@/assets/months/June.webp"
import MarchIcon from "@/assets/months/March.webp"
import MayIcon from "@/assets/months/May.webp"
import NovemberIcon from "@/assets/months/November.webp"
import OctoberIcon from "@/assets/months/October.webp"
import SeptemberIcon from "@/assets/months/September.webp"
import type { CategoryType } from "@/types/microcms"

export const domain = "https://sunablog.dev"

export const CategoryIconMap = new Map<CategoryType, string>([
  ["React", ReactIcon],
  ["TypeScript", TypeScriptIcon],
  ["JavaScript", JavaScriptIcon],
  ["Go", GoIcon],
  ["Firebase", FirebaseIcon],
  ["AWS", AWSIcon],
  ["GitHub", GitHubIcon],
])

export const FileIconMap = new Map<string, string>([
  ["tsx", ReactFileIcon],
  ["ts", TypeScriptFileIcon],
  ["js", JavaScriptFileIcon],
  ["go", GoFileIcon],
])

export const MonthIconMap = new Map<number, string>([
  [1, JanuaryIcon],
  [2, FebruaryIcon],
  [3, MarchIcon],
  [4, AprilIcon],
  [5, MayIcon],
  [6, JuneIcon],
  [7, JulyIcon],
  [8, AugustIcon],
  [9, SeptemberIcon],
  [10, OctoberIcon],
  [11, NovemberIcon],
  [12, DecemberIcon],
])
