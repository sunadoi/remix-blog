import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"

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
      <p>aaa</p>
      {contents.map((c) => (
        <div key={c.id}>
          <Link to={`/posts/${c.id}`}>{c.title}</Link>
          <p>{dayjs(c.createdAt).format("YYYY年MM月DD日")}</p>
        </div>
      ))}
    </div>
  )
}
