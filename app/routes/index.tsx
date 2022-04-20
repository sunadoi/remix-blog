import { AppShell, Divider, Grid, Header, Title, Paper, Center, Group } from "@mantine/core"
import type { HeadersFunction, LoaderFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import dayjs from "dayjs"
import { BsFillPersonFill } from "react-icons/bs"
import { MdArchive, MdCategory } from "react-icons/md"

import type { MicroCMSContent } from "@/types/microcms"
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

  return (
    <AppShell
      header={
        <Header height={70} p="xs">
          <Grid justify="center" align="center" className="h-[80px]">
            <Grid.Col span={3}>
              <Title order={2}>すな.dev</Title>
            </Grid.Col>
            <Grid.Col span={7}>
              <Title order={1}>すな.dev</Title>
            </Grid.Col>
          </Grid>
        </Header>
      }
    >
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
          {contents.map((c) => (
            <div key={c.id}>
              <Link to={`/posts/${c.id}`}>{c.title}</Link>
              <p className="text-red-400">{dayjs(c.createdAt).format("YYYY年MM月DD日")}</p>
            </div>
          ))}
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
    </AppShell>
  )
}
