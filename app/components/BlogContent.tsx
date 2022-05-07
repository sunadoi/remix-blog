import { Box, Title, Blockquote, Text, Group } from "@mantine/core"
import parse from "html-react-parser"
import type { FC, ReactNode } from "react"

import { SyntaxHighlighter } from "@/components/SyntaxHighlighter"
import type { MicroCMSContent } from "@/types/microcms"

type HeadingProps = {
  id: string
  children: ReactNode
}

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
              return html.type === "h2" ? (
                <H2 key={index} id={html.props.id}>
                  {html.props.children}
                </H2>
              ) : html.type === "h3" ? (
                <H3 key={index} id={html.props.id}>
                  {html.props.children}
                </H3>
              ) : (
                <H4 key={index} id={html.props.id}>
                  {html.props.children}
                </H4>
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
  )
}

const H2: FC<HeadingProps> = ({ id, children }) => {
  return (
    <Title
      id={id}
      p="sm"
      order={2}
      mt="xl"
      sx={(theme) => ({ backgroundColor: theme.other.paleBlue, borderRadius: theme.radius.md })}
    >
      {children}
    </Title>
  )
}

const H3: FC<HeadingProps> = ({ id, children }) => {
  return (
    <Title
      id={id}
      py="sm"
      px="xs"
      order={3}
      mt="xl"
      sx={(theme) => ({ borderBottom: `3px solid ${theme.other.paleBlue}` })}
    >
      {children}
    </Title>
  )
}

const H4: FC<HeadingProps> = ({ id, children }) => {
  return (
    <Group spacing="xs" mt="xl">
      <Title order={1}>|</Title>
      <Title id={id} order={4}>
        {children}
      </Title>
    </Group>
  )
}
