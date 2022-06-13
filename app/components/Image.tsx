import type { ImageProps as MantineImageProps } from "@mantine/core"
import { Image as MantineImage } from "@mantine/core"
import type { FC } from "react"

type ImageProps = MantineImageProps & {
  src: string
  alt: string
  width: string | number
  height: string | number
}

export const Image: FC<ImageProps> = ({ src, alt, width, height, ...props }) => {
  return <MantineImage src={src} alt={alt} width={width} height={height} {...props} />
}
