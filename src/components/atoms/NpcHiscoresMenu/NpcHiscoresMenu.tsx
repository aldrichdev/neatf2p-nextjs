import { HiscoresMenuItemList } from '@styledPages/hiscores.styled'
import { NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@atoms/NpcHiscoresMenuItem'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'

type NpcHiscoresMenuProps = {
  /** This is the current, or active hiscore type, which is either the default (first
   * option in the menu), or the type specified in the query string.
   */
  activeNpcHiscoreType: NpcHiscoreType
  buttonOnClick: (npcHiscoreType: NpcHiscoreType) => void
}

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
