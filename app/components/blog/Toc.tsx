import { cx, css } from "@emotion/css"
import { Group, Paper, Stack, Title } from "@mantine/core"
import type { FC } from "react"
// import { HashLink } from "react-router-hash-link"

import type { TocType } from "@/types/blog"

type TocProps = {
  toc: TocType[]
}

export const Toc: FC<TocProps> = ({ toc }) => {
  return (
    <Paper mb="md" mt="md" p="md" radius="md" shadow="xs">
      <Group spacing="xs">
        <Stack spacing="xs">
          <Title order={4}>目次</Title>
          <ul
            id="toc"
            className={cx(
              "m-0",
              "p-0",
              css`
                .isActive {
                  opacity: 1;
                }
              `
            )}
          >
            {toc.map((t) => {
              return (
                <li key={t.id} className="cursor-pointer list-none">
                  {/* <a href={`#${t.text}`} className="no-underline"> */}
                  <Title
                    order={6}
                    id={`toc-${t.text}`}
                    className={cx(
                      "leading-loose",
                      "opacity-50",
                      "hover:opacity-100",
                      t.h === "h3" ? "indent-[8px]" : t.h === "h4" ? "indent-[24px]" : ""
                    )}
                  >
                    {t.text}
                  </Title>
                  {/* </a> */}
                </li>
              )
            })}
          </ul>
        </Stack>
      </Group>
    </Paper>
  )
}
