import { cx } from "@emotion/css"
import { Box, Blockquote, Text, Title, Group, Image, Paper } from "@mantine/core"
import { useScrollIntoView } from "@mantine/hooks"
import { useLocation, useNavigate } from "@remix-run/react"
import dayjs from "dayjs"
import parse from "html-react-parser"
import type { FC } from "react"
import { useEffect } from "react"
import { BiTime } from "react-icons/bi"
import { MdUpdate } from "react-icons/md"

import { BlogHeading } from "@/components/blog/BlogHeading"
import { Message } from "@/components/blog/Message"
import { SyntaxHighlighter } from "@/components/blog/SyntaxHighlighter"
import { CategoryIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { MicroCMSContent } from "@/types/microcms"

export const BlogContent: FC<{ content: MicroCMSContent }> = ({ content }) => {
  const [largerThanMd] = useMediaQueryMin("md", true)
  const navigate = useNavigate()
  const location = useLocation()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ duration: 0, offset: 60 })

  useEffect(() => {
    scrollIntoView()
  }, [largerThanMd])

  return (
    <Box
      sx={(theme) => ({
        code: {
          backgroundColor: theme.colors.gray[2],
          borderRadius: "4px",
          padding: "4px",
        },
      })}
    >
      <Title order={2}>{content.title}</Title>
      <Group my="sm">
        <Group spacing="xs">
          <BiTime />
          <Text color="gray">{dayjs(content.publishedAt).format("YYYY.MM.DD")}</Text>
        </Group>
        <Group spacing="xs">
          <MdUpdate />
          <Text color="gray">{dayjs(content.updatedAt).format("YYYY.MM.DD")}</Text>
        </Group>
      </Group>
      <ul
        className={cx(
          "flex list-none px-0 pb-[16px]",
          largerThanMd ? "flex-wrap gap-[16px]" : "gap-[8px] overflow-x-scroll whitespace-nowrap"
        )}
      >
        {content.category.map((c) => {
          return (
            <li
              key={c}
              className="max-w-max shrink-0 cursor-pointer hover:opacity-80"
              onClick={() => navigate(`/categories/${c}`)}
            >
              <Paper key={c} radius="xl" shadow="xs" px="md" py={4}>
                <Group spacing="xs" align="center">
                  <Image fit="contain" src={CategoryIconMap.get(c) ?? ""} alt="categoryIcon" width={20} height={20} />
                  <Text sx={(theme) => ({ color: theme.other.secondary })}>{c}</Text>
                </Group>
              </Paper>
            </li>
          )
        })}
      </ul>
      <Group position="center">
        <Image
          src={content.image.url}
          alt="thumbnail"
          width="60%"
          radius="md"
          mb="xl"
          classNames={{
            image: "mx-auto",
          }}
        />
      </Group>
      <div className="body">
        {content.body.map((c) => {
          if (c.fieldId === "content") {
            return [parse(c.richText)].flat().map((html, index) => {
              if (typeof html === "string") return <></>
              if (html.type === "h2" || html.type === "h3" || html.type === "h4") {
                return (
                  <div key={index} ref={decodeURI(location.hash) === `#${html.props.children}` ? targetRef : undefined}>
                    <BlogHeading type={html.type} id={html.props.children}>
                      {html.props.children}
                    </BlogHeading>
                  </div>
                )
              }
              if (html.type === "blockquote") {
                return (
                  <Box key={index} mt="lg">
                    <Blockquote
                      icon={null}
                      color="primary"
                      sx={(theme) => ({ backgroundColor: theme.colors.gray[1], borderRadius: theme.radius.md })}
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
            if (!c.type[0]) return <></>
            return (
              <Message type={c.type[0]} key={c.message}>
                {parse(c.message)}
              </Message>
            )
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
      </div>
    </Box>
  )
}
