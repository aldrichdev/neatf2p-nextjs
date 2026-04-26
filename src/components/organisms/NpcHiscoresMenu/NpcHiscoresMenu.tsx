import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@molecules/NpcHiscoresMenuItem'
import { getNpcNameByIdForMenu, getNpcNameByIdForMenuKey } from '@utils/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'
import { HiscoresMenuItemList } from '@molecules/HiscoresMenu/HiscoresMenu.styled'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props

  return (
    <HiscoresMenuItemList isNpcMenu>
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
    </HiscoresMenuItemList>
  )
}

export default NpcHiscoresMenu
