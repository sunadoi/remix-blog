import { Paper, Group, Title, Divider, Text, Image, useMantineTheme } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { MdArchive } from "react-icons/md"

import { MonthIconMap } from "@/constant"

type ArchiveProps = {
  archives: { [key in string]: { month: number; count: number } }
}

export const Archive: FC<ArchiveProps> = ({ archives }) => {
  const theme = useMantineTheme()
  const navigate = useNavigate()

  return (
    <Paper my="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <MdArchive color={theme.other.primary} size="20px" />
        <Title order={4}>アーカイブ</Title>
      </Group>
      <Divider my="sm" size="sm" />
      {Object.entries(archives).map(([date, data], index) => {
        if (index > 3) return <></>
        return (
          <Group
            key={date}
            spacing="xs"
            mb="sm"
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate(`/archives?month=${date}`)}
          >
            <Image fit="contain" src={MonthIconMap.get(data.month) ?? ""} width={24} height={24} />
            <Text sx={(theme) => ({ color: theme.other.secondary })}>
              {date} ({data.count})
            </Text>
          </Group>
        )
      })}
      {Object.keys(archives).length >= 3 && (
        <Text color="blue" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/archives")}>
          もっと見る
        </Text>
      )}
    </Paper>
  )
}
