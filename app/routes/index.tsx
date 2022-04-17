import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import type { MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async () => {
  const { contents } = await client.getList<MicroCMSContent[]>({
    endpoint: "posts",
  })
  return contents
}

export default function Index() {
  const contents = useLoaderData<MicroCMSContent[]>()
  return (
    <div>
      {contents.map((c) => (
        <p key={c.id}>
          <Link to={`/posts/${c.id}`}>{c.title}</Link>
          {new Date(c.createdAt).toLocaleString()}
        </p>
      ))}
    </div>
  )
}
