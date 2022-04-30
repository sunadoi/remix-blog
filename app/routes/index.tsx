import { Divider, Grid, Title, Group, Image, Card, Text, AspectRatio, Overlay, useMantineTheme } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate, useTransition } from "@remix-run/react"
import dayjs from "dayjs"
import { useState } from "react"

import { Archive } from "@/components/Archive"
import { Category } from "@/components/Category"
import { CategoryIconMap } from "@/constant"
import type { CategoryType, MicroCMSContent } from "@/types/microcms"
import { isCategory } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async () => {
  const { contents } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
  })
  const categories = contents
    .flatMap((c) => c.category)
    .reduce(
      (acc, category) => {
        return { ...acc, [category]: acc[category] ? (acc[category] ?? 0) + 1 : 1 }
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as { [key in string]: number }
    )
  const archives = [...new Set(contents.map((c) => dayjs(c.publishedAt).format("YYYY年MM月")))]
  return { contents, categories, archives }
}

export default function Index() {
  const { contents, categories, archives } = useLoaderData<{
    contents: MicroCMSContent[]
    categories: { [key in CategoryType]: number }
    archives: string[]
  }>()
  const navigate = useNavigate()
  const [selectedCardId, setSelectedCardId] = useState("")
  const transition = useTransition()
  const theme = useMantineTheme()
  const underMd = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`, false)

  return (
    <Grid justify="center">
      <Grid.Col span={underMd ? 12 : 7}>
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                PICK UP
              </Title>
            </Group>
          }
        />
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                All Topics ({contents.length})
              </Title>
            </Group>
          }
        />
        <Grid>
          {contents.map((c) => (
            <Grid.Col key={c.id} span={underMd ? 6 : 4}>
              <Card
                className="cursor-pointer"
                radius="md"
                p="sm"
                shadow="xs"
                onClick={() => {
                  setSelectedCardId(c.id)
                  navigate(`/posts/${c.id}`)
                }}
              >
                {transition.state === "loading" && selectedCardId === c.id && (
                  <Overlay opacity={0.3} color="white" zIndex={1} />
                )}
                <AspectRatio ratio={16 / 9}>
                  <Image src={c.image.url} alt="thumbnail" radius="sm" />
                </AspectRatio>
                <Text
                  size={underMd ? "md" : "xl"}
                  sx={(theme) => ({ color: theme.other.primary })}
                  weight="bold"
                  my="xs"
                  lineClamp={4}
                >
                  {c.title}
                </Text>
                <Group position="apart" direction={underMd ? "column" : "row"} spacing={0}>
                  <Group spacing="xs">
                    {c.topic?.[0] && isCategory(c.topic?.[0]) && (
                      <Image src={CategoryIconMap.get(c.topic?.[0]) ?? ""} width={underMd ? "14px" : "24px"} />
                    )}
                    <Text sx={(theme) => ({ color: theme.other.secondary })} size={underMd ? "sm" : "md"}>
                      {c.topic?.[0]}
                    </Text>
                  </Group>
                  <Text size="sm" color="gray">
                    {dayjs(c.createdAt).format("YYYY.MM.DD")}
                  </Text>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
      {!underMd && (
        <Grid.Col span={3}>
          <Category categories={categories} />
          <Archive archives={archives} />
        </Grid.Col>
      )}
    </Grid>
  )
}
