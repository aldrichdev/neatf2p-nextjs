import clsx from 'clsx'

const valueCellClass = 'text-left font-normal text-sm md:text-base py-2.25 px-3.5 border-0'

export const hiscoresStyles = {
  hiscoresTableRootContainerClass: 'flex w-full flex-wrap',
  hiscoresTableOuterContainerClass: 'w-full overflow-hidden rounded-t-lg shadow-none md:basis-full',
  hiscoresTableClass: 'bg-background-paper w-full rounded-lg font-sans',
  hiscoresTheadClass: 'bg-primary-main h-fit [&_tr]:border-b-0',
  hiscoresListingTableRowClass: 'border-divider border-b-[0.5px] text-sm md:text-base',
  hiscoresValueCellClass: valueCellClass,
  hiscoresHeaderCellClass:
    'text-left text-table-header-text border-0 px-3.5 py-2.25 text-sm leading-6 font-bold uppercase',
  hiscoresDesktopCellClass: clsx(valueCellClass, 'hidden md:table-cell'),
  hiscoresMobileCellClass: clsx(valueCellClass, 'md:hidden'),
  hiscoresMenuItem: (isSelected: boolean) =>
    clsx(
      'flex cursor-pointer list-none items-center gap-1.25 text-center text-sm',
      'border-divider h-fit rounded-[20px] border-[0.5px] px-2.5 py-1.25 whitespace-nowrap',
      '-webkit-tap-highlight-color-transparent',
      isSelected
        ? 'text-table-header-text border-primary-main bg-primary-main font-medium'
        : 'text-primary-dark border-divider bg-background-paper font-normal',
      'md:text-primary-dark md:w-auto md:gap-2 md:rounded-none md:border-0 md:px-3.5 md:py-1.75 md:text-left',
      isSelected
        ? 'md:border-l-primary-main md:bg-primary-light md:hover:bg-primary-light md:border-l-[3px] md:pl-2.75'
        : 'md:hover:bg-skill-item-hover md:bg-transparent',
    ),
  npcHiscoresMenuItem: (isSelected: boolean) =>
    clsx(
      'flex cursor-pointer list-none items-center gap-1.25 text-center text-sm',
      'border-divider h-fit rounded-[20px] border-[0.5px] px-2.5 py-1.25 whitespace-nowrap',
      '-webkit-tap-highlight-color-transparent',
      isSelected
        ? 'text-table-header-text border-primary-main bg-primary-main font-medium'
        : 'text-primary-dark border-divider bg-background-paper font-normal',
      'lg:text-primary-dark lg:w-auto lg:gap-2 lg:rounded-none lg:border-0 lg:px-3.5 lg:py-1.75 lg:text-left',
      isSelected
        ? 'lg:border-l-primary-main lg:bg-primary-light lg:hover:bg-primary-light lg:border-l-[3px] lg:pl-2.75'
        : 'lg:hover:bg-skill-item-hover lg:bg-transparent',
    ),
}
