import { TableHead, TableBody } from '@mui/material'
import { communityAchievements } from './CommunityAchievements.data'
import {
  AchievementsTable,
  AchievementsTableCell,
  AchievementsTableHeaderCell,
  AchievementsTableLink,
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
          <AchievementsTableCell scope='row'>{achievement.achievement}</AchievementsTableCell>
          <AchievementsTableCell>
            {achievement.playerName !== 'TBD' ? (
              <AchievementsTableLink href={`/hiscores/player/${achievement.playerName}`} target='_blank'>
                {achievement.playerName}
              </AchievementsTableLink>
            ) : (
              achievement.playerName
            )}
          </AchievementsTableCell>
          <AchievementsTableCell>{achievement.date}</AchievementsTableCell>
        </AchievementsTableRow>
      ))}
    </TableBody>
  </AchievementsTable>
)

export default CommunityAchievementsTable
