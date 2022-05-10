import { ActionIcon, Box, Grid, Group, Paper, useMantineTheme } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect } from "react"
import { MdToc, MdShare } from "react-icons/md"
import tocbot from "tocbot"

import { BlogContent } from "@/components/blog/BlogContent"
import { Toc } from "@/components/blog/Toc"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
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
  const [largerThanMd] = useMediaQueryMin("md", true)
  const theme = useMantineTheme()

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h2, h3, h4",
    })
    return () => tocbot.destroy()
  }, [])

  return (
    <>
      <Grid justify="center">
        <Grid.Col span={largerThanMd ? 7 : 12} className={`${largerThanMd ? "max-w-[830px]" : ""}`}>
          {largerThanMd ? (
            <Paper my="md" mx={0} p="md" radius="md" shadow="xs">
              <BlogContent content={content} />
            </Paper>
          ) : (
            <BlogContent content={content} />
          )}
        </Grid.Col>
        {largerThanMd && (
          <Grid.Col span={3} className="max-w-[360px]">
            <Box className="sticky top-[88px]">
              <Toc />
            </Box>
          </Grid.Col>
        )}
      </Grid>
      {!largerThanMd && (
        <Group position="right" align="flex-end" className="fixed bottom-[88px] right-4">
          <ActionIcon
            radius={100}
            size="md"
            variant="filled"
            className="bg-white hover:bg-white"
            sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
          >
            <MdShare color={theme.other.primary} size={16} />
          </ActionIcon>
          <ActionIcon variant="filled" radius={100} color={theme.other.primary} size="xl">
            <MdToc size={24} />
          </ActionIcon>
        </Group>
      )}
    </>
  )
}
