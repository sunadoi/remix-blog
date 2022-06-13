import { useMantineTheme, Grid, Group, Input, Title, Header as MantineHeader } from "@mantine/core"
import { SpotlightProvider } from "@mantine/spotlight"
import { useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { MdHome, MdArchive, MdCategory, MdPerson } from "react-icons/md"

import Logo from "@/assets/logo.png"
import { Image } from "@/components/Image"
import { useMediaQueryMax, useMediaQueryMin } from "@/hooks/useMediaQuery"

export const Header: FC = () => {
  const navigate = useNavigate()
  const [largerThanLg] = useMediaQueryMin("lg", true)
  const [smallerThanMd] = useMediaQueryMax("md", true)
  const theme = useMantineTheme()

  return (
    <MantineHeader
      height={smallerThanMd ? 45 : 60}
      px="sm"
      py={smallerThanMd ? "sm" : "xs"}
      className={smallerThanMd ? "" : "sticky"}
    >
      <Grid justify="center" align="center" className={`h-[${smallerThanMd ? "70px" : "80px"}]`}>
        <Grid.Col span={5} md={3} px={smallerThanMd ? 0 : 16} className="max-w-[360px]">
          <Image
            src={Logo}
            alt="logo"
            width={smallerThanMd ? "100%" : "200px"}
            height="100%"
            className="cursor-pointer hover:opacity-80"
            onClick={() => !smallerThanMd && navigate("/")}
          />
        </Grid.Col>
        {!smallerThanMd && (
          <>
            <Grid.Col span={4} className="max-w-[480px]">
              <Group position="right">
                <Group spacing="xs" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/profile")}>
                  <MdPerson color={theme.other.primary} size="24px" />
                  {largerThanLg && <Title order={5}>プロフィール</Title>}
                </Group>
                <Group spacing="xs" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/archives")}>
                  <MdArchive color={theme.other.primary} size="24px" />
                  {largerThanLg && <Title order={5}>アーカイブ</Title>}
                </Group>
                <Group spacing="xs" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/categories")}>
                  <MdCategory color={theme.other.primary} size="24px" />
                  {largerThanLg && <Title order={5}>カテゴリー</Title>}
                </Group>
              </Group>
            </Grid.Col>
            <Grid.Col span={3} className="max-w-[360px]">
              <SpotlightProvider
                actions={[
                  {
                    title: "トップページ",
                    onTrigger: () => navigate("/"),
                    icon: <MdHome />,
                  },
                  {
                    title: "カテゴリーページ",
                    onTrigger: () => navigate("/categories"),
                    icon: <MdCategory />,
                  },
                  {
                    title: "アーカイブページ",
                    onTrigger: () => navigate("/archives"),
                    icon: <MdArchive />,
                  },
                ]}
                searchIcon={<AiOutlineSearch />}
                searchPlaceholder="Search..."
                nothingFoundMessage="Nothing found..."
                shortcut="mod + K"
              />
              <Input
                icon={<AiOutlineSearch />}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key !== "Enter") return
                  navigate(`/search?q=${e.currentTarget.value}`)
                }}
                radius="md"
                size="md"
              />
            </Grid.Col>
          </>
        )}
      </Grid>
    </MantineHeader>
  )
}
