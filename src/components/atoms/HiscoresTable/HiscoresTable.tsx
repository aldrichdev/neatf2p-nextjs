import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, TableHead, Paper } from '@mui/material'
import {
  HiscoreTable,
  HiscoreTableCell,
  HiscoreTableContainer,
  HiscoreUsername,
  HiscoresTableRow,
} from './HiscoresTable.styled'
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
    <HiscoreTableContainer component={Paper}>
      <HiscoreTable aria-label={`${hiscoreType} Hiscores Table`}>
        <TableHead>
          <HiscoresTableRow>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Rank</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Name</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>Level</HiscoreTableCell>
            <HiscoreTableCell sx={{ fontWeight: 700 }}>EXP</HiscoreTableCell>
          </HiscoresTableRow>
        </TableHead>
        <TableBody>
          {hiscores?.map((hiscoreRow, index) => (
            <HiscoresTableRow key={hiscoreRow.username}>
              <HiscoreTableCell component='th' scope='row'>
                {index + 1}
              </HiscoreTableCell>
              <HiscoreTableCell>
                <HiscoreUsername href={`/hiscores/player/${hiscoreRow.username}`}>
                  {hiscoreRow.username}
                </HiscoreUsername>
              </HiscoreTableCell>
              <HiscoreTableCell>{getHiscoreValue(hiscoreRow)}</HiscoreTableCell>
              <HiscoreTableCell>{convertXP(getHiscoreSkillXP(hiscoreRow))}</HiscoreTableCell>
            </HiscoresTableRow>
          ))}
        </TableBody>
      </HiscoreTable>
    </HiscoreTableContainer>
  )
}

export default HiscoresTable
