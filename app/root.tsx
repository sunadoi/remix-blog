import { AppShell, Header, Grid, Title } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react"
import type { FC, ReactNode } from "react"

import styles from "@/styles/app.css"
import { MantineTheme } from "@/theme"

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
  return (
    <AppShell
      header={
        <Header height={70} px="sm" py="xs">
          <Grid justify="center" align="center" className="h-[80px]">
            <Grid.Col span={3}>
              <Title order={1}>すな.dev</Title>
            </Grid.Col>
            <Grid.Col span={7}>
              <Title order={1}>すな.dev</Title>
            </Grid.Col>
          </Grid>
        </Header>
      }
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
