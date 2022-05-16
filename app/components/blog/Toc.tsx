import { cx, css } from "@emotion/css"
import { Box, Divider, Group, Paper, Stack, Title, useMantineTheme } from "@mantine/core"
import type { FC } from "react"

export const TocCard: FC = () => {
  return (
    <Paper
      mb="md"
      mt="md"
      p="md"
      radius="md"
      shadow="xs"
      className="h-[100%] w-[100%] overflow-x-hidden overflow-y-scroll"
    >
      <Group spacing="xs">
        <Stack spacing="xs">
          <Title order={4}>目次</Title>
          <Toc />
        </Stack>
      </Group>
    </Paper>
  )
}

export const TocDialog: FC = () => {
  return (
    <>
      <Title order={4} mt="md" mb="sm" className="absolute top-0">
        目次
      </Title>
      <Divider mt="xl" size="sm" sx={(theme) => ({ borderColor: theme.other.paleBlue })} />
      <Box mt="md" className="max-h-[300px] overflow-y-scroll">
        <Toc />
      </Box>
    </>
  )
}

const Toc: FC = () => {
  const theme = useMantineTheme()

  return (
    <Box
      className={cx(
        "toc", // tocbotによってここにマウントされる
        "font-bold",
        "leading-loose",
        "text-sm",
        css`
          ol {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }
          a {
            opacity: 0.5;
            color: ${theme.other.primary};
            text-decoration: none;
            display: block;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-right: 16px;
            width: 100%;
            max-width: 300px;
            :hover {
              opacity: 1;
            }
          }
          .is-active-link {
            opacity: 1;
          }
          .node-name--H3::before {
            white-space: pre;
            content: "    ";
          }
          .node-name--H4::before {
            white-space: pre;
            content: "        ";
          }
        `
      )}
    />
  )
}
