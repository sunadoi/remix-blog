import { Box, Grid, Group, Paper, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import parse from "html-react-parser"

import { SyntaxHighlighter } from "@/components/SyntaxHighlighter"
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
      contentId: params.postId ?? "",
      queries: { draftKey: draftKey ?? "" },
    })
    .catch(() => {
      throw new Response("Content Not Found.", {
        status: 404,
      })
    })

  const toc = content.body
    .flatMap((c) => {
      if (c.fieldId !== "content") return null
      const html = parse(c.richText)
      if (!Array.isArray(html)) return null
      return html.map((e) =>
        e.type === "h2" || e.type === "h3" ? { id: e.props.id, text: e.props.children, name: e.type } : null
      )
    })
    .filter((t) => !!t)

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey ? { "Cache-Control": "no-store, max-age=0" } : undefined

  return json({ content, toc }, { ...(headers ? { headers } : {}) })
}

export default function PostsId() {
  const { content, toc } = useLoaderData<{
    content: MicroCMSContent
    toc: {
      id: string
      text: string
      name: string
    }[]
  }>()
  const theme = useMantineTheme()
  const navigate = useNavigate()
  const underMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false)

  return (
    <Grid justify="center">
      <Grid.Col span={underMd ? 12 : 7}>
        <Title order={2}>{content.title}</Title>
        <Box
          sx={(theme) => ({
            h2: {
              fontSize: "26px",
              fontWeight: "bold",
            },
            h3: {
              fontSize: "20px",
              fontWeight: "bold",
            },
            h4: {
              fontSize: "16px",
              fontWeight: "bold",
            },
            code: {
              backgroundColor: theme.colors.gray[2],
            },
          })}
        >
          {content.body.map((c, index) => {
            if (c.fieldId === "content") {
              return <Text key={c.richText + index}>{parse(c.richText)}</Text>
            }
            if (c.fieldId === "message") {
              return <Text key={c.message}>{parse(c.message)}</Text>
            }
            if (c.fieldId === "link") {
              return (
                <Text
                  key={c.url}
                  variant="link"
                  component="a"
                  href={c.url}
                  color="blue"
                  className="cursor-pointer hover:opacity-70"
                >
                  {c.url}
                </Text>
              )
            }
            return <SyntaxHighlighter key={c.code} code={c} />
          })}
        </Box>
      </Grid.Col>
      {!underMd && (
        <Grid.Col span={3}>
          <Paper my="md" p="md" radius="md" shadow="xs" className="sticky top-[16px]">
            <Group spacing="xs">
              <Stack spacing="xs">
                <Title order={4}>目次</Title>
                {toc.map((t) => (
                  <Title
                    key={t.id}
                    order={t.name === "h2" ? 4 : 5}
                    onClick={() => navigate(`#${t.id}`)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    {t.name === "h2" ? t.text : <span>　{t.text}</span>}
                  </Title>
                ))}
              </Stack>
            </Group>
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  )
}
