import { Box, Blockquote, Text } from "@mantine/core"
import parse from "html-react-parser"
import type { FC } from "react"

import { BlogHeading } from "@/components/BlogHeading"
import { Message } from "@/components/Message"
import { SyntaxHighlighter } from "@/components/SyntaxHighlighter"
import type { MicroCMSContent } from "@/types/microcms"

export const BlogContent: FC<{ content: MicroCMSContent }> = ({ content }) => {
  return (
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
                <BlogHeading key={index} type={html.type} id={html.props.id}>
                  {html.props.children}
                </BlogHeading>
              )
            }
            if (html.type === "blockquote") {
              return (
                <Box key={index} mt="lg">
                  <Blockquote icon={null} color="primary" sx={(theme) => ({ backgroundColor: theme.colors.gray[1] })}>
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
    </Box>
  )
}
