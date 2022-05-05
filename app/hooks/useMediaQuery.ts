import { useMediaQuery } from "@mantine/hooks"
import { useEffect, useState } from "react"

const map = {
  xs: "576px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
  xl: "1400px",
} as const

export const useMediaQueryMin = (query: keyof typeof map, initialValue: Parameters<typeof useMediaQuery>[1]) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return [useMediaQuery(`(min-width: ${map[query]})`, initialValue), mounted]
}

export const useMediaQueryMax = (query: keyof typeof map, initialValue: Parameters<typeof useMediaQuery>[1]) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return [useMediaQuery(`(max-width: ${map[query]})`, initialValue), mounted]
}
