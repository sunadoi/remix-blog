import { Badge, Grid, Group, Image, Title } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { ContentCard } from "@/components/ContentCard"
import { CategoryIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { CategoryType, MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  const cacheControl = loaderHeaders.get("Cache-Control") ?? "max-age=0, s-maxage=60, stale-while-revalidate=60"
  return {
    "cache-control": cacheControl,
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const { contents } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
    queries: { filters: `category[contains]${params.category}` },
  })

  return { contents, category: params.category }
}

export default function Category() {
  const { contents, category } = useLoaderData<{ contents: MicroCMSContent[]; category: CategoryType }>()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Grid justify="center">
      <Grid.Col span={largerThanMd ? 8 : 12} className="max-w-[1200px]">
        <Group mt="xl" mb="lg" position={largerThanMd ? "left" : "center"}>
          <Image
            src={CategoryIconMap.get(category) ?? ""}
            width={largerThanMd ? 120 : 80}
            height={largerThanMd ? 120 : 80}
            fit="contain"
          />
          <Group align="center" direction="column" spacing="xs">
            <Title order={3}>{category}</Title>
            <Badge radius="md" variant="filled" size="lg">
              {contents.length}記事
            </Badge>
          </Group>
        </Group>
        <Grid>
          {contents.map((c) => {
            return (
              <Grid.Col key={c.id} span={largerThanMd ? 3 : 6}>
                <ContentCard content={c} />
              </Grid.Col>
            )
          })}
        </Grid>
      </Grid.Col>
    </Grid>
  )
}
