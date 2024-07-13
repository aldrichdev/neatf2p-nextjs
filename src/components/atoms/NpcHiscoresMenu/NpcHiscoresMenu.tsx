import { HiscoresMenuItemList } from '@styledPages/hiscores.styled'
import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@atoms/NpcHiscoresMenuItem'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props

  return (
    <HiscoresMenuItemList isNpcMenu>
      {NpcHiscoreTypes.map(npcHiscoreType => (
        <NpcHiscoresMenuItem
          key={getNpcNameById(npcHiscoreType)}
          menuItemNpcId={npcHiscoreType}
          hiscoreType={activeNpcHiscoreType}
          buttonOnClick={buttonOnClick}
        />
      ))}
    </HiscoresMenuItemList>
  )
}

export default NpcHiscoresMenu
