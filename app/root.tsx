import { AppShell, LoadingOverlay } from "@mantine/core"
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
  useTransition,
} from "@remix-run/react"
import type { FC, ReactNode } from "react"
import { useState } from "react"

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

export const loader: LoaderFunction = async () => {
  const env = process.env.NODE_ENV
  return { env }
}

export default function App() {
  const { env } = useLoaderData<{ env: "development" | "production" }>()

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
  const transition = useTransition()
  const [navLoading, setNavLoading] = useState(false)

  if (!mounted) return <></>
  return (
    // TODO: Loadingを出さなくて済むくらいレスポンスを早くする
    <AppShell header={<Header />} footer={smallerThanMd ? <SPNavbar setNavLoading={setNavLoading} /> : <></>}>
      <div className="min-h-[100vh]">
        <LoadingOverlay
          visible={transition.state === "loading" && navLoading}
          overlayOpacity={0.5}
          overlayColor="white"
          className="fixed"
        />
        {children}
      </div>
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
