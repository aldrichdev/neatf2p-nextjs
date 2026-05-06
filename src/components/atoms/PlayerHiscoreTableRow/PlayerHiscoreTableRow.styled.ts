import { HiscoreTableValueCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { TableCell } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreSkillTableCell = styled(TableCell)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    border: 0;
    padding: 8px;
    gap: 8px;

    ${theme.breakpoints.up('tablet')} {
      padding: 16px;
    }
  `,
)

export const LevelProgressBar = styled('div')(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: block;
      flex: 1;
      height: 4px;
      background-color: ${theme.palette.custom.levelProgressBg};
      border-radius: 2px;
      overflow: hidden;
      max-width: 80px;
    }
  `,
)

export const LevelProgressBarFill = styled('div', {
  shouldForwardProp: prop => prop !== 'completed',
})<{ completed?: number }>(
  ({ theme, completed }) => css`
    background-color: ${theme.palette.primary.main};
    height: 100%;
    border-radius: 2px;
    width: ${completed ? completed * 100 : 0}%;
  `,
)

export const ExperienceCell = styled(HiscoreTableValueCell)(
  ({ theme }) => css`
    display: none;

    ${theme.breakpoints.up('tablet')} {
      display: table-cell;
      min-width: 100px;
    }
  `,
)

export const MobileExperienceCell = styled(HiscoreTableValueCell)(
  ({ theme }) => css`
    ${theme.breakpoints.up('tablet')} {
      display: none;
    }
  `,
)
