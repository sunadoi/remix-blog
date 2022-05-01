import type { Tuple, DefaultMantineColor, ColorScheme } from "@mantine/core"
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import type { FC, ReactNode } from "react"
import { useState } from "react"

type ExtendedCustomColors = "brand" | DefaultMantineColor

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }

  export interface MantineThemeOther {
    primary: string
    secondary: string
  }
}

export const MantineTheme: FC<{ children: ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  const underMd = useMediaQuery("(max-width: 768px)", false)

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            brand: [
              "#0160EA",
              "#0152C8",
              "#0146AB",
              "#013C92",
              "#01337D",
              "#012C6B",
              "#012559",
              "#011F4A",
              "#011A3D",
              "#011633",
            ],
          },
          other: {
            primary: "#012C6B",
            secondary: "#416190",
          },
          primaryColor: "brand",
          headings: {
            sizes: {
              h1: underMd ? { fontSize: 26 } : { fontSize: 34 },
              h2: underMd ? { fontSize: 20 } : { fontSize: 26 },
              h3: underMd ? { fontSize: 18 } : { fontSize: 20 },
              h4: underMd ? { fontSize: 16 } : { fontSize: 18 },
              h5: underMd ? { fontSize: 14 } : { fontSize: 16 },
            },
          },
          fontSizes: underMd ? { xs: 10, sm: 12, md: 14, lg: 16, xl: 18 } : { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 },
          spacing: underMd ? { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 } : { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
        }}
        styles={{
          Title: (theme) => ({
            root: { color: theme.other.primary },
          }),
        }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global
          styles={(theme) => ({
            body: {
              ...theme.fn.fontStyles(),
              backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#F9FCFF",
            },
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
