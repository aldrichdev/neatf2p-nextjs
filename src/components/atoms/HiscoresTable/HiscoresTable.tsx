import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableContainer, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material'
import { StyledTable } from './HiscoresTable.styled'
import { getTotalExp } from '@helpers/hiscores/hiscoresUtils'

type HiscoresTableProps = {
  hiscores: HiscoreDataRow[]
  hiscoreType: HiscoreType
}

const HiscoresTable = (props: HiscoresTableProps) => {
  const { hiscores, hiscoreType } = props

  const getHiscoreValue = (hiscore: HiscoreDataRow) => {
    switch (hiscoreType) {
      case 'Overall':
        return hiscore.skill_total
      case 'Attack':
        return hiscore.attack
      case 'Defense':
        return hiscore.defense
      case 'Strength':
        return hiscore.strength
      case 'Hits':
        return hiscore.hits
      case 'Ranged':
        return hiscore.ranged
      case 'Prayer':
        return hiscore.prayer
      case 'Magic':
        return hiscore.magic
      case 'Cooking':
        return hiscore.cooking
      case 'Woodcut':
        return hiscore.woodcut
      case 'Fishing':
        return hiscore.fishing
      case 'Firemaking':
        return hiscore.firemaking
      case 'Crafting':
        return hiscore.crafting
      case 'Smithing':
        return hiscore.smithing
      case 'Mining':
        return hiscore.mining
    }
  }

  const convertXP = (skillXP: number) => {
    // Open RSC Core Framework experience numbers are 4 times what the actual RS exp number is.
    return Math.round(skillXP / 4).toLocaleString()
  }

  const getHiscoreSkillXP = (hiscore: HiscoreDataRow) => {
    switch (hiscoreType) {
      case 'Overall':
        return getTotalExp(hiscore)
      case 'Attack':
        return hiscore.attackxp
      case 'Defense':
        return hiscore.defensexp
      case 'Strength':
        return hiscore.strengthxp
      case 'Hits':
        return hiscore.hitsxp
      case 'Ranged':
        return hiscore.rangedxp
      case 'Prayer':
        return hiscore.prayerxp
      case 'Magic':
        return hiscore.magicxp
      case 'Cooking':
        return hiscore.cookingxp
      case 'Woodcut':
        return hiscore.woodcutxp
      case 'Fishing':
        return hiscore.fishingxp
      case 'Firemaking':
        return hiscore.firemakingxp
      case 'Crafting':
        return hiscore.craftingxp
      case 'Smithing':
        return hiscore.smithingxp
      case 'Mining':
        return hiscore.miningxp
    }
  }

  return (
    <TableContainer component={Paper}>
      <StyledTable aria-label={`${hiscoreType} Hiscores Table`}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Rank</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Level</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>EXP</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hiscores?.map((hiscoreRow, index) => (
            <TableRow key={hiscoreRow.username}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell>{hiscoreRow.username}</TableCell>
              <TableCell>{getHiscoreValue(hiscoreRow)}</TableCell>
              <TableCell>{convertXP(getHiscoreSkillXP(hiscoreRow))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
    </TableContainer>
  )
}

export default HiscoresTable
