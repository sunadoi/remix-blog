import { Paper, Group, Title, Divider, Image, Text } from "@mantine/core"
import type { FC } from "react"
import { Fragment } from "react"
import { MdCategory } from "react-icons/md"

import { CategoryIconMap } from "@/constant"
import type { CategoryType } from "@/types/microcms"
import { isCategory } from "@/types/microcms"

type CategoryProps = {
  categories: { [key in CategoryType]: number }
}

export const Category: FC<CategoryProps> = ({ categories }) => {
  return (
    <Paper my="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <MdCategory size="20px" />
        <Title order={4}>カテゴリー</Title>
      </Group>
      <Divider my="sm" size="sm" />
      {Object.entries(categories).map(([category, count], index) => (
        <Fragment key={category}>
          {index <= 10 ? (
            <Group spacing="xs" mb="sm">
              {isCategory(category) && <Image src={CategoryIconMap.get(category) ?? ""} width="24px" />}
              <Text sx={(theme) => ({ color: theme.other.secondary })}>
                {category} ({count})
              </Text>
            </Group>
          ) : (
            <Text color="blue">もっと見る</Text>
          )}
        </Fragment>
      ))}
    </Paper>
  )
}
