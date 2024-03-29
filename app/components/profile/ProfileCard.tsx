import { Card, Group, Text } from "@mantine/core"
import type { FC } from "react"

export const ProfileCard: FC = () => {
  return (
    <Card radius="md" p="sm" shadow="xs" className="h-[100%]">
      <Group direction="column" spacing="xs" mx="md" mt="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">🧑‍💻</span>プロフィール
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          すな / メインはフロントエンド / テクノロジーで課題を解決するのが好き
        </Text>
      </Group>
      <Group direction="column" spacing="xs" mx="md" mt="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">✨</span>好きな技術
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          React / TypeScript / Go
        </Text>
      </Group>
      <Group direction="column" spacing="xs" m="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">💪</span>比較的得意なこと
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          型パズル / 自動化 / 開発環境の整備 / 目grep
        </Text>
      </Group>
      <Group direction="column" spacing="xs" m="md">
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          <span className="mr-2">👀</span>今興味のある分野
        </Text>
        <Text sx={(theme) => ({ color: theme.other.primary })} weight="bold" my={0}>
          設計 / 型システム / デザイン
        </Text>
      </Group>
    </Card>
  )
}
