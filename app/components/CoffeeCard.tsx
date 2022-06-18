import { Card, Group, Anchor } from "@mantine/core"
import type { FC } from "react"

import BuyMeACoffeeImage from "@/assets/buy-me-a-coffee.webp"
import CoffeePCImage from "@/assets/coffee_pc.webp"
import CoffeeSPImage from "@/assets/coffee_sp.webp"
import { Image } from "@/components/Image"

export const CoffeeCard: FC = () => {
  return (
    <Card radius="md" p="sm" shadow="xs">
      <Group position="center" direction="column" spacing="sm" py="md">
        <Image src={CoffeePCImage} alt="" width={400} height={100} fit="contain" imageProps={{ loading: "lazy" }} />
        <Anchor
          href="https://www.buymeacoffee.com/ysuna"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl shadow-lg"
        >
          <Image
            src={BuyMeACoffeeImage}
            alt="Buy Me A Coffee"
            width={217}
            height={60}
            imageProps={{ loading: "lazy" }}
          />
        </Anchor>
      </Group>
    </Card>
  )
}

export const CoffeeArea: FC = () => {
  return (
    <Group position="center" direction="column" spacing="sm" py="md">
      <Image src={CoffeeSPImage} alt="" width={200} height={200} fit="contain" />
      <Anchor
        href="https://www.buymeacoffee.com/ysuna"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-xl shadow-lg"
      >
        <Image src={BuyMeACoffeeImage} alt="Buy Me A Coffee" width={217} height={60} />
      </Anchor>
    </Group>
  )
}
