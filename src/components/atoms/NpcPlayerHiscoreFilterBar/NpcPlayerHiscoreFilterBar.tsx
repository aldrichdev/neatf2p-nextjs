import { FilterBarSkeleton } from '@atoms/FilterBarSkeleton'
import { npcPlayerHiscoreFilters } from './NpcPlayerHiscoreFilterBar.consts'
import {
  ClearSearchButton,
  FilterBar,
  FilterToggleButton,
  FilterToggles,
  InputWrapper,
  SearchBox,
} from './NpcPlayerHiscoreFilterBar.styled'
import { NpcPlayerHiscoreFilterBarProps } from './NpcPlayerHiscoreFilterBar.types'
import { X } from 'lucide-react'

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
    <FilterBar>
      <InputWrapper>
        <SearchBox type='text' placeholder='Search NPC...' value={search} onChange={handleSearchChange} />
        {search && (
          <ClearSearchButton title='Clear search' onClick={handleClearSearch}>
            <X />
          </ClearSearchButton>
        )}
      </InputWrapper>
      <FilterToggles>
        {npcPlayerHiscoreFilters.map(filter => (
          <FilterToggleButton
            key={filter}
            onClick={() => setActiveFilter(filter)}
            active={activeFilter === filter ? true : false}
          >
            {filter}
          </FilterToggleButton>
        ))}
      </FilterToggles>
    </FilterBar>
  )
}

export default NpcPlayerHiscoreFilterBar
