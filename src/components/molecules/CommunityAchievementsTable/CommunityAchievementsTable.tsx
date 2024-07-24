import { TableHead, TableBody, TableCell } from '@mui/material'
import Link from 'next/link'
import { communityAchievements } from './CommunityAchievements.data'
import {
  AchievementsTable,
  AchievementsTableHeaderCell,
  AchievementsTableRow,
} from './CommunityAchievementsTable.styled'

const CommunityAchievementsTable = () => (
  <AchievementsTable>
    <TableHead>
      <AchievementsTableRow>
        <AchievementsTableHeaderCell>Achievement</AchievementsTableHeaderCell>
        <AchievementsTableHeaderCell>Player Name</AchievementsTableHeaderCell>
        <AchievementsTableHeaderCell>Date</AchievementsTableHeaderCell>
      </AchievementsTableRow>
    </TableHead>
    <TableBody>
      {communityAchievements.map(achievement => (
        <AchievementsTableRow key={achievement.achievement}>
          <TableCell scope='row'>{achievement.achievement}</TableCell>
          <TableCell>
            {achievement.playerName !== 'TBD' ? (
              <Link href={`/hiscores/player/${achievement.playerName}`}>{achievement.playerName}</Link>
            ) : (
              achievement.playerName
            )}
          </TableCell>
          <TableCell>{achievement.date}</TableCell>
        </AchievementsTableRow>
      ))}
    </TableBody>
  </AchievementsTable>
)

export default CommunityAchievementsTable
