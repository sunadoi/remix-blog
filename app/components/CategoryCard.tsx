import { Card, LoadingOverlay, Group, Image, Text, Badge } from "@mantine/core"
import { useNavigate, useTransition } from "@remix-run/react"
import type { FC } from "react"
import { useState } from "react"

import { useMediaQueryMin } from "@/hooks/useMediaQuery"

type CategoryCardProps = {
  categoryName: string
  icon: string
  total: number
}

export const CategoryCard: FC<CategoryCardProps> = ({ categoryName, icon, total }) => {
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
        setSelectedCardName(categoryName)
        navigate(`/categories/${categoryName}`)
      }}
    >
      <Group position="center" direction="column" spacing="xs">
        <LoadingOverlay
          visible={transition.state === "loading" && selectedCardName === categoryName}
          overlayOpacity={0.5}
          overlayColor="white"
        />
        <Image
          src={icon}
          alt="categoryIcon"
          width={largerThanMd ? 72 : 40}
          height={largerThanMd ? 72 : 40}
          fit="contain"
        />
        <Text size="lg" sx={(theme) => ({ color: theme.other.primary })} weight="bold" mt="sm" mb="xs">
          {categoryName}
        </Text>
        <Badge radius="md" variant="filled" size="lg" className="cursor-pointer">
          {total}記事
        </Badge>
      </Group>
    </Card>
  )
}
