import { Card, Divider, Grid, Group, LoadingOverlay, Text } from "@mantine/core"
import { useNavigate, useTransition } from "@remix-run/react"
import type { FC } from "react"
import { useState } from "react"

import WritingIcon from "@/assets/writing.png"
import { Image } from "@/components/Image"
import type { CategoryType } from "@/types/category"

type PostsCardProps = {
  categories: CategoryType[]
  total: number
}

export const PostsCard: FC<PostsCardProps> = ({ categories, total }) => {
  const navigate = useNavigate()
  const transition = useTransition()
  // NOTE: アイコンクリックではない単純なページでloaderが出ないようにする
  const [clicked, setClicked] = useState(false)

  return (
    <Card radius="md" p="sm" shadow="xs">
      <LoadingOverlay
        visible={transition.state === "loading" && clicked}
        overlayOpacity={0.5}
        overlayColor="white"
        transitionDuration={1000}
      />
      <Group position="center" direction="column" spacing="xs">
        <Image src={WritingIcon} alt="" fit="contain" width={73} height={73} />
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
                onClick={() => {
                  setClicked(true)
                  navigate(`/categories/${category.name}`)
                }}
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
