import { cx, css } from "@emotion/css"
import { Box, Group, Paper, Stack, Title, useMantineTheme } from "@mantine/core"
import type { FC } from "react"

export const Toc: FC = () => {
  const theme = useMantineTheme()

  return (
    <Paper mb="md" mt={56} p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <Stack spacing="xs">
          <Title order={4}>目次</Title>
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
        </Stack>
      </Group>
    </Paper>
  )
}
