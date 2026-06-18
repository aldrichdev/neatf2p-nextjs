import { Skeleton } from '@ui/skeleton'

const FilterBarSkeleton = () => (
  <div className='mb-2.5 flex gap-1.5'>
    <Skeleton className='h-8 flex-1 rounded-md' />
    <div className='flex shrink-0 gap-0.75'>
      <Skeleton className='h-8 w-9 rounded-md md:w-13' />
      <Skeleton className='h-8 w-9 rounded-md md:w-13' />
      <Skeleton className='h-8 w-9 rounded-md md:w-13' />
    </div>
  </div>
)

export default FilterBarSkeleton
