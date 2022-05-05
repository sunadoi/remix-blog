import { css, cx } from "@emotion/css"
import { Blockquote, Box, Grid, Group, Paper, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import parse from "html-react-parser"
import { useEffect } from "react"
import tocbot from "tocbot"

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

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey ? { "Cache-Control": "no-store, max-age=0" } : undefined

  return json({ content }, { ...(headers ? { headers } : {}) })
}

export default function PostsId() {
  const { content } = useLoaderData<{
    content: MicroCMSContent
    toc: {
      id: string
      text: string
      name: string
    }[]
  }>()
  const theme = useMantineTheme()
  const underMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false)

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h2, h3, h4",
    })
    return () => tocbot.destroy()
  }, [])

  return (
    <Grid justify="center">
      <Grid.Col span={underMd ? 12 : 7}>
        <Title order={2} mb="md">
          {content.title}
        </Title>
        <Box
          className="body"
          sx={(theme) => ({
            code: {
              backgroundColor: theme.colors.gray[2],
              borderRadius: "4px",
              padding: "4px",
            },
          })}
        >
          {content.body.map((c) => {
            if (c.fieldId === "content") {
              return [parse(c.richText)].flat().map((html, index) => {
                if (typeof html === "string") return <></>
                if (html.type === "h2" || html.type === "h3" || html.type === "h4") {
                  return (
                    <Title
                      key={index}
                      id={html.props.id}
                      order={html.type === "h2" ? 2 : html.type === "h3" ? 3 : 4}
                      mt="xl"
                    >
                      {html.props.children}
                    </Title>
                  )
                }
                if (html.type === "blockquote") {
                  return (
                    <Box key={index} mt="lg">
                      <Blockquote
                        icon={null}
                        color="primary"
                        sx={(theme) => ({ backgroundColor: theme.colors.gray[1] })}
                      >
                        {html.props.children}
                      </Blockquote>
                    </Box>
                  )
                }
                return (
                  <Text key={index} className="leading-loose">
                    {html.props.children}
                  </Text>
                )
              })
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
            return (
              <Box key={c.code} my="lg">
                <SyntaxHighlighter code={c} />
              </Box>
            )
          })}
        </Box>
      </Grid.Col>
      {!underMd && (
        <Grid.Col span={3}>
          <Paper mb="md" mt={56} p="md" radius="md" shadow="xs" className="sticky top-[88px]">
            <Group spacing="xs">
              <Stack spacing="xs">
                <Title order={4}>目次</Title>
                <Box
                  className={cx(
                    "toc",
                    "font-bold",
                    "leading-loose",
                    css`
                      ol {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;
                      }
                      a {
                        opacity: 0.5;
                        color: ${theme.other.primary};
                        text-decoration: none;
                      }
                      .is-active-link {
                        opacity: 1;
                      }
                      .node-name--H3::before {
                        white-space: pre;
                        content: "    ";
                      }
                      .node-name--H4::before {
                        white-space: pre;
                        content: "        ";
                      }
                    `
                  )}
                />
              </Stack>
            </Group>
          </Paper>
        </Grid.Col>
      )}
    </Grid>
  )
}
