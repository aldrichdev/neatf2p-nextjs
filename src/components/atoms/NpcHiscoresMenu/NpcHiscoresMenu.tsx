import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@atoms/NpcHiscoresMenuItem'
import { getNpcNameByIdForMenu, getNpcNameByIdForMenuKey } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'
import { NpcHiscoresMenuItemList } from '@styledPages/NpcHiscores.styled'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props

  return (
    <NpcHiscoresMenuItemList>
      {NpcHiscoreTypes.map(npcHiscoreType => {
        if (getNpcNameByIdForMenu(npcHiscoreType) !== '') {
          return (
            <NpcHiscoresMenuItem
              key={getNpcNameByIdForMenuKey(npcHiscoreType)}
              menuItemNpcId={npcHiscoreType}
              hiscoreType={activeNpcHiscoreType}
              buttonOnClick={buttonOnClick}
            />
          )
        }
      })}
    </NpcHiscoresMenuItemList>
  )
}

export default NpcHiscoresMenu
