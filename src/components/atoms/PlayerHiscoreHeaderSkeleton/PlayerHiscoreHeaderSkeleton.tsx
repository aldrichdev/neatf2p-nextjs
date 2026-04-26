import Skeleton from '@mui/material/Skeleton'
import { PlayerName, LastLogin, SummaryGrid, StatTile } from './PlayerHiscoreHeaderSkeleton.styled'

const PlayerHiscoreHeaderSkeleton = () => (
  <div>
    <PlayerName variant='text' width={200} height={40} />
    <LastLogin variant='text' width={160} height={16} />
    <SummaryGrid>
      {Array.from({ length: 3 }).map((_, i) => (
        <StatTile key={i}>
          <Skeleton variant='text' width='60%' height={14} />
          <Skeleton variant='text' width='40%' height={28} />
          <Skeleton variant='text' width='70%' height={12} />
        </StatTile>
      ))}
    </SummaryGrid>
  </div>
)

export default PlayerHiscoreHeaderSkeleton
