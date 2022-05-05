import { Card, Overlay, AspectRatio, Group, Image, Text } from "@mantine/core"
import { useNavigate, useTransition } from "@remix-run/react"
import dayjs from "dayjs"
import type { FC } from "react"
import { useState } from "react"

import { CategoryIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { MicroCMSContent } from "@/types/microcms"
import { isCategory } from "@/types/microcms"

type ContentCardProps = {
  content: MicroCMSContent
}

export const ContentCard: FC<ContentCardProps> = ({ content }) => {
  const navigate = useNavigate()
  const [selectedCardId, setSelectedCardId] = useState("")
  const transition = useTransition()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Card
      className="cursor-pointer"
      radius="md"
      p="sm"
      shadow="xs"
      onClick={() => {
        setSelectedCardId(content.id)
        navigate(`/posts/${content.id}`)
      }}
    >
      {transition.state === "loading" && selectedCardId === content.id && (
        <Overlay opacity={0.3} color="white" zIndex={1} />
      )}
      <AspectRatio ratio={16 / 9}>
        <Image src={content.image.url} alt="thumbnail" radius="sm" />
      </AspectRatio>
      <Text
        size={largerThanMd ? "xl" : "md"}
        sx={(theme) => ({ color: theme.other.primary })}
        weight="bold"
        my="xs"
        lineClamp={4}
      >
        {content.title}
      </Text>
      <Group position="apart" direction={largerThanMd ? "row" : "column"} spacing={0}>
        <Group spacing="xs">
          {content.topic?.[0] && isCategory(content.topic?.[0]) && (
            <Image src={CategoryIconMap.get(content.topic?.[0]) ?? ""} width={largerThanMd ? "24px" : "14px"} />
          )}
          <Text sx={(theme) => ({ color: theme.other.secondary })} size={largerThanMd ? "md" : "sm"}>
            {content.topic?.[0]}
          </Text>
        </Group>
        <Text size="sm" color="gray">
          {dayjs(content.createdAt).format("YYYY.MM.DD")}
        </Text>
      </Group>
    </Card>
  )
}
