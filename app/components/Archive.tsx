import { Paper, Group, Title, Divider, Anchor, Stack, Text } from "@mantine/core"
import { Link, useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { MdArchive } from "react-icons/md"

type ArchiveProps = {
  archives: string[]
}

export const Archive: FC<ArchiveProps> = ({ archives }) => {
  const navigate = useNavigate()

  return (
    <Paper my="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <MdArchive size="20px" />
        <Title order={4}>アーカイブ</Title>
      </Group>
      <Divider my="sm" size="sm" />
      <Stack spacing="xs" mb="xs">
        {archives.map((a, index) => {
          if (index > 3) return <></>
          return (
            <Anchor
              key={a}
              component={Link}
              to={`/archives?month=${a}`}
              sx={(theme) => ({ color: theme.other.secondary })}
              className="hover:no-underline hover:opacity-80"
            >
              {a}
            </Anchor>
          )
        })}
      </Stack>
      {archives.length >= 3 && (
        <Text color="blue" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/archives")}>
          もっと見る
        </Text>
      )}
    </Paper>
  )
}
