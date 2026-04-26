import Skeleton from '@mui/material/Skeleton'
import { Cell, ExpCell, MobileExpSkeleton, DesktopExpSkeleton } from './HiscoresTableRowsSkeleton.styled'

const HiscoresTableRowsSkeleton = () => (
  <>
    {Array.from({ length: 15 }).map((_, i) => (
      <tr key={i}>
        <Cell width='60px'>
          <Skeleton variant='circular' width={24} height={24} />
        </Cell>
        <Cell>
          <Skeleton variant='text' width={`${Math.random() * 40 + 40}%`} />
        </Cell>
        <Cell width='80px'>
          <Skeleton variant='text' width={40} />
        </Cell>
        <ExpCell>
          <MobileExpSkeleton variant='text' width={44} />
          <DesktopExpSkeleton variant='text' width={80} />
        </ExpCell>
      </tr>
    ))}
  </>
)

export default HiscoresTableRowsSkeleton
