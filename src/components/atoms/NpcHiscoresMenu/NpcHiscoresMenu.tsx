import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@atoms/NpcHiscoresMenuItem'
import { getNpcNameByIdForMenu, getNpcNameByIdForMenuKey } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'
import { NpcHiscoresMenuItemList } from '@styledPages/NpcHiscores.styled'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props
  // console.log('rendering')
  console.log('NpcHiscoreTypes', NpcHiscoreTypes)

  return (
    <NpcHiscoresMenuItemList>
      {NpcHiscoreTypes.map(npcHiscoreType => {
        // console.log('aint it unique? ', getNpcNameByIdForMenuKey(npcHiscoreType), npcHiscoreType)
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
