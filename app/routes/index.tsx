import { Divider, Grid, Title, Paper, Center, Group, Image, Card, Text, AspectRatio } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import dayjs from "dayjs"
import { BsFillPersonFill } from "react-icons/bs"
import { MdArchive, MdCategory } from "react-icons/md"

import { CategoryIconMap } from "@/constant"
import type { Category, MicroCMSContent } from "@/types/microcms"
import { client } from "lib/client.server"

export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "max-age=0, s-maxage=60, stale-while-revalidate=60",
  }
}

export const loader: LoaderFunction = async () => {
  const { contents } = await client.getList<MicroCMSContent[]>({
    endpoint: "posts",
  })
  return contents
}

export default function Index() {
  const contents = useLoaderData<MicroCMSContent[]>()
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
              <Title order={4} my="sm">
                {c.title}
              </Title>
              <Group position="apart">
                <Group spacing="xs">
                  {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
                  <Image src={CategoryIconMap.get(c.topic?.[0] as Category)} width="24px" />
                  <Text>{c.topic?.[0]}</Text>
                </Group>
                <Text size="sm" sx={(theme) => ({ color: theme.colors.gray[6] })}>
                  {dayjs(c.createdAt).format("YYYY.MM.DD")}
                </Text>
              </Group>
            </Card>
          ))}
        </Grid>
      </Grid.Col>
      <Grid.Col span={3}>
        <Paper my="md" p="md" radius="md" shadow="xs">
          <Group spacing="xs">
            <MdCategory size="20px" />
            <Title order={4}>カテゴリー</Title>
          </Group>
          <Divider my="sm" size="sm" />
        </Paper>
        <Paper my="md" p="md" radius="md" shadow="xs">
          <Group spacing="xs">
            <BsFillPersonFill size="20px" />
            <Title order={4}>プロフィール</Title>
          </Group>
          <Divider my="sm" size="sm" />
        </Paper>
        <Paper my="md" p="md" radius="md" shadow="xs">
          <Group spacing="xs">
            <MdArchive size="20px" />
            <Title order={4}>アーカイブ</Title>
          </Group>
          <Divider my="sm" size="sm" />
        </Paper>
      </Grid.Col>
    </Grid>
  )
}
