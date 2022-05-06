import { AppShell, Header, Grid, Title, Input, Group, Burger, Drawer, Image } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useNavigate } from "@remix-run/react"
import type { FC, ReactNode } from "react"
import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { BsFillPersonFill } from "react-icons/bs"
import { MdArchive, MdCategory } from "react-icons/md"

import Logo from "@/assets/logo.png"
import { useMediaQueryMax } from "@/hooks/useMediaQuery"
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
  const [smallerThanMd, mounted] = useMediaQueryMax("md", true)
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  if (!mounted) return <></>

  return (
    <AppShell
      header={
        <Header height={smallerThanMd ? 45 : 60} px="sm" py={smallerThanMd ? "sm" : "xs"}>
          <Grid justify="center" align="center" className={`h-[${smallerThanMd ? "70px" : "80px"}]`}>
            <Grid.Col span={smallerThanMd ? 6 : 3} px={smallerThanMd ? 0 : 16} className="max-w-[360px]">
              <Image
                src={Logo}
                alt="logo"
                width={smallerThanMd ? "150px" : "200px"}
                className="cursor-pointer hover:opacity-80"
                onClick={() => navigate("/")}
              />
            </Grid.Col>
            {smallerThanMd ? (
              <Grid.Col span={1} offset={4}>
                <Burger opened={isOpen} onClick={() => setIsOpen((o) => !o)} size="sm" />
              </Grid.Col>
            ) : (
              <>
                <Grid.Col span={4} className="max-w-[480px]">
                  <Group position="right">
                    <Group spacing="xs" className="cursor-pointer hover:opacity-80">
                      <BsFillPersonFill size="20px" />
                      <Title order={5}>プロフィール</Title>
                    </Group>
                    <Group
                      spacing="xs"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => navigate("/archives")}
                    >
                      <MdArchive size="20px" />
                      <Title order={5}>アーカイブ</Title>
                    </Group>
                    <Group spacing="xs" className="cursor-pointer hover:opacity-80">
                      <MdCategory size="20px" />
                      <Title order={5}>カテゴリー</Title>
                    </Group>
                  </Group>
                </Grid.Col>
                <Grid.Col span={3} className="max-w-[360px]">
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
