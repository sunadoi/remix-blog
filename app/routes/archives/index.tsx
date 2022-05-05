import { Divider, Grid, Title, Group, Box, Tabs } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import { useState } from "react"

import { ContentCard } from "@/components/ContentCard"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { MicroCMSContent } from "@/types/microcms"
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

  const sortedContents = contents.sort((a, b) => dayjs(b.publishedAt).diff(a.publishedAt))
  const months = [...new Set(contents.map((c) => dayjs(c.publishedAt).format("YYYY年MM月")))].reduce(
    (acc, month) => ({
      ...acc,
      [month]: sortedContents.filter((c) => dayjs(c.publishedAt).format("YYYY年MM月") === month),
    }),
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as { [key in string]: MicroCMSContent[] }
  )
  const years = [...new Set(contents.map((c) => dayjs(c.publishedAt).format("YYYY年")))].reduce(
    (acc, year) => ({
      ...acc,
      [year]: sortedContents.filter((c) => dayjs(c.publishedAt).format("YYYY年") === year),
    }), // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as { [key in string]: MicroCMSContent[] }
  )
  return { months, years }
}

export default function Index() {
  const { months, years } = useLoaderData<{
    months: { [key in string]: MicroCMSContent[] }
    years: { [key in string]: MicroCMSContent[] }
  }>()
  const [archiveType, setArchiveType] = useState<"month" | "year">("month")
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Grid justify="center">
      <Grid.Col span={largerThanMd ? 10 : 12}>
        <Tabs
          position="center"
          variant="unstyled"
          onTabChange={(_, tabkey) => (tabkey === "month" || tabkey === "year") && setArchiveType(tabkey)}
          styles={(theme) => ({
            tabControl: {
              border: `1px solid ${theme.other.secondary}`,
              "&:first-of-type": {
                borderTopLeftRadius: theme.radius.md,
                borderBottomLeftRadius: theme.radius.md,
              },
              "&:last-of-type": {
                borderTopRightRadius: theme.radius.md,
                borderBottomRightRadius: theme.radius.md,
              },
            },
            tabActive: { backgroundColor: theme.other.secondary, color: "white" },
          })}
        >
          <Tabs.Tab label="月別" tabKey="month" />
          <Tabs.Tab label="年別" tabKey="year" />
        </Tabs>
        {Object.entries(archiveType === "month" ? months : years).map(([archive, contents]) => {
          return (
            <Box key={archive} mb={64}>
              <Divider
                my="md"
                size="md"
                label={
                  <Group spacing="xs">
                    <Title order={2}>{archive}</Title>
                  </Group>
                }
              />
              <Grid>
                {contents.map((c) => (
                  <Grid.Col key={c.id} span={largerThanMd ? 3 : 6}>
                    <ContentCard content={c} />
                  </Grid.Col>
                ))}
              </Grid>
            </Box>
          )
        })}
      </Grid.Col>
    </Grid>
  )
}
