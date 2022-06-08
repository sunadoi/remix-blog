import { Divider, Grid, Title, Group } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { PostsCard } from "@/components/profile/PostsCard"
import { ProfileCard } from "@/components/profile/ProfileCard"
import { QACard } from "@/components/profile/QACard"
import { CategoryIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { CategoryType, MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async () => {
  const { contents, totalCount } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
  })

  const categories = contents
    .flatMap((c) => c.category)
    .reduce((acc, category) => {
      return {
        ...acc,
        [category]: {
          icon: acc[category]?.icon ?? CategoryIconMap.get(category),
          total: (acc[category]?.total ?? 0) + 1,
        },
      }
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    }, {} as { [key in CategoryType]: { icon: string; total: number } })

  const sortedCategory = Object.entries(categories)
    .map(([categoryName, categoryInfo]) => ({
      ...categoryInfo,
      name: categoryName,
    }))
    .sort((a, b) => b.total - a.total)

  return { categories: sortedCategory, totalCount }
}

export default function Index() {
  const { categories, totalCount } = useLoaderData<{
    categories: { name: string; icon: string; total: number }[]
    totalCount: number
  }>()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Grid justify="center">
      <Grid.Col span={largerThanMd ? 10 : 12} className="max-w-[1200px]">
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                Profile
              </Title>
            </Group>
          }
        />
        <Group direction="column" spacing="xl" grow>
          <ProfileCard />
          <PostsCard categories={categories} total={totalCount} />
          <QACard />
        </Group>
      </Grid.Col>
    </Grid>
  )
}
