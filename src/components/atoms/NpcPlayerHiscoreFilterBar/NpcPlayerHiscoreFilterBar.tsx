import { FilterBarSkeleton } from '@atoms/FilterBarSkeleton'
import { npcPlayerHiscoreFilters } from './NpcPlayerHiscoreFilterBar.consts'
import { NpcPlayerHiscoreFilterBarProps } from './NpcPlayerHiscoreFilterBar.types'
import { X } from 'lucide-react'
import clsx from 'clsx'

/** A bar with a search field and several buttons for displaying filtered NPC hiscore data. */
const NpcPlayerHiscoreFilterBar = (props: NpcPlayerHiscoreFilterBarProps) => {
  const { isLoading, search, setSearch, activeFilter, setActiveFilter } = props

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleClearSearch = () => {
    setSearch('')
  }

  if (isLoading) {
    return <FilterBarSkeleton />
  }

  return (
    <div className='mb-4 flex h-8.5 gap-2'>
      <div className='relative min-w-0 flex-1'>
        <input
          type='text'
          placeholder='Search NPC...'
          value={search}
          onChange={handleSearchChange}
          className={clsx(
            'box-border h-8.5 w-full min-w-0 px-2 py-1.5',
            'border-divider rounded-md border-[0.5px]',
            'text-primary-dark bg-background-paper text-[16px]',
            'font-sans outline-none',
            'md:px-2.5 md:py-1.75',
          )}
        />
        {search && (
          <button
            title='Clear search'
            onClick={handleClearSearch}
            className={clsx(
              'absolute top-1/2 right-2 -translate-y-1/2',
              'cursor-pointer border-none bg-transparent p-0',
              'flex items-center justify-center',
              'text-tertiary-text text-[16px] leading-none',
              'hover:text-primary-dark',
              '[-webkit-tap-highlight-color:transparent]',
            )}
          >
            <X />
          </button>
        )}
      </div>
      <div className='flex gap-0.75'>
        {npcPlayerHiscoreFilters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={clsx(
              'cursor-pointer rounded-md font-sans text-[14px] font-medium whitespace-nowrap',
              'border-[0.5px] px-2 py-1.25 md:px-2.5 md:py-1.5',
              activeFilter === filter
                ? 'text-table-header-text bg-primary-main border-primary-main'
                : 'text-text-secondary bg-background-paper border-divider',
            )}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  )
}

export default NpcPlayerHiscoreFilterBar
