import { HiscoreTableValueCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { TableCell, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'

export const HiscoreTableRow = styled(TableRow, {
  shouldForwardProp: prop => !['isHeaderRow', 'isNpcTable'].includes(prop.toString()),
})<{ isHeaderRow?: boolean; isNpcTable?: boolean }>(
  ({ theme, isHeaderRow, isNpcTable }) => css`
    display: grid;
    grid-template-columns: ${isNpcTable ? '50% 20% 30%' : '30% 20% 20% 30%'};
    font-size: 14px;
    border-bottom: 0.5px solid ${theme.palette.divider};
    height: fit-content;
    align-items: center;

    &:last-child {
      border-bottom: none;
    }

    ${!isHeaderRow &&
    `
      cursor: pointer;
      &:hover {
        background-color: ${theme.palette.divider};

        #rank-one {
          color: ${theme.palette.custom.rankGold.altText};
        }
      }
    `}

    ${theme.breakpoints.up('tablet')} {
      font-size: 16px;
    }
  `,
)

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

export const PlayerHiscoreTableCell = styled(HiscoreTableValueCell)(
  () => css`
    display: flex;
    align-items: center;
    gap: 10px;
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
