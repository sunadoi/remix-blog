import { Divider, Grid, Title, Group, Stack } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"

import { Archive } from "@/components/Archive"
import { Category } from "@/components/Category"
import { ContentCard, WideContentCard } from "@/components/ContentCard"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { CategoryType, MicroCMSContent } from "@/types/microcms"
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
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Grid justify="center">
      <Grid.Col span={largerThanMd ? 7 : 12} className="max-w-[830px]">
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
        <Stack>
          {contents.map((c) => (
            <WideContentCard key={c.id} content={c} />
          ))}
        </Stack>
        <Divider
          mt={64}
          mb="md"
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
            <Grid.Col key={c.id} span={largerThanMd ? 4 : 6}>
              <ContentCard content={c} />
            </Grid.Col>
          ))}
        </Grid>
      </Grid.Col>
      {largerThanMd && (
        <Grid.Col span={3} className="max-w-[360px]">
          <Category categories={categories} />
          <Archive archives={archives} />
        </Grid.Col>
      )}
    </Grid>
  )
}
