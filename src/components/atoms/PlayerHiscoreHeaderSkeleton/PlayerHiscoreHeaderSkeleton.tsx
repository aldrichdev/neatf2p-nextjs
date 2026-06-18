import { Skeleton } from '@ui/skeleton'

const PlayerHiscoreHeaderSkeleton = () => (
  <div>
    <Skeleton className='mx-auto mb-1 h-10 w-50' />
    <Skeleton className='mx-auto mb-4 h-4 w-40' />
    <div className='mb-4 grid grid-cols-3 gap-2.5'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='bg-sidebar-bg flex flex-col gap-1.5 rounded-lg px-3.5 py-2.5'>
          <Skeleton className='h-3.5 w-[60%]' />
          <Skeleton className='h-7 w-[40%]' />
          <Skeleton className='h-3 w-[70%]' />
        </div>
      ))}
    </div>
  </div>
)

export default PlayerHiscoreHeaderSkeleton
