import AWSIcon from "@/assets/category/aws.svg"
import FirebaseIcon from "@/assets/category/firebase.svg"
import GitHubIcon from "@/assets/category/github.svg"
import GoIcon from "@/assets/category/go.svg"
import JavaScriptIcon from "@/assets/category/javascript.svg"
import ReactIcon from "@/assets/category/react.svg"
import TypeScriptIcon from "@/assets/category/typescript.svg"
import AprilIcon from "@/assets/months/April.png"
import AugustIcon from "@/assets/months/August.png"
import DecemberIcon from "@/assets/months/December.png"
import FebruaryIcon from "@/assets/months/February.png"
import JanuaryIcon from "@/assets/months/January.png"
import JulyIcon from "@/assets/months/July.png"
import JuneIcon from "@/assets/months/June.png"
import MarchIcon from "@/assets/months/March.png"
import MayIcon from "@/assets/months/May.png"
import NovemberIcon from "@/assets/months/November.png"
import OctoberIcon from "@/assets/months/October.png"
import SeptemberIcon from "@/assets/months/September.png"
import type { CategoryType } from "@/types/microcms"

export const CategoryIconMap = new Map<CategoryType, string>([
  ["React", ReactIcon],
  ["TypeScript", TypeScriptIcon],
  ["JavaScript", JavaScriptIcon],
  ["Go", GoIcon],
  ["Firebase", FirebaseIcon],
  ["AWS", AWSIcon],
  ["GitHub", GitHubIcon],
])

export const LanguageIconMap = new Map<string, string>([
  ["tsx", ReactIcon],
  ["ts", TypeScriptIcon],
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
