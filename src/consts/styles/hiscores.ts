import clsx from 'clsx'

export const hiscoresTableRootContainerClass = 'flex w-full flex-wrap'

export const hiscoresTableOuterContainerClass = 'w-full overflow-hidden rounded-t-lg shadow-none md:basis-full'

export const hiscoresTableClass = 'bg-background-paper w-full rounded-lg font-sans'

export const hiscoresTheadClass = 'bg-primary-main h-fit [&_tr]:border-b-0'

export const hiscoresListingTableRowClass = 'border-divider border-b-[0.5px] text-[14px] md:text-[16px]'

export const hiscoresValueCellClass = 'text-left font-normal text-[14px] md:text-[16px] py-2.25 px-3.5 border-0'

export const hiscoresHeaderCellClass =
  'text-left text-table-header-text border-0 px-3.5 py-2.25 text-[14px] leading-6 font-bold uppercase'

export const hiscoresDesktopCellClass = clsx(hiscoresValueCellClass, 'hidden md:table-cell')

export const hiscoresMobileCellClass = clsx(hiscoresValueCellClass, 'md:hidden')
