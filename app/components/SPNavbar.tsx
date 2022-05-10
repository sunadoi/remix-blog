import { useMantineTheme, Tabs, Footer } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { useEffect, useState } from "react"
import { MdHome, MdArchive, MdCategory, MdPerson } from "react-icons/md"

type SPNavbarProps = {
  path: string
}

export const SPNavbar: FC<SPNavbarProps> = ({ path }) => {
  const navigate = useNavigate()
  const theme = useMantineTheme()
  const [tab, setTab] = useState(0)

  const tabs = [
    { path: "/", label: "ホーム", icon: <MdHome color={theme.other.primary} size={24} /> },
    { path: "/categories", label: "カテゴリー", icon: <MdCategory color={theme.other.primary} size={24} /> },
    { path: "/archives", label: "アーカイブ", icon: <MdArchive color={theme.other.primary} size={24} /> },
    { path: "/profile", label: "プロフィール", icon: <MdPerson color={theme.other.primary} size={24} /> },
  ]

  useEffect(() => {
    // NOTE: /categories/fooでもcategoriesと一致とみなすにはinculudesを使う必要がある。
    // tabsでfindIndexすると/が先にヒットしてしまうのでreverseする。
    const index = [...tabs].reverse().findIndex((t) => path.includes(t.path))
    if (index !== -1) setTab(tabs.length - index - 1)
  }, [])

  return (
    <Footer height="100%" px="md" py="sm" className="sticky">
      <Tabs
        variant="unstyled"
        active={tab}
        onTabChange={(tabIndex, tabKey) => {
          setTab(tabIndex)
          tabKey && navigate(tabKey)
        }}
        styles={(theme) => ({
          tabControl: { padding: "8px", height: "100%", width: "calc(100% / 4)", borderRadius: theme.radius.md },
          tabsList: { justifyContent: "space-between" },
          tabInner: { flexDirection: "column", gap: "8px" },
          tabLabel: { color: theme.other.primary, fontSize: theme.fontSizes.xs },
          tabActive: { backgroundColor: theme.other.paleBlue, fontWeight: "bold" },
        })}
      >
        {tabs.map((tab) => (
          <Tabs.Tab key={tab.path} tabKey={tab.path} label={tab.label} icon={tab.icon} />
        ))}
      </Tabs>
    </Footer>
  )
}
