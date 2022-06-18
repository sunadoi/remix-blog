import { Alert } from "@mantine/core"
import type { FC, ReactNode } from "react"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { BsInfoCircle } from "react-icons/bs"
import { FiAlertCircle } from "react-icons/fi"

type MessageProps = {
  type: "point" | "info" | "alert"
  children: ReactNode
}

export const Message: FC<MessageProps> = ({ type, children }) => {
  const color = type === "point" ? "green" : type === "info" ? "yellow" : "red"
  const Icon =
    type === "point" ? (
      <AiOutlineCheckCircle size={16} />
    ) : type === "info" ? (
      <BsInfoCircle size={16} />
    ) : (
      <FiAlertCircle size={16} />
    )

  return (
    <Alert icon={Icon} color={color} radius="md" my="lg" className="whitespace-pre-wrap">
      {children}
    </Alert>
  )
}
