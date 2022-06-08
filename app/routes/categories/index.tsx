import { Divider, Grid, Title, Group } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { CategoryCard } from "@/components/CategoryCard"
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
  const { contents } = await client.getList<MicroCMSContent>({
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

  return { categories: sortedCategory }
}

export default function Index() {
  const { categories } = useLoaderData<{
    categories: { name: string; icon: string; total: number }[]
  }>()
  const [largerThanMd] = useMediaQueryMin("md", true)
  const [largerThanLg] = useMediaQueryMin("lg", true)

  return (
    <Grid justify="center">
      <Grid.Col span={largerThanMd ? 8 : 12} className="max-w-[1200px]">
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                Categories
              </Title>
            </Group>
          }
        />
        <Grid mt="xl">
          {categories.map((category) => {
            return (
              <Grid.Col key={category.name} span={largerThanLg ? 2 : 4}>
                <CategoryCard categoryName={category.name} icon={category.icon} total={category.total} />
              </Grid.Col>
            )
          })}
        </Grid>
      </Grid.Col>
    </Grid>
  )
}
