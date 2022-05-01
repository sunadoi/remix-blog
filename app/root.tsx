import { AppShell, Header, Grid, Title, Input, Group, Burger, useMantineTheme, Drawer } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import type { MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react"
import type { FC, ReactNode } from "react"
import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { MdArchive, MdCategory } from "react-icons/md"

import { MantineTheme } from "@/theme"

import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "すな.dev",
  viewport: "width=device-width,initial-scale=1",
})

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineTheme>
          <Layout>
            <Outlet />
          </Layout>
        </MantineTheme>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useMantineTheme()
  const underMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AppShell
      header={
        <Header height={70} px="sm" py="xs">
          <Grid justify="center" align="center" className="h-[80px]">
            <Grid.Col span={underMd ? 6 : 3} px={0}>
              <Title order={1}>すな.dev</Title>
            </Grid.Col>
            {underMd ? (
              <Grid.Col span={1} offset={4}>
                <Burger opened={isOpen} onClick={() => setIsOpen((o) => !o)} size="sm" />
              </Grid.Col>
            ) : (
              <>
                <Grid.Col span={4}>
                  <Group position="right">
                    <Group spacing="xs" className="cursor-pointer">
                      <BsFillPersonFill size="20px" />
                      <Title order={5}>プロフィール</Title>
                    </Group>
                    <Group spacing="xs" className="cursor-pointer">
                      <MdArchive size="20px" />
                      <Title order={5}>アーカイブ</Title>
                    </Group>
                    <Group spacing="xs" className="cursor-pointer">
                      <MdCategory size="20px" />
                      <Title order={5}>カテゴリー</Title>
                    </Group>
                  </Group>
                </Grid.Col>
                <Grid.Col span={3}>
                  <Input icon={<AiOutlineSearch />} radius="md" size="md" />
                </Grid.Col>
              </>
            )}
          </Grid>
        </Header>
      }
    >
      {children}
      <Drawer opened={isOpen} onClose={() => setIsOpen(false)} position="right" padding="sm" size="md">
        aaaa
      </Drawer>
    </AppShell>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  if (caught.status === 404) {
    return (
      <div>
        <h1>{caught.statusText}</h1>
      </div>
    )
  }
  throw new Error(`Unhandled error: ${caught.status}`)
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>{error.message}</h1>
    </div>
  )
}
