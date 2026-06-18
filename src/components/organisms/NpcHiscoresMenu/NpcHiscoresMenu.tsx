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
        'bg-sidebar-bg border-divider md:border-t-divider size-full',
        'border-[0.5px] border-t-0 md:rounded-lg md:border-t-[0.5px]',
      )}
    >
      <ul
        className={clsx(
          'm-0 flex h-fit w-full list-none gap-x-1.5 p-[10px_12px]',
          'scrollbar-none overflow-x-auto [&::-webkit-scrollbar]:hidden',
          'md:block md:h-265 md:gap-x-0 md:px-0 md:py-2',
          'md:scrollbar-thin md:[scrollbar-color:var(--color-divider)_transparent] md:overflow-y-auto',
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
