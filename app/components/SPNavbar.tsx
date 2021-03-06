import { useMantineTheme, Footer, Grid, Text, Group } from "@mantine/core"
import { useLocation, useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { useEffect, useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { MdHome, MdArchive, MdCategory, MdPerson } from "react-icons/md"

export const SPNavbar: FC = () => {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const [tabIndex, setTabIndex] = useState(0)
  const { pathname } = useLocation()

  const tabs = [
    { path: "/", label: "ホーム", icon: <MdHome color={theme.other.primary} size={24} /> },
    { path: "/categories", label: "カテゴリー", icon: <MdCategory color={theme.other.primary} size={24} /> },
    { path: "/archives", label: "アーカイブ", icon: <MdArchive color={theme.other.primary} size={24} /> },
    { path: "/search", label: "検索", icon: <AiOutlineSearch color={theme.other.primary} size={24} /> },
    { path: "/profile", label: "プロフィール", icon: <MdPerson color={theme.other.primary} size={24} /> },
  ]

  useEffect(() => {
    const index = pathname === "/" ? 0 : [...tabs].findIndex((t, index) => index !== 0 && pathname.includes(t.path))
    setTabIndex(index)
  }, [pathname])

  return (
    <Footer height="100%" px="sm" py="sm" className="sticky">
      <Grid grow py="sm" px="xs" columns={10}>
        {tabs.map((tab, index) => (
          <Grid.Col
            key={tab.path}
            span={2}
            px={0}
            sx={(theme) => ({
              borderRadius: theme.radius.md,
              backgroundColor: index === tabIndex ? theme.other.paleBlue : undefined,
              fontWeight: index === tabIndex ? "bold" : "normal",
            })}
            onClick={() => {
              setTabIndex(index)
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
