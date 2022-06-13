import { Card, LoadingOverlay, Group, Text, Badge } from "@mantine/core"
import { useNavigate, useTransition } from "@remix-run/react"
import type { FC } from "react"
import { useState } from "react"

import { Image } from "@/components/Image"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { CategoryType } from "@/types/category"

type CategoryCardProps = {
  category: CategoryType
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const navigate = useNavigate()
  const [selectedCardName, setSelectedCardName] = useState("")
  const transition = useTransition()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Card
      className="cursor-pointer hover:opacity-80"
      radius="md"
      p="sm"
      shadow="xs"
      onClick={() => {
        setSelectedCardName(category.name)
        navigate(`/categories/${category.name}`)
      }}
    >
      <Group position="center" direction="column" spacing="xs">
        <LoadingOverlay
          visible={transition.state === "loading" && selectedCardName === category.name}
          overlayOpacity={0.5}
          overlayColor="white"
          transitionDuration={1000}
        />
        <Image
          src={category.icon}
          alt="categoryIcon"
          width={largerThanMd ? 72 : 40}
          height={largerThanMd ? 72 : 40}
          fit="contain"
        />
        <Text size="lg" sx={(theme) => ({ color: theme.other.primary })} weight="bold" my="xs">
          {category.name}
        </Text>
        <Badge radius="md" variant="filled" size="lg" className="cursor-pointer">
          {category.total}記事
        </Badge>
      </Group>
    </Card>
  )
}
