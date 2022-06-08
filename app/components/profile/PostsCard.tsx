import { Card, Divider, Grid, Group, Image, Text } from "@mantine/core"
import type { FC } from "react"

import WritingIcon from "@/assets/writing.png"

type PostsCardProps = {
  categoryIcons: string[]
  total: number
}

export const PostsCard: FC<PostsCardProps> = ({ categoryIcons, total }) => {
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
          {categoryIcons.map((icon) => (
            <Grid.Col key={icon} span={3}>
              <Image src={icon} alt="" width={64} height={64} classNames={{ image: "mx-auto" }} />
            </Grid.Col>
          ))}
        </Grid>
      </Group>
    </Card>
  )
}
