import { AppShell, Header, Grid, Title, Input, Group, Image, useMantineTheme, Button } from "@mantine/core"
import { SpotlightProvider } from "@mantine/spotlight"
import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useNavigate,
} from "@remix-run/react"
import type { FC, ReactNode } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import { MdHome, MdArchive, MdCategory, MdPerson } from "react-icons/md"

import Logo from "@/assets/logo.png"
import { SPNavbar } from "@/components/SPNavbar"
import { domain } from "@/constant"
import { useMediaQueryMax } from "@/hooks/useMediaQuery"
import { MantineTheme } from "@/theme"

import styles from "./styles/app.css"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Suna's Box",
  viewport: "width=device-width,initial-scale=1",
  "og:url": domain,
  "og:title": "Suna's Box",
  "og:description": "",
  "og:image":
    "https://images.microcms-assets.io/assets/99512b0b735d428db7dc00e7e293cb2b/04af4346dc7d46c08a65fcbaf802004b/logo.png",
  "og:site_name": "Suna's Box",
  "twitter:card": "summary_large_image",
})

export function links() {
  return [{ rel: "stylesheet", href: styles }]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const env = process.env.NODE_ENV
  return { path: url.pathname, env }
}

export default function App() {
  const { path, env } = useLoaderData<{ path: string; env: "development" | "production" }>()

  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
        {env === "production" && (
          <script
            async
            defer
            data-website-id="48f1a1ad-c550-4fc1-a9ee-6a48f621ed5e"
            src="https://umami-production-fc1a.up.railway.app/umami.js"
          ></script>
        )}
      </head>
      <body>
        <MantineTheme>
          <Layout path={path}>
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

const Layout: FC<{ path: string; children: ReactNode }> = ({ path, children }) => {
  const [smallerThanMd, mounted] = useMediaQueryMax("md", true)
  const navigate = useNavigate()
  const theme = useMantineTheme()

  if (!mounted) return <></>

  return (
    <AppShell
      header={
        <Header
          height={smallerThanMd ? 45 : 60}
          px="sm"
          py={smallerThanMd ? "sm" : "xs"}
          className={smallerThanMd ? "" : "sticky"}
        >
          <Grid justify="center" align="center" className={`h-[${smallerThanMd ? "70px" : "80px"}]`}>
            <Grid.Col span={smallerThanMd ? 5 : 3} px={smallerThanMd ? 0 : 16} className="max-w-[360px]">
              <Image
                src={Logo}
                alt="logo"
                width={smallerThanMd ? "100%" : "200px"}
                className="cursor-pointer hover:opacity-80"
                onClick={() => navigate("/")}
              />
            </Grid.Col>
            {!smallerThanMd && (
              <>
                <Grid.Col span={4} className="max-w-[480px]">
                  <Group position="right">
                    <Group spacing="xs" className="cursor-pointer hover:opacity-80">
                      <MdPerson color={theme.other.primary} size="20px" />
                      <Title order={5}>プロフィール</Title>
                    </Group>
                    <Group
                      spacing="xs"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => navigate("/archives")}
                    >
                      <MdArchive color={theme.other.primary} size="20px" />
                      <Title order={5}>アーカイブ</Title>
                    </Group>
                    <Group
                      spacing="xs"
                      className="cursor-pointer hover:opacity-80"
                      onClick={() => navigate("/categories")}
                    >
                      <MdCategory color={theme.other.primary} size="20px" />
                      <Title order={5}>カテゴリー</Title>
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
                  <Input icon={<AiOutlineSearch />} radius="md" size="md" />
                </Grid.Col>
              </>
            )}
          </Grid>
        </Header>
      }
      footer={smallerThanMd ? <SPNavbar path={path} /> : <></>}
    >
      {children}
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
