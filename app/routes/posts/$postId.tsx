import { Anchor, Grid, Group, Paper, Text, Title } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import copy from "copy-to-clipboard"
import parse from "html-react-parser"
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
    <Grid justify="center">
      <Grid.Col span={7}>
        <Title order={2}>{content.title}</Title>
        <div>
          {content.body.map((c) => {
            if (c.fieldId === "content") {
              return <Text key={c.richText}>{parse(c.richText)}</Text>
            }
            if (c.fieldId === "message") {
              return <Text key={c.message}>{parse(c.message)}</Text>
            }
            if (c.fieldId === "link") {
              return (
                <Anchor href={c.url} color="blue" className="cursor-pointer hover:opacity-70">
                  {c.url}
                </Anchor>
              )
            }

            return (
              <div key={c.code}>
                <button onClick={() => copy(c.code)}>copy</button>
                <SyntaxHighlighter
                  language={c.language}
                  style={xonokai}
                  showLineNumbers
                  wrapLines
                  wrapLongLines
                  customStyle={{ backgroundColor: "#22272E" }}
                  lineProps={(lineNumber) => {
                    return {
                      style: {
                        display: "block",
                        backgroundColor: [...c.diffAdd.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "#273732"
                          : [...c.diffRemove.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "#3F2D32"
                          : [...c.highlight.split(",").map((n) => Number(n))].includes(lineNumber)
                          ? "gray"
                          : "",
                      },
                    }
                  }}
                >
                  {c.code}
                </SyntaxHighlighter>
              </div>
            )
          })}
        </div>
      </Grid.Col>
      <Grid.Col span={3}>
        <Paper my="md" p="md" radius="md" shadow="xs">
          <Group spacing="xs">
            <Title order={4}>目次</Title>
          </Group>
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
