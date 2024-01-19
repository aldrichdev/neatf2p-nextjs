import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableContainer, Table, TableBody, TableHead, TableRow, TableCell, Paper } from '@mui/material'

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
    return skillXP / 4
  }

  const getHiscoreSkillXP = (hiscore: HiscoreDataRow) => {
    switch (hiscoreType) {
      case 'Overall':
        return (
          hiscore.attackxp +
          hiscore.defensexp +
          hiscore.strengthxp +
          hiscore.hitsxp +
          hiscore.rangedxp +
          hiscore.prayerxp +
          hiscore.magicxp +
          hiscore.cookingxp +
          hiscore.woodcutxp +
          hiscore.fishingxp +
          hiscore.firemakingxp +
          hiscore.craftingxp +
          hiscore.smithingxp +
          hiscore.miningxp
        )
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
      <Table aria-label={`${hiscoreType} Hiscores Table`}>
        <TableHead>
          <TableRow>
            <TableCell align='right' sx={{ fontWeight: 700 }}>
              Rank
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 700 }}>
              Name
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 700 }}>
              {hiscoreType}
            </TableCell>
            <TableCell align='right' sx={{ fontWeight: 700 }}>
              EXP
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hiscores?.map((hiscoreRow, index) => (
            <TableRow key={hiscoreRow.username}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='right'>{hiscoreRow.username}</TableCell>
              <TableCell align='right'>{getHiscoreValue(hiscoreRow)}</TableCell>
              <TableCell align='right'>{convertXP(getHiscoreSkillXP(hiscoreRow))}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default HiscoresTable
