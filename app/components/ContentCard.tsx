import { Card, LoadingOverlay, Group, Image, Text, Grid, Stack, AspectRatio, Box } from "@mantine/core"
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
      className="cursor-pointer hover:opacity-80"
      radius="md"
      p={largerThanMd ? "sm" : "md"}
      sx={() => ({ height: "100%", boxShadow: "0px 4px 4px rgba(185, 206, 239, 0.25)" })}
      onClick={() => {
        setSelectedCardId(content.id)
        navigate(`/posts/${content.id}`)
      }}
    >
      <LoadingOverlay
        visible={transition.state === "loading" && selectedCardId === content.id}
        overlayOpacity={0.5}
        overlayColor="white"
      />
      {/* NOTE: CardSectionを使うとOverlayのmtがずれてしまうのでBoxでCardSectionを定義 */}
      <Box mt={-16} mr={-16} ml={-16}>
        <AspectRatio ratio={1.9 / 1}>
          <Image src={content.image.url} alt="thumbnail" />
        </AspectRatio>
      </Box>
      <Box className={`h-[${largerThanMd ? "120px" : "100px"}]`}>
        <Text
          size="xl"
          sx={(theme) => ({ color: theme.other.primary })}
          weight="bold"
          my="sm"
          lineClamp={3}
          className="tracking-[0.5px]"
        >
          {content.title}
        </Text>
      </Box>
      <Group position="apart" spacing="xs" mb="xs" className="w-[100%]">
        <Group spacing="xs">
          {content.topic?.[0] && isCategory(content.topic?.[0]) && (
            <Image fit="contain" src={CategoryIconMap.get(content.topic?.[0]) ?? ""} width={16} height={16} />
          )}
          <Text sx={(theme) => ({ color: theme.other.secondary })} size="lg">
            {content.topic?.[0]}
          </Text>
        </Group>
        <Group spacing="xs">
          <BiTime size={largerThanMd ? 16 : 12} />
          <Text size="lg" color="gray">
            {dayjs(content.publishedAt).format("YYYY.MM.DD")}
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
  const [largerThanLg] = useMediaQueryMin("lg", true)

  return (
    <Card
      className="max-w-[770px] cursor-pointer hover:opacity-80"
      radius="md"
      p="sm"
      sx={() => ({ boxShadow: "0px 4px 4px rgba(185, 206, 239, 0.25)" })}
      onClick={() => {
        setSelectedCardId(content.id)
        navigate(`/posts/${content.id}`)
      }}
    >
      <LoadingOverlay
        visible={transition.state === "loading" && selectedCardId === content.id}
        overlayOpacity={0.5}
        overlayColor="white"
      />
      <Grid gutter={largerThanMd ? "xl" : "lg"}>
        <Grid.Col span={6} p={0}>
          <AspectRatio ratio={1.9 / 1}>
            <Image src={content.image.url} alt="thumbnail" radius="sm" />
          </AspectRatio>
        </Grid.Col>
        <Grid.Col span={6} p={largerThanLg ? "md" : "sm"} pr={largerThanLg ? "lg" : "md"}>
          <Stack justify="space-around" spacing="xs" className="h-[100%]">
            <Text
              size={largerThanMd ? "lg" : "md"}
              sx={(theme) => ({ color: theme.other.primary })}
              weight="bold"
              className="tracking-[0.5px]"
              lineClamp={largerThanMd ? 2 : 2}
            >
              {content.title}
            </Text>
            <Group position="apart" spacing="xs">
              {largerThanMd && (
                <Group spacing="xs">
                  {content.topic?.[0] && isCategory(content.topic?.[0]) && (
                    <Image fit="contain" src={CategoryIconMap.get(content.topic?.[0]) ?? ""} width={16} height={16} />
                  )}
                  <Text sx={(theme) => ({ color: theme.other.secondary })} size="lg">
                    {content.topic?.[0]}
                  </Text>
                </Group>
              )}
              <Group spacing="xs">
                <BiTime size={largerThanMd ? 16 : 12} />
                <Text size={largerThanMd ? "lg" : "sm"} color="gray">
                  {dayjs(content.publishedAt).format("YYYY.MM.DD")}
                </Text>
              </Group>
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  )
}
