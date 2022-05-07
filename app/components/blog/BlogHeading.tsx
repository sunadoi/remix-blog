import { Title, Group } from "@mantine/core"
import type { ReactNode, FC } from "react"

type BlogHeadingProps = {
  id: string
  children: ReactNode
}

export const BlogHeading: FC<BlogHeadingProps & { type: "h2" | "h3" | "h4" }> = ({ type, id, children }) => {
  return type === "h2" ? (
    <H2 id={id}>{children}</H2>
  ) : type === "h3" ? (
    <H3 id={id}>{children}</H3>
  ) : (
    <H4 id={id}>{children}</H4>
  )
}

const H2: FC<BlogHeadingProps> = ({ id, children }) => {
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

const H3: FC<BlogHeadingProps> = ({ id, children }) => {
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

const H4: FC<BlogHeadingProps> = ({ id, children }) => {
  return (
    <Group spacing="xs" mt="xl">
      <Title order={1}>|</Title>
      <Title id={id} order={4}>
        {children}
      </Title>
    </Group>
  )
}
