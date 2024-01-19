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
        {hiscoreType === 'Overall' ? 'Overall' : <Link href='/hiscores'>Overall</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Attack' ? 'Attack' : <Link href='/hiscores/attack'>Attack</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Defense' ? 'Defense' : <Link href='/hiscores/defense'>Defense</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Strength' ? 'Strength' : <Link href='/hiscores/strength'>Strength</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>{hiscoreType === 'Hits' ? 'Hits' : <Link href='/hiscores/hits'>Hits</Link>}</HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Ranged' ? 'Ranged' : <Link href='/hiscores/ranged'>Ranged</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Prayer' ? 'Prayer' : <Link href='/hiscores/prayer'>Prayer</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Magic' ? 'Magic' : <Link href='/hiscores/magic'>Magic</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Cooking' ? 'Cooking' : <Link href='/hiscores/cooking'>Cooking</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Woodcut' ? 'Woodcut' : <Link href='/hiscores/woodcut'>Woodcut</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Fishing' ? 'Fishing' : <Link href='/hiscores/fishing'>Fishing</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Firemaking' ? 'Firemaking' : <Link href='/hiscores/firemaking'>Firemaking</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Crafting' ? 'Crafting' : <Link href='/hiscores/crafting'>Crafting</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Smithing' ? 'Smithing' : <Link href='/hiscores/smithing'>Smithing</Link>}
      </HiscoresMenuItem>
      <HiscoresMenuItem>
        {hiscoreType === 'Mining' ? 'Mining' : <Link href='/hiscores/mining'>Mining</Link>}
      </HiscoresMenuItem>
    </HiscoresMenuItemList>
  )
}

export default HiscoresMenu
