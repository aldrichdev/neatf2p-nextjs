import { TableContainer, TableBody, TableHead, Paper } from '@mui/material'
import { HiscoreTable, HiscoreTableCell } from '@atoms/HiscoresTable/HiscoresTable.styled'
import { ExperienceCell, HiscoreSkillIcon, HiscoreSkillTableCell, HiscoreTableRow } from './PlayerHiscoreTable.styled'
import { PlayerHiscoreRow } from '@globalTypes/Hiscores/PlayerHiscoreRow'

type HiscoreTableProps = {
  accountName: string
  playerHiscores: PlayerHiscoreRow[]
}

const PlayerHiscoreTable = (props: HiscoreTableProps) => {
  const { accountName, playerHiscores } = props

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <HiscoreTable aria-label={`${accountName} Hiscore Table`}>
        <TableHead>
          <HiscoreTableRow>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Skill</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Rank</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Level</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>EXP</HiscoreTableCell>
          </HiscoreTableRow>
        </TableHead>
        <TableBody>
          {playerHiscores.map(playerHiscoreRow => (
            <HiscoreTableRow key={playerHiscoreRow.skill}>
              <HiscoreSkillTableCell>
                <HiscoreSkillIcon src={`/img/skills/${playerHiscoreRow.skill}.png`} alt='' />
                <span>{playerHiscoreRow.skill}</span>
              </HiscoreSkillTableCell>
              <HiscoreTableCell>{playerHiscoreRow.rank === 0 ? '--' : playerHiscoreRow.rank}</HiscoreTableCell>
              <HiscoreTableCell>{playerHiscoreRow.level}</HiscoreTableCell>
              <ExperienceCell>{playerHiscoreRow.exp}</ExperienceCell>
            </HiscoreTableRow>
          ))}
        </TableBody>
      </HiscoreTable>
    </TableContainer>
  )
}

export default PlayerHiscoreTable
