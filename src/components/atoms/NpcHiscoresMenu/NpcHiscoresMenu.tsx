import { HiscoresMenuItemList } from '@styledPages/hiscores.styled'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { HiscoresMenuItem } from '@atoms/HiscoresMenuItem'

type NpcHiscoresMenuProps = {
  npcHiscoreType: NpcHiscoreType
  buttonOnClick: (npcHiscoreType: NpcHiscoreType) => void
}

// TODO: Finish updating for NPC Hiscores then use on the npc-hiscores/index.ts page
const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { npcHiscoreType, buttonOnClick } = props

  return (
    <HiscoresMenuItemList>
      <HiscoresMenuItem menuItemLabel='Overall' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Hits' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Ranged' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Prayer' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Magic' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Cooking' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Woodcut' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Fishing' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Firemaking' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Crafting' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Smithing' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
      <HiscoresMenuItem menuItemLabel='Mining' hiscoreType={hiscoreType} buttonOnClick={buttonOnClick} />
    </HiscoresMenuItemList>
  )
}

export default HiscoresMenu
