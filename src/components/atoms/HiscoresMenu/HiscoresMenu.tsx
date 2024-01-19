import Link from 'next/link'
import { HiscoresMenuItemList, HiscoresMenuItem } from '@styledPages/hiscores.styled'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'

type HiscoresMenuProps = {
  hiscoreType: HiscoreType
}

const HiscoresMenu = (props: HiscoresMenuProps) => {
  const { hiscoreType } = props

  return (
    <HiscoresMenuItemList>
      <HiscoresMenuItem>
        {hiscoreType === 'Overall' ? hiscoreType : <Link href='/hiscores'>Overall</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Attack' ? hiscoreType : <Link href='/hiscores/attack'>Attack</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Defense' ? hiscoreType : <Link href='/hiscores/defense'>Defense</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Strength' ? hiscoreType : <Link href='/hiscores/strength'>Strength</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Hits' ? hiscoreType : <Link href='/hiscores/hits'>Hits</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Ranged' ? hiscoreType : <Link href='/hiscores/ranged'>Ranged</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Prayer' ? hiscoreType : <Link href='/hiscores/prayer'>Prayer</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Magic' ? hiscoreType : <Link href='/hiscores/magic'>Magic</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Cooking' ? hiscoreType : <Link href='/hiscores/cooking'>Cooking</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Woodcut' ? hiscoreType : <Link href='/hiscores/woodcut'>Woodcut</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Fishing' ? hiscoreType : <Link href='/hiscores/fishing'>Fishing</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Firemaking' ? hiscoreType : <Link href='/hiscores/firemaking'>Firemaking</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Crafting' ? hiscoreType : <Link href='/hiscores/crafting'>Crafting</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Smithing' ? hiscoreType : <Link href='/hiscores/smithing'>Smithing</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Mining' ? hiscoreType : <Link href='/hiscores/mining'>Mining</Link>}
      </HiscoresMenuItem>
    </HiscoresMenuItemList>
  )
}

export default HiscoresMenu
