import { Skeleton } from '@ui/skeleton'

// Overall + 12 individual skills
const SKILL_COUNT = 13

const PlayerHiscoreTableRowsSkeleton = () => (
  <>
    {Array.from({ length: SKILL_COUNT }).map((_, i) => (
      <tr key={i} className='flex flex-nowrap'>
        <td className='block p-2 md:p-4'>
          <Skeleton className='h-4 w-[84.5px] md:w-52' />
        </td>
        <td className='block p-2 md:p-4'>
          <Skeleton className='h-4 w-12.75 md:w-32' />
        </td>
        <td className='block p-2 md:p-4'>
          <Skeleton className='h-4 w-12.75 md:w-32' />
        </td>
        <td className='block p-2 md:p-4'>
          <Skeleton className='h-4 w-[84.5px] md:w-52' />
        </td>
      </tr>
    ))}
  </>
)

export default PlayerHiscoreTableRowsSkeleton
