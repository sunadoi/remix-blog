import { Divider, Grid, Title, Group, Stack, Pagination, Box } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import Slider from "react-slick"

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

export function links() {
  return [
    {
      rel: "stylesheet",
      type: "text/css",
      charSet: "UTF-8",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css",
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css",
    },
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get("page") ?? 1)
  const per = 12

  const { contents, totalCount } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
    queries: { limit: per, offset: (page - 1) * per },
  })

  const pickupContents = contents.filter((c) =>
    ["react18-strict-mode", "library-template-literal-types"].includes(c.id)
  )

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
  return { contents, pickupContents, categories, archives, page, totalCount, totalPages: Math.ceil(totalCount / per) }
}

export default function Index() {
  const { contents, pickupContents, categories, archives, page, totalCount, totalPages } = useLoaderData<{
    contents: MicroCMSContent[]
    pickupContents: MicroCMSContent[]
    categories: { [key in CategoryType]: number }
    archives: { [key in string]: { month: number; count: number } }
    page: number
    totalCount: number
    totalPages: number
  }>()
  const navigate = useNavigate()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Grid justify="center">
      <Grid.Col span={12} md={7} className="w-[100%] max-w-[830px]">
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                Pick Up
              </Title>
            </Group>
          }
        />
        {largerThanMd ? (
          <Stack>
            {pickupContents.map((c) => (
              <WideContentCard key={c.id} content={c} />
            ))}
          </Stack>
        ) : (
          <Slider autoplay infinite arrows={false} slidesToShow={1} slidesToScroll={1} centerMode speed={0}>
            {pickupContents.map((c) => (
              <Box key={c.id} px="md">
                <ContentCard content={c} />
              </Box>
            ))}
          </Slider>
        )}
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
                All Topics ({totalCount})
              </Title>
            </Group>
          }
        />
        <Grid>
          {contents.map((c) => (
            <Grid.Col key={c.id} span={6}>
              <ContentCard content={c} />
            </Grid.Col>
          ))}
        </Grid>
        <Group position="center">
          <Pagination
            page={page}
            siblings={0}
            boundaries={1}
            onChange={(page) => navigate(`?page=${page}`)}
            total={totalPages}
            my="xl"
          />
        </Group>
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
