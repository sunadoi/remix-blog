import { AppShell } from "@mantine/core"
import type { LoaderFunction, MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from "@remix-run/react"
import type { FC, ReactNode } from "react"

import { Header } from "@/components/Header"
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

  if (!mounted) return <></>
  return (
    <AppShell header={<Header />} footer={smallerThanMd ? <SPNavbar path={path} /> : <></>}>
      <div className="min-h-[100vh]">{children}</div>
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
