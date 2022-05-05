import { Paper, Group, Title, Divider, Anchor, Stack } from "@mantine/core"
import { Link } from "@remix-run/react"
import type { FC } from "react"
import { MdArchive } from "react-icons/md"

type ArchiveProps = {
  archives: string[]
}

export const Archive: FC<ArchiveProps> = ({ archives }) => {
  return (
    <Paper my="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <MdArchive size="20px" />
        <Title order={4}>アーカイブ</Title>
      </Group>
      <Divider my="sm" size="sm" />
      <Stack spacing="xs">
        {archives.map((a, index) => (
          <Anchor
            key={a}
            component={Link}
            to={index <= 2 ? `/archives?month=${a}` : "/archives"}
            sx={(theme) => ({ color: theme.other.secondary })}
            className="hover:no-underline hover:opacity-80"
          >
            {index <= 2 ? a : "もっと見る"}
          </Anchor>
        ))}
      </Stack>
    </Paper>
  )
}
