import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import copy from "copy-to-clipboard"
import parse from "html-react-parser"
import { Fragment } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism"

import type { MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "max-age=0, s-maxage=60, stale-while-revalidate=60"
  return {
    "cache-control": cacheControl,
  }
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url)
  const draftKey = url.searchParams.get("draftKey")
  const content = await client
    .get<MicroCMSContent>({
      endpoint: "posts",
      contentId: params.postId,
      queries: { draftKey: draftKey ?? "" },
    })
    .catch(() => {
      throw new Response("Content Not Found.", {
        status: 404,
      })
    })

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey ? { "Cache-Control": "no-store, max-age=0" } : undefined

  return json(content, { headers })
}

export default function PostsId() {
  const content = useLoaderData<MicroCMSContent>()

  return (
    <div>
      <h2>{content.title}</h2>
      <div>
        {content.body.map((c) => {
          if (c.type.includes("code")) {
            const code = c.code[0]
            if (!code) throw new Error("no code tag")
            return (
              <Fragment key={code.code}>
                <button onClick={() => copy(code.code)}>copy</button>
                <SyntaxHighlighter
                  language={code.language}
                  style={xonokai}
                  showLineNumbers
                  wrapLines
                  wrapLongLines
                  customStyle={{ backgroundColor: "#22272E" }}
                  lineProps={(lineNumber) => {
                    return {
                      style: {
                        display: "block",
                        backgroundColor: [...code.diffAdd.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "#273732"
                          : [...code.diffRemove.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "#3F2D32"
                          : [...code.highlight.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "gray"
                          : "",
                      },
                    }
                  }}
                >
                  {code.code}
                </SyntaxHighlighter>
              </Fragment>
            )
          }
          return <Fragment key={c.rich}>{parse(c.rich)}</Fragment>
        })}
      </div>
    </div>
  )
}
