import { Divider, Grid, Title, Paper, Center, Group, Image, Card, Text, AspectRatio } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import dayjs from "dayjs"
import { Fragment } from "react"
import { MdArchive } from "react-icons/md"

import { Category } from "@/components/category"
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

  return (
    <Grid justify="center">
      <Grid.Col span={7}>
        <Divider
          my="md"
          size="md"
          label={
            <Center className="gap-2">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                PICK UP
              </Title>
            </Center>
          }
        />
        <Divider
          my="md"
          size="md"
          label={
            <Center className="gap-2">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                All Topics ({contents.length})
              </Title>
            </Center>
          }
        />
        <Grid>
          {contents.map((c) => (
            <Card
              key={c.id}
              className="w-[29%] cursor-pointer"
              radius="md"
              p="sm"
              m="sm"
              shadow="xs"
              onClick={() => navigate(`/posts/${c.id}`)}
            >
              <AspectRatio ratio={16 / 9}>
                <Image src={c.image.url} alt="thumbnail" radius="sm" />
              </AspectRatio>
              <Text size="xl" sx={(theme) => ({ color: theme.other.primary })} weight="bold" my="sm" lineClamp={4}>
                {c.title}
              </Text>
              <Group position="apart">
                <Group spacing="xs">
                  {c.topic?.[0] && isCategory(c.topic?.[0]) && (
                    <Image src={CategoryIconMap.get(c.topic?.[0]) ?? ""} width="24px" />
                  )}
                  <Text sx={(theme) => ({ color: theme.other.secondary })}>{c.topic?.[0]}</Text>
                </Group>
                <Text size="sm" color="gray">
                  {dayjs(c.createdAt).format("YYYY.MM.DD")}
                </Text>
              </Group>
            </Card>
          ))}
        </Grid>
      </Grid.Col>
      <Grid.Col span={3}>
        <Category categories={categories} />
        <Paper my="md" p="md" radius="md" shadow="xs">
          <Group spacing="xs">
            <MdArchive size="20px" />
            <Title order={4}>アーカイブ</Title>
          </Group>
          <Divider my="sm" size="sm" />
          {archives.map((a, index) => (
            <Fragment key={a}>
              {index <= 2 ? (
                <Text sx={(theme) => ({ color: theme.other.secondary })}>{a}</Text>
              ) : (
                <Text color="blue">もっと見る</Text>
              )}
            </Fragment>
          ))}
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
