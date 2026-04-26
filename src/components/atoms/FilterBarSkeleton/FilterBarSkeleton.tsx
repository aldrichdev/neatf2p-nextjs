import { FilterBarWrapper, FilterInputSkeleton, ToggleGroup, ToggleSkeleton } from './FilterBarSkeleton.styled'

const FilterBarSkeleton = () => (
  <FilterBarWrapper>
    <FilterInputSkeleton variant='rectangular' height={32} />
    <ToggleGroup>
      <ToggleSkeleton variant='rectangular' height={32} />
      <ToggleSkeleton variant='rectangular' height={32} />
      <ToggleSkeleton variant='rectangular' height={32} />
    </ToggleGroup>
  </FilterBarWrapper>
)

export default FilterBarSkeleton
