import { Divider, Grid, Title, Group, Text, Input } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { AiOutlineSearch } from "react-icons/ai"

import { ContentCard } from "@/components/ContentCard"
import type { MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url)
  const q = url.searchParams.get("q") ?? ""
  const { contents } = await client.getList<MicroCMSContent>({
    endpoint: "posts",
    queries: { q },
  })

  return { contents, q }
}

export default function Index() {
  const { contents, q } = useLoaderData<{
    contents: MicroCMSContent[]
    q: string
  }>()
  const navigate = useNavigate()

  return (
    <Grid justify="center">
      <Grid.Col span={12} md={10} className="max-w-[1200px]">
        <Divider
          my="md"
          size="md"
          label={
            <Group spacing="xs">
              <Title order={1} className="translate-y-[-3px]">
                |
              </Title>
              <Title order={2} mr="md">
                Search
              </Title>
            </Group>
          }
        />
        <Group direction="column" position="center">
          <Input
            icon={<AiOutlineSearch />}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key !== "Enter") return
              navigate(`/search?q=${e.currentTarget.value}`)
            }}
            radius="md"
            size="lg"
            classNames={{ wrapper: "w-[60%]" }}
          />
          {q && (
            <Text size="xl" color="brand" weight="bold">
              「{q}」の検索結果: {contents.length}件
            </Text>
          )}
        </Group>
        <Grid mt="xl">
          {contents.map((content) => {
            return (
              <Grid.Col key={content.id} span={6} lg={4}>
                <ContentCard content={content} />
              </Grid.Col>
            )
          })}
        </Grid>
      </Grid.Col>
    </Grid>
  )
}
