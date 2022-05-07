import { Card, Overlay, Group, Image, Text, Grid, Stack, AspectRatio, Box } from "@mantine/core"
import { useNavigate, useTransition } from "@remix-run/react"
import dayjs from "dayjs"
import type { FC } from "react"
import { useState } from "react"
import { BiTime } from "react-icons/bi"

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
      {/* NOTE: CardSectionを使うとOverlayのmtがずれてしまうのでBoxでCardSectionを定義 */}
      <Box mt={-16} mr={-16} ml={-16}>
        <AspectRatio ratio={1.9 / 1}>
          <Image src={content.image.url} alt="thumbnail" />
        </AspectRatio>
      </Box>
      <Text size="md" sx={(theme) => ({ color: theme.other.primary })} weight="bold" my="sm" lineClamp={3}>
        {content.title}
      </Text>
      <Group position="apart" direction={largerThanMd ? "row" : "column"} spacing="xs">
        <Group spacing="xs">
          {content.topic?.[0] && isCategory(content.topic?.[0]) && (
            <Image fit="contain" src={CategoryIconMap.get(content.topic?.[0]) ?? ""} width={16} height={16} />
          )}
          <Text sx={(theme) => ({ color: theme.other.secondary })} size="sm">
            {content.topic?.[0]}
          </Text>
        </Group>
        <Group spacing="xs">
          <BiTime size={largerThanMd ? 16 : 12} />
          <Text size="sm" color="gray">
            {dayjs(content.createdAt).format("YYYY.MM.DD")}
          </Text>
        </Group>
      </Group>
    </Card>
  )
}

export const WideContentCard: FC<ContentCardProps> = ({ content }) => {
  const navigate = useNavigate()
  const [selectedCardId, setSelectedCardId] = useState("")
  const transition = useTransition()
  const [largerThanMd] = useMediaQueryMin("md", true)

  return (
    <Card
      className="max-w-[770px] cursor-pointer"
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
      <Grid gutter={largerThanMd ? "xl" : "md"}>
        <Grid.Col span={6} p={0}>
          <AspectRatio ratio={1.9 / 1}>
            <Image src={content.image.url} alt="thumbnail" radius="sm" />
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={6}>
          <Stack justify="space-between" spacing="sm" className="h-[100%]">
            <Text size="md" sx={(theme) => ({ color: theme.other.primary })} weight="bold" lineClamp={2}>
              {content.title}
            </Text>
            <Group position="apart" spacing="xs">
              {largerThanMd && (
                <Group spacing="xs">
                  {content.topic?.[0] && isCategory(content.topic?.[0]) && (
                    <Image fit="contain" src={CategoryIconMap.get(content.topic?.[0]) ?? ""} width={16} height={16} />
                  )}
                  <Text sx={(theme) => ({ color: theme.other.secondary })} size="sm">
                    {content.topic?.[0]}
                  </Text>
                </Group>
              )}
              <Group spacing="xs">
                <BiTime size={largerThanMd ? 16 : 12} />
                <Text size="sm" color="gray">
                  {dayjs(content.createdAt).format("YYYY.MM.DD")}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
