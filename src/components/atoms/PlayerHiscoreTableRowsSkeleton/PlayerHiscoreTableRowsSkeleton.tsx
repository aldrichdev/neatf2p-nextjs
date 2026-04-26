import Skeleton from '@mui/material/Skeleton'
import {
  ExpSkeleton,
  LevelSkeleton,
  RankSkeleton,
  SkillSkeleton,
  Td,
  Tr,
} from './PlayerHiscoreTableRowsSkeleton.styled'

// Overall + 12 individual skills
const SKILL_COUNT = 13

const PlayerHiscoreTableRowsSkeleton = () => (
  <>
    {Array.from({ length: SKILL_COUNT }).map((_, i) => (
      <Tr key={i}>
        <Td>
          <SkillSkeleton variant='text' />
        </Td>
        <Td>
          <RankSkeleton variant='text' />
        </Td>
        <Td>
          <LevelSkeleton variant='text' />
        </Td>
        <Td>
          <ExpSkeleton variant='text' />
        </Td>
      </Tr>
    ))}
  </>
)

export default PlayerHiscoreTableRowsSkeleton
