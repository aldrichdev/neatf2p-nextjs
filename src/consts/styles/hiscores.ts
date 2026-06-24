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
      'sm:text-primary-dark sm:w-auto sm:gap-2 sm:rounded-none sm:border-0 sm:px-3.5 sm:py-1.75 sm:text-left',
      isSelected
        ? 'sm:border-l-primary-main sm:bg-primary-light sm:hover:bg-primary-light sm:border-l-[3px] sm:pl-2.75'
        : 'sm:hover:bg-skill-item-hover sm:bg-transparent',
    ),
}
