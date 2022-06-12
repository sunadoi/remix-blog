import { Card, Group, Image, Anchor } from "@mantine/core"
import type { FC } from "react"

import CoffeePCImage from "@/assets/coffee_pc.png"
import CoffeeSPImage from "@/assets/coffee_sp.png"

export const CoffeeCard: FC = () => {
  return (
    <Card radius="md" p="sm" shadow="xs">
      <Group position="center" direction="column" spacing="sm" py="md">
        <Image src={CoffeePCImage} alt="" width={400} height={100} fit="contain" />
        <Anchor
          href="https://www.buymeacoffee.com/ysuna"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl shadow-lg"
        >
          <Image
            src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
            alt="Buy Me A Coffee"
            width={217}
            height={60}
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
        <Image
          src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
          alt="Buy Me A Coffee"
          width={217}
          height={60}
        />
      </Anchor>
    </Group>
  )
}
