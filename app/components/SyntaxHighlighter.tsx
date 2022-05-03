import { Tabs, Image, Box, Group, Tooltip, useMantineTheme } from "@mantine/core"
import { useClipboard, useMediaQuery } from "@mantine/hooks"
import type { FC } from "react"
import { FiClipboard } from "react-icons/fi"
import { Prism } from "react-syntax-highlighter"
import { xonokai } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { LanguageIconMap } from "@/constant"
import type { Code } from "@/types/microcms"

type SyntaxHighlighterProps = {
  code: Code
}

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ code }) => {
  const clipboard = useClipboard({ timeout: 1000 })
  const theme = useMantineTheme()
  const underSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`, false)

  return (
    <Box className="relative">
      {code.fileName && (
        <Tabs variant="pills" classNames={{ tabLabel: "text-gray-50 text-opacity-80" }}>
          <Tabs.Tab
            style={{ backgroundColor: "#22272E" }}
            label={code.fileName}
            icon={<Image src={LanguageIconMap.get(code.language) ?? ""} alt="languageIcon" width="16px" />}
            className="cursor-default px-[16px] rounded-t-[8px] rounded-b-none"
          />
        </Tabs>
      )}
      {!underSm && (
        <Group
          position="right"
          className={`absolute top-[${
            code.fileName ? "32px" : "10px"
          }] right-[8px] p-[8px] z-10 text-white text-opacity-60 cursor-pointer`}
          onClick={() => clipboard.copy(code.code)}
          sx={() => ({
            backgroundColor: "#22272E",
          })}
        >
          <Tooltip opened={clipboard.copied} label="コピーしました" placement="end">
            <FiClipboard size="20px" />
          </Tooltip>
        </Group>
      )}
      <Prism
        language={code.language}
        style={xonokai}
        showLineNumbers
        wrapLines
        customStyle={{
          backgroundColor: "#22272E",
          border: "none",
          borderRadius: `${code.fileName ? "0" : "8px"} 8px 8px 8px`,
        }}
        codeTagProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            minWidth: "max-content",
            paddingRight: "8px",
            backgroundColor: "#22272E",
          },
        }}
        lineProps={(lineNumber) => {
          return {
            style: {
              backgroundColor:
                code.diffAdd && [...code.diffAdd.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "#273732"
                  : code.diffRemove && [...code.diffRemove.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "#3F2D32"
                  : code.highlight && [...code.highlight.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "#3c3c3c"
                  : "#22272E",
            },
          }
        }}
      >
        {code.code}
      </Prism>
    </Box>
  )
}
