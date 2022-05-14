import { Divider, Grid, Title, Group, Stack, Pagination, Container } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"

import { Archive } from "@/components/Archive"
import { Category } from "@/components/Category"
import { ContentCard, WideContentCard } from "@/components/ContentCard"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { CategoryType, MicroCMSContent } from "@/types/microcms"
import { dayjsSSR } from "@/utils/date"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get("page") ?? 1)
  const per = 12

  const { contents, totalCount } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
    queries: { limit: per, offset: (page - 1) * per },
  })
  const categories = contents
    .flatMap((c) => c.category)
    .reduce(
      (acc, category) => {
        return { ...acc, [category]: (acc[category] ?? 0) + 1 }
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as { [key in string]: number }
    )
  const archives = contents.reduce((acc, c) => {
    const date = dayjsSSR(c.publishedAt)
    return {
      ...acc,
      [date.format("YYYY年MM月")]: {
        month: date.month() + 1,
        count: (acc[date.format("YYYY年MM月")]?.["count"] ?? 0) + 1,
      },
    }
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  }, {} as { [key in string]: { month: number; count: number } })
  return { contents, categories, archives, page, totalCount }
}

export default function Index() {
  const { contents, categories, archives, page, totalCount } = useLoaderData<{
    contents: MicroCMSContent[]
    categories: { [key in CategoryType]: number }
    archives: { [key in string]: { month: number; count: number } }
    page: number
    totalCount: number
  }>()
  const navigate = useNavigate()
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
          <Container>
            <Pagination page={page} onChange={(page) => navigate(`?page=${page}`)} total={totalCount} my="xl" />
          </Container>
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
