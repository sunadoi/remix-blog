import { Card, Group, Text } from "@mantine/core"
import type { FC } from "react"

export const ProfileCard: FC = () => {
  return (
    <Card radius="md" p="sm" shadow="xs" className="h-[100%]">
      <Group direction="column" spacing="xs" mx="md" mt="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">ð§âð»</span>ãã­ãã£ã¼ã«
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          ããª / ã¡ã¤ã³ã¯ãã­ã³ãã¨ã³ã / ãã¯ãã­ã¸ã¼ã§èª²é¡ãè§£æ±ºããã®ãå¥½ã
        </Text>
      </Group>
      <Group direction="column" spacing="xs" mx="md" mt="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">â¨</span>å¥½ããªæè¡
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          React / TypeScript / Go
        </Text>
      </Group>
      <Group direction="column" spacing="xs" m="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">ðª</span>æ¯è¼çå¾æãªãã¨
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          åããºã« / èªåå / éçºç°å¢ã®æ´å / ç®grep
        </Text>
      </Group>
      <Group direction="column" spacing="xs" m="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">ð</span>ä»èå³ã®ããåé
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          è¨­è¨ / åã·ã¹ãã  / ãã¶ã¤ã³
        </Text>
      </Group>
    </Card>
  )
}
