import { HiscoresMenuItemList } from '@styledPages/hiscores.styled'
import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@atoms/NpcHiscoresMenuItem'
import { getNpcNameByIdForMenuKey } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props
  // console.log('rendering')

  return (
    <HiscoresMenuItemList isNpcMenu>
      {NpcHiscoreTypes.map(npcHiscoreType => {
        // console.log('aint it unique? ', getNpcNameByIdForMenuKey(npcHiscoreType), npcHiscoreType)
        return (
          <NpcHiscoresMenuItem
            key={getNpcNameByIdForMenuKey(npcHiscoreType)}
            menuItemNpcId={npcHiscoreType}
            hiscoreType={activeNpcHiscoreType}
            buttonOnClick={buttonOnClick}
          />
        )
      })}
    </HiscoresMenuItemList>
  )
}

export default NpcHiscoresMenu
