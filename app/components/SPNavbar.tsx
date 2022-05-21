import { useMantineTheme, Footer, Grid, Text, Group } from "@mantine/core"
import { useLocation, useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { useEffect, useState } from "react"
import { MdHome, MdArchive, MdCategory, MdPerson } from "react-icons/md"

type SPNavbarProps = {
  setNavLoading: (loading: boolean) => void
}

export const SPNavbar: FC<SPNavbarProps> = ({ setNavLoading }) => {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const { pathname } = useLocation()

  const tabs = [
    { path: "/", label: "ホーム", icon: <MdHome color={theme.other.primary} size={24} /> },
    { path: "/categories", label: "カテゴリー", icon: <MdCategory color={theme.other.primary} size={24} /> },
    { path: "/archives", label: "アーカイブ", icon: <MdArchive color={theme.other.primary} size={24} /> },
    { path: "/profile", label: "プロフィール", icon: <MdPerson color={theme.other.primary} size={24} /> },
  ]

  useEffect(() => {
    const index = pathname === "/" ? 0 : [...tabs].findIndex((t, index) => index !== 0 && pathname.includes(t.path))
    setTabIndex(index)
    setNavLoading(false)
  }, [pathname])

  return (
    <Footer height="100%" px="md" py="sm" className="sticky">
      <Grid grow p="sm">
        {tabs.map((tab, index) => (
          <Grid.Col
            key={tab.path}
            span={3}
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              backgroundColor: index === tabIndex ? theme.other.paleBlue : undefined,
              fontWeight: index === tabIndex ? "bold" : "normal",
            })}
            onClick={() => {
              setTabIndex(index)
              setNavLoading(true)
              navigate(tab.path)
            }}
          >
            <Group direction="column" position="center" align="center" spacing="xs">
              {tab.icon}
              <Text color={theme.other.primary} size="xs">
                {tab.label}
              </Text>
            </Group>
          </Grid.Col>
        ))}
      </Grid>
    </Footer>
  )
}
