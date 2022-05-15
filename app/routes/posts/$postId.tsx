import { ActionIcon, Box, Grid, Group, Paper, Tooltip, useMantineTheme } from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction, MetaFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import parse from "html-react-parser"
import { useEffect, useState } from "react"
import { FaTwitter } from "react-icons/fa"
import { MdToc, MdShare, MdLink } from "react-icons/md"

import { BlogContent } from "@/components/blog/BlogContent"
import { Toc } from "@/components/blog/Toc"
import { domain } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { TocType } from "@/types/blog"
import type { MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "max-age=0, s-maxage=60, stale-while-revalidate=60"
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

  const toc = content.body
    .map((c) => {
      if (c.fieldId !== "content") return undefined
      return [parse(c.richText)]
        .flat()
        .map((html) => {
          if (typeof html === "string") return undefined
          if (html.type !== "h2" && html.type !== "h3" && html.type !== "h4") return undefined

          return { id: `toc-${html.props.id}`, h: html.type, text: html.props.children }
        })
        .filter((e): e is Exclude<TocType, undefined> => e !== undefined)
    })
    .filter((e): e is Exclude<TocType[], undefined> => e !== undefined)
    .flat()

  // 下書きの場合キャッシュヘッダを変更
  const headers = draftKey ? { "Cache-Control": "no-store, max-age=0" } : undefined

  return json({ content, toc }, { ...(headers ? { headers } : {}) })
}

export default function PostsId() {
  const { content, toc } = useLoaderData<{ content: MicroCMSContent; toc: TocType[] }>()
  const [largerThanMd] = useMediaQueryMin("md", true)
  const theme = useMantineTheme()
  const clipboard = useClipboard({ timeout: 2000 })
  // const [openShareModal, setOpenShareModal] = useState(false)
  const [openTocDialog, setOpenTocDialog] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const toc = document.querySelectorAll("#toc h6")
          const active = document.getElementById(`toc-${entry.target.textContent}`)
          if (entry.isIntersecting) {
            toc.forEach((t) => t?.classList.remove("isActive"))
            return active?.classList.add("isActive")
          }
          // 上にスクロールした時に正しい目次のハイライトにする
          if (entry.boundingClientRect.y > 0) {
            toc.forEach((t) => t?.classList.remove("isActive"))
            let activeIndex = 0
            toc.forEach((t, index) => (t.id === active?.id ? (activeIndex = index) : undefined))
            toc.forEach((t, index) => (index === activeIndex - 1 ? t?.classList.add("isActive") : undefined))
          }
        })
      },
      { root: null, rootMargin: "10% 0% -90% 0%" }
    )
    document.querySelectorAll("#contents h2,h3,h4").forEach((ele) => observer.observe(ele))
  }, [largerThanMd])

  return (
    <>
      <Grid justify="center">
        <Grid.Col span={largerThanMd ? 7 : 12} className={`${largerThanMd ? "max-w-[830px]" : ""} relative`}>
          {largerThanMd ? (
            <>
              <Group align="flex-start" className="absolute left-[-48px] h-[100%]">
                <Group direction="column" align="center" spacing="sm" className="sticky top-[200px]">
                  <ActionIcon
                    radius={100}
                    size="xl"
                    sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
                    className="hover:opacity-80"
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
                  >
                    <FaTwitter color="#00acee" size={24} />
                  </ActionIcon>
                </Group>
              </Group>
              <Paper my="md" mx={0} p="md" radius="md" shadow="xs">
                <BlogContent content={content} />
              </Paper>
            </>
          ) : (
            <BlogContent content={content} />
          )}
        </Grid.Col>
        {largerThanMd && (
          <Grid.Col span={3} className="max-w-[360px]">
            <Box className="sticky top-[88px]">
              <Toc toc={toc} />
            </Box>
          </Grid.Col>
        )}
      </Grid>
      {!largerThanMd && (
        <Group position="right" align="flex-end" className="fixed bottom-[88px] right-4">
          {/* NOTO: unmountするとIntersectionObserverが検出できなくなるためdisplay: noneにする */}
          <Box className={openTocDialog ? "" : "hidden"}>
            <Toc toc={toc} />
          </Box>
          <ActionIcon
            radius={100}
            size="md"
            variant="filled"
            className="bg-white hover:bg-white"
            sx={() => ({ boxShadow: "rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 10%) 0px 1px 2px" })}
            onClick={async () => {
              await navigator.share({
                title: content.title,
                text: content.title,
                url: "",
              })
            }}
          >
            <MdShare color={theme.other.primary} size={16} />
          </ActionIcon>
          <ActionIcon
            variant="filled"
            radius={100}
            color={theme.other.primary}
            size="xl"
            onClick={() => setOpenTocDialog((prev) => !prev)}
          >
            <MdToc size={24} />
          </ActionIcon>
          {/* <Modal
            opened={openShareModal}
            onClose={() => setOpenShareModal(false)}
            withCloseButton={false}
            overlayOpacity={0.3}
            centered
          >
            <Group direction="column" position="center">
              <Title order={3}>シェアしてくれるとうれしい</Title>
              <Group position="center">
                <ActionIcon
                  component="a"
                  href={`https://twitter.com/intent/tweet?url=${domain}/posts/${content.id}&text=${content.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <FaTwitter color="#00acee" size={36} />
                </ActionIcon>
              </Group>
              <Button variant="white" onClick={() => setOpenShareModal(false)}>
                とじる
              </Button>
            </Group>
          </Modal> */}
        </Group>
      )}
    </>
  )
}
