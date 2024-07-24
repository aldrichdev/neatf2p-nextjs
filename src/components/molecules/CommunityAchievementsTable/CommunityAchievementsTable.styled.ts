import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { Table, TableCell, TableRow } from '@mui/material'

export const AchievementsTable = styled(Table)(
  () => css`
    font-family: Source Sans Pro;
  `,
)

export const AchievementsTableRow = styled(TableRow)(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: 35% 35% 20%;

    ${theme.breakpoints.up('tablet')} {
      grid-template-columns: 45% 35% 20%;
    }
  `,
)

export const AchievementsTableHeaderCell = styled(TableCell)(
  () => css`
    font-weight: 700;
  `,
)
