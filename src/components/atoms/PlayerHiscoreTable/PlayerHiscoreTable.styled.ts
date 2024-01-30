import { HiscoreTableCell } from '@atoms/HiscoresTable/HiscoresTable.styled'
import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreTableRow = styled(TableRow)(
  () => css`
    border: 1px solid black;
  `,
)

export const HiscoreSkillTableCell = styled(TableCell)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    border: 0;
    border-right: 1px solid black;
    padding: 8px;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const HiscoreSkillIcon = styled('img')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      width: 20px;
      margin-right: 8px;
      background-color: transparent;
    }
  `,
)

export const ExperienceCell = styled(HiscoreTableCell)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      min-width: 100px;
    }
  `,
)
