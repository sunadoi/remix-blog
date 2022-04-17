import type { MetaFunction } from "@remix-run/node"
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch } from "@remix-run/react"

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "すな.dev",
  viewport: "width=device-width,initial-scale=1",
})

export default function App() {
  return (
    <html lang="ja">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
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
