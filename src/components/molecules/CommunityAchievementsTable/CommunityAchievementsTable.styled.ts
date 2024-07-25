import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { Table, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'

export const AchievementsTable = styled(Table)(
  () => css`
    font-family: Source Sans Pro;
    background-color: var(--dark-gray);
    border: 2px solid black;
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

export const AchievementsTableCell = styled(TableCell)(
  ({ theme }) => css`
    color: #f5f5f5;
    border-color: #100c08;

    ${theme.breakpoints.up('tablet')} {
      font-size: 18px;
    }
  `,
)

export const AchievementsTableHeaderCell = styled(AchievementsTableCell)(
  () => css`
    font-weight: 700;
  `,
)

export const AchievementsTableLink = styled(Link)(
  () => css`
    color: #eeb425;
  `,
)
