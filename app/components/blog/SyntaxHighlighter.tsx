import { Tabs, Image, Box, Group, Tooltip } from "@mantine/core"
import { useClipboard } from "@mantine/hooks"
import type { FC } from "react"
import { FiClipboard } from "react-icons/fi"
import { Prism } from "react-syntax-highlighter"
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { FileIconMap } from "@/constant"
import { useMediaQueryMin } from "@/hooks/useMediaQuery"
import type { Code } from "@/types/microcms"

type SyntaxHighlighterProps = {
  code: Code
}

export const SyntaxHighlighter: FC<SyntaxHighlighterProps> = ({ code }) => {
  const clipboard = useClipboard({ timeout: 2000 })
  const [largerThanSm] = useMediaQueryMin("sm", true)

  return (
    <Box className="relative">
      {code.fileName && (
        <Tabs variant="pills" classNames={{ tabLabel: "text-gray-50 text-opacity-80" }}>
          <Tabs.Tab
            style={{ backgroundColor: "#22272E" }}
            label={code.fileName}
            icon={<Image src={FileIconMap.get(code.language) ?? ""} alt="languageIcon" width={20} height={20} />}
            className="cursor-default rounded-t-[8px] rounded-b-none px-[16px]"
          />
        </Tabs>
      )}
      {largerThanSm && (
        <Group
          position="right"
          className={`absolute top-[${
            code.fileName ? "32px" : "10px"
          }] right-[0px] z-10 cursor-pointer rounded-tr-[8px] p-2 text-white text-opacity-60`}
          onClick={() => clipboard.copy(code.code)}
          sx={() => ({
            backgroundColor: "#22272E",
          })}
        >
          <Tooltip opened={clipboard.copied} label="コピーしました" placement="end" className="flex items-center">
            <FiClipboard size="20px" />
          </Tooltip>
        </Group>
      )}
      <Prism
        language={code.language}
        style={okaidia}
        showLineNumbers
        wrapLines
        customStyle={{
          backgroundColor: "#22272E",
          border: "none",
          borderRadius: `${code.fileName ? "0" : "8px"} 8px 8px 8px`,
          margin: 0,
        }}
        codeTagProps={{
          style: {
            display: "flex",
            flexDirection: "column",
            minWidth: "max-content",
            padding: 0,
            backgroundColor: "#22272E",
          },
        }}
        lineProps={(lineNumber) => {
          return {
            style: {
              paddingRight: "16px",
              backgroundColor:
                code.diffAdd && [...code.diffAdd.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "#273732"
                  : code.diffRemove && [...code.diffRemove.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "#3F2D32"
                  : code.highlight && [...code.highlight.split(",").map((n) => Number(n))].includes(lineNumber)
                  ? "rgba(60,60,60,0.6)"
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
