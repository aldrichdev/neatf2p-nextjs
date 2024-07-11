import { HiscoreTableCell } from '@atoms/HiscoresTable/HiscoresTable.styled'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreTableRow = styled(TableRow, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ theme, isNpcHiscores }) => css`
    display: grid;
    grid-template-columns: 30% 20% 20% 30%;
    font-size: 14px;

    ${theme.breakpoints.up('tablet')} {
      font-size: ${isNpcHiscores ? '18px' : '16px'};
    }
  `,
)

export const PlayerHiscoreTableHead = styled(TableHead, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ isNpcHiscores }) => css`
    .MuiTableRow-root {
      border-bottom: 1px solid ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    }
  `,
)

export const PlayerHiscoreTableBody = styled(TableBody, {
  shouldForwardProp: prop => prop !== 'isNpcHiscores',
})<{ isNpcHiscores?: boolean }>(
  ({ isNpcHiscores }) => css`
    .MuiTableRow-root:not(:last-child) {
      border-bottom: 1px solid ${isNpcHiscores ? 'var(--npc-hiscores-text-color)' : 'black'};
    }
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

export const SkillLink = styled(HoverUnderlineLink)(
  () => css`
    color: black;
  `,
)

export const ExperienceCell = styled(HiscoreTableCell)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      min-width: 100px;
    }
  `,
)
