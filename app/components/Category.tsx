import { Paper, Group, Title, Divider, Image, Text } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import type { FC } from "react"
import { MdCategory } from "react-icons/md"

import { CategoryIconMap } from "@/constant"
import type { CategoryType } from "@/types/microcms"
import { isCategory } from "@/types/microcms"

type CategoryProps = {
  categories: { [key in CategoryType]: number }
}

export const Category: FC<CategoryProps> = ({ categories }) => {
  const navigate = useNavigate()

  return (
    <Paper my="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <MdCategory size="20px" />
        <Title order={4}>カテゴリー</Title>
      </Group>
      <Divider my="sm" size="sm" />
      {Object.entries(categories).map(([category, count], index) => {
        if (index > 10) return <></>
        return (
          <Group
            key={category}
            spacing="xs"
            mb="sm"
            className="cursor-pointer hover:opacity-80"
            onClick={() => navigate(`/categories/${category}`)}
          >
            {isCategory(category) && (
              <Image fit="contain" src={CategoryIconMap.get(category) ?? ""} width={24} height={24} />
            )}
            <Text sx={(theme) => ({ color: theme.other.secondary })}>
              {category} ({count})
            </Text>
          </Group>
        )
      })}
      {Object.keys(categories).length >= 10 && (
        <Text color="blue" className="cursor-pointer hover:opacity-80" onClick={() => navigate("/categories")}>
          もっと見る
        </Text>
      )}
    </Paper>
  )
}
