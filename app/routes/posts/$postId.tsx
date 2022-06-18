import { cx } from "@emotion/css"
import { ActionIcon, Box, Divider, Grid, Group, Overlay, Paper, Tooltip, useMantineTheme } from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { FaTwitter } from "react-icons/fa"
import { MdClose, MdShare, MdLink, MdToc } from "react-icons/md"
import tocbot from "tocbot"

import { CoffeeArea, CoffeeCard } from "@/components/CoffeeCard"
import { BlogContent } from "@/components/blog/BlogContent"
import { TocCard, TocDialog } from "@/components/blog/Toc"
import { domain } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "max-age=0, s-maxage=240, stale-while-revalidate=60"
  return {
    "cache-control": cacheControl,
  }
}

export const meta: MetaFunction = ({ data }) => {
  return {
    "og:url": `${domain}/posts/${data.content.id}`,
    "og:title": data.content.title,
    "og:image": data.content.image.url,
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
  const headers = draftKey ? { "Cache-Control": "no-cache" } : undefined

  return json({ content }, { ...(headers ? { headers } : {}) })
}

export default function PostsId() {
  const { content } = useLoaderData<{ content: MicroCMSContent }>()
  const [largerThanMd] = useMediaQueryMin("md", true)
  const theme = useMantineTheme()
  const clipboard = useClipboard({ timeout: 2000 })
  const [openTocDialog, setOpenTocDialog] = useState(false)

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".body",
      headingSelector: "h2, h3, h4, h5, h6",
      scrollSmoothOffset: largerThanMd ? -80 : -10,
    })
    return () => tocbot.destroy()
  }, [largerThanMd])

  return (
    <>
      <Grid justify="center">
        <Grid.Col span={12} md={7} className={`${largerThanMd ? "max-w-[830px]" : ""} relative`}>
          {largerThanMd ? (
            <>
              <Group align="flex-start" className="absolute left-[-48px] h-[100%]">
                <Group direction="column" align="center" spacing="sm" className="sticky top-[200px]">
                  <ActionIcon
                    radius={100}
                    size="xl"
                    sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
                    className="hover:opacity-80"
                    aria-label="copy"
                    onClick={() => clipboard.copy(location.href)}
                  >
                    <Tooltip opened={clipboard.copied} label="URLをコピーしました" className="flex items-center">
                      <MdLink color="gray" size={24} />
                    </Tooltip>
                  </ActionIcon>
                  <ActionIcon
                    component="a"
                    href={`https://twitter.com/intent/tweet?url=${domain}/posts/${content.id}&text=${content.title}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    radius={100}
                    size="xl"
                    sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
                    className="hover:opacity-80"
                    aria-label="twitter"
                  >
                    <FaTwitter color="#00acee" size={24} />
                  </ActionIcon>
                </Group>
              </Group>
              <Paper my="md" mx={0} p="md" radius="md" shadow="xs">
                <BlogContent content={content} />
              </Paper>
              <CoffeeCard />
            </>
          ) : (
            <>
              {openTocDialog && (
                <Overlay
                  color="black"
                  opacity={0.5}
                  zIndex={200}
                  sx={() => ({ position: "fixed" })}
                  onClick={() => setOpenTocDialog(false)}
                />
              )}
              <BlogContent content={content} />
              <Divider mt="xl" size="sm" />
              <CoffeeArea />
            </>
          )}
        </Grid.Col>
        {largerThanMd && (
          <Grid.Col span={3} className="max-w-[360px]">
            <Box className="sticky top-[88px]">
              <TocCard />
            </Box>
          </Grid.Col>
        )}
      </Grid>
      {!largerThanMd && (
        <>
          {/* NOTO: unmountすると検出できなくなるためdisplay: noneにする */}
          <Paper
            my="md"
            p="md"
            radius="md"
            shadow="xs"
            onClick={() => setOpenTocDialog(false)}
            className={cx(
              `${openTocDialog ? "" : "hidden"}`,
              "fixed bottom-[150px] left-[50%] z-[300] ml-[-46%] w-[90%]"
            )}
          >
            <TocDialog />
          </Paper>
          <Group position="right" align="flex-end" className="fixed bottom-[96px] right-4 z-[300]">
            <ActionIcon
              radius={100}
              size={48}
              variant="filled"
              className="bg-white hover:bg-white"
              aria-label="share"
              sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
              onClick={async () => {
                await navigator.share({
                  title: content.title,
                  text: content.title,
                  url: "",
                })
              }}
            >
              {openTocDialog && <Overlay color="black" m={-1} radius={100} opacity={0.5} zIndex={1} />}
              <MdShare color={theme.other.primary} size={24} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              aria-label="toc"
              radius={100}
              sx={(theme) => ({
                color: openTocDialog ? theme.other.primary : theme.other.white,
                backgroundColor: openTocDialog ? theme.other.white : theme.other.primary,
                "&:hover": {
                  color: openTocDialog ? theme.other.primary : theme.other.white,
                  backgroundColor: openTocDialog ? theme.other.white : theme.other.primary,
                },
              })}
              size={56}
              onClick={() => setOpenTocDialog((prev) => !prev)}
            >
              {openTocDialog ? <MdClose size={32} /> : <MdToc size={32} />}
            </ActionIcon>
          </Group>
        </>
      )}
    </>
  )
}
