import { Divider, Grid, Title, Group, Box, Image, Stack, Badge } from "@mantine/core"
import { useScrollIntoView } from "@mantine/hooks"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useSearchParams } from "@remix-run/react"
import { useEffect } from "react"

import { ContentCard } from "@/components/ContentCard"
import { MonthIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { MicroCMSContent } from "@/types/microcms"
import { dayjsSSR } from "@/utils/date"
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

  const yearMonths = contents
    .sort((a, b) => dayjsSSR(b.publishedAt).diff(a.publishedAt))
    .reduce(
      (acc, content) => {
        const yearMonth = dayjsSSR(content.publishedAt).format("YYYY年MM月")
        return {
          ...acc,
          [yearMonth]: {
            month: dayjsSSR(content.publishedAt).month() + 1,
            contents: [...(acc[yearMonth]?.contents ?? []), content],
          },
        }
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as { [key in string]: { month: number; contents: MicroCMSContent[] } }
    )
  return { yearMonths }
}

export default function Index() {
  const { yearMonths } = useLoaderData<{
    yearMonths: { [key in string]: { month: number; contents: MicroCMSContent[] } }
  }>()
  const [largerThanMd] = useMediaQueryMin("md", true)
  const [params] = useSearchParams()
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({ duration: 0, offset: 80 })

  useEffect(() => {
    scrollIntoView()
  }, [])

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
                Archives
              </Title>
            </Group>
          }
        />
        {Object.entries(yearMonths).map(([yearMonth, archive]) => {
          return (
            <Box key={yearMonth} ref={yearMonth === params.get("month") ? targetRef : undefined} mb="xl">
              <Grid justify="center">
                <Grid.Col span={12} md={3} lg={2}>
                  {largerThanMd ? (
                    <Stack justify="center" align="center" spacing="xs" mt="sm">
                      <Image src={MonthIconMap.get(archive.month) ?? ""} alt="monthIcon" width="100px" />
                      <Title order={3}>{yearMonth}</Title>
                      <Badge radius="md" variant="filled" size="lg">
                        {archive.contents.length}記事
                      </Badge>
                    </Stack>
                  ) : (
                    <Group position="center" spacing="md">
                      <Image src={MonthIconMap.get(archive.month) ?? ""} alt="monthIcon" width="100px" />
                      <Stack spacing="xs">
                        <Title order={3}>{yearMonth}</Title>
                        <Badge radius="md" variant="filled" size="lg">
                          {archive.contents.length}記事
                        </Badge>
                      </Stack>
                    </Group>
                  )}
                </Grid.Col>
                <Grid.Col span={12} md={9} lg={10}>
                  <Grid>
                    {archive.contents.map((c) => (
                      <Grid.Col key={c.id} span={6} lg={4}>
                        <ContentCard content={c} />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Grid.Col>
              </Grid>
            </Box>
          )
        })}
      </Grid.Col>
    </Grid>
  )
}
