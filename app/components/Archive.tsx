import { Paper, Group, Title, Divider, Text } from "@mantine/core"
import type { FC } from "react"
import { Fragment } from "react"
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
      {archives.map((a, index) => (
        <Fragment key={a}>
          {index <= 2 ? (
            <Text sx={(theme) => ({ color: theme.other.secondary })}>{a}</Text>
          ) : (
            <Text color="blue">もっと見る</Text>
          )}
        </Fragment>
      ))}
    </Paper>
  )
}
