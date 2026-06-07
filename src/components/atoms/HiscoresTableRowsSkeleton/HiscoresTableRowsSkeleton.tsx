import { Skeleton } from '@ui/skeleton'

const HiscoresTableRowsSkeleton = () => (
  <>
    {Array.from({ length: 15 }).map((_, i) => (
      <tr key={i}>
        <td className='w-15 px-3.5 py-2.25'>
          <Skeleton className='size-6 rounded-full' />
        </td>
        <td className='px-3.5 py-2.25'>
          <Skeleton className='h-4' style={{ width: `${40 + (i % 5) * 10}%` }} />
        </td>
        <td className='w-20 px-3.5 py-2.25'>
          <Skeleton className='h-4 w-10' />
        </td>
        <td className='w-15 px-3.5 py-2.25 md:w-30'>
          <Skeleton className='h-4 w-11 md:hidden' />
          <Skeleton className='hidden h-4 w-20 md:block' />
        </td>
      </tr>
    ))}
  </>
)

export default HiscoresTableRowsSkeleton
