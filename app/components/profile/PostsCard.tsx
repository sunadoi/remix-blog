import { Card, Divider, Grid, Group, Image, Text } from "@mantine/core"
import { useNavigate } from "@remix-run/react"
import type { FC } from "react"

import WritingIcon from "@/assets/writing.png"
import type { CategoryType } from "@/types/category"

type PostsCardProps = {
  categories: CategoryType[]
  total: number
}

export const PostsCard: FC<PostsCardProps> = ({ categories, total }) => {
  const navigate = useNavigate()

  return (
    <Card radius="md" p="sm" shadow="xs">
      <Group position="center" direction="column" spacing="xs">
        <Image src={WritingIcon} alt="" fit="contain" />
        <Text size="lg" sx={(theme) => ({ color: theme.other.primary })} mt="sm" weight="bold">
          執筆記事数
        </Text>
        <Text size="lg" sx={(theme) => ({ color: theme.other.primary })} weight="bold">
          <span className="text-[32px]">{total}</span> 記事
        </Text>
        <Divider my="sm" size="xs" className="w-[100%]" />
        <Grid px="md" my="sm">
          {categories.map((category) => (
            <Grid.Col key={category.name} span={3} className="cursor-pointer hover:opacity-80">
              <Image
                onClick={() => navigate(`/categories/${category.name}`)}
                src={category.icon}
                alt=""
                width={64}
                height={64}
                classNames={{ image: "mx-auto" }}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Group>
    </Card>
  )
}
