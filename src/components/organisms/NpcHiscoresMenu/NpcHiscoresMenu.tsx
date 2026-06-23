import { NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { NpcHiscoresMenuItem } from '@molecules/NpcHiscoresMenuItem'
import { getNpcNameByIdForMenu, getNpcNameByIdForMenuKey } from '@utils/hiscores/hiscoresUtils'
import { NpcHiscoresMenuProps } from './NpcHiscoresMenu.types'
import clsx from 'clsx'

const NpcHiscoresMenu = (props: NpcHiscoresMenuProps) => {
  const { activeNpcHiscoreType, buttonOnClick } = props

  return (
    <div
      className={clsx(
        'bg-sidebar-bg border-divider lg:border-t-divider size-full',
        'border-[0.5px] border-t-0 lg:rounded-lg lg:border-t-[0.5px]',
      )}
    >
      <ul
        className={clsx(
          'm-0 flex h-fit w-full list-none gap-x-1.5 px-3 py-2.5',
          'scrollbar-none overflow-x-auto [&::-webkit-scrollbar]:hidden',
          'lg:block lg:h-265 lg:gap-x-0 lg:px-0 lg:py-2',
          'lg:scrollbar-thin lg:[scrollbar-color:var(--color-divider)_transparent] lg:overflow-y-auto',
          'lg:basis-auto',
        )}
      >
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
      </ul>
    </div>
  )
}

export default NpcHiscoresMenu
