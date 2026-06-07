import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { HiscoresMenuItem } from '@atoms/HiscoresMenuItem'
import clsx from 'clsx'

type HiscoresMenuProps = {
  hiscoreType: HiscoreType
  buttonOnClick: (hiscoreType: HiscoreType) => void
}

const HiscoresMenu = (props: HiscoresMenuProps) => {
  const { hiscoreType, buttonOnClick } = props

  return (
    <ul
      className={clsx(
        'bg-sidebar-bg border-divider list-none border-[0.5px] border-t-0',
        'm-0 flex h-fit w-full gap-x-1.5 p-[10px_12px]',
        'overflow-x-auto [&::-webkit-scrollbar]:hidden',
        'md:block md:h-250 md:rounded-lg md:px-0 md:py-2',
        'md:border-t-divider md:gap-x-0 md:border-t-[0.5px]',
        'md:scrollbar-thin md:[scrollbar-color:var(--color-divider)_transparent] md:overflow-y-auto',
        'lg:basis-auto',
      )}
    >
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
    </ul>
  )
}

export default HiscoresMenu
