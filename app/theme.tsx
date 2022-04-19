import type { Tuple, DefaultMantineColor, ColorScheme } from "@mantine/core"
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core"
import type { FC, ReactNode } from "react"
import { useState } from "react"

type ExtendedCustomColors = "brand" | DefaultMantineColor

declare module "@mantine/core" {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, Tuple<string, 10>>
  }
}

export const MantineTheme: FC<{ children: ReactNode }> = ({ children }) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light")
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))

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
          primaryColor: "brand",
          spacing: { xs: 8, sm: 16, md: 24, lg: 32, xl: 40 },
        }}
        styles={{
          Title: (theme) => ({
            root: { color: theme.colors.brand[5] },
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
